"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your LifeOS command center.">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => (window.location.href = "/dashboard"), 700);
        }}
      >
        <input className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Email" type="email" required />
        <input className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Password" type="password" required />
        <button className="h-11 w-full rounded-xl bg-blue-500/80 text-sm font-medium">{loading ? "Signing in..." : "Sign In"}</button>
      </form>
      <p className="mt-4 text-sm text-slate-300">New here? <Link href="/signup" className="text-blue-200">Create account</Link></p>
    </AuthShell>
  );
}
