import { Sparkles } from "lucide-react";

export function SuggestionCards({ items, onPick }: { items: { title: string; prompt: string }[]; onPick: (p: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {items.map((item) => (
        <button key={item.title} onClick={() => onPick(item.prompt)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-300/35 hover:bg-blue-500/10">
          <div className="mb-2 flex items-center gap-2 text-blue-200"><Sparkles className="h-4 w-4" /> <span className="text-xs uppercase tracking-[0.18em]">{item.title}</span></div>
          <p className="text-sm text-slate-200">{item.prompt}</p>
        </button>
      ))}
    </div>
  );
}
