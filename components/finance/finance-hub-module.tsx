"use client";

import { useEffect, useMemo, useState } from "react";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Bill, BudgetCategory, defaultFinanceState, loadFinanceState, saveFinanceState, Subscription } from "@/lib/finance-storage";
import { createId } from "@/lib/id";
import { Bell, CreditCard, PieChart, ReceiptText, Trash2, Wallet } from "lucide-react";

export function FinanceHubModule() {
  const [bills, setBills] = useState<Bill[]>(defaultFinanceState.bills);
  const [subs, setSubs] = useState<Subscription[]>(defaultFinanceState.subscriptions);
  const [budgets, setBudgets] = useState<BudgetCategory[]>(defaultFinanceState.budgets);

  const [billName, setBillName] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [subName, setSubName] = useState("");
  const [subAmount, setSubAmount] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [budgetLimit, setBudgetLimit] = useState("");
  const [loading, setLoading] = useState(true);
  const [storageWarning, setStorageWarning] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    const loaded = loadFinanceState();
    setBills(loaded.state.bills);
    setSubs(loaded.state.subscriptions);
    setBudgets(loaded.state.budgets);
    setStorageWarning(loaded.hadCorruption ? "Stored finance data was reset due to corruption." : "");
    setLoading(false);
  }, []);

  useEffect(() => saveFinanceState({ bills, subscriptions: subs, budgets }), [bills, subs, budgets]);

  const monthlySubs = useMemo(() => subs.reduce((sum, s) => sum + (s.cycle === "monthly" ? s.amount : s.amount / 12), 0), [subs]);
  const totalBudget = useMemo(() => budgets.reduce((sum, b) => sum + b.limit, 0), [budgets]);
  const totalSpent = useMemo(() => budgets.reduce((sum, b) => sum + b.spent, 0), [budgets]);
  const dueBills = useMemo(() => bills.filter((b) => !b.paid).length, [bills]);

  return (
    <section className="grid grid-cols-1 gap-4">
      {loading ? <AppCard><p className="text-sm text-slate-300">Loading finance data...</p></AppCard> : null}
      {storageWarning ? <AppCard><p className="text-sm text-amber-300">{storageWarning}</p></AppCard> : null}
      {hint ? <AppCard><p className="text-sm text-rose-300">{hint}</p></AppCard> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppCard><SectionHeader title="Bills Due" icon={Bell} /><p className="text-3xl font-semibold">{dueBills}</p></AppCard>
        <AppCard><SectionHeader title="Subscriptions" icon={CreditCard} /><p className="text-3xl font-semibold">${monthlySubs.toFixed(0)}/mo</p></AppCard>
        <AppCard><SectionHeader title="Budget Used" icon={PieChart} /><p className="text-3xl font-semibold">{totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0}%</p></AppCard>
        <AppCard><SectionHeader title="Monthly Spend" icon={Wallet} /><p className="text-3xl font-semibold">${totalSpent.toFixed(0)}</p></AppCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <AppCard className="lg:col-span-6">
          <SectionHeader title="Bills Dashboard" icon={ReceiptText} />
          <div className="mb-3 grid grid-cols-2 gap-2">
            <input value={billName} onChange={(e) => setBillName(e.target.value)} placeholder="Bill name" className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
            <input value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="Amount" type="number" className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
          </div>
          <button
            onClick={() => {
              const amt = Number(billAmount);
              if (!billName.trim() || !billAmount) { setHint("Bill name and amount are required."); return; }
              if (!Number.isFinite(amt) || amt < 0) { setHint("Bill amount must be 0 or greater."); return; }
              setHint("");
              setBills((prev) => [...prev, { id: createId("fin"), name: billName.trim(), amount: amt, dueDate: new Date().toISOString().slice(0,10), paid: false }]);
              setBillName(""); setBillAmount("");
            }}
            className="mb-3 h-10 w-full rounded-lg bg-blue-500/80 text-sm"
          >Add Bill</button>
          <div className="space-y-2">
            {bills.length === 0 ? <p className="rounded-lg border border-dashed border-white/20 p-4 text-sm text-slate-400">No bills yet.</p> : bills.map((bill) => (
              <div key={bill.id} className="rounded-lg border border-white/10 bg-[#0a1020]/70 p-2">
                <div className="flex items-center gap-2">
                  <input value={bill.name} onChange={(e) => setBills((prev) => prev.map((x) => x.id === bill.id ? { ...x, name: e.target.value } : x))} className="min-w-0 flex-1 bg-transparent text-sm" />
                  <input value={bill.amount} type="number" onChange={(e) => setBills((prev) => prev.map((x) => x.id === bill.id ? { ...x, amount: Math.max(0, Number(e.target.value) || 0) } : x))} className="w-24 rounded border border-white/10 bg-[#0d1629] px-2 py-1 text-xs" />
                  <button onClick={() => setBills((prev) => prev.filter((x) => x.id !== bill.id))}><Trash2 className="h-4 w-4 text-rose-300" /></button>
                </div>
                <label className="mt-2 inline-flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={bill.paid} onChange={() => setBills((prev) => prev.map((x) => x.id === bill.id ? { ...x, paid: !x.paid } : x))} /> Paid</label>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard className="lg:col-span-6">
          <SectionHeader title="Subscription Tracker" icon={CreditCard} />
          <div className="mb-3 grid grid-cols-2 gap-2">
            <input value={subName} onChange={(e) => setSubName(e.target.value)} placeholder="Subscription" className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
            <input value={subAmount} onChange={(e) => setSubAmount(e.target.value)} placeholder="Amount" type="number" className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
          </div>
          <button onClick={() => { const amt = Number(subAmount); if (!subName.trim() || !subAmount) { setHint("Subscription name and amount are required."); return; } if (!Number.isFinite(amt) || amt < 0) { setHint("Subscription amount must be 0 or greater."); return; } setHint(""); setSubs((prev) => [...prev, { id: createId("fin"), name: subName.trim(), amount: amt, cycle: "monthly" }]); setSubName(""); setSubAmount(""); }} className="mb-3 h-10 w-full rounded-lg bg-blue-500/80 text-sm">Add Subscription</button>
          <div className="space-y-2">
            {subs.length === 0 ? <p className="rounded-lg border border-dashed border-white/20 p-4 text-sm text-slate-400">No subscriptions yet.</p> : subs.map((s) => (
              <div key={s.id} className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0a1020]/70 p-2">
                <input value={s.name} onChange={(e) => setSubs((prev) => prev.map((x) => x.id === s.id ? { ...x, name: e.target.value } : x))} className="min-w-0 flex-1 bg-transparent text-sm" />
                <input value={s.amount} type="number" onChange={(e) => setSubs((prev) => prev.map((x) => x.id === s.id ? { ...x, amount: Math.max(0, Number(e.target.value) || 0) } : x))} className="w-20 rounded border border-white/10 bg-[#0d1629] px-2 py-1 text-xs" />
                <button onClick={() => setSubs((prev) => prev.filter((x) => x.id !== s.id))}><Trash2 className="h-4 w-4 text-rose-300" /></button>
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      <AppCard>
        <SectionHeader title="Budget Categories & Spending Overview" icon={PieChart} />
        <div className="mb-3 grid grid-cols-2 gap-2">
          <input value={budgetName} onChange={(e) => setBudgetName(e.target.value)} placeholder="Category" className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
          <input value={budgetLimit} onChange={(e) => setBudgetLimit(e.target.value)} placeholder="Limit" type="number" className="h-10 rounded-lg border border-white/10 bg-[#0a1020]/70 px-3 text-sm" />
        </div>
        <button onClick={() => { const lim = Number(budgetLimit); if (!budgetName.trim() || !budgetLimit) { setHint("Category name and limit are required."); return; } if (!Number.isFinite(lim) || lim <= 0) { setHint("Budget limit must be greater than 0."); return; } setHint(""); setBudgets((prev) => [...prev, { id: createId("fin"), name: budgetName.trim(), limit: lim, spent: 0 }]); setBudgetName(""); setBudgetLimit(""); }} className="mb-3 h-10 w-full rounded-lg bg-blue-500/80 text-sm">Add Category</button>
        <div className="space-y-2">
          {budgets.length === 0 ? <p className="rounded-lg border border-dashed border-white/20 p-4 text-sm text-slate-400">No categories yet.</p> : budgets.map((b) => (
            <div key={b.id} className="rounded-lg border border-white/10 bg-[#0a1020]/70 p-2">
              <div className="mb-1 flex items-center justify-between text-sm"><span>{b.name}</span><span>${b.spent} / ${b.limit}</span></div>
              <div className="h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-blue-400" style={{ width: `${Math.min(100, (b.spent / Math.max(1,b.limit)) * 100)}%` }} /></div>
              <div className="mt-2 flex gap-2">
                <input type="number" value={b.spent} onChange={(e) => setBudgets((prev) => prev.map((x) => x.id === b.id ? { ...x, spent: Math.max(0, Number(e.target.value) || 0) } : x))} className="h-8 w-full rounded border border-white/10 bg-[#0d1629] px-2 text-xs" />
                <button onClick={() => setBudgets((prev) => prev.filter((x) => x.id !== b.id))}><Trash2 className="h-4 w-4 text-rose-300" /></button>
              </div>
            </div>
          ))}
        </div>
      </AppCard>
    </section>
  );
}
