import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verify";
import { UpdateUserProfileSchema } from "@/schemas/user.schema";
import { logEvent } from "@/utils/sentry";
import { NextRequest, NextResponse } from "next/server";

// get profile
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
      { status: 200, error: false, data: { ...user, fcm_token: undefined } },
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

// update profile
export async function PATCH(request: NextRequest) {
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
    const body = await request.json();
    // validate zod
    const validation = UpdateUserProfileSchema.safeParse(body);
    if (!validation.success) {
      logEvent(
        "Profile update validation failed",
        "profile",
        { errors: validation.error.errors },
        "warning"
      );
      return NextResponse.json(
        {
          status: 400,
          error: true,
          msg: "Invalid input data",
          errors: validation.error.errors,
        },
        { status: 400 }
      );
    }
    // update db
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: body,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        address: true,
        department: true,
        designation: true,
        position: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(
      {
        status: 200,
        error: false,
        msg: "Profile updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    logEvent("Profile update failed", "profile", { error }, "error", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to update profile" },
      { status: 500 }
    );
  }
}

// delete account
export async function DELETE(request: NextRequest) {
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
    // delete user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(
      { status: 200, error: false, msg: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    logEvent("Account deletion failed", "profile", { error }, "error", error);
    return NextResponse.json(
      { status: 500, error: true, msg: "Failed to delete account" },
      { status: 500 }
    );
  }
}
