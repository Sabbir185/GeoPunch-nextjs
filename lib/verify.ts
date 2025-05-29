import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";

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
        },
      });
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in verifyAuth", error);
    return false;
  }
};
