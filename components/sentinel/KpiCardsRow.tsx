"use client";

import { MOCK_KPI } from "@/lib/constants";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCardsRow() {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-[24px]">
      {MOCK_KPI.map((kpi) => {
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
