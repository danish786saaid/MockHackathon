"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type PerfPoint = { month: string; value: number };

const RANGE_BUTTONS = ["D", "1W", "1M", "6M", "1Y"];

export default function PortfolioPerformanceChart() {
  const user = useUser();
  const [activeRange, setActiveRange] = useState("6M");
  const [data, setData] = useState<PerfPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("performance_data")
      .select("month, value")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data: res, error }) => {
        if (!error && res?.length) {
          setData(res.map((r) => ({ month: r.month, value: Number(r.value) })));
        } else {
          setData([]);
        }
        setLoading(false);
      });
  }, [user?.id]);

  if (!loading && data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
        <h3 className="mb-4 text-base font-semibold text-white">Portfolio Performance</h3>
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-[#94a3b8]">No performance data. Run the Supabase schema.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
        <h3 className="mb-4 text-base font-semibold text-white">Portfolio Performance</h3>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
        </div>
      </div>
    );
  }

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
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
