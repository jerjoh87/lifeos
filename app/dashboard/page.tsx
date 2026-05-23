import {
  Activity,
  ArrowUpRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Flame,
  Target,
} from "lucide-react";

const kpis = [
  { label: "Focus Score", value: "87", delta: "+6%", icon: Activity },
  { label: "Tasks Due", value: "8", delta: "2 high", icon: CheckCircle2 },
  { label: "Goal Progress", value: "64%", delta: "+4%", icon: Target },
  { label: "Habits Streak", value: "19d", delta: "Best: 24d", icon: Flame },
];

export default function DashboardPage() {
  const reduced = useReducedMotion();
  const fade = { initial: reduced ? { opacity: 1 } : { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <AppShell title="Dashboard">
      <motion.section {...fade} className="mb-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#12192b]/90 to-[#0b1220]/90 p-5 shadow-glow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200/80">Today Summary</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Your Command Center</h2>
          </div>
          <QuickActions />
        </div>
      </motion.section>

      <KPICards items={kpis} />

      <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <TodaySummaryCard />
        <AIAssistantCard />
      </section>

      <WidgetGrid>
        <TasksWidget />
        <GoalsWidget />
        <FinanceWidget />
        <AutomationWidget />
      </WidgetGrid>
    </AppShell>
  );
}
