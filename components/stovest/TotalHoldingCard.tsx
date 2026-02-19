"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";
import { TOTAL_HOLDING } from "@/lib/stovest-data";

export default function TotalHoldingCard() {
  const { value, returnPct, returnAmount } = TOTAL_HOLDING;
  return (
    <div className="glass-card flex h-full flex-col justify-between p-7">
      <div className="flex items-start justify-between">
        <p className="text-theme-muted text-xs font-medium uppercase tracking-widest">Total Holding</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ea580c]/10">
          <TrendingUp className="h-4 w-4 text-[#ea580c]" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-theme-primary text-4xl font-bold tracking-tight">
          ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#22c55e]/10 px-2.5 py-1 text-xs font-medium text-[#22c55e]">
            <ArrowUpRight className="h-3 w-3" />
            +{returnPct}%
          </span>
          <span className="text-theme-muted text-xs">+${returnAmount} return</span>
        </div>
      </div>
    </div>
  );
}
