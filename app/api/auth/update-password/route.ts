import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {CreateUserWithOtpSchema} from "@/schemas/user.schema";
import {cookieAge, cookieName, signAuthToken} from "@/lib/auth";
import {verifyAuth} from "@/lib/verify";
import {logEvent} from "@/utils/sentry";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const user: any = await verifyAuth(request);
        if (!user?.email) {
            logEvent(
                "Unauthorized access",
                "auth",
                {user: "unauthorized"},
                "warning"
            );
            return NextResponse.json(
                {status: 401, error: true, msg: "Unauthorized access"},
                {status: 401}
            );
        }
        if (!body?.password || !body.confirmPassword) {
            return NextResponse.json(
                {
                    status: 400,
                    error: true,
                    msg: "Invalid password or confirm password",
                },
                {status: 400}
            );
        }
        if (body?.password !== body?.confirmPassword) {
            return NextResponse.json(
                {
                    status: 400,
                    error: true,
                    msg: "Password and confirm password do not match",
                },
                {status: 400}
            );
        }
        const {password} = body;
        await prisma.otp.deleteMany({
            where: {email: user.email.toLowerCase().trim(), action: "reset_password"},
        });
        // create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: {email: user.email},
            data: {
                password: hashedPassword,
            },
        });
        const response = NextResponse.json(
            {status: 200, error: false, msg: "Password updated successfully"},
            {status: 200}
        );
        return response;
    } catch (error) {
        console.error("Forgot password update API error:", error);
        return NextResponse.json(
            {
                status: 500,
                error: true,
                msg: "Failed to update the password. Please try later.",
            },
            {status: 500}
        );
    }
}
