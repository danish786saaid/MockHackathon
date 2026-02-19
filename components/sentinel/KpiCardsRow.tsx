"use client";

import { MOCK_KPI } from "@/lib/constants";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCardsRow() {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-5">
      {MOCK_KPI.map((kpi) => {
        const positive = kpi.positive;
        const TrendIcon = positive ? TrendingUp : TrendingDown;
        return (
          <div key={kpi.label} className="glass-card flex flex-col justify-between p-5">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#78716c]">{kpi.label}</p>
            <div>
              <p className="mt-2 text-2xl font-bold tracking-tight text-white">{kpi.value}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <TrendIcon
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: positive ? "#22c55e" : "#ef4444" }}
                />
                <span className="text-xs font-medium" style={{ color: positive ? "#22c55e" : "#ef4444" }}>
                  {kpi.change}
                </span>
                <span className="truncate text-[11px] text-[#78716c]">{kpi.changeLabel}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
