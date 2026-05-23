"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { ChatBubble } from "@/components/assistant/chat-bubble";
import { QuickPrompts } from "@/components/assistant/quick-prompts";
import { SuggestionCards } from "@/components/assistant/suggestion-cards";
import { TypingIndicator } from "@/components/assistant/typing-indicator";
import { ChatMessage, mockAssistantReply, quickPrompts, suggestionCards } from "@/lib/assistant-mock";
import { createId } from "@/lib/id";
import { defaultAssistantState, loadAssistantState, saveAssistantState } from "@/lib/assistant-storage";

export function ChatWindow() {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [storageWarning, setStorageWarning] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(defaultAssistantState.messages);
  const [promptUsage, setPromptUsage] = useState<Record<string, number>>(defaultAssistantState.promptUsage);

  useEffect(() => {
    const loaded = loadAssistantState();
    setMessages(loaded.state.messages);
    setPromptUsage(loaded.state.promptUsage);
    setStorageWarning(loaded.hadCorruption ? "Stored assistant history was reset due to corruption." : "");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    saveAssistantState({ messages, promptUsage });
  }, [messages, promptUsage, loading]);

  const send = (text: string, source?: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Message cannot be empty.");
      return;
    }
    if (typing) return;

    setError("");
    if (source) {
      setPromptUsage((prev) => ({ ...prev, [source]: (prev[source] || 0) + 1 }));
    }

    const userMsg: ChatMessage = { id: createId("msg"), role: "user", text: trimmed, createdAt: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply: ChatMessage = { id: createId("msg"), role: "assistant", text: mockAssistantReply(trimmed), createdAt: Date.now() };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 900);
  };

  const clearConversation = () => {
    setMessages(defaultAssistantState.messages);
    setPromptUsage({});
  };

  const history = useMemo(() => messages.slice(-36), [messages]);

  return (
    <section className="grid grid-cols-1 gap-4">
      {loading ? <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">Hydrating assistant history...</div> : null}
      {storageWarning ? <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-amber-300">{storageWarning}</div> : null}

      <SuggestionCards items={suggestionCards} onPick={(p) => send(p, p)} />

      <div className="rounded-2xl border border-white/10 bg-[#0a1120]/70 p-3 backdrop-blur-xl">
        <QuickPrompts prompts={quickPrompts} onSelect={(p) => send(p, p)} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Conversation</p>
          <button aria-label="Clear conversation history" onClick={clearConversation} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300">
            <Trash2 className="h-3 w-3" /> Clear
          </button>
        </div>

        {error ? <p className="mb-2 text-xs text-rose-300">{error}</p> : null}
        <div className="mb-3 max-h-[52vh] space-y-2 overflow-y-auto pr-1">
          {history.map((m) => (
            <div key={m.id}>
              <ChatBubble message={m} />
              <p className="mt-0.5 text-[10px] text-slate-400">{new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          ))}
          {typing ? <TypingIndicator /> : null}
        </div>

        <form
          className="flex items-center gap-2"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            aria-label="Message Jordan AI"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Jordan AI..."
            className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm outline-none mobile-readable"
          />
          <button aria-label="Send message" type="submit" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-300/30 bg-blue-500/20 text-blue-100">
            <Send className="h-4 w-4" />
          </button>
        </form>

        {Object.keys(promptUsage).length > 0 ? (
          <p className="mt-2 text-[11px] text-slate-300">Prompt usage tracked: {Object.values(promptUsage).reduce((a, b) => a + b, 0)} selections.</p>
        ) : null}
      </div>
    </section>
  );
}
