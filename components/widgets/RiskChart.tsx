"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

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
import { supabase } from "@/lib/supabaseClient";

type Sentiment = { name: string; value: number; color: string };
type RiskPoint = { day: string; risk: number; value: number };

interface RiskChartProps {
  type: "line" | "donut";
}

export default function RiskChart({ type }: RiskChartProps) {
  const user = useUser();
  const [sentiment, setSentiment] = useState<Sentiment[]>([]);
  const [riskTrend, setRiskTrend] = useState<RiskPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !user?.id) return;
    const client = supabase;
    if (type === "donut") {
      client
        .from("news_sentiment")
        .select("name, value, color")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10)
        .then(({ data, error }) => {
          if (!error && data?.length) setSentiment(data as Sentiment[]);
          else setSentiment([]);
          setLoading(false);
        });
    } else {
      client
        .from("risk_trend")
        .select("day, risk, value")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .then(({ data, error }) => {
          if (!error && data?.length) setRiskTrend(data as RiskPoint[]);
          else setRiskTrend([]);
          setLoading(false);
        });
    }
  }, [type, user?.id]);

  if (type === "donut" && sentiment.length === 0 && !loading) {
    return (
      <div className="flex h-[180px] items-center justify-center">
        <p className="text-sm text-[#94a3b8]">No sentiment data.</p>
      </div>
    );
  }

  if (type === "line" && riskTrend.length === 0 && !loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <p className="text-sm text-[#94a3b8]">No risk trend data.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-[180px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
      </div>
    );
  }

  if (type === "donut") {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={sentiment}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            stroke="transparent"
          >
            {sentiment.map((entry, i) => (
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
      <LineChart data={riskTrend}>
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
