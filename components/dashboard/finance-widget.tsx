import { CircleDollarSign } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

export function FinanceWidget() {
  return (
    <AppCard className="md:col-span-2 xl:col-span-1">
      <SectionHeader title="Finance Snapshot" icon={CircleDollarSign} />
      <p className="text-sm text-slate-300">Bills due: 2 · Subscriptions: $74/mo</p>
    </AppCard>
  );
}
