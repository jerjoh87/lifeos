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

const todayTimeline = [
  { time: "8:00 AM", title: "Morning Planning", tag: "Routine" },
  { time: "10:30 AM", title: "Deep Work: Product", tag: "Focus" },
  { time: "1:00 PM", title: "Workout", tag: "Health" },
  { time: "4:00 PM", title: "Review Spending", tag: "Finance" },
];

const tasks = [
  "Finalize onboarding copy",
  "Pay internet bill",
  "Log today’s meals",
  "Plan next week sprint",
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#05070c] text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#12192b]/90 via-[#0b1220]/90 to-[#12192b]/90 p-5 shadow-[0_0_60px_-20px_rgba(86,140,255,.45)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-200/80">LifeOS · Today</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Your Command Center</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                You have 8 tasks due, 2 priority reminders, and are on track to hit your weekly focus target.
              </p>
            </div>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-300/25 bg-blue-500/15 px-4 text-sm font-medium text-blue-100 transition hover:bg-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
              <Brain className="h-4 w-4" /> Ask Jordan AI
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map(({ label, value, delta, icon: Icon }) => (
            <article
              key={label}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/30 hover:bg-blue-500/[0.08]"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs text-slate-300">{label}</p>
                <Icon className="h-4 w-4 text-blue-200/90" />
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-xs text-emerald-300">{delta}</p>
            </article>
          ))}
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Today Summary</h2>
              <CalendarDays className="h-4 w-4 text-slate-300" />
            </div>
            <div className="space-y-3">
              {todayTimeline.map((item) => (
                <div
                  key={item.time + item.title}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0a1020]/70 p-3"
                >
                  <p className="w-16 shrink-0 text-xs text-slate-400">{item.time}</p>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
                    <p className="mt-1 text-xs text-blue-200/85">{item.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl lg:col-span-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Jordan AI Brief</h2>
              <ArrowUpRight className="h-4 w-4 text-blue-200" />
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Prioritize your two highest-impact tasks before noon. Shift “Review Spending” to right after lunch to reduce
              decision fatigue and keep your evening open for recovery.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li className="rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">Block 90 min deep-work at 10:30 AM</li>
              <li className="rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">Move low-energy admin to 4:30 PM</li>
              <li className="rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">Check bill due dates before 6 PM</li>
            </ul>
          </article>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Tasks</h3>
              <CheckCircle2 className="h-4 w-4 text-slate-300" />
            </div>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task} className="truncate rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2 text-sm text-slate-200">
                  {task}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Goals</h3>
              <Target className="h-4 w-4 text-slate-300" />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="mb-1 text-slate-200">Launch MVP Beta</p>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-2/3 rounded-full bg-blue-400" />
                </div>
              </div>
              <div>
                <p className="mb-1 text-slate-200">Fitness Consistency</p>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-1/2 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:col-span-2 xl:col-span-1">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Finance Snapshot</h3>
              <CircleDollarSign className="h-4 w-4 text-slate-300" />
            </div>
            <div className="space-y-2 text-sm text-slate-200">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">
                <span>Bills Due</span>
                <span className="font-medium text-amber-200">2</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">
                <span>Subscriptions</span>
                <span className="font-medium">$74/mo</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">
                <span>Budget Used</span>
                <span className="font-medium text-emerald-300">58%</span>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
