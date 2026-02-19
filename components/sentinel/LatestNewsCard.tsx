"use client";

import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MOCK_NEWS } from "@/lib/constants";

const sentimentConfig = {
  positive: { icon: TrendingUp, color: "#22c55e" },
  neutral: { icon: Minus, color: "#a8a29e" },
  negative: { icon: TrendingDown, color: "#ef4444" },
};

export default function LatestNewsCard() {
  return (
    <div className="glass-card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
        <div>
          <h3 className="text-base font-semibold text-white">Latest News</h3>
          <p className="mt-0.5 text-[11px] text-[#78716c]">Live feed</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#ea580c]/10 px-2.5 py-1 text-[11px] font-medium text-[#ea580c]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c] animate-pulse" />
          Live
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_NEWS.map((article) => {
          const config = sentimentConfig[article.sentiment];
          const Icon = config.icon;
          return (
            <a
              key={article.id}
              href={article.url}
              className="group flex gap-4 border-b border-white/[0.04] px-6 py-4 transition-colors hover:bg-white/[0.02]"
            >
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${config.color}20` }}
              >
                <Icon className="h-4 w-4" style={{ color: config.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-white">{article.title}</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-[11px] font-medium text-[#a8a29e]">{article.source}</span>
                  <span className="text-[11px] text-[#78716c]">{article.time}</span>
                </div>
              </div>
              <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[#78716c] opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
