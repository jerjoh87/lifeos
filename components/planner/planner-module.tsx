"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, Plus, Repeat, Bell, Trash2 } from "lucide-react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";
import { defaultPlannerState, loadPlannerState, PlannerItem, savePlannerState } from "@/lib/planner-storage";

const hours = Array.from({ length: 15 }, (_, i) => `${String(i + 6).padStart(2, "0")}:00`);

function itemTone(type: PlannerItem["type"]) {
  if (type === "routine") return "border-emerald-300/30 bg-emerald-500/10";
  if (type === "reminder") return "border-amber-300/30 bg-amber-500/10";
  return "border-blue-300/30 bg-blue-500/10";
}

export function PlannerModule() {
  const [view, setView] = useState<"day" | "week">(defaultPlannerState.view);
  const [selectedDate, setSelectedDate] = useState(defaultPlannerState.selectedDate);
  const [items, setItems] = useState<PlannerItem[]>(defaultPlannerState.items);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [type, setType] = useState<PlannerItem["type"]>("timeblock");

  useEffect(() => {
    const s = loadPlannerState();
    setView(s.view);
    setSelectedDate(s.selectedDate);
    setItems(s.items);
  }, []);

  useEffect(() => {
    savePlannerState({ view, selectedDate, items });
  }, [view, selectedDate, items]);

  const weekDates = useMemo(() => {
    const base = new Date(selectedDate + "T00:00:00");
    const day = base.getDay();
    const mondayOffset = (day + 6) % 7;
    const monday = new Date(base);
    monday.setDate(base.getDate() - mondayOffset);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().slice(0, 10);
    });
  }, [selectedDate]);

  const filtered = items.filter((i) => i.dayKey === selectedDate).sort((a, b) => a.start.localeCompare(b.start));

  const addItem = () => {
    if (!title.trim()) return;
    setItems((prev) => [...prev, { id: crypto.randomUUID(), title: title.trim(), dayKey: selectedDate, start, end, type }]);
    setTitle("");
  };

  return (
    <section className="grid grid-cols-1 gap-4">
      <AppCard>
        <SectionHeader title="Planner" icon={CalendarDays} />
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setView("day")} className={`rounded-lg px-3 py-1.5 text-sm ${view === "day" ? "bg-blue-500/20 text-blue-100" : "bg-white/[0.03] text-slate-300"}`}>Day</button>
          <button onClick={() => setView("week")} className={`rounded-lg px-3 py-1.5 text-sm ${view === "week" ? "bg-blue-500/20 text-blue-100" : "bg-white/[0.03] text-slate-300"}`}>Week</button>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 py-1.5 text-sm" />
        </div>
      </AppCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <AppCard className="lg:col-span-5">
          <SectionHeader title="Add Schedule Item" icon={Plus} />
          <div className="space-y-2">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Design sprint" className="h-10 w-full rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
            <div className="grid grid-cols-2 gap-2">
              <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
              <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value as PlannerItem["type"])} className="h-10 w-full rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm">
              <option value="timeblock">Time Block</option>
              <option value="routine">Routine</option>
              <option value="reminder">Reminder</option>
            </select>
            <button onClick={addItem} className="h-10 w-full rounded-lg bg-blue-500/80 text-sm">Create Item</button>
          </div>
        </AppCard>

        <AppCard className="lg:col-span-7">
          <SectionHeader title={view === "day" ? "Day View" : "Week View"} icon={Clock3} />
          {view === "week" ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {weekDates.map((d) => {
                const count = items.filter((i) => i.dayKey === d).length;
                return (
                  <button key={d} onClick={() => { setSelectedDate(d); setView("day"); }} className="rounded-lg border border-white/10 bg-[#0a1020]/70 p-2 text-left">
                    <p className="text-xs text-slate-400">{d.slice(5)}</p>
                    <p className="mt-1 text-sm text-slate-100">{count} items</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.length === 0 ? <p className="rounded-lg border border-dashed border-white/20 p-4 text-sm text-slate-400">No schedule items yet for this day.</p> : null}
              {filtered.map((item) => (
                <div key={item.id} draggable className={`rounded-lg border p-2 ${itemTone(item.type)}`}>
                  <div className="flex items-center justify-between gap-2">
                    <input value={item.title} onChange={(e) => setItems((prev) => prev.map((x) => x.id === item.id ? { ...x, title: e.target.value } : x))} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                    <button onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))} className="text-rose-200"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <input type="time" value={item.start} onChange={(e) => setItems((prev) => prev.map((x) => x.id === item.id ? { ...x, start: e.target.value } : x))} className="rounded border border-white/10 bg-[#0d1629] px-2 py-1" />
                    <span>to</span>
                    <input type="time" value={item.end} onChange={(e) => setItems((prev) => prev.map((x) => x.id === item.id ? { ...x, end: e.target.value } : x))} className="rounded border border-white/10 bg-[#0d1629] px-2 py-1" />
                    <span className="inline-flex items-center gap-1">{item.type === "routine" ? <Repeat className="h-3 w-3" /> : item.type === "reminder" ? <Bell className="h-3 w-3" /> : <Clock3 className="h-3 w-3" />}{item.type}</span>
                  </div>
                </div>
              ))}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-xs text-slate-400">Drag/drop-friendly structure enabled (`draggable`) for future calendar DnD integration.</div>
            </div>
          )}
        </AppCard>
      </div>

      <AppCard>
        <SectionHeader title="Time Blocks" icon={Clock3} />
        <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 sm:grid-cols-5 lg:grid-cols-8">
          {hours.map((h) => (
            <div key={h} className="rounded-md border border-white/10 bg-[#0a1020]/60 px-2 py-1.5 text-center">{h}</div>
          ))}
        </div>
      </AppCard>
    </section>
  );
}
