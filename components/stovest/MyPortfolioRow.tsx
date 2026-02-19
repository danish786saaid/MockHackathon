"use client";

import { ChevronRight } from "lucide-react";
import { PORTFOLIO_STOCKS } from "@/lib/stovest-data";

type MyPortfolioRowProps = {
  onSeeAllClick?: () => void;
};

export default function MyPortfolioRow({ onSeeAllClick }: MyPortfolioRowProps) {
  return (
    <div className="glass-card flex h-full flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">My Portfolio</h3>
        {onSeeAllClick ? (
          <button
            type="button"
            onClick={onSeeAllClick}
            className="flex items-center gap-1 text-sm text-[#3b82f6] hover:text-[#60a5fa]"
          >
            See all <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <a
            href="#portfolio-overview"
            className="flex items-center gap-1 text-sm text-[#3b82f6] hover:text-[#60a5fa]"
          >
            See all <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {PORTFOLIO_STOCKS.map((s) => (
          <div
            key={s.ticker}
            className="glass-subtle min-w-[140px] shrink-0 px-4 py-3"
          >
            <p className="text-lg font-bold text-white">${s.value.toLocaleString("en-US", { minimumFractionDigits: 1 })}</p>
            <p className={`text-sm font-medium ${s.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
              {s.change >= 0 ? "+" : ""}{s.change}%
            </p>
            <p className="mt-1 truncate text-xs text-[#94a3b8]" title={`${s.ticker}, Units ${s.units}`}>
              {s.ticker}, Units {s.units}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
