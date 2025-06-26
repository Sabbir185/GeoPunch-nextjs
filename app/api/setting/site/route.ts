import { prisma } from "@/lib/prisma";
import { logEvent } from "@/utils/sentry";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.setting.findFirst({
      select: {
        site_name: true,
        site_email: true,
        site_address: true,
        site_footer: true,
        site_phone: true,
        site_logo: true,
      },
    });
    if (!data) {
      return NextResponse.json(
        { status: 404, error: true, msg: "Settings data not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Setting retrieved successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    logEvent(
      "Failed to retrieve setting",
      "setting",
      { error },
      "error",
      error
    );
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to retrieve setting data" },
      { status: 500 }
    );
  }
}
