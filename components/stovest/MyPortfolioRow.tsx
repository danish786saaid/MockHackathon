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
        <h3 className="text-theme-primary text-base font-semibold">My Portfolio</h3>
        {onSeeAllClick ? (
          <button
            type="button"
            onClick={onSeeAllClick}
            className="flex items-center gap-1 text-sm text-[#ea580c] hover:text-[#f97316]"
          >
            See all <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <a
            href="#portfolio-overview"
            className="flex items-center gap-1 text-sm text-[#ea580c] hover:text-[#f97316]"
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
            <p className="text-theme-primary text-lg font-bold">${s.value.toLocaleString("en-US", { minimumFractionDigits: 1 })}</p>
            <p className={`text-sm font-medium ${s.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
              {s.change >= 0 ? "+" : ""}{s.change}%
            </p>
            <p className="text-theme-muted mt-1 truncate text-xs" title={`${s.ticker}, Units ${s.units}`}>
              {s.ticker}, Units {s.units}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
