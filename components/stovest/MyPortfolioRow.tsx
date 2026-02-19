"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Stock = { ticker: string; value: number; change_pct: number; units: number };

export default function MyPortfolioRow() {
  const user = useUser();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("portfolio_holdings")
      .select("ticker, value, change_pct, units")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data?.length) {
          setStocks(data.map((r) => ({ ticker: r.ticker, value: Number(r.value), change_pct: Number(r.change_pct ?? 0), units: r.units ?? 0 })));
        } else {
          setStocks([]);
        }
        setLoading(false);
      });
  }, [user?.id]);

  if (!loading && stocks.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
        <h3 className="mb-4 text-base font-semibold text-white">My Portfolio</h3>
        <p className="text-sm text-[#94a3b8]">No holdings. Run the Supabase schema.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
        <h3 className="mb-4 text-base font-semibold text-white">My Portfolio</h3>
        <div className="flex items-center gap-2 py-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
          <span className="text-sm text-[#94a3b8]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">My Portfolio</h3>
        <button className="flex items-center gap-1 text-sm text-[#3b82f6] hover:text-[#60a5fa]">
          See all <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {stocks.map((s) => (
          <div
            key={s.ticker}
            className="min-w-[140px] rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <p className="text-lg font-bold text-white">${s.value.toLocaleString("en-US", { minimumFractionDigits: 1 })}</p>
            <p className={`text-sm font-medium ${s.change_pct >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
              {s.change_pct >= 0 ? "+" : ""}{s.change_pct}%
            </p>
            <p className="mt-1 text-xs text-[#94a3b8]">{s.ticker}, Units {s.units}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
