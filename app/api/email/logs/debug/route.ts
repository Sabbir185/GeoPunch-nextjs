import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        { status: 401, error: true, msg: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Get debug information about email logs
    const totalLogs = await prisma.emailLog.count();
    const recentLogs = await prisma.emailLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        recipientEmail: true,
        subject: true,
        status: true,
        createdAt: true,
        senderType: true,
      }
    });

    return NextResponse.json({
      status: 200,
      error: false,
      data: {
        totalLogs,
        recentLogs,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error("Error fetching email logs debug info:", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Internal server error" },
      { status: 500 }
    );
  }
}