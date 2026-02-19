"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function PortfolioValueCard() {
  return (
    <div className="glass-card flex h-full flex-col justify-between p-7">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-[#78716c]">Total Portfolio</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ea580c]/10">
          <TrendingUp className="h-4 w-4 text-[#ea580c]" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-bold tracking-tight text-white">$124,520</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#22c55e]/10 px-2.5 py-1 text-xs font-medium text-[#22c55e]">
            <ArrowUpRight className="h-3 w-3" />
            +2.4%
          </span>
          <span className="text-xs text-[#78716c]">+$530 vs last week</span>
        </div>
      </div>
    </div>
  );
}
