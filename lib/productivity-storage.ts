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

export function loadState(): ProductivityState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function saveState(state: ProductivityState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
