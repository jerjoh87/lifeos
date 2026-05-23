import { AppShell } from "@/components/shell/app-shell";
import { AppCard } from "@/components/ui/app-card";

export default function AssistantPage() {
  return (
    <AppShell title="Assistant">
      <AppCard>
        <h2 className="text-lg font-semibold">Assistant</h2>
        <p className="mt-2 text-sm text-slate-300">Assistant module shell is ready for LifeOS MVP implementation.</p>
      </AppCard>
    </AppShell>
  );
}
