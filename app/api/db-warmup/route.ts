import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory timestamp to check if database was verified recently.
// Neon serverless suspends after 5 minutes of inactivity.
// If active within the last 4 minutes (240s), we know it is already connected and warm.
let lastActiveTimestamp = 0;
const WARM_THRESHOLD_MS = 4 * 60 * 1000; // 4 minutes

export async function GET() {
  const now = Date.now();

  // 1. First check: Is the database already known to be active?
  if (now - lastActiveTimestamp < WARM_THRESHOLD_MS) {
    return NextResponse.json(
      {
        status: "already_connected",
        message: "Database is already active and connected.",
        cached: true,
        lastVerified: new Date(lastActiveTimestamp).toISOString(),
      },
      { status: 200 }
    );
  }

  // 2. Wakeup / Probe: If older than 4 mins or cold start, verify and wake up
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1 as alive`;
    lastActiveTimestamp = Date.now();
    const durationMs = Date.now() - startTime;

    return NextResponse.json(
      {
        status: "connected",
        message: "Database connection verified and warm.",
        durationMs,
        wasSleeping: durationMs > 1000,
        lastVerified: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Database warmup check error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database check failed",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
