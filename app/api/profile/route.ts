import { verifyAuth } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    return NextResponse.json(
      { status: 200, error: false, data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
