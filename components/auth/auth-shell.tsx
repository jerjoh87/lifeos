import { motion } from "framer-motion";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05070c] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(65,120,255,0.22),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(10,180,150,0.16),_transparent_35%)]" />
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/[0.04] p-6 shadow-glow backdrop-blur-2xl"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-blue-200/80">LifeOS</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </motion.section>
    </main>
  );
}
