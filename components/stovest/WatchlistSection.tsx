"use client";

import { useState } from "react";
import { WATCHLIST } from "@/lib/stovest-data";

const FILTERS = ["Most Viewed", "Gainers", "Losers"];

export default function WatchlistSection() {
  const [activeFilter, setActiveFilter] = useState("Most Viewed");

  const filteredList =
    activeFilter === "Gainers"
      ? WATCHLIST.filter((item) => item.change >= 0)
      : activeFilter === "Losers"
        ? WATCHLIST.filter((item) => item.change < 0)
        : WATCHLIST;

  return (
    <div className="glass-card overflow-hidden p-6">
      <div className="mb-4 flex flex-col gap-3">
        <h3 className="text-base font-semibold text-white">Watchlist</h3>
        <div className="flex w-full max-w-full flex-wrap gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-1 min-w-0 rounded-md px-2 py-1.5 text-xs font-medium transition-colors sm:flex-none sm:min-w-0 ${
                activeFilter === f
                  ? "text-white"
                  : "text-[#78716c] hover:bg-white/[0.04] hover:text-white"
              }`}
              style={activeFilter === f ? { background: "rgba(234, 88, 12, 0.15)", color: "#f97316" } : undefined}
            >
              {f === "Most Viewed" ? "Viewed" : f}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {filteredList.map((item) => (
          <div key={item.name} className="glass-subtle flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-xs text-[#78716c]">{item.exchange}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">${item.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}</p>
              <p className={`text-sm font-medium ${item.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                {item.change >= 0 ? "+" : ""}{item.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
