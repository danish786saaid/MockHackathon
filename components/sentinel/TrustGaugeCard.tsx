"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/use-translation";

type RiskState = "safe" | "warning" | "danger";

const stateKeys: Record<RiskState, string> = {
  safe: "dashboard.lowRisk",
  warning: "dashboard.elevatedRisk",
  danger: "dashboard.highRisk",
};

const states: Record<RiskState, { color: string; percent: number }> = {
  safe: { color: "#22c55e", percent: 94 },
  warning: { color: "#f59e0b", percent: 65 },
  danger: { color: "#ef4444", percent: 25 },
};

export default function TrustGaugeCard() {
  const { t } = useTranslation();
  const [state] = useState<RiskState>("safe");
  const { color, percent } = states[state];
  const label = t(stateKeys[state]);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="glass-card flex h-full flex-col p-6">
      <h3 className="text-theme-secondary mb-4 text-sm font-semibold">{t("dashboard.trustGauge")}</h3>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <svg className="h-36 w-36 -rotate-90 shrink-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-theme-primary text-xl font-bold">{percent}%</span>
          <span className="text-xs font-medium" style={{ color }}>{label}</span>
        </div>
      </div>
      <p className="text-theme-muted mt-3 text-[10px]">{t("dashboard.aiConfidenceNote")}</p>
    </div>
  );
}
