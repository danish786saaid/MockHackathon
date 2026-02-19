"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type RiskPoint = { day: string; risk: number; value: number };

const RANGE_BUTTONS = ["D", "1W", "1M", "6M", "1Y"];

export default function RiskTrendChart() {
  const user = useUser();
  const [activeRange, setActiveRange] = useState("6M");
  const [data, setData] = useState<RiskPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("risk_trend")
      .select("day, risk, value")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data: res, error }) => {
        if (!error && res?.length) {
          setData(res as RiskPoint[]);
        } else {
          setData([]);
        }
        setLoading(false);
      });
  }, [user?.id]);

  if (data.length === 0 && !loading) {
    return (
      <div className="glass-card h-full p-6">
        <h3 className="mb-4 text-base font-semibold text-white">Risk Trend</h3>
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-[#94a3b8]">No risk data. Run the Supabase schema.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass-card h-full p-6">
        <h3 className="mb-4 text-base font-semibold text-white">Risk Trend</h3>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card h-full p-7">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Risk Trend</h3>
          <p className="mt-0.5 text-[11px] text-[#78716c]">Portfolio risk level over time</p>
        </div>
        <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
          {RANGE_BUTTONS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeRange === r ? "text-white shadow-sm" : "text-[#78716c] hover:text-[#a8a29e]"
              }`}
              style={activeRange === r ? { background: "rgba(234, 88, 12, 0.2)", color: "#f97316" } : undefined}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ea580c" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ea580c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="day" stroke="#78716c" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#78716c" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(28, 25, 23, 0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#a8a29e",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#ea580c"
              strokeWidth={2}
              fill="url(#riskGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#ea580c", stroke: "#0c0a09", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
