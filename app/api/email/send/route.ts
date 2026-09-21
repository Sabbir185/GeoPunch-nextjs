import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/brevo";
import { getActivityEmailTemplate } from "@/lib/email-templates";

export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/current-user";
import { logEvent } from "@/utils/sentry";
import { prisma } from "@/lib/prisma";
import * as fs from 'fs';
import * as path from 'path';
import { ServiceAccount } from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
let adminAuth: any = null;

async function initializeFirebaseAdmin() {
  if (!adminAuth) {
    try {
      const admin = await import('firebase-admin');
      
      if (!admin.apps.length) {
        let serviceAccount: ServiceAccount | null = null;

        // 1. Try FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 or FIREBASE_SERVICE_ACCOUNT_KEY environment variable
        const envKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
        if (envKey) {
          try {
            let jsonString = envKey.trim();
            if (!jsonString.startsWith('{')) {
              jsonString = Buffer.from(jsonString, 'base64').toString('utf8');
            }
            serviceAccount = JSON.parse(jsonString);
          } catch (envError) {
            console.error('Error parsing Firebase service account from env:', envError);
          }
        }

        // 2. Try credential file fallback
        if (!serviceAccount) {
          const candidatePaths = [
            path.join(process.cwd(), 'lib', 'firebaseGPIConnectAdmin.json'),
            path.join(process.cwd(), 'lib', 'firebaseGeoPunchAdmin.json'),
          ];

          for (const filePath of candidatePaths) {
            if (fs.existsSync(filePath)) {
              try {
                const serviceAccountKey = fs.readFileSync(filePath, 'utf8');
                serviceAccount = JSON.parse(serviceAccountKey);
                break;
              } catch (fileError) {
                console.error(`Error reading service account file at ${filePath}:`, fileError);
              }
            }
          }
        }

        if (!serviceAccount) {
          console.error('No Firebase service account credentials found (checked FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 and lib/firebaseGPIConnectAdmin.json)');
          return null;
        }

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
      }
      
      adminAuth = admin.auth();
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      return null;
    }
  }
  return adminAuth;
}

async function verifyFirebaseToken(idToken: string): Promise<any> {
  try {
    const admin = await initializeFirebaseAdmin();
    if (!admin) {
      console.log('Firebase Admin not available, token verification failed');
      return null;
    }
    
    const decodedToken = await admin.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    let firebaseUser = null;
    let adminUser = null;

    // Check for Firebase authentication first
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.substring(7);
      firebaseUser = await verifyFirebaseToken(idToken);
      
      if (!firebaseUser) {
        console.log('Firebase token verification failed');
      }
    }

    // If no Firebase user, check for admin authentication
    if (!firebaseUser) {
      adminUser = await getCurrentUser();
    }

    // Must have either Firebase user or admin user
    if (!firebaseUser && !adminUser?.email) {
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
    const { to, subject, html, recipientName } = body;

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
    const senderName = firebaseUser?.name || firebaseUser?.email || adminUser?.name || adminUser?.email;
    const senderEmail = firebaseUser?.email || adminUser?.email;

    // Send email
    const { data, error } = await sendEmail({
      from: process.env.FROM_EMAIL!,
      senderName: senderName ? `${senderName} (via GPI Connect)` : "GPI Connect",
      to: [to],
      subject: subject,
      html: getActivityEmailTemplate({
        senderName: senderName || "GPI Connect Member",
        senderEmail: senderEmail || undefined,
        recipientName: recipientName || undefined,
        subject,
        htmlBody: html,
      }),
    });

    if (error) {
      console.error("Email sending error:", error);
      
      // Log failed email to database
      try {
        await prisma.emailLog.create({
          data: {
            recipientEmail: to,
            recipientName: recipientName || null,
            subject,
            body: html,
            senderEmail: senderEmail || 'unknown',
            senderName: senderName || null,
            senderType: firebaseUser ? 'firebase' : 'admin',
            status: 'failed',
            emailId: null,
          },
        });
      } catch (dbError) {
        console.error("Failed to log email to database:", dbError);
      }
      
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

    // Log successful email to database
    try {
      await prisma.emailLog.create({
        data: {
          recipientEmail: to,
          recipientName: recipientName || null,
          subject,
          body: html,
          senderEmail: senderEmail || 'unknown',
          senderName: senderName || null,
          senderType: firebaseUser ? 'firebase' : 'admin',
          status: 'sent',
          emailId: data?.id || null,
        },
      });
    } catch (dbError) {
      console.error("Failed to log email to database:", dbError);
      // Don't fail the request if logging fails
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
