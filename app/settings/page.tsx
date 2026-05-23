import { AppShell } from "@/components/layout/app-shell";
import { AppCard } from "@/components/ui/app-card";
import { LogoutButton } from "@/components/auth/logout-button";

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <AppCard>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="mt-2 text-sm text-slate-300">Manage your preferences and session.</p>
        <LogoutButton />
      </AppCard>
    </AppShell>
  );
}
