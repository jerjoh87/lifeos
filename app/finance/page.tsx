import { AppShell } from "@/components/shell/app-shell";
import { AppCard } from "@/components/ui/app-card";

export default function FinancePage() {
  return (
    <AppShell title="Finance">
      <AppCard>
        <h2 className="text-lg font-semibold">Finance</h2>
        <p className="mt-2 text-sm text-slate-300">Finance module shell is ready for LifeOS MVP implementation.</p>
      </AppCard>
    </AppShell>
  );
}
