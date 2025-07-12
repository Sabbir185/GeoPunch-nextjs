import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {verifyAuth} from "@/lib/verify";
import {logEvent} from "@/utils/sentry";
import {updateActivityLogSchema} from "@/schemas/activityLog.schema";

export async function PATCH(req: NextRequest) {
    try {
        const userInfo = await verifyAuth(req);
        if (!userInfo) {
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
        const body = await req.json();
        const validation = updateActivityLogSchema.safeParse(body);
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

        const {id, userId, checkedOutTime, checkedOutPlace} = validation.data;

        const location = await prisma.location.findFirst({
            where: {
                id: userInfo.locationId as number,
            },
        });
        if (!location) {
            return NextResponse.json(
                {status: 404, error: true, msg: "Location not found"},
                {status: 404}
            );
        }

        // Calculate distance using Haversine formula
        const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
            const R = 6371e3; // Earth's radius in meters
            const φ1 = lat1 * Math.PI / 180;
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lng2 - lng1) * Math.PI / 180;

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c; // Distance in meters
        };

        const distance = calculateDistance(checkedOutPlace?.position?.lat, checkedOutPlace?.position?.lng, location.lat, location.lng);

        if (distance > location.maxRadius) {
            return NextResponse.json(
                {status: 403, error: true, msg: "You are outside the allowed location radius"},
                {status: 403}
            );
        }

        const activityLog = await prisma.activityLog.update({
            where: {id},
            data: {
                userId: userInfo.id,
                action: "Checked-Out" as string,
                checkedOutPlace,
                checkedOutTime,
            },
        })

        await prisma.user.update({
            where: {id: userInfo.id},
            data: {
                lastActivity: new Date(),
                activityStatus: "Checked-Out" as string,
            },
        })

        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Checked-Out successful",
                data: activityLog
            },
            {status: 200}
        );
    } catch (err) {
        console.error("check-out error: ", err);
        if (err instanceof Error) {
            return NextResponse.json(
                {
                    status: 500,
                    error: true,
                    msg: "Failed to check-out. Please try again later.",
                },
                {status: 500}
            );
        }
    }
}
