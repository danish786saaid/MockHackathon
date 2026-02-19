"use client";

import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { OVERVIEW_ROWS } from "@/lib/stovest-data";

const FILTERS = ["All", "Gainers", "Losers"];
const miniTrendUp = [{ v: 0 }, { v: 2 }, { v: 1 }, { v: 3 }];
const miniTrendDown = [{ v: 3 }, { v: 1 }, { v: 2 }, { v: 0 }];

export default function PortfolioOverviewTable() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Portfolio Overview</h3>
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
            {OVERVIEW_ROWS.map((row) => (
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
