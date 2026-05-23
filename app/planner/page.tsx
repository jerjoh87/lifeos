import { AppShell } from "@/components/shell/app-shell";
import { AppCard } from "@/components/ui/app-card";

export default function PlannerPage() {
  return (
    <AppShell title="Planner">
      <AppCard>
        <h2 className="text-lg font-semibold">Planner</h2>
        <p className="mt-2 text-sm text-slate-300">Planner module shell is ready for LifeOS MVP implementation.</p>
      </AppCard>
    </AppShell>
  );
}
