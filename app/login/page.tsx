"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { setAuthCookie } from "@/lib/auth/session";
import { signInWithEmailPassword } from "@/lib/auth/supabase-auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your LifeOS command center.">
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          const res = await signInWithEmailPassword(email, password);
          setLoading(false);
          if (!res.success) {
            setError(res.error || "Sign in failed.");
            return;
          }
          setAuthCookie();
          window.location.href = "/dashboard";
        }}
      >
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Email" type="email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Password" type="password" required />
        {error ? <p className="text-xs text-amber-300">{error}</p> : null}
        <button className="h-11 w-full rounded-xl bg-blue-500/80 text-sm font-medium">{loading ? "Signing in..." : "Sign In"}</button>
      </form>
      <p className="mt-4 text-sm text-slate-300">New here? <Link href="/signup" className="text-blue-200">Create account</Link></p>
    </AuthShell>
  );
}
