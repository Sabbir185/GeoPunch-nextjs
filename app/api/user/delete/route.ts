import {NextRequest, NextResponse} from "next/server";
import {verifyAuth} from "@/lib/verify";
import {logEvent} from "@/utils/sentry";
import {prisma} from "@/lib/prisma";

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
        const data = await prisma.user.update({
            where: {id: Number(id)},
            data: {
                isDeleted: true,
            }
        });
        return NextResponse.json(
            {
                status: 200,
                error: false,
                msg: "User deleted successfully",
                data: data,
            },
            {status: 200}
        );
    } catch (error) {
        logEvent("Failed to delete user", "setting", {error}, "error", error);
        return NextResponse.json(
            {status: 500, error: true, msg: "Failed to delete user data"},
            {status: 500}
        );
    }
}
