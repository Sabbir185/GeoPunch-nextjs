import { profileAction } from "@/app/actions/profile";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile"];

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request,
  });

  const { data: user } = await profileAction();

  const path = request.nextUrl.pathname;

  if (path === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && path.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}
