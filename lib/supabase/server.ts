export type ServerSupabaseClient = {
  auth: {
    signOut(): Promise<void>;
  };
};

export async function getSupabaseServerClient(): Promise<ServerSupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  try {
    const pkg = await import("@supabase/supabase-js");
    return pkg.createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    }) as ServerSupabaseClient;
  } catch {
    return null;
  }
}

export async function getSupabaseServerClientOrError() {
  const client = await getSupabaseServerClient();
  if (!client) {
    return { client: null, error: "Supabase not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY." };
  }
  return { client, error: null };
}
