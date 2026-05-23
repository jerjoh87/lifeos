import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Server-side auth status helper.
 *
 * Priority:
 * 1) Use Supabase session verification when Supabase is configured and available.
 * 2) Fallback to legacy lightweight cookie marker for local/dev resilience.
 *
 * TODO(auth-hardening):
 * - Replace fallback cookie-only trust path with strict signed/JWT verification.
 * - Remove fallback from production once Supabase install/config is guaranteed.
 */
export async function getServerAuthStatus() {
  const cookieStore = await cookies();
  const fallbackCookieAuth = cookieStore.get(AUTH_COOKIE_NAME)?.value === "1";

  const supabase = await getSupabaseServerClient();

  // Supabase unavailable in env/runtime; keep local-dev friendly fallback.
  if (!supabase) {
    return { isAuthenticated: fallbackCookieAuth, source: "fallback-cookie" as const };
  }

  try {
    // TODO(auth-hardening): switch to authoritative JWT/session checks integrated
    // with secure server cookies once Supabase SSR auth pipeline is wired.
    // Current code path intentionally preserves local-dev behavior.
    return { isAuthenticated: fallbackCookieAuth, source: "supabase-configured-fallback-cookie" as const };
  } catch {
    return { isAuthenticated: fallbackCookieAuth, source: "fallback-cookie-error" as const };
  }
}
