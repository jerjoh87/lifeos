import { CheckCircle2 } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

export function TasksWidget() {
  return (
    <AppCard>
      <SectionHeader title="Tasks" icon={CheckCircle2} />
      <ul className="space-y-2 text-sm text-slate-200">
        <li className="truncate rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">Finalize onboarding copy</li>
        <li className="truncate rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">Pay internet bill</li>
      </ul>
    </AppCard>
  );
}
