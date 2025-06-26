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
    const { name, address, lat, lng, image, maxRadius } = await req.json();
    const point = `POINT(${lng} ${lat})`;
    const location = await prisma.location.create({
      data: {
        name,
        address,
        position: point,
        image,
        maxRadius,
      },
    });
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Location created successfully",
        data: location,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    logEvent(
      "Failed to create location",
      "location",
      { error },
      "error",
      error
    );
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to create location" },
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
    const { name, address, lat, lng, image, id, isDeleted, maxRadius } =
      await req.json();
    const point = lat && lng ? `POINT(${lng} ${lat})` : undefined;
    const data: Record<string, unknown> = {
      name,
      address,
      image,
      isDeleted,
      maxRadius,
    };
    if (point) data.position = point;
    const location = await prisma.location.update({
      where: { id },
      data,
    });
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Location updated successfully",
        data: location,
      },
      { status: 200 }
    );
  } catch (error) {
    logEvent(
      "Failed to update location",
      "location",
      { error },
      "error",
      error
    );
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to update location" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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
    const data = await prisma.location.findMany();
    if (!data) {
      return NextResponse.json(
        { status: 404, error: true, msg: "Locaions data not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Location retrieved successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    logEvent(
      "Failed to retrieve location",
      "setting",
      { error },
      "error",
      error
    );
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to retrieve location data" },
      { status: 500 }
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
        { user: "unauthorized" },
        "warning"
      );
      return NextResponse.json(
        { status: 401, error: true, msg: "Unauthorized access" },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { status: 400, error: true, msg: "Missing id parameter" },
        { status: 400 }
      );
    }
    const data = await prisma.location.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Location deleted successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    logEvent("Failed to delete location", "setting", { error }, "error", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to delete location data" },
      { status: 500 }
    );
  }
}
