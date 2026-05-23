declare module "@supabase/supabase-js" {
  export type SupabaseClient = {
    auth: {
      signInWithPassword(args: { email: string; password: string }): Promise<{ data: { session: unknown | null }; error: { message: string } | null }>;
      signUp(args: { email: string; password: string; options?: { data?: Record<string, unknown> } }): Promise<{ data: { session: unknown | null }; error: { message: string } | null }>;
      signOut(): Promise<void>;
    };
  };

  export function createClient(url: string, key: string, options?: Record<string, unknown>): SupabaseClient;
}
