import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.12 }}
              className="h-1.5 w-1.5 rounded-full bg-blue-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
