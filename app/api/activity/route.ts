import {NextRequest, NextResponse} from "next/server";
import {logEvent} from "@/utils/sentry";
import {prisma} from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const data = await prisma.activityLog.findMany({orderBy: {createdAt: "desc"}});
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
