import { Bell, Search } from "lucide-react";

export function TopHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a1120]/80 px-4 py-3 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-blue-200/75">LifeOS</p>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button aria-label="Open search" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300">
          <Search className="h-4 w-4" />
        </button>
        <button aria-label="Open notifications" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
