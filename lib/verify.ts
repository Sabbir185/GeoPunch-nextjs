import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";
import { logEvent } from "@/utils/sentry";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export const verifyAuth = async (req: NextRequest) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token) {
      const { payload } = await jwtVerify(token, secret);
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email as string,
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          address: true,
          phone: true,
          department: true,
          designation: true,
          isDeleted: true,
          status: true,
          position: true,
          fcm_token: true,
          password: false,
        },
      });
      return user;
    } else {
      logEvent("Invalid token", "auth", { token: "invalid" }, "warning");
      return false;
    }
  } catch (error) {
    logEvent("Error in verifyAuth", "auth", { error }, "error", error);
    return false;
  }
};
