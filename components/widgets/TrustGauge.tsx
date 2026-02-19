"use client";

import { useState } from "react";

type RiskState = "safe" | "warning" | "danger";

const states: Record<RiskState, { color: string; label: string; percent: number }> = {
  safe: { color: "#3b82f6", label: "Low Risk", percent: 94 },
  warning: { color: "#f59e0b", label: "Elevated", percent: 65 },
  danger: { color: "#ef4444", label: "High Risk", percent: 25 },
};

export default function TrustGauge() {
  const [state] = useState<RiskState>("safe");
  const { color, label, percent } = states[state];

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="glass-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">Trust Gauge</h3>
      <div className="relative flex flex-col items-center">
        <svg className="h-44 w-44 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
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
          <span className="text-2xl font-bold text-white">{percent}%</span>
          <span className="text-xs font-medium" style={{ color }}>
            {label}
          </span>
          <p className="mt-2 max-w-[120px] text-center text-[10px] text-[#94a3b8]">
            AI confidence score
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-[#94a3b8]">
        Why: No high-risk news matched your rules in the last 24h.
      </p>
    </div>
  );
}
