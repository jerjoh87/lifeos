import { Target } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

export function GoalsWidget() {
  return (
    <AppCard>
      <SectionHeader title="Goals" icon={Target} />
      <p className="text-sm text-slate-300">Launch MVP Beta · 66%</p>
    </AppCard>
  );
}
