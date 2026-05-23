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

function normalize(state: PlannerState): PlannerState {
  return {
    view: state.view === "day" ? "day" : "week",
    selectedDate: state.selectedDate || today,
    items: Array.isArray(state.items)
      ? state.items.map((i) => ({ ...i, title: String(i.title || "").trim() || "Untitled" }))
      : [],
  };
}

export function loadPlannerState(): { state: PlannerState; hadCorruption: boolean } {
  if (typeof window === "undefined") return { state: defaultPlannerState, hadCorruption: false };
  try {
    const raw = localStorage.getItem(PLANNER_STORAGE_KEY);
    if (!raw) return { state: defaultPlannerState, hadCorruption: false };
    return { state: normalize({ ...defaultPlannerState, ...JSON.parse(raw) }), hadCorruption: false };
  } catch {
    localStorage.removeItem(PLANNER_STORAGE_KEY);
    return { state: defaultPlannerState, hadCorruption: true };
  }
}

export function savePlannerState(state: PlannerState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(normalize(state)));
}
