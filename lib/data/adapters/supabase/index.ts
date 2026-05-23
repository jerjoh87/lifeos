import { LifeOSDataAdapters } from "@/lib/data/adapters/interfaces";
import { getSupabaseServerClientOrError } from "@/lib/supabase/server";

function unavailable(msg: string) {
  return { data: null, error: msg } as const;
}

export const supabaseAdapters: LifeOSDataAdapters = {
  tasks: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: tasks list not connected yet."); } },
  goals: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: goals list not connected yet."); } },
  habits: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: habits list not connected yet."); } },
  planner_items: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: planner_items list not connected yet."); } },
  finance_items: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: finance_items list not connected yet."); } },
  vault_notes: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: vault_notes list not connected yet."); } },
  assistant_messages: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: assistant_messages list not connected yet."); } },
  automations: { async list() { const { client, error } = await getSupabaseServerClientOrError(); if (!client) return unavailable(error || "Supabase not configured"); return unavailable("Supabase adapter stub: automations list not connected yet."); } },
};
