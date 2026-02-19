"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PERFORMANCE_DATA } from "@/lib/stovest-data";

const RANGE_BUTTONS = ["D", "1W", "1M", "6M", "1Y"];

export default function PortfolioPerformanceChart() {
  const [activeRange, setActiveRange] = useState("6M");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Portfolio Performance</h3>
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {RANGE_BUTTONS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeRange === r ? "bg-[#3b82f6] text-white" : "text-[#94a3b8] hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PERFORMANCE_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))} domain={[0, 200000]} ticks={[0, 50000, 100000, 150000, 200000]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#16181c",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#94a3b8",
              }}
              formatter={(value: number) => [`$${value?.toLocaleString()}`, ""]}
              labelFormatter={(label) => `1st ${label} 2024`}
            />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#performanceGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
