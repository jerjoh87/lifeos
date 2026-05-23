import { LifeOSDataAdapters } from "@/lib/data/adapters/interfaces";
import { loadState as loadProductivity } from "@/lib/productivity-storage";
import { loadPlannerState } from "@/lib/planner-storage";
import { loadFinanceState } from "@/lib/finance-storage";
import { loadAssistantState } from "@/lib/assistant-storage";

export const localStorageAdapters: LifeOSDataAdapters = {
  tasks: { async list() { const s = loadProductivity().state; return { data: s.tasks.map(t => ({ id: t.id, title: t.title, completed: t.completed, reminder_time: t.reminder ?? null })), error: null }; } },
  goals: { async list() { const s = loadProductivity().state; return { data: s.goals.map(g => ({ id: g.id, title: g.title, progress: g.progress })), error: null }; } },
  habits: { async list() { const s = loadProductivity().state; return { data: s.habits.map(h => ({ id: h.id, title: h.title, streak: h.streak })), error: null }; } },
  planner_items: { async list() { const s = loadPlannerState().state; return { data: s.items.map(i => ({ id: i.id, title: i.title, day_key: i.dayKey, start_time: i.start, end_time: i.end, item_type: i.type })), error: null }; } },
  finance_items: { async list() { const s = loadFinanceState().state; return { data: [
    ...s.bills.map(b => ({ id: b.id, item_kind: "bill" as const, name: b.name, amount: b.amount, metadata: { dueDate: b.dueDate, paid: b.paid } })),
    ...s.subscriptions.map(x => ({ id: x.id, item_kind: "subscription" as const, name: x.name, amount: x.amount, metadata: { cycle: x.cycle } })),
    ...s.budgets.map(b => ({ id: b.id, item_kind: "budget" as const, name: b.name, amount: b.limit, metadata: { spent: b.spent } })),
  ], error: null }; } },
  vault_notes: { async list() { return { data: [], error: null }; } },
  assistant_messages: { async list() { const s = loadAssistantState().state; return { data: s.messages.map(m => ({ id: m.id, role: m.role, content: m.text, created_at: new Date(m.createdAt).toISOString() })), error: null }; } },
  automations: { async list() { return { data: [], error: null }; } },
};
