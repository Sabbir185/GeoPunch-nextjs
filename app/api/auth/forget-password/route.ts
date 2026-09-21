import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/brevo";
import { generateOTP } from "@/utils/common";
import { NextRequest, NextResponse } from "next/server";
import { getOtpEmailTemplate } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action } = body;
    if (!email || !email.includes("@") || !action) {
      return NextResponse.json(
        { status: 400, error: true, msg: "Valid email is required" },
        { status: 400 }
      );
    }
    const otp = generateOTP();
    await prisma.otp.create({
      data: {
        email: email.toLowerCase().trim(),
        otp,
        action,
      },
    });
    const { data, error } = await sendEmail({
      from: process.env.FROM_EMAIL!,
      to: [email],
      subject: "GPI Connect - Password Reset OTP Code",
      html: getOtpEmailTemplate({
        otp,
        action: "Password Reset",
      }),
    });
    if (error) {
      console.error("Brevo email error:", error);
      return NextResponse.json(
        { status: 500, error: true, msg: "Failed to send OTP email" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "OTP sent successfully",
        data: {
          emailId: data?.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP API error:", error);
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
