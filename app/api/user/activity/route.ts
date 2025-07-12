import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {logEvent} from "@/utils/sentry";

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        let data;
        let total = 0;

        if (id) {
            data = await prisma.user.findFirst({
                where: {id: Number(id)},
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
                    activityStatus: true,
                    lastActivity: true,
                },
            });
        } else {
            const skip = (page - 1) * limit;

            // Build search conditions
            const searchConditions = search ? {
                OR: [
                    {name: {contains: search, mode: 'insensitive'}},
                    {email: {contains: search, mode: 'insensitive'}},
                    {phone: {contains: search, mode: 'insensitive'}}
                ]
            } : {};

            const whereClause = {
                role: {not: "ADMIN"},
                isDeleted: false,
                ...searchConditions
            };

            [data, total] = await Promise.all([
                prisma.user.findMany({
                    where: whereClause as object,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        department: true,
                        designation: true,
                        image: true,
                        activityStatus: true,
                        lastActivity: true,
                        activityId: true,
                        status: true,
                        activityPlace: true,
                    },
                    orderBy: {lastActivity: "desc"},
                    skip,
                    take: limit,
                }),
                prisma.user.count({where: whereClause as object})
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
            data: id ? data : {docs: data},
        };

        // Add pagination metadata for list requests
        if (!id) {
            response.data.pagination = {
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
