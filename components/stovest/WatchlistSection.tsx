"use client";

import { useState } from "react";
import { WATCHLIST } from "@/lib/stovest-data";

const FILTERS = ["Most Viewed", "Gainers", "Losers"];

export default function WatchlistSection() {
  const [activeFilter, setActiveFilter] = useState("Most Viewed");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Watchlist</h3>
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f ? "bg-[#3b82f6] text-white" : "text-[#94a3b8] hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {WATCHLIST.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
            <div>
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-xs text-[#94a3b8]">{item.exchange}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">${item.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}</p>
              <p className="text-sm text-[#22c55e]">+{item.change}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
