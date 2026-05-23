# Supabase Setup Guide (LifeOS)

This guide covers creating and wiring Supabase for the LifeOS Phase 9 backend foundation.

## 1) Create a Supabase project
1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New project**.
3. Choose your organization.
4. Enter:
   - **Project name** (e.g., `lifeos-prod` or `lifeos-dev`)
   - **Database password** (store this securely)
   - **Region** closest to your users
5. Click **Create new project** and wait for provisioning.

---

## 2) Find the project URL
1. Open your Supabase project dashboard.
2. Go to **Project Settings → API**.
3. Copy **Project URL**.
4. Use it as:
   - `NEXT_PUBLIC_SUPABASE_URL`

---

## 3) Find the anon key
1. In **Project Settings → API**.
2. Copy **anon public** key.
3. Use it as:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 4) Find the service role key (server-only)
1. In **Project Settings → API**.
2. Copy **service_role** key.
3. Use it as:
   - `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ **Security warning:** Never expose `SUPABASE_SERVICE_ROLE_KEY` in client/browser code. It must only be used on trusted server-side code.

---

## 5) Add env vars locally
In your local project root, create `.env.local` (do not commit):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Then restart the dev server.

---

## 6) Add env vars on Vercel
1. Open your Vercel project.
2. Go to **Settings → Environment Variables**.
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Apply to required environments (Preview/Production/Development).
5. Redeploy.

---

## 7) Add env vars on Netlify
1. Open your Netlify site.
2. Go to **Site configuration → Environment variables**.
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Trigger a new deploy.

---

## 8) Run the migration SQL
LifeOS schema migration file:
- `supabase/migrations/001_lifeos_core_schema.sql`

### Option A: Supabase SQL Editor
1. Go to **SQL Editor** in Supabase dashboard.
2. Open `supabase/migrations/001_lifeos_core_schema.sql` from repo and paste.
3. Run the query.
4. Verify tables were created under **Table Editor**.

### Option B: Supabase CLI (optional)
If your environment supports Supabase CLI, run migrations through CLI workflow.

---

## 9) Enable Email Auth
1. In Supabase dashboard, go to **Authentication → Providers**.
2. Enable **Email** provider.
3. Configure:
   - Allow signups (as desired)
   - Email confirmations (recommended for production)
4. Save changes.

---

## 10) Create a test user
### Option A: Through LifeOS UI
1. Start app.
2. Open `/signup`.
3. Create user with test email/password.
4. Confirm email if email confirmation is enabled.

### Option B: Supabase Dashboard
1. Go to **Authentication → Users**.
2. Click **Add user**.
3. Enter test email/password.

---

## 11) Common troubleshooting

### “Supabase not configured” message in app
- Check env var names exactly match:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Restart app after env changes.

### Build warns module not found for `@supabase/supabase-js`
- Install dependencies in deploy/local environment where registry access is allowed.
- Current code includes safe runtime fallback messaging when package/env is unavailable.

### Login/Signup not working
- Verify Email provider is enabled in Supabase Auth.
- Confirm project URL and anon key are correct.
- Check browser devtools/network for auth error message.

### Migration errors
- Ensure you run migration in the same target Supabase project.
- Re-run only missing sections carefully (avoid duplicating constraints/policies).

### Redirect loop between `/login` and app routes
- Clear browser cookies for site and retry.
- Verify auth cookie behavior and middleware expectations.

---

## 12) Security checklist
- Never commit real keys to git.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client bundles.
- Use service role key only in trusted server-side paths.
- Rotate compromised keys immediately in Supabase dashboard.
