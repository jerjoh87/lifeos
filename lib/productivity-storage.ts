export type Task = { id: string; title: string; completed: boolean; reminder?: string };
export type Goal = { id: string; title: string; progress: number };
export type Habit = { id: string; title: string; streak: number; lastDone?: string };
export type ProductivityState = { tasks: Task[]; goals: Goal[]; habits: Habit[] };

export const STORAGE_KEY = "lifeos_productivity_v1";

export const defaultState: ProductivityState = {
  tasks: [],
  goals: [
    { id: "g1", title: "Launch LifeOS MVP", progress: 38 },
    { id: "g2", title: "Build consistent routine", progress: 54 },
  ],
  habits: [
    { id: "h1", title: "Morning planning", streak: 5 },
    { id: "h2", title: "Workout", streak: 3 },
  ],
};

function normalizeState(input: ProductivityState): ProductivityState {
  return {
    tasks: Array.isArray(input.tasks) ? input.tasks.map((t) => ({ ...t, title: String(t.title || "").trim() })) : [],
    goals: Array.isArray(input.goals)
      ? input.goals.map((g) => ({ ...g, progress: Number.isFinite(g.progress) ? Math.max(0, Math.min(100, g.progress)) : 0 }))
      : defaultState.goals,
    habits: Array.isArray(input.habits)
      ? input.habits.map((h) => ({ ...h, streak: Number.isFinite(h.streak) ? Math.max(0, Math.floor(h.streak)) : 0 }))
      : defaultState.habits,
  };
}

export function loadState(): { state: ProductivityState; hadCorruption: boolean } {
  if (typeof window === "undefined") return { state: defaultState, hadCorruption: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { state: defaultState, hadCorruption: false };
    const parsed = JSON.parse(raw) as ProductivityState;
    return { state: normalizeState({ ...defaultState, ...parsed }), hadCorruption: false };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { state: defaultState, hadCorruption: true };
  }
}

export function saveState(state: ProductivityState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeState(state)));
}
