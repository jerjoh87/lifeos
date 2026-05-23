import { CalendarDays } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";

const timeline = [
  ["8:00 AM", "Morning Planning"],
  ["10:30 AM", "Deep Work: Product"],
  ["1:00 PM", "Workout"],
  ["4:00 PM", "Review Spending"],
] as const;

export function TodaySummaryCard() {
  return (
    <AppCard className="lg:col-span-7">
      <SectionHeader title="Today Timeline" icon={CalendarDays} />
      <div className="space-y-2">
        {timeline.map(([time, title]) => (
          <div key={time} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a1020]/70 p-3">
            <p className="w-16 shrink-0 text-xs text-slate-400">{time}</p>
            <p className="min-w-0 truncate text-sm">{title}</p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
