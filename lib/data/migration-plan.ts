export const MIGRATION_STATUS_KEY = "lifeos_migration_status_v1";

export type ModuleKey =
  | "tasks"
  | "goals"
  | "habits"
  | "planner_items"
  | "finance_items"
  | "vault_notes"
  | "assistant_messages"
  | "automations";

export type MigrationStatus = Record<ModuleKey, boolean>;

export const defaultMigrationStatus: MigrationStatus = {
  tasks: false,
  goals: false,
  habits: false,
  planner_items: false,
  finance_items: false,
  vault_notes: false,
  assistant_messages: false,
  automations: false,
};

export function loadMigrationStatus(): MigrationStatus {
  if (typeof window === "undefined") return defaultMigrationStatus;
  try {
    const raw = localStorage.getItem(MIGRATION_STATUS_KEY);
    if (!raw) return defaultMigrationStatus;
    return { ...defaultMigrationStatus, ...JSON.parse(raw) };
  } catch {
    return defaultMigrationStatus;
  }
}

export function saveMigrationStatus(status: MigrationStatus) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MIGRATION_STATUS_KEY, JSON.stringify(status));
}

// TODO(data-migration): implement module-by-module import executor.
// Plan:
// 1) detect local records via local adapters
// 2) map local IDs to `metadata.local_id` in Supabase
// 3) upsert with unique local_id/user_id to avoid duplicates
// 4) preserve created_at/updated_at when available
// 5) mark module complete in migration status key
