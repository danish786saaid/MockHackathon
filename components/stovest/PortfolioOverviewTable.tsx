"use client";

import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { OVERVIEW_ROWS } from "@/lib/stovest-data";

const FILTERS = ["All", "Gainers", "Losers"];
const miniTrendUp = [{ v: 0 }, { v: 2 }, { v: 1 }, { v: 3 }];
const miniTrendDown = [{ v: 3 }, { v: 1 }, { v: 2 }, { v: 0 }];

export default function PortfolioOverviewTable() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredRows =
    activeFilter === "Gainers"
      ? OVERVIEW_ROWS.filter((r) => r.change >= 0)
      : activeFilter === "Losers"
        ? OVERVIEW_ROWS.filter((r) => r.change < 0)
        : OVERVIEW_ROWS;

  return (
    <div className="glass-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Portfolio Overview</h3>
        <div className="flex shrink-0 gap-0 rounded-lg border border-white/10 bg-white/5 p-0.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`min-w-[4rem] rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f
                  ? "bg-[#3b82f6] text-white"
                  : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-[#94a3b8]">
              <th className="pb-3 font-medium">Stock</th>
              <th className="pb-3 font-medium">Last Price</th>
              <th className="pb-3 font-medium">Change</th>
              <th className="pb-3 font-medium">Market Cap</th>
              <th className="pb-3 font-medium">Volume</th>
              <th className="pb-3 font-medium">Last 7 days</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.stock} className="border-b border-white/5 text-white">
                <td className="py-3 font-medium">{row.stock}</td>
                <td className="py-3">${row.lastPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                <td className={`py-3 font-medium ${row.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {row.change >= 0 ? "+" : ""}{row.change}%
                </td>
                <td className="py-3 text-[#94a3b8]">${row.marketCap}</td>
                <td className="py-3 text-[#94a3b8]">${row.volume}</td>
                <td className="py-3 w-20">
                  <div className="h-8 w-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={row.trend === "up" ? miniTrendUp : miniTrendDown}>
                        <Line type="monotone" dataKey="v" stroke={row.trend === "up" ? "#22c55e" : "#ef4444"} strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
