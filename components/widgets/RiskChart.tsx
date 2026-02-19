"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MOCK_RISK_TREND, MOCK_SENTIMENT } from "@/lib/constants";

interface RiskChartProps {
  type: "line" | "donut";
}

export default function RiskChart({ type }: RiskChartProps) {
  if (type === "donut") {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={MOCK_SENTIMENT}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
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
              backgroundColor: "#0d1424",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#94a3b8",
            }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={MOCK_RISK_TREND}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
        <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0d1424",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            color: "#94a3b8",
          }}
        />
        <Line
          type="monotone"
          dataKey="risk"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
