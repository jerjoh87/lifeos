import { LucideIcon } from "lucide-react";

export function SectionHeader({ title, icon: Icon }: { title: string; icon?: LucideIcon }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-base font-semibold">{title}</h3>
      {Icon ? <Icon className="h-4 w-4 text-slate-300" /> : null}
    </div>
  );
}
