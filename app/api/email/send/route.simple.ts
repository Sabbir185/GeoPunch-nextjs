import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { getCurrentUser } from "@/lib/current-user";
import { logEvent } from "@/utils/sentry";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    let isFirebaseUser = false;
    let adminUser = null;

    // Check for Firebase authentication header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // For now, we'll assume if they have a Bearer token, they're authenticated
      // In a production environment, you should verify the token properly
      isFirebaseUser = true;
      console.log('Firebase user authenticated via Bearer token');
    }

    // If no Firebase user, check for admin authentication
    if (!isFirebaseUser) {
      adminUser = await getCurrentUser();
    }

    // Must have either Firebase user or admin user
    if (!isFirebaseUser && !adminUser?.email) {
      logEvent(
        "Unauthorized email send attempt",
        "email",
        { user: "unauthorized", hasAuthHeader: !!authHeader },
        "warning"
      );
      return NextResponse.json(
        { status: 401, error: true, msg: "Unauthorized access, Please login first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { to, subject, html } = body;

    // Validate input
    if (!to || !subject || !html) {
      return NextResponse.json(
        { status: 400, error: true, msg: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { status: 400, error: true, msg: "Invalid email format" },
        { status: 400 }
      );
    }

    // Determine sender info
    const senderName = isFirebaseUser ? 'Firebase User' : (adminUser?.name || adminUser?.email);
    const senderEmail = isFirebaseUser ? 'firebase@geopunch.com' : adminUser?.email;

    // Send email
    const { data, error } = await sendEmail({
      from: process.env.FROM_EMAIL!,
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0;">GeoPunch</h2>
            <p style="color: #666; margin: 5px 0 0 0;">Message from ${senderName}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
            <h3 style="color: #495057; margin-top: 0;">${subject}</h3>
            <div style="color: #495057; line-height: 1.6; font-size: 14px;">
              ${html}
            </div>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
            <p style="color: #6c757d; margin: 0; font-size: 14px;">
              This email was sent from the GeoPunch system
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Email sending error:", error);
      logEvent(
        "Email sending failed",
        "email",
        { error: error.message, to, from: senderEmail },
        "error"
      );
      return NextResponse.json(
        { status: 500, error: true, msg: "Failed to send email" },
        { status: 500 }
      );
    }

    // Log successful email sending
    logEvent(
      "Email sent successfully",
      "email",
      { to, subject, from: senderEmail },
      "info"
    );

    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Email sent successfully",
        data: { emailId: data?.id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      {
        status: 500,
        error: true,
        msg: "Failed to send email. Please try later.",
      },
      { status: 500 }
    );
  }
}
