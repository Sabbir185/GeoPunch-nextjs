import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { cookieAge, cookieName, signAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { status: 400, error: true, msg: "Email and password are required" },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { status: 400, error: true, msg: "Invalid email format" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { status: 404, error: true, msg: "User not found" },
        { status: 404 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 401, error: true, msg: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = await signAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const response = NextResponse.json(
      { status: 200, error: false, msg: "Login successful" },
      { status: 200 }
    );
    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: cookieAge,
    });
    return response;
  } catch (err) {
    console.error("Login error:", err);
    if (err instanceof Error) {
      return NextResponse.json(
        {
          status: 500,
          error: true,
          msg: "Failed to login. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
