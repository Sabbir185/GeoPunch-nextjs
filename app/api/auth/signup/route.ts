import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CreateUserWithOtpSchema } from "@/schemas/user.schema";
import { cookieAge, cookieName, signAuthToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = CreateUserWithOtpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          status: 400,
          error: true,
          msg: "Invalid input data",
          errors: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      password,
      otp,
      fcm_token,
      department,
      designation,
    } = validation.data;

    // check user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }],
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { status: 400, error: true, msg: "User already exists" },
        { status: 400 }
      );
    }

    // check if OTP is valid
    const optRecord = await prisma.otp.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        action: "signup",
      },
    });
    if (!optRecord || optRecord.otp !== otp) {
      return NextResponse.json(
        { status: 400, error: true, msg: "Invalid OTP" },
        { status: 400 }
      );
    }
    const dateNow = Date.now();
    const otpExpired = new Date(optRecord.expiresAt).getTime();
    if (dateNow > otpExpired) {
      return NextResponse.json(
        { status: 400, error: true, msg: "OTP expired" },
        { status: 400 }
      );
    }
    await prisma.otp.deleteMany({
      where: { email: email.toLowerCase().trim(), action: "signup" },
    });

    // create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        department,
        designation,
        password: hashedPassword,
        fcm_token,
      },
    });

    const token = await signAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const response = NextResponse.json(
      { status: 200, error: false, msg: "Signup successful" },
      { status: 200 }
    );
    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: cookieAge,
    });
    return response;
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      {
        status: 500,
        error: true,
        msg: "Failed to create user. Please try later.",
      },
      { status: 500 }
    );
  }
}
