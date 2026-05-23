import { AppShell } from "@/components/shell/app-shell";
import { AppCard } from "@/components/ui/app-card";

export default function TasksPage() {
  return (
    <AppShell title="Tasks">
      <AppCard>
        <h2 className="text-lg font-semibold">Tasks</h2>
        <p className="mt-2 text-sm text-slate-300">Tasks module shell is ready for LifeOS MVP implementation.</p>
      </AppCard>
    </AppShell>
  );
}
