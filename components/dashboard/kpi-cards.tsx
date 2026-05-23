import { AppCard } from "@/components/ui/app-card";
import { LucideIcon } from "lucide-react";

export type KPIItem = { label: string; value: string; delta: string; icon: LucideIcon };

export function KPICards({ items }: { items: KPIItem[] }) {
  return (
    <section className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, delta, icon: Icon }) => (
        <AppCard key={label}>
          <div className="flex items-start justify-between">
            <p className="text-xs text-slate-300">{label}</p>
            <Icon className="h-4 w-4 text-blue-200" />
          </div>
          <p className="mt-3 text-2xl font-semibold">{value}</p>
          <p className="text-xs text-emerald-300">{delta}</p>
        </AppCard>
      ))}
    </section>
  );
}
