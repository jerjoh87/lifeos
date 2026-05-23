"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { appNavItems } from "./nav-config";

const primaryRoutes = ["/dashboard", "/assistant", "/planner", "/tasks", "/finance"];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const primary = appNavItems.filter((item) => primaryRoutes.includes(item.href));
  const secondary = appNavItems.filter((item) => !primaryRoutes.includes(item.href));

  return (
    <>
      {open ? <button aria-label="Close menu" className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} /> : null}

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#070b13]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <ul className="grid grid-cols-6 gap-1">
          {primary.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center rounded-lg px-1 py-2 text-[11px] ${
                    active ? "bg-blue-500/20 text-blue-100" : "text-slate-400"
                  }`}
                >
                  <Icon className="mb-1 h-4 w-4" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              aria-expanded={open}
              aria-controls="mobile-more-sheet"
              onClick={() => setOpen((v) => !v)}
              className={`flex w-full flex-col items-center justify-center rounded-lg px-1 py-2 text-[11px] ${
                open ? "bg-blue-500/20 text-blue-100" : "text-slate-400"
              }`}
            >
              <span className="mb-1 text-sm leading-none">•••</span>
              <span className="truncate">More</span>
            </button>
          </li>
        </ul>
      </nav>

      <section
        id="mobile-more-sheet"
        className={`fixed inset-x-0 bottom-[calc(58px+env(safe-area-inset-bottom))] z-50 mx-2 rounded-2xl border border-white/10 bg-[#0a1120]/95 p-2 backdrop-blur-xl transition ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        } lg:hidden`}
      >
        <ul className="space-y-1">
          {secondary.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                    active ? "bg-blue-500/20 text-blue-100" : "text-slate-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
