"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Sentiment = { name: string; value: number; color: string };

export default function NewsSentimentCard() {
  const user = useUser();
  const [data, setData] = useState<Sentiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("news_sentiment")
      .select("name, value, color")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data: res, error }) => {
        if (!error && res?.length) {
          setData(res as Sentiment[]);
        } else {
          setData([]);
        }
        setLoading(false);
      });
  }, [user?.id]);

  if (loading) {
    return (
      <div className="glass-card flex h-full flex-col p-6">
        <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">News Sentiment</h3>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="glass-card flex h-full flex-col p-6">
        <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">News Sentiment</h3>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-[#94a3b8]">No sentiment data. Run the Supabase schema.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card flex h-full flex-col p-6">
      <h3 className="mb-4 text-sm font-semibold text-[#94a3b8]">News Sentiment</h3>
      <div className="flex flex-1 items-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              paddingAngle={2}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((entry, i) => (
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
        {data.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
