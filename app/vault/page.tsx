import { AppShell } from "@/components/shell/app-shell";
import { AppCard } from "@/components/ui/app-card";

export default function VaultPage() {
  return (
    <AppShell title="Vault">
      <AppCard>
        <h2 className="text-lg font-semibold">Vault</h2>
        <p className="mt-2 text-sm text-slate-300">Vault module shell is ready for LifeOS MVP implementation.</p>
      </AppCard>
    </AppShell>
  );
}
