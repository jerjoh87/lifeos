"use client";

import { useState } from "react";
import { clearAuthCookie } from "@/lib/auth/session";
import { signOutFromSupabase } from "@/lib/auth/supabase-auth";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={async () => {
        setLoading(true);
        await signOutFromSupabase();
        clearAuthCookie();
        window.location.href = "/login";
      }}
      className="mt-4 h-11 rounded-xl border border-rose-300/40 bg-rose-500/10 px-4 text-sm text-rose-200"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
