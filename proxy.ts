import { NextResponse, type NextRequest } from "next/server";
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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isBlocked = blockedPaths.some((badPath) => pathname.includes(badPath));
  if (isBlocked) {
    return new NextResponse("Blocked", { status: 403 });
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
