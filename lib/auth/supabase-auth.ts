import { getSupabaseBrowserClientOrError } from "@/lib/supabase/client";

export async function signInWithEmailPassword(email: string, password: string) {
  const { client, error } = await getSupabaseBrowserClientOrError();
  if (!client) return { success: false as const, error: error ?? "Supabase not configured." };

  const { data, error: signInError } = await client.auth.signInWithPassword({ email, password });
  if (signInError) return { success: false as const, error: signInError.message };

  return { success: !!data.session, error: data.session ? null : "No session returned." };
}

export async function signUpWithEmailPassword(email: string, password: string, fullName?: string) {
  const { client, error } = await getSupabaseBrowserClientOrError();
  if (!client) return { success: false as const, error: error ?? "Supabase not configured." };

  const { data, error: signUpError } = await client.auth.signUp({
    email,
    password,
    options: { data: fullName ? { full_name: fullName } : undefined },
  });

  if (signUpError) return { success: false as const, error: signUpError.message };

  return {
    success: true as const,
    hasSession: !!data.session,
    requiresEmailConfirmation: !data.session,
    error: null,
  };
}

export async function signOutFromSupabase() {
  const { client } = await getSupabaseBrowserClientOrError();
  if (!client) return;
  await client.auth.signOut();
}
