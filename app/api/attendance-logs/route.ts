import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify";
import { logEvent } from "@/utils/sentry";

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

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

    let data;
    let total = 0;

    if (id) {
      data = await prisma.activityLog.findFirst({
        where: { id: Number(id) },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              department: true,
              designation: true,
              image: true,
            },
          },
        },
      });
    } else {
      const skip = (page - 1) * limit;

      // Build where clause with proper typing
      const whereClause: any = {
        user: {
          role: { not: "ADMIN" },
          isDeleted: false,
        },
      };

      // Add search conditions if search parameter exists
      if (search) {
        whereClause.user.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
        ];
      }

      [data, total] = await Promise.all([
        prisma.activityLog.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                department: true,
                designation: true,
                image: true,
              },
            },
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.activityLog.count({ where: whereClause }),
      ]);
    }

    if (!data) {
      return NextResponse.json(
        { status: 404, error: true, msg: "Attendance data not found!" },
        { status: 404 }
      );
    }

    const response: any = {
      status: 200,
      error: false,
      msg: "Attendance data retrieved successfully",
      data: id ? data : { docs: data },
    };

    // Add pagination metadata for list requests
    if (!id) {
      response.data.pagination = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      };
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    logEvent(
      "Failed to retrieve attendance data",
      "attendance-logs",
      { error },
      "error",
      error
    );
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to retrieve attendance data" },
      { status: 500 }
    );
  }
}
