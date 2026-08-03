import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check if the cookie exists.
  // (We don't verify the signature here; we just check if they have a token at all)
  const sid = request.cookies.get("sid")?.value;

  // 2. Identify the paths
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // 3. If they try to access the dashboard WITHOUT a token, kick them to login
  if (isProtectedRoute && !sid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. If they try to access login/signup WITH a token, push them to the dashboard
  if (isAuthPage && sid) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 5. Otherwise, let them proceed normally
  return NextResponse.next();
}

// 6. Tell Next.js exactly which routes this middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
