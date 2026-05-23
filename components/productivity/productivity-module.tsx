"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Flame, Target, Bell } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";
import { defaultState, Goal, Habit, loadState, saveState, Task } from "@/lib/productivity-storage";
import { createId } from "@/lib/id";

export function ProductivityModule() {
  const [tasks, setTasks] = useState<Task[]>(defaultState.tasks);
  const [goals, setGoals] = useState<Goal[]>(defaultState.goals);
  const [habits, setHabits] = useState<Habit[]>(defaultState.habits);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskError, setTaskError] = useState("");
  const [loading, setLoading] = useState(true);
  const [storageWarning, setStorageWarning] = useState("");

  useEffect(() => {
    const loaded = loadState();
    setTasks(loaded.state.tasks);
    setGoals(loaded.state.goals);
    setHabits(loaded.state.habits);
    setStorageWarning(loaded.hadCorruption ? "Stored productivity data was reset due to corruption." : "");
    setLoading(false);
  }, []);

  useEffect(() => saveState({ tasks, goals, habits }), [tasks, goals, habits]);

  const completed = tasks.filter((t) => t.completed).length;
  const productivityScore = useMemo(() => {
    const taskScore = tasks.length ? (completed / tasks.length) * 60 : 0;
    const goalScore = goals.length ? goals.reduce((a, g) => a + g.progress, 0) / goals.length / 2 : 0;
    const habitScore = habits.length ? Math.min(20, habits.reduce((a, h) => a + h.streak, 0)) : 0;
    return Math.round(taskScore + goalScore + habitScore);
  }, [tasks, completed, goals, habits]);

  const addTask = () => {
    const trimmed = taskTitle.trim();
    if (!trimmed) { setTaskError("Task title cannot be empty."); return; }
    setTaskError("");
    setTasks((prev) => [...prev, { id: createId("task"), title: trimmed, completed: false }]);
    setTaskTitle("");
  };

  return (
    <section className="grid grid-cols-1 gap-4">
      {loading ? <AppCard><p className="text-sm text-slate-300">Loading productivity data...</p></AppCard> : null}
      {storageWarning ? <AppCard><p className="text-sm text-amber-300">{storageWarning}</p></AppCard> : null}
      <AppCard>
        <SectionHeader title="Productivity Score" icon={CheckCircle2} />
        <div className="flex items-end justify-between">
          <p className="text-4xl font-semibold">{productivityScore}</p>
          <p className="text-sm text-slate-300">{completed}/{tasks.length} tasks complete</p>
        </div>
      </AppCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <AppCard className="lg:col-span-6">
          <SectionHeader title="Tasks" icon={CheckCircle2} />
          <div className="mb-3 flex gap-2">
            <input value={taskTitle} onChange={(e) => { setTaskTitle(e.target.value); if (taskError) setTaskError(""); }} placeholder="Add a task" className="h-10 flex-1 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
            <button onClick={addTask} className="rounded-lg bg-blue-500/80 px-3 text-sm">Add</button>
          </div>
          {taskError ? <p className="mb-2 text-xs text-rose-300">{taskError}</p> : null}
          {tasks.length === 0 ? <p className="rounded-lg border border-dashed border-white/20 p-4 text-sm text-slate-400">No tasks yet. Add your first priority.</p> : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0a1020]/70 p-2">
                  <input type="checkbox" checked={t.completed} onChange={() => setTasks((prev) => prev.map((x) => x.id === t.id ? { ...x, completed: !x.completed } : x))} />
                  <input value={t.title} onChange={(e) => setTasks((prev) => prev.map((x) => x.id === t.id ? { ...x, title: e.target.value } : x))} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                  <button onClick={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))} className="text-xs text-rose-300">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </AppCard>

        <AppCard className="lg:col-span-6">
          <SectionHeader title="Goal Tracking" icon={Target} />
          <div className="space-y-3">
            {goals.map((g) => (
              <div key={g.id}>
                <div className="mb-1 flex items-center justify-between text-sm"><span>{g.title}</span><span>{g.progress}%</span></div>
                <div className="h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-blue-400" style={{ width: `${g.progress}%` }} /></div>
                <input type="range" min={0} max={100} value={g.progress} onChange={(e) => setGoals((prev) => prev.map((x) => x.id === g.id ? { ...x, progress: Number(e.target.value) } : x))} className="mt-2 w-full" />
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AppCard>
          <SectionHeader title="Habit Streaks" icon={Flame} />
          <div className="space-y-2">
            {habits.map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-2">
                <span className="text-sm">{h.title}</span>
                <button className="text-sm text-emerald-300" onClick={() => setHabits((prev) => prev.map((x) => x.id === h.id ? { ...x, streak: x.streak + 1 } : x))}>{h.streak}d</button>
              </div>
            ))}
          </div>
        </AppCard>
        <AppCard>
          <SectionHeader title="Reminders" icon={Bell} />
          <p className="mb-2 text-sm text-slate-300">Attach reminder times to your tasks.</p>
          {tasks.length === 0 ? <p className="rounded-lg border border-dashed border-white/20 p-4 text-sm text-slate-400">No reminders yet. Create a task first.</p> : (
            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0a1020]/70 p-2">
                  <span className="min-w-0 flex-1 truncate text-sm">{t.title}</span>
                  <input type="time" value={t.reminder ?? ""} onChange={(e) => setTasks((prev) => prev.map((x) => x.id === t.id ? { ...x, reminder: e.target.value } : x))} className="rounded border border-white/10 bg-[#0d1629] px-2 py-1 text-xs" />
                </div>
              ))}
            </div>
          )}
        </AppCard>
      </div>
    </section>
  );
}
