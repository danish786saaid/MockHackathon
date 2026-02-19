"use client";

import { MOCK_SENTIMENT } from "@/lib/constants";

export default function NewsSentimentCard() {
  const total = MOCK_SENTIMENT.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="glass-card flex h-full flex-col p-7">
      <h3 className="text-xs font-medium uppercase tracking-widest text-[#78716c]">News Sentiment</h3>

      <div className="mt-6 flex flex-col gap-4 flex-1 justify-center">
        {MOCK_SENTIMENT.map((s) => (
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
                  width: `${(s.value / total) * 100}%`,
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
