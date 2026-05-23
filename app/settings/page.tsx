import { AppShell } from "@/components/shell/app-shell";
import { AppCard } from "@/components/ui/app-card";

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <AppCard>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="mt-2 text-sm text-slate-300">Settings module shell is ready for LifeOS MVP implementation.</p>
      </AppCard>
    </AppShell>
  );
}
