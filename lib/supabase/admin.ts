export type AdminSupabaseClient = {
  auth: {
    signOut(): Promise<void>;
  };
};

export async function getSupabaseAdminClient(): Promise<AdminSupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !service) return null;

  try {
    const pkg = await import("@supabase/supabase-js");
    return pkg.createClient(url, service, {
      auth: { persistSession: false, autoRefreshToken: false },
    }) as AdminSupabaseClient;
  } catch {
    return null;
  }
}

export async function getSupabaseAdminClientOrError() {
  const client = await getSupabaseAdminClient();
  if (!client) {
    return { client: null, error: "Supabase admin not configured. Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY." };
  }
  return { client, error: null };
}
