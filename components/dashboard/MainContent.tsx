"use client";

import { useState, useEffect } from "react";
import { Clock, RefreshCw, Globe, Bell, User } from "lucide-react";
import KpiCard from "@/components/widgets/KpiCard";
import TrustGauge from "@/components/widgets/TrustGauge";
import RiskChart from "@/components/widgets/RiskChart";
import RulesList from "@/components/widgets/RulesList";
import CircuitBreakerPanel from "@/components/widgets/CircuitBreakerPanel";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Kpi = { label: string; value: string; change: string; changeLabel: string; positive: boolean };

const headerIconBtn =
  "rounded-full p-2.5 text-[#94a3b8] transition-colors hover:bg-white/10 hover:text-[#22d3ee]";
const headerIconBg = { background: "rgba(255,255,255,0.05)" };

export default function MainContent() {
  const user = useUser();
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = user?.id;
    if (!supabase || !userId) return;
    Promise.all([
      supabase.from("portfolio").select("value, return_pct").eq("user_id", userId).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("rules").select("id, status").eq("user_id", userId),
      supabase.from("trust_gauge").select("state, percent").eq("user_id", userId).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
    ]).then(([portfolioRes, rulesRes, trustRes]) => {
      const portfolio = portfolioRes.data;
      const rules = rulesRes.data ?? [];
      const activeCount = rules.filter((r: { status: string }) => r.status === "active").length;

      setKpis([
        {
          label: "Portfolio Value",
          value: portfolio ? `$${Number(portfolio.value).toLocaleString()}` : "$0",
          change: portfolio ? `+${portfolio.return_pct}%` : "0%",
          changeLabel: "vs last week",
          positive: true,
        },
        {
          label: "Rules Active",
          value: String(activeCount),
          change: `+${activeCount}`,
          changeLabel: "configured",
          positive: true,
        },
        {
          label: "Circuit Breakers",
          value: "0",
          change: "0",
          changeLabel: "triggered today",
          positive: true,
        },
        {
          label: "Risk Level",
          value: trustRes.data?.state === "danger" ? "High" : trustRes.data?.state === "warning" ? "Elevated" : "Low",
          change: trustRes.data?.state === "danger" ? "High" : trustRes.data?.state === "warning" ? "Elevated" : "Safe",
          changeLabel: `AI confidence ${trustRes.data?.percent ?? 0}%`,
          positive: trustRes.data?.state !== "danger",
        },
      ]);
      setLoading(false);
    });
  }, [user?.id]);

  return (
    <main className="ml-[260px] mr-[320px] min-h-screen p-6 pb-10">
      <header className="mb-6 flex shrink-0 items-center justify-between">
        <div>
          <p className="text-sm text-[#94a3b8]">Dashboards / Overview</p>
          <h1 className="text-2xl font-bold text-white">Overview</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className={headerIconBtn} style={headerIconBg} title="History">
            <Clock className="h-5 w-5" />
          </button>
          <button className={headerIconBtn} style={headerIconBg} title="Refresh">
            <RefreshCw className="h-5 w-5" />
          </button>
          <button className={headerIconBtn} style={headerIconBg} title="Globe">
            <Globe className="h-5 w-5" />
          </button>
          <button className={headerIconBtn} style={headerIconBg} title="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <button className={headerIconBtn} style={headerIconBg} title="Profile">
            <User className="h-5 w-5" />
          </button>
          <select className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#3b82f6]/50 focus:outline-none" style={{ background: "rgba(255,255,255,0.05)" }}>
            <option>Today</option>
          </select>
        </div>
      </header>

      <div className="space-y-5">
        <section className="grid grid-cols-4 gap-4">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card h-24 animate-pulse rounded-xl" />
            ))
          ) : (
            kpis.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))
          )}
        </section>

        <section className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <TrustGauge />
          </div>
          <div className="col-span-2 glass-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">News Sentiment</h3>
            <RiskChart type="donut" />
          </div>
        </section>

        <section className="grid grid-cols-3 gap-6">
          <div className="col-span-2 glass-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">Risk Trend</h3>
            <RiskChart type="line" />
          </div>
          <div>
            <CircuitBreakerPanel />
          </div>
        </section>

        <section>
          <RulesList />
        </section>
      </div>
    </main>
  );
}
