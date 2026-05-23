"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { setAuthCookie } from "@/lib/auth/session";
import { signUpWithEmailPassword } from "@/lib/auth/supabase-auth";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell title="Create your LifeOS" subtitle="Start building your AI-powered life operating system.">
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          setNotice("");
          const res = await signUpWithEmailPassword(email, password, fullName);
          setLoading(false);
          if (!res.success) {
            setError(res.error || "Sign up failed.");
            return;
          }

          if (res.requiresEmailConfirmation) {
            setNotice("Account created. Check your email to confirm, then sign in.");
            return;
          }

          setAuthCookie();
          window.location.href = "/onboarding";
        }}
      >
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Full name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Email" type="email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-[#0a1020]/70 px-3 text-sm" placeholder="Password" type="password" required />
        {error ? <p className="text-xs text-amber-300">{error}</p> : null}
        {notice ? <p className="text-xs text-emerald-300">{notice}</p> : null}
        <button className="h-11 w-full rounded-xl bg-blue-500/80 text-sm font-medium">{loading ? "Creating..." : "Create Account"}</button>
      </form>
      <p className="mt-4 text-sm text-slate-300">Already have an account? <Link href="/login" className="text-blue-200">Sign in</Link></p>
    </AuthShell>
  );
}
