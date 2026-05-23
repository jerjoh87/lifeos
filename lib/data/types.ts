export type TaskRecord = { id: string; title: string; completed: boolean; reminder_time?: string | null; created_at?: string; updated_at?: string };
export type GoalRecord = { id: string; title: string; progress: number; created_at?: string; updated_at?: string };
export type HabitRecord = { id: string; title: string; streak: number; created_at?: string; updated_at?: string };
export type PlannerItemRecord = { id: string; title: string; day_key: string; start_time: string; end_time: string; item_type: "timeblock" | "routine" | "reminder"; created_at?: string; updated_at?: string };
export type FinanceItemRecord = { id: string; item_kind: "bill" | "subscription" | "budget"; name: string; amount: number; metadata?: Record<string, unknown>; created_at?: string; updated_at?: string };
export type VaultNoteRecord = { id: string; title?: string | null; body: string; created_at?: string; updated_at?: string };
export type AssistantMessageRecord = { id: string; role: "user" | "assistant"; content: string; created_at?: string; updated_at?: string };
export type AutomationRecord = { id: string; name: string; enabled: boolean; config?: Record<string, unknown>; created_at?: string; updated_at?: string };
