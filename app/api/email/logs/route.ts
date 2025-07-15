import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const user = await verifyAuth(request);
    console.log({ user });

    if (!user) {
      return NextResponse.json(
        { status: 401, error: true, msg: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // Build search conditions
    const whereConditions: Prisma.EmailLogWhereInput = search
      ? {
          OR: [
            {
              recipientEmail: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              recipientName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              subject: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
            {
              senderEmail: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              senderName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    // Get email logs with pagination
    const [emailLogs, totalCount] = await Promise.all([
      prisma.emailLog.findMany({
        where: whereConditions,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.emailLog.count({
        where: whereConditions,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const response: any = {
      status: 200,
      error: false,
      msg: "Email logs retrieved successfully",
      data: {
        docs: emailLogs,
        totalDocs: totalCount,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      },
    };

    // Add pagination metadata for compatibility
    response.data.pagination = {
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      hasNext: page < Math.ceil(totalCount / limit),
      hasPrev: page > 1,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching email logs:", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Internal server error" },
      { status: 500 }
    );
  }
}
