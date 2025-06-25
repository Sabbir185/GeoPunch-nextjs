import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verify";
import { logEvent } from "@/utils/sentry";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user || user?.role !== "ADMIN") {
      logEvent(
        "Unauthorized access",
        "auth",
        { user: "unauthorized" },
        "warning"
      );
      return NextResponse.json(
        { status: 401, error: true, msg: "Unauthorized access" },
        { status: 401 }
      );
    }
    const data = await req.json();
    const setting = await prisma.setting.create({
      data,
    });
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Setting created successfully",
        data: setting,
      },
      { status: 200 }
    );
  } catch (error) {
    logEvent("Failed to create setting", "setting", { error }, "error", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to create setting" },
      { status: 500 }
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
        { user: "unauthorized" },
        "warning"
      );
      return NextResponse.json(
        { status: 401, error: true, msg: "Unauthorized access" },
        { status: 401 }
      );
    }
    const data = await req.json();
    const { id, ...updateData } = data;
    if (!id) {
      return NextResponse.json(
        { status: 400, error: true, msg: "ID is required for update." },
        { status: 400 }
      );
    }
    const setting = await prisma.setting.update({
      where: { id },
      data: updateData,
    });
    if (!setting) {
      return NextResponse.json(
        { status: 404, error: true, msg: "Settings data not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Setting updated successfully",
        data: setting,
      },
      { status: 200 }
    );
  } catch (error) {
    logEvent("Failed to update setting", "setting", { error }, "error", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to update, please try again." },
      { status: 500 }
    );
  }
}
