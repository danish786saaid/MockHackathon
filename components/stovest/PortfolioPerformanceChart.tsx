"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  PERFORMANCE_DATA_DAY,
  PERFORMANCE_DATA_WEEK,
  PERFORMANCE_DATA_1M,
  PERFORMANCE_DATA_6M,
  PERFORMANCE_DATA_1Y,
} from "@/lib/stovest-data";

const RANGE_BUTTONS = ["D", "1W", "1M", "6M", "1Y"] as const;

const RANGE_DATA: Record<(typeof RANGE_BUTTONS)[number], { data: { month?: string; label?: string; value: number }[]; xKey: string }> = {
  D: { data: PERFORMANCE_DATA_DAY, xKey: "label" },
  "1W": { data: PERFORMANCE_DATA_WEEK, xKey: "month" },
  "1M": { data: PERFORMANCE_DATA_1M, xKey: "month" },
  "6M": { data: PERFORMANCE_DATA_6M, xKey: "month" },
  "1Y": { data: PERFORMANCE_DATA_1Y, xKey: "month" },
};

export default function PortfolioPerformanceChart() {
  const [activeRange, setActiveRange] = useState<(typeof RANGE_BUTTONS)[number]>("6M");

  const { data, xKey } = useMemo(() => RANGE_DATA[activeRange], [activeRange]);
  const domain = useMemo(() => {
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1 || 10000;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [data]);

  return (
    <div className="glass-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-theme-primary text-base font-semibold">Portfolio Performance</h3>
        <div className="flex shrink-0 gap-0 rounded-lg border border-white/[0.06] bg-white/[0.03] p-0.5">
          {RANGE_BUTTONS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`min-w-[2.25rem] rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeRange === r
                  ? "text-white"
                  : "text-theme-muted hover:bg-white/[0.04] hover:text-theme-primary"
              }`}
              style={activeRange === r ? { background: "rgba(234, 88, 12, 0.15)", color: "#f97316" } : undefined}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ea580c" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ea580c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#78716c"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#78716c"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))}
              domain={domain}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#a8a29e",
                backdropFilter: "blur(40px)",
              }}
              formatter={(value: number) => [`$${value?.toLocaleString()}`, ""]}
              labelFormatter={(label) => (activeRange === "D" ? `${label} today` : `${label}`)}
            />
            <Area type="monotone" dataKey="value" stroke="#ea580c" strokeWidth={2} fill="url(#performanceGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
