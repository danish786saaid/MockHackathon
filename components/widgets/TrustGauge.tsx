"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type RiskState = "safe" | "warning" | "danger";

const states: Record<RiskState, { color: string; label: string; percent: number }> = {
  safe: { color: "#3b82f6", label: "Low Risk", percent: 94 },
  warning: { color: "#f59e0b", label: "Elevated", percent: 65 },
  danger: { color: "#ef4444", label: "High Risk", percent: 25 },
};

export default function TrustGauge() {
  const user = useUser();
  const [state, setState] = useState<RiskState>("safe");
  const [percent, setPercent] = useState(0);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("trust_gauge")
      .select("state, percent, reason")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setState((data.state as RiskState) ?? "safe");
          setPercent(Number(data.percent) ?? 0);
          setReason(data.reason ?? "");
        } else {
          setPercent(0);
        }
        setLoading(false);
      });
  }, [user?.id]);

  const { color, label } = states[state];
  const displayPercent = percent;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (displayPercent / 100) * circumference;

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
    <div className="glass-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">Trust Gauge</h3>
      <div className="relative flex flex-col items-center">
        <svg className="h-44 w-44 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{displayPercent}%</span>
          <span className="text-xs font-medium" style={{ color }}>
            {label}
          </span>
          <p className="mt-2 max-w-[120px] text-center text-[10px] text-[#94a3b8]">AI confidence score</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-[#94a3b8]">{reason || "Why: No high-risk news matched your rules in the last 24h."}</p>
    </div>
  );
}
