import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {cookieAge, cookieName, signAuthToken} from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        //check auth
        const {id, email, lat, lng} = await req.json();
        if (!email || !lat || !lng) {
            return NextResponse.json(
                {status: 400, error: true, msg: "Please input the valid information"},
                {status: 400}
            );
        }
        const user = await prisma.user.findUnique({
            where: {email},
        });
        if (!user) {
            return NextResponse.json(
                {status: 404, error: true, msg: "User not found"},
                {status: 404}
            );
        }

        // check location
        if (!user.locationId) {
            return NextResponse.json(
                {status: 400, error: true, msg: "User location not configured"},
                {status: 400}
            );
        }

        if (!lat || !lng) {
            return NextResponse.json(
                {status: 400, error: true, msg: "Location coordinates are required for mobile login"},
                {status: 400}
            );
        }

        const location = await prisma.location.findFirst({
            where: {
                id: user.locationId,
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

        const distance = calculateDistance(lat, lng, location.lat, location.lng);

        if (distance > location.maxRadius) {
            return NextResponse.json(
                {status: 403, error: true, msg: "You are outside the allowed location radius"},
                {status: 403}
            );
        }
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Login successful",
                data: {}
            },
            {status: 200}
        );
    } catch (err) {
        console.error("Login check-in error: ", err);
        if (err instanceof Error) {
            return NextResponse.json(
                {
                    status: 500,
                    error: true,
                    msg: "Failed to check-in. Please try again later.",
                },
                {status: 500}
            );
        }
    }
}
