"use client";

import { useState } from "react";

type RiskState = "safe" | "warning" | "danger";

const states: Record<RiskState, { color: string; label: string; percent: number }> = {
  safe: { color: "#22c55e", label: "Low Risk", percent: 94 },
  warning: { color: "#f59e0b", label: "Elevated", percent: 65 },
  danger: { color: "#ef4444", label: "High Risk", percent: 25 },
};

export default function TrustGaugeCard() {
  const [state] = useState<RiskState>("safe");
  const { color, label, percent } = states[state];
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

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

      <p className="text-[11px] text-[#78716c] text-center">AI confidence score. No high-risk events in 24h.</p>
    </div>
  );
}
