import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {verifyAuth} from "@/lib/verify";
import {logEvent} from "@/utils/sentry";

export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth(req);
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

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

        let data;
        let total = 0;

        if (id) {
            data = await prisma.user.findFirst({
                where: {id: Number(id)},
            });
        } else {
            const skip = (page - 1) * limit;

            [data, total] = await Promise.all([
                prisma.user.findMany({
                    where: { role : { not: "ADMIN" }, isDeleted: false },
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
                        isDeleted: true,
                        status: true,
                    },
                    skip,
                    take: limit,
                }),
                prisma.user.count({where: { role : { not: "ADMIN" } },})
            ]);
        }

        if (!data) {
            return NextResponse.json(
                {status: 404, error: true, msg: "User data not found!"},
                {status: 404}
            );
        }

        const response: any = {
            status: 200,
            error: false,
            msg: "User data retrieved successfully",
            data: data,
        };

        // Add pagination metadata for list requests
        if (!id) {
            response.pagination = {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            };
        }

        return NextResponse.json(response, {status: 200});
    } catch (error) {
        logEvent(
            "Failed to retrieve user data",
            "users",
            {error},
            "error",
            error
        );
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to retrieve user data"},
            {status: 500}
        );
    }
}