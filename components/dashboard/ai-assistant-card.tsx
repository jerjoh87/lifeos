import { ArrowUpRight } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

export function AIAssistantCard() {
  return (
    <AppCard className="lg:col-span-5">
      <SectionHeader title="Jordan AI Brief" icon={ArrowUpRight} />
      <p className="text-sm text-slate-300">Prioritize your two highest-impact tasks before noon and move admin blocks to the afternoon.</p>
    </AppCard>
  );
}
