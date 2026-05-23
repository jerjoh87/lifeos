"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell title="Create your LifeOS" subtitle="Start building your AI-powered life operating system.">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => (window.location.href = "/onboarding"), 700);
        }}
      >
        <input className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Full name" required />
        <input className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Email" type="email" required />
        <input className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Password" type="password" required />
        <button className="h-11 w-full rounded-xl bg-blue-500/80 text-sm font-medium">{loading ? "Creating..." : "Create Account"}</button>
      </form>
      <p className="mt-4 text-sm text-slate-300">Already have an account? <Link href="/login" className="text-blue-200">Sign in</Link></p>
    </AuthShell>
  );
}
