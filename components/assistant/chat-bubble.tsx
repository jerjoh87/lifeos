import { motion } from "framer-motion";
import { ChatMessage } from "@/lib/assistant-mock";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-2xl border px-3 py-2 text-sm leading-6 sm:max-w-[70%] ${isUser ? "border-blue-300/30 bg-blue-500/20 text-blue-50" : "border-white/10 bg-white/[0.04] text-slate-200"}`}>
        {message.text}
      </div>
    </motion.div>
  );
}
