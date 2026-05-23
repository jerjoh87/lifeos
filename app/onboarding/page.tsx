"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const steps = [
  { key: "welcome", title: "Welcome to LifeOS", subtitle: "Let’s calibrate your personal operating system." },
  { key: "goals", title: "Goal Selection", subtitle: "Choose outcomes you want to optimize first." },
  { key: "routine", title: "Routine Selection", subtitle: "Set your baseline weekly rhythm." },
  { key: "productivity", title: "Productivity Setup", subtitle: "Define deep-work windows and focus style." },
  { key: "finance", title: "Finance Setup", subtitle: "Configure budgets, bill cadence, and spending categories." },
  { key: "notifications", title: "Notification Preferences", subtitle: "Decide how and when LifeOS should nudge you." },
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const done = index === steps.length - 1;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05070c] px-4 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(77,134,255,0.25),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(20,160,140,0.16),_transparent_40%)]" />
      <section className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-7">
        <div className="mb-5 h-1.5 rounded-full bg-white/10">
          <motion.div className="h-1.5 rounded-full bg-blue-400" animate={{ width: `${((index + 1) / steps.length) * 100}%` }} transition={{ duration: 0.35 }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-blue-200/80">Onboarding</p>
            <h1 className="mt-3 text-2xl font-semibold">{step.title}</h1>
            <p className="mt-2 text-sm text-slate-300">{step.subtitle}</p>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {["Option A", "Option B", "Option C", "Option D"].map((o) => (
                <button key={o} className="rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 py-3 text-left text-sm text-slate-200 hover:border-blue-300/35">
                  {o}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={() => setIndex((i) => Math.max(i - 1, 0))} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300" disabled={index === 0}>Back</button>
          <button
            onClick={() => (done ? (window.location.href = "/dashboard") : setIndex((i) => i + 1))}
            className="rounded-lg bg-blue-500/80 px-4 py-2 text-sm font-medium"
          >
            {done ? "Finish" : "Continue"}
          </button>
        </div>
      </section>
    </main>
  );
}
