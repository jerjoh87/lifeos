# LifeOS Auth Readiness (Pre-Data-Migration)

## Current Auth Strategy
LifeOS currently uses a hybrid auth gate strategy to avoid blocking local development while Supabase package access may be restricted in some environments.

1. **Primary intended backend**: Supabase Auth (email/password).
2. **Current runtime gate**: lightweight `lifeos_auth` cookie marker in middleware.
3. **Server helper added**: `lib/auth/server-session.ts` to centralize auth status checks and future Supabase session verification rollout.

---

## Why fallback exists
Some build environments can block package installation for `@supabase/supabase-js`. To keep local/dev flows functional, fallback cookie-gating remains active.

> This fallback is for development continuity and should not be final production auth security.

---

## Required production hardening (must-do)
1. Ensure `@supabase/supabase-js` is installed in deploy environment.
2. Replace middleware fallback-cookie trust with authoritative Supabase JWT/session verification.
3. Wire secure SSR auth cookies/tokens for middleware and server route validation.
4. Remove temporary type shim file:
   - `types/supabase-js.d.ts`
5. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only and never exposed to client bundles.

---

## Redirect safety status
- Unauthenticated users are redirected from protected routes to `/login`.
- Authenticated users are redirected away from `/login` and `/signup` to `/dashboard`.
- Fallback behavior remains local-dev safe when Supabase is not configured.

---

## Deferred work (intentionally not done yet)
- LocalStorage user data migration to Supabase tables.
- OpenAI integration changes.
- Stripe integration changes.

---

## TODO locations in code
- `middleware.ts` (cookie trust replacement comment)
- `lib/auth/server-session.ts` (Supabase authoritative verification TODO)
