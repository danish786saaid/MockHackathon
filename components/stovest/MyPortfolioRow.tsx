"use client";

import { ChevronRight } from "lucide-react";
import { PORTFOLIO_STOCKS } from "@/lib/stovest-data";

export default function MyPortfolioRow() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">My Portfolio</h3>
        <button className="flex items-center gap-1 text-sm text-[#3b82f6] hover:text-[#60a5fa]">
          See all <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {PORTFOLIO_STOCKS.map((s) => (
          <div
            key={s.ticker}
            className="min-w-[140px] rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <p className="text-lg font-bold text-white">${s.value.toLocaleString("en-US", { minimumFractionDigits: 1 })}</p>
            <p className={`text-sm font-medium ${s.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
              {s.change >= 0 ? "+" : ""}{s.change}%
            </p>
            <p className="mt-1 text-xs text-[#94a3b8]">{s.ticker}, Units {s.units}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
