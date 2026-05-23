"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { ChatBubble } from "@/components/assistant/chat-bubble";
import { QuickPrompts } from "@/components/assistant/quick-prompts";
import { SuggestionCards } from "@/components/assistant/suggestion-cards";
import { TypingIndicator } from "@/components/assistant/typing-indicator";
import { ChatMessage, mockAssistantReply, quickPrompts, suggestionCards } from "@/lib/assistant-mock";

export function ChatWindow() {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "seed-1", role: "assistant", text: "I’m Jordan AI. Tell me what kind of day you want, and I’ll structure it.", createdAt: Date.now() },
  ]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: trimmed, createdAt: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = { id: crypto.randomUUID(), role: "assistant", text: mockAssistantReply(trimmed), createdAt: Date.now() };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 900);
  };

  const history = useMemo(() => messages.slice(-24), [messages]);

  return (
    <section className="grid grid-cols-1 gap-4">
      <SuggestionCards items={suggestionCards} onPick={send} />

      <div className="rounded-2xl border border-white/10 bg-[#0a1120]/70 p-3 backdrop-blur-xl">
        <QuickPrompts prompts={quickPrompts} onSelect={send} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
        <div className="mb-3 max-h-[52vh] space-y-2 overflow-y-auto pr-1">
          {history.map((m) => (
            <ChatBubble key={m.id} message={m} />
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Jordan AI..."
            className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm outline-none"
          />
          <button type="submit" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-300/25 bg-blue-500/20 text-blue-100">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
