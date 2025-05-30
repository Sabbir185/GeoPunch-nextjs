import { verifyAuth } from "@/lib/verify";
import { logEvent } from "@/utils/sentry";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
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
    return NextResponse.json(
      { status: 200, error: false, data: user },
      { status: 200 }
    );
  } catch (error) {
    logEvent("Authentication failed", "auth", { error }, "error", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
