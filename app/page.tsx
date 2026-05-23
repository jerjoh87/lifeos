import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-card-border bg-card p-6 text-center shadow-glow backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-blue-200/80">LifeOS</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Welcome to your life command center</h1>
        <p className="mt-3 text-sm text-slate-300">Your dashboard is ready. Continue to the premium control hub.</p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-blue-300/25 bg-blue-500/15 px-5 text-sm font-medium text-blue-100 transition hover:bg-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
