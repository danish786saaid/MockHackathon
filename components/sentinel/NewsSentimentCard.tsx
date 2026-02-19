"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { MOCK_SENTIMENT } from "@/lib/constants";

export default function NewsSentimentCard() {
  return (
    <div className="glass-card flex h-full flex-col p-6">
      <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">News Sentiment</h3>
      <div className="flex flex-1 items-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={MOCK_SENTIMENT}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              paddingAngle={2}
              dataKey="value"
              stroke="transparent"
            >
              {MOCK_SENTIMENT.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#0d1424",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#94a3b8",
              }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-[10px] text-[#94a3b8]">
        {MOCK_SENTIMENT.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
