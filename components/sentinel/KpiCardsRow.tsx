"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Kpi = { label: string; value: string; change: string; changeLabel: string; positive: boolean };

export default function KpiCardsRow() {
  const user = useUser();
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    async function fetchKpis() {
      const [portfolioRes, rulesRes, trustRes] = await Promise.all([
        supabase.from("portfolio").select("value, return_pct").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("rules").select("id, status").eq("user_id", user.id),
        supabase.from("trust_gauge").select("state, percent").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
      ]);

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
    }
    fetchKpis();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-[24px]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card flex flex-col justify-between p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-6 w-16 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-[24px]">
      {kpis.map((kpi) => {
        const positive = kpi.positive;
        const TrendIcon = positive ? TrendingUp : TrendingDown;
        return (
          <div key={kpi.label} className="glass-card flex flex-col justify-between p-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#94a3b8]">{kpi.label}</p>
            <p className="mt-1 text-xl font-bold text-white">{kpi.value}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <TrendIcon className="h-3.5 w-3.5 shrink-0" style={{ color: positive ? "#3b82f6" : "#ef4444" }} />
              <span className="text-xs font-medium" style={{ color: positive ? "#3b82f6" : "#ef4444" }}>
                {kpi.change}
              </span>
              <span className="truncate text-[10px] text-[#94a3b8]">{kpi.changeLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
