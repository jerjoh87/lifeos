"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { appNavItems } from "./nav-config";

export function DesktopSidebar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#070b13]/95 p-4 backdrop-blur-xl lg:block">
      <div className="mb-6 rounded-2xl border border-blue-300/20 bg-blue-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-200/80">LifeOS</p>
        <p className="mt-2 text-sm text-slate-300">AI operating system for your day.</p>
      </div>
      <nav className="space-y-2">
        {appNavItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <motion.div key={item.href} whileHover={reduced ? undefined : { x: 2 }}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${
                  active
                    ? "border-blue-300/30 bg-blue-500/15 text-blue-100"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.03]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}
