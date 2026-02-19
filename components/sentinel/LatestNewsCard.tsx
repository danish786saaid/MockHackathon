"use client";

import { useState, useEffect } from "react";
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type NewsItem = { id: string; headline: string; source: string | null; created_at: string };

const sentimentConfig = {
  positive: { icon: TrendingUp, color: "#22c55e", label: "Positive" },
  neutral: { icon: Minus, color: "#a8a29e", label: "Neutral" },
  negative: { icon: TrendingDown, color: "#ef4444", label: "Negative" },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export default function LatestNewsCard() {
  const user = useUser();
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("news_feed")
      .select("id, headline, source, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!error && data?.length) setArticles(data as NewsItem[]);
        else setArticles([]);
        setLoading(false);
      });
  }, [user?.id]);

  return (
    <div className="glass-card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-7 py-5">
        <div>
          <h3 className="text-base font-semibold text-white">Latest News</h3>
          <p className="mt-0.5 text-[11px] text-[#78716c]">Live feed — powered by API</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#ea580c]/10 px-2.5 py-1 text-[11px] font-medium text-[#ea580c]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c] animate-pulse" />
          Live
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#ea580c] border-t-transparent" />
          </div>
        ) : articles.length === 0 ? (
          <p className="px-7 py-8 text-sm text-[#78716c]">No news yet.</p>
        ) : articles.map((article) => {
          const config = sentimentConfig.neutral;
          const Icon = config.icon;
          return (
            <div
              key={article.id}
              className="group flex gap-4 border-b border-white/[0.04] px-7 py-4 transition-colors hover:bg-white/[0.02]"
            >
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${config.color}15` }}
              >
                <Icon className="h-4 w-4" style={{ color: config.color }} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-white">
                  {article.headline}
                </p>
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-[11px] font-medium text-[#a8a29e]">{article.source || "—"}</span>
                  <span className="text-[11px] text-[#78716c]">{formatTime(article.created_at)}</span>
                </div>
              </div>

              <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[#78716c] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
