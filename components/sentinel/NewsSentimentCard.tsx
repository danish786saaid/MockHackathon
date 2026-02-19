"use client";

import { useState, useEffect } from "react";
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
      <div className="glass-card flex h-full flex-col p-7">
        <h3 className="text-xs font-medium uppercase tracking-widest text-[#78716c]">News Sentiment</h3>
        <div className="mt-6 flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ea580c] border-t-transparent" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="glass-card flex h-full flex-col p-7">
        <h3 className="text-xs font-medium uppercase tracking-widest text-[#78716c]">News Sentiment</h3>
        <div className="mt-6 flex flex-1 items-center justify-center">
          <p className="text-sm text-[#78716c]">No sentiment data. Run the Supabase schema.</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="glass-card flex h-full flex-col p-7">
      <h3 className="text-xs font-medium uppercase tracking-widest text-[#78716c]">News Sentiment</h3>

      <div className="mt-6 flex flex-col gap-4 flex-1 justify-center">
        {data.map((s) => (
          <div key={s.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-white">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
              <span className="text-sm font-medium text-white">{s.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${total > 0 ? (s.value / total) * 100 : 0}%`,
                  background: s.color,
                  boxShadow: `0 0 12px ${s.color}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
