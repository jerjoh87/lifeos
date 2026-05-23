export type PlannerItem = {
  id: string;
  title: string;
  dayKey: string;
  start: string;
  end: string;
  type: "timeblock" | "routine" | "reminder";
};

export type PlannerState = {
  view: "day" | "week";
  selectedDate: string;
  items: PlannerItem[];
};

export const PLANNER_STORAGE_KEY = "lifeos_planner_v1";

const today = new Date().toISOString().slice(0, 10);

export const defaultPlannerState: PlannerState = {
  view: "week",
  selectedDate: today,
  items: [
    { id: "p1", title: "Deep Work", dayKey: today, start: "09:00", end: "10:30", type: "timeblock" },
    { id: "p2", title: "Morning Routine", dayKey: today, start: "07:00", end: "07:30", type: "routine" },
  ],
};

export function loadPlannerState(): PlannerState {
  if (typeof window === "undefined") return defaultPlannerState;
  try {
    const raw = localStorage.getItem(PLANNER_STORAGE_KEY);
    if (!raw) return defaultPlannerState;
    return { ...defaultPlannerState, ...JSON.parse(raw) };
  } catch {
    return defaultPlannerState;
  }
}

export function savePlannerState(state: PlannerState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(state));
}
