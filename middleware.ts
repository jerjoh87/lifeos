import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";

/**
 * Middleware route gate.
 *
 * This currently uses a lightweight auth marker cookie (`lifeos_auth`) so local
 * development remains unblocked even when Supabase package/env is unavailable.
 *
 * TODO(auth-hardening): replace cookie marker trust with authoritative Supabase
 * JWT/session verification in middleware once SSR auth cookies are fully wired.
 */
const protectedPrefixes = [
  "/dashboard",
  "/assistant",
  "/planner",
  "/tasks",
  "/finance",
  "/automation",
  "/vault",
  "/settings",
  "/onboarding",
];

const authPages = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fallback gate only. See TODO above for production-hardening replacement.
  const hasSession = request.cookies.get(AUTH_COOKIE_NAME)?.value === "1";

  const isProtected = protectedPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isAuthPage = authPages.includes(pathname);

  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAuthPage && hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/assistant/:path*", "/planner/:path*", "/tasks/:path*", "/finance/:path*", "/automation/:path*", "/vault/:path*", "/settings/:path*", "/onboarding/:path*", "/login", "/signup"],
};
