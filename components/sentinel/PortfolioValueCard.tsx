"use client";

import { ChevronDown } from "lucide-react";

export default function PortfolioValueCard() {
  return (
    <div className="glass-card flex h-full flex-col justify-center p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">Portfolio Value</p>
          <p className="mt-3 text-4xl font-bold text-white">$124,520</p>
          <p className="mt-2 text-sm" style={{ color: "#22c55e" }}>
            Return <span className="font-medium">+2.4% ($530)</span>
          </p>
          <p className="text-xs text-[#94a3b8]">vs last week</p>
        </div>
        <button className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-white/10 hover:text-white">
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
