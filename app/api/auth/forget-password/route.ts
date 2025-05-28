import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { generateOTP } from "@/utils/common";
import { NextRequest, NextResponse } from "next/server";

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
      subject: "GPS Attendance - Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">GPS Attendance System</h2>
          <p>Your One-Time Password (OTP) for verification is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #2563eb; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="color: #666;">This OTP will expire in 5 minutes.</p>
          <p style="color: #666;">If you didn't request this OTP, please ignore this email.</p>
        </div>
      `,
    });
    if (error) {
      console.error("Resend error:", error);
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
