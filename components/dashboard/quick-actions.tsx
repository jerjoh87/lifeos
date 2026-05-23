import { Brain, PlusCircle } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-300/25 bg-blue-500/15 px-4 text-sm text-blue-100">
        <Brain className="h-4 w-4" /> Ask Jordan AI
      </button>
      <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-slate-200">
        <PlusCircle className="h-4 w-4" /> Add Task
      </button>
    </div>
  );
}
