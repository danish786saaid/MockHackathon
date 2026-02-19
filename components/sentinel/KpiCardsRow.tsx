"use client";

import { MOCK_KPI } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/use-translation";
import { TrendingUp, TrendingDown } from "lucide-react";

const KPI_LABEL_KEYS: Record<string, string> = {
  "Portfolio Value": "dashboard.portfolioValue",
  "Rules Active": "dashboard.rulesActive",
  "Circuit Breakers": "dashboard.circuitBreakers",
  "Risk Level": "dashboard.riskLevel",
};
const KPI_CHANGE_LABEL_KEYS: Record<string, string> = {
  "vs last week": "dashboard.vsLastWeek",
  "configured": "dashboard.configured",
  "triggered today": "dashboard.triggeredToday",
  "AI confidence 94%": "dashboard.aiConfidence94",
};

export default function KpiCardsRow() {
  const { t } = useTranslation();
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-[24px]">
      {MOCK_KPI.map((kpi) => {
        const positive = kpi.positive;
        const TrendIcon = positive ? TrendingUp : TrendingDown;
        const labelKey = KPI_LABEL_KEYS[kpi.label] ?? kpi.label;
        const changeLabelKey = KPI_CHANGE_LABEL_KEYS[kpi.changeLabel] ?? kpi.changeLabel;
        return (
          <div key={kpi.label} className="glass-card flex flex-col justify-between p-4">
            <p className="text-theme-secondary text-[10px] font-medium uppercase tracking-wider">{t(labelKey)}</p>
            <p className="text-theme-primary mt-1 text-xl font-bold">{kpi.value}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <TrendIcon className="h-3.5 w-3.5 shrink-0" style={{ color: positive ? "#f97316" : "#ef4444" }} />
              <span className="text-xs font-medium" style={{ color: positive ? "#f97316" : "#ef4444" }}>
                {kpi.change}
              </span>
              <span className="text-theme-muted truncate text-[10px]">{t(changeLabelKey)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
