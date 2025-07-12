import {NextRequest, NextResponse} from "next/server";
import {logEvent} from "@/utils/sentry";
import {prisma} from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const data = await prisma.currentPlace.findMany({});
        const grouped = data.reduce((acc: Record<string, typeof data>, item: any) => {
            if (!acc[item.type]) acc[item.type] = [];
            acc[item.type].push(item);
            return acc;
        }, {});

        if (!data) {
            return NextResponse.json(
                {status: 404, error: true, msg: "Place data not found!"},
                {status: 404}
            );
        }
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Place retrieved successfully",
                data: grouped,
            },
            {status: 200}
        );
    } catch (error) {
        logEvent(
            "Failed to retrieve place of presence",
            "setting",
            {error},
            "error",
            error
        );
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to retrieve place of presence"},
            {status: 500}
        );
    }
}
