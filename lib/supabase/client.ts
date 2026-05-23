export type BrowserSupabaseClient = {
  auth: {
    signInWithPassword(args: { email: string; password: string }): Promise<{ data: { session: unknown | null }; error: { message: string } | null }>;
    signUp(args: { email: string; password: string; options?: { data?: Record<string, unknown> } }): Promise<{ data: { session: unknown | null }; error: { message: string } | null }>;
    signOut(): Promise<void>;
  };
};

let cached: BrowserSupabaseClient | null = null;

export async function getSupabaseBrowserClient(): Promise<BrowserSupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) return null;
  if (cached) return cached;

  try {
    const pkg = await import("@supabase/supabase-js");
    cached = pkg.createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true },
    }) as BrowserSupabaseClient;
    return cached;
  } catch {
    return null;
  }
}

export async function getSupabaseBrowserClientOrError() {
  const client = await getSupabaseBrowserClient();
  if (!client) {
    return { client: null, error: "Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (and install @supabase/supabase-js)." };
  }
  return { client, error: null };
}
