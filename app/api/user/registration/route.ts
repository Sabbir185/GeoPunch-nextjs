import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {RegisterUserSchema} from "@/schemas/user.schema";
import {sendEmail} from "@/lib/brevo";
import {getWelcomeEmailTemplate} from "@/lib/email-templates";
import {verifyAuth} from "@/lib/verify";
import {logEvent} from "@/utils/sentry";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = RegisterUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    status: 400,
                    error: true,
                    msg: "Invalid input data, please check the fields.",
                    errors: validation.error.errors,
                },
                {status: 400}
            );
        }
        const {
            name,
            email,
            phone,
            password,
            department,
            designation,
            image,
            locationId,
        } = validation.data;
        // check user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{email: email.toLowerCase().trim()}, {phone: phone.trim()}],
            },
        });
        if (existingUser) {
            return NextResponse.json(
                {status: 400, error: true, msg: "User already exists"},
                {status: 400}
            );
        }
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
                image,
                locationId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                department: true,
                designation: true,
                image: true,
                locationId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        await sendEmail({
            from: process.env.FROM_EMAIL!,
            to: [email.toLowerCase().trim()],
            subject: "Welcome to GPI Connect - Account Activation",
            html: getWelcomeEmailTemplate({
                name,
                email: email.toLowerCase().trim(),
                password,
            }),
        });
        return NextResponse.json(
            {status: 200, error: false, msg: "Signup successful", data: user},
            {status: 200}
        );
    } catch (error) {
        console.error("Signup API error:", error);
        return NextResponse.json(
            {
                status: 500,
                error: true,
                msg: "Failed to create user. Please try later.",
            },
            {status: 500}
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const user = await verifyAuth(req);
        if (!user || user?.role !== "ADMIN") {
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
        const {
            id,
            name,
            email,
            phone,
            image,
            designation,
            department,
            locationId,
            password,
            status
        } = await req.json();
        const data = {
            name,
            email,
            phone,
            image,
            designation,
            department,
            locationId,
            password: password ? await bcrypt.hash(password, 10) : undefined,
            status: status,
        }
        const updatedUser = await prisma.user.update({
            where: {id},
            data,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                department: true,
                designation: true,
                image: true,
                locationId: true,
                createdAt: true,
                updatedAt: true,
                status: true
            },
        });
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "User updated successfully",
                data: updatedUser,
            },
            {status: 200}
        );
    } catch (error) {
        logEvent(
            "Failed to update user",
            "location",
            {error},
            "error",
            error
        );
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to update user"},
            {status: 500}
        );
    }
}
