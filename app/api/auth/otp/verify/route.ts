import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {signAuthToken} from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body?.otp || !body?.email || !body?.action) {
            return NextResponse.json(
                {
                    status: 400,
                    error: true,
                    msg: "Invalid input data",
                },
                {status: 400}
            );
        }
        // check if OTP is valid
        const optRecord = await prisma.otp.findFirst({
            where: {
                email: body?.email.toLowerCase().trim(), action: body?.action, otp: body?.otp,
            },
        });
        if (!optRecord || optRecord.otp !== body?.otp) {
            return NextResponse.json(
                {status: 400, error: true, msg: "Invalid OTP! Please try again."},
                {status: 400}
            );
        }
        const dateNow = Date.now();
        const otpExpired = new Date(optRecord.expiresAt).getTime();
        if (dateNow > otpExpired) {
            await prisma.otp.deleteMany({
                where: {email: body?.email.toLowerCase().trim(), action: body?.action},
            });
            return NextResponse.json(
                {status: 400, error: true, msg: "OTP expired! Please try again."},
                {status: 400}
            );
        }
        const user = await prisma.user.findFirst({
            where: {
                email: body?.email.toLowerCase().trim(),
            },
        });
        if (!user) {
            return NextResponse.json(
                {status: 404, error: true, msg: "User not found! Please register."},
                {status: 404}
            );
        }
        const token = await signAuthToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const response = NextResponse.json(
            {status: 200, error: false, msg: "OTP verification success", data: {accessToken: token}},
            {status: 200}
        );
        return response;
    } catch (error) {
        console.error("OTP verification API error:", error);
        return NextResponse.json(
            {
                status: 500,
                error: true,
                msg: "Failed to verify otp. Please try later.",
            },
            {status: 500}
        );
    }
}
