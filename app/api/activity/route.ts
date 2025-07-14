import {NextRequest, NextResponse} from "next/server";
import {logEvent} from "@/utils/sentry";
import {prisma} from "@/lib/prisma";
import {verifyAuth} from "@/lib/verify";

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const year = searchParams.get("year");
        const month = searchParams.get("month");
        const user = await verifyAuth(req);
        if (!user || user?.role !== "USER") {
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
        const data = await prisma.activityLog.findMany({
            where: {
                userId: user.id,
                ...(year && month && {
                    checkedInTime: {
                        gte: new Date(parseInt(year), parseInt(month) - 1, 1),
                        lt: new Date(parseInt(year), parseInt(month), 1)
                    }
                })
            },
            orderBy: {createdAt: "desc"}
        });
        if (!data) {
            return NextResponse.json(
                {status: 404, error: true, msg: "Data not found!"},
                {status: 404}
            );
        }
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Data retrieved successfully",
                data: data,
            },
            {status: 200}
        );
    } catch (error) {
        logEvent(
            "Failed to retrieve data",
            "setting",
            {error},
            "error",
            error
        );
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to retrieve data"},
            {status: 500}
        );
    }
}
