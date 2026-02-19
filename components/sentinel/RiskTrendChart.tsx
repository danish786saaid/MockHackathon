"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MOCK_RISK_TREND } from "@/lib/constants";

const RANGE_BUTTONS = ["D", "1W", "1M", "6M", "1Y"];

export default function RiskTrendChart() {
  const [activeRange, setActiveRange] = useState("6M");

  return (
    <div className="glass-card h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Risk Trend</h3>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
          {RANGE_BUTTONS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeRange === r ? "text-white" : "text-[#94a3b8] hover:text-white"
              }`}
              style={activeRange === r ? { background: "#3b82f6" } : undefined}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_RISK_TREND} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0d1424",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#94a3b8",
              }}
            />
            <Area type="monotone" dataKey="risk" stroke="#3b82f6" strokeWidth={2} fill="url(#riskGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
