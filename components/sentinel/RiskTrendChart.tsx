"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "@/lib/i18n/use-translation";
import { MOCK_RISK_TREND } from "@/lib/constants";

const RANGE_BUTTONS = ["D", "1W", "1M", "6M", "1Y"];

export default function RiskTrendChart() {
  const { t } = useTranslation();
  const [activeRange, setActiveRange] = useState("6M");

  return (
    <div className="glass-card h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-theme-primary text-base font-semibold">{t("dashboard.riskTrend")}</h3>
        <div className="flex gap-1 rounded-lg p-1 bg-white/[0.05]">
          {RANGE_BUTTONS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeRange === r ? "text-white" : "text-[#a8a29e] hover:text-white"
              }`}
              style={activeRange === r ? { background: "rgba(234, 88, 12, 0.3)", color: "#f97316" } : undefined}
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
                <stop offset="0%" stopColor="#ea580c" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ea580c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="day" stroke="#78716c" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#78716c" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#1c1917",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#a8a29e",
              }}
            />
            <Area type="monotone" dataKey="risk" stroke="#ea580c" strokeWidth={2} fill="url(#riskGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
