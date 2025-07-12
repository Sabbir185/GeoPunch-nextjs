import {NextRequest, NextResponse} from "next/server";
import {verifyAuth} from "@/lib/verify";
import {logEvent} from "@/utils/sentry";
import {prisma} from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
    try {
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
        const {activityId} = await req.json();
        const activity = await prisma.currentPlace.findUnique({where: {id: activityId}});
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                activityId,
                activityPlace: activity?.name,
            },
        });
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Place updated successfully",
                data: undefined,
            },
            {status: 200}
        );
    } catch (error) {
        console.log({error});
        logEvent(
            "Failed to update place of presence",
            "location",
            {error},
            "error",
            error
        );
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to update place of presence"},
            {status: 500}
        );
    }
}
