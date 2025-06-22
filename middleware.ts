import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { updateSession } from "./utils/middleware";

// Block suspicious paths
const blockedPaths = [
  ".php",
  ".htm",
  ".html",
  "/wp-content/",
  "/cdn-cgi/phish-bypass",
  "/Digitalapps.signin.HTML",
  "/page/email.php",
  "/index.php",
  "/login.php",
  "/kLogin.php",
  "/index/user/register.html",
];

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(100, "1 m"),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isBlocked = blockedPaths.some((badPath) => pathname.includes(badPath));
  if (isBlocked) {
    return new NextResponse("Blocked", { status: 403 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "127.0.0.1";
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Rate limit exceeded", {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    });
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
