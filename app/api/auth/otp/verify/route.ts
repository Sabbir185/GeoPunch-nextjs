import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {CreateUserWithOtpSchema} from "@/schemas/user.schema";

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
                {status: 400}
            );
        }
        // check if OTP is valid
        const optRecord = await prisma.otp.findFirst({
            where: {
                email: body?.email.toLowerCase().trim(), action: body?.action
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
        const response = NextResponse.json(
            {status: 200, error: false, msg: "OTP verification success"},
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
