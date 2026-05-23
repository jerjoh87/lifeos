import { motion, useReducedMotion } from "framer-motion";

export function AppCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -2 }}
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.article>
  );
}
