"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type RiskState = "safe" | "warning" | "danger";

const states: Record<RiskState, { color: string; label: string }> = {
  safe: { color: "#3b82f6", label: "Low Risk" },
  warning: { color: "#f59e0b", label: "Elevated" },
  danger: { color: "#ef4444", label: "High Risk" },
};

export default function TrustGaugeCard() {
  const user = useUser();
  const [state, setState] = useState<RiskState>("safe");
  const [percent, setPercent] = useState(0);
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const { data: sub } = supabase
      .channel("realtime:trust_gauge")
      .on("postgres_changes", { event: "*", schema: "public", table: "trust_gauge" }, (payload) => {
        const row = payload.new as { state: RiskState; percent: number; reason?: string };
        setState(row.state ?? "safe");
        setPercent(row.percent ?? 94);
        setReason(row.reason ?? "");
      })
      .subscribe();

    async function fetchTrust() {
      const { data } = await supabase
        .from("trust_gauge")
        .select("state, percent, reason")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setState((data.state as RiskState) ?? "safe");
        setPercent(Number(data.percent) ?? 0);
        setReason(data.reason ?? "");
      } else {
        setPercent(0);
      }
      setLoading(false);
    }
    fetchTrust();

    return () => {
      sub?.unsubscribe();
    };
  }, [user?.id]);

  const { color, label } = states[state];
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  if (loading) {
    return (
      <div className="glass-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">Trust Gauge</h3>
        <div className="flex h-44 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card flex h-full flex-col p-7">
      <h3 className="text-xs font-medium uppercase tracking-widest text-[#78716c]">Trust Gauge</h3>

      <div className="relative flex flex-1 flex-col items-center justify-center py-4">
        <svg className="h-40 w-40 -rotate-90 shrink-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tight text-white">{percent}%</span>
          <span className="mt-1 text-xs font-medium" style={{ color }}>{label}</span>
        </div>
      </div>

      <p className="text-[11px] text-[#78716c] text-center">{reason || "AI confidence score. No high-risk events in 24h."}</p>
    </div>
  );
}
