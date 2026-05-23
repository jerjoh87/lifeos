import { Bot } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

export function AutomationWidget() {
  return (
    <AppCard>
      <SectionHeader title="Automation" icon={Bot} />
      <p className="text-sm text-slate-300">Morning briefing and overdue nudges are scheduled.</p>
    </AppCard>
  );
}
