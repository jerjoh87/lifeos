export function QuickPrompts({ prompts, onSelect }: { prompts: string[]; onSelect: (p: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {prompts.map((prompt) => (
        <button key={prompt} onClick={() => onSelect(prompt)} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-sm text-slate-200 transition hover:border-blue-300/35 hover:bg-blue-500/10">
          {prompt}
        </button>
      ))}
    </div>
  );
}
