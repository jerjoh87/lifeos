import {
  AssistantMessageRecord,
  AutomationRecord,
  FinanceItemRecord,
  GoalRecord,
  HabitRecord,
  PlannerItemRecord,
  TaskRecord,
  VaultNoteRecord,
} from "@/lib/data/types";

export type AdapterResult<T> = { data: T | null; error: string | null };

export interface TasksAdapter { list(): Promise<AdapterResult<TaskRecord[]>> }
export interface GoalsAdapter { list(): Promise<AdapterResult<GoalRecord[]>> }
export interface HabitsAdapter { list(): Promise<AdapterResult<HabitRecord[]>> }
export interface PlannerItemsAdapter { list(): Promise<AdapterResult<PlannerItemRecord[]>> }
export interface FinanceItemsAdapter { list(): Promise<AdapterResult<FinanceItemRecord[]>> }
export interface VaultNotesAdapter { list(): Promise<AdapterResult<VaultNoteRecord[]>> }
export interface AssistantMessagesAdapter { list(): Promise<AdapterResult<AssistantMessageRecord[]>> }
export interface AutomationsAdapter { list(): Promise<AdapterResult<AutomationRecord[]>> }

export type LifeOSDataAdapters = {
  tasks: TasksAdapter;
  goals: GoalsAdapter;
  habits: HabitsAdapter;
  planner_items: PlannerItemsAdapter;
  finance_items: FinanceItemsAdapter;
  vault_notes: VaultNotesAdapter;
  assistant_messages: AssistantMessagesAdapter;
  automations: AutomationsAdapter;
};
