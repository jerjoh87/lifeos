import { AppShell } from "@/components/layout/app-shell";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Bell, CalendarCheck2, Sparkles } from "lucide-react";

export default function AutomationPage() {
  return (
    <AppShell title="Automation">
      <section className="grid grid-cols-1 gap-4">
        <AppCard>
          <SectionHeader title="Life Automation Engine" icon={Sparkles} />
          <p className="text-sm text-slate-300">Configure intelligent check-ins, reminders, and planning nudges with premium control.</p>
        </AppCard>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AppCard>
            <SectionHeader title="Morning Briefing" icon={CalendarCheck2} />
            <p className="text-sm text-slate-300">Daily digest at 7:00 AM with top priorities, schedule, and focus suggestion.</p>
          </AppCard>
          <AppCard>
            <SectionHeader title="Overdue Nudges" icon={Bell} />
            <p className="text-sm text-slate-300">Smart reminders for overdue tasks and habits with calm, contextual prompts.</p>
          </AppCard>
        </div>
      </section>
    </AppShell>
  );
}
