export type Bill = { id: string; name: string; amount: number; dueDate: string; paid: boolean };
export type Subscription = { id: string; name: string; amount: number; cycle: "monthly" | "yearly" };
export type BudgetCategory = { id: string; name: string; limit: number; spent: number };

export type FinanceState = {
  bills: Bill[];
  subscriptions: Subscription[];
  budgets: BudgetCategory[];
};

export const FINANCE_STORAGE_KEY = "lifeos_finance_v1";

export const defaultFinanceState: FinanceState = {
  bills: [
    { id: "b1", name: "Rent", amount: 1850, dueDate: "2026-06-01", paid: false },
    { id: "b2", name: "Internet", amount: 89, dueDate: "2026-05-28", paid: false },
  ],
  subscriptions: [
    { id: "s1", name: "Spotify", amount: 11.99, cycle: "monthly" },
    { id: "s2", name: "Notion", amount: 12, cycle: "monthly" },
  ],
  budgets: [
    { id: "c1", name: "Food", limit: 500, spent: 320 },
    { id: "c2", name: "Transport", limit: 220, spent: 140 },
  ],
};

const n = (v: number, min = 0) => (Number.isFinite(v) ? Math.max(min, v) : min);

function normalize(s: FinanceState): FinanceState {
  return {
    bills: Array.isArray(s.bills) ? s.bills.map((b) => ({ ...b, amount: n(b.amount), name: String(b.name || "").trim() || "Untitled Bill" })) : [],
    subscriptions: Array.isArray(s.subscriptions)
      ? s.subscriptions.map((x) => ({ ...x, amount: n(x.amount), name: String(x.name || "").trim() || "Untitled Subscription" }))
      : [],
    budgets: Array.isArray(s.budgets)
      ? s.budgets.map((b) => ({ ...b, limit: n(b.limit, 1), spent: n(b.spent), name: String(b.name || "").trim() || "Untitled Category" }))
      : [],
  };
}

export function loadFinanceState(): { state: FinanceState; hadCorruption: boolean } {
  if (typeof window === "undefined") return { state: defaultFinanceState, hadCorruption: false };
  try {
    const raw = localStorage.getItem(FINANCE_STORAGE_KEY);
    if (!raw) return { state: defaultFinanceState, hadCorruption: false };
    return { state: normalize({ ...defaultFinanceState, ...JSON.parse(raw) }), hadCorruption: false };
  } catch {
    localStorage.removeItem(FINANCE_STORAGE_KEY);
    return { state: defaultFinanceState, hadCorruption: true };
  }
}

export function saveFinanceState(state: FinanceState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(normalize(state)));
}
