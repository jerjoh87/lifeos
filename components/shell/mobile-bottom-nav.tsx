"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavItems } from "./nav-config";

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#070b13]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
      <ul className="grid grid-cols-5 gap-1">
        {appNavItems.slice(0, 5).map((item) => {
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
      </ul>
    </nav>
  );
}
