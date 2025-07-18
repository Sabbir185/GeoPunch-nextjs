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
        const {
            latitude,
            longitude,
            address,
            timestamp,
            isAuto
        } = await req.json();

        console.log({latitude, longitude, address, timestamp, isAuto});

        await prisma.user.update({
            where: {id: user.id},
            data: {
                position: {
                    lat: latitude ? parseFloat(latitude) : undefined,
                    lng: longitude ? parseFloat(longitude) : undefined,
                    address,
                    timestamp: timestamp ? new Date(timestamp) : undefined,
                },
                isAuto
            }
        });
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Location updated successfully",
                data: undefined,
            },
            {status: 200}
        );
    } catch (error) {
        console.log({error});
        logEvent(
            "Failed to update location",
            "location",
            {error},
            "error",
            error
        );
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to update location"},
            {status: 500}
        );
    }
}