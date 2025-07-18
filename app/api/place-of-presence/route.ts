import {prisma} from "@/lib/prisma";
import {verifyAuth} from "@/lib/verify";
import {logEvent} from "@/utils/sentry";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await verifyAuth(req);
        const permissions = ["ADMIN", "USER"];
        if (!user || !permissions.includes(user?.role)) {
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
        const {name, type} = await req.json();
        const location = await prisma.currentPlace.create({
            data: {
                name,
                type
            },
        });
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Place created successfully",
                data: location,
            },
            {status: 200}
        );
    } catch (error) {
        console.log({error});
        logEvent(
            "Failed to create place of presence",
            "location",
            {error},
            "error",
            error
        );
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to create place of presence"},
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
        const {name, id, type} = await req.json();
        const location = await prisma.currentPlace.update({
            where: {id},
            data: {
                name,
                type
            },
        });
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Place updated successfully",
                data: location,
            },
            {status: 200}
        );
    } catch (error) {
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

export async function GET(req: NextRequest) {
    try {
        const user = await verifyAuth(req);
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
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
        if (id) {
            data = await prisma.currentPlace.findFirst({
                where: {id: Number(id)},
            });
        } else {
            data = await prisma.currentPlace.findMany();
        }
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
                data: data,
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

export async function DELETE(req: NextRequest) {
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
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json(
                {status: 400, error: true, msg: "Missing id parameter"},
                {status: 400}
            );
        }
        const data = await prisma.currentPlace.delete({
            where: {id: Number(id)},
        });
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "Place deleted successfully",
                data: undefined,
            },
            {status: 200}
        );
    } catch (error) {
        logEvent("Failed to delete place of presence", "setting", {error}, "error", error);
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to delete place of presence'"},
            {status: 500}
        );
    }
}
