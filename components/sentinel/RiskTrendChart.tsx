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
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
