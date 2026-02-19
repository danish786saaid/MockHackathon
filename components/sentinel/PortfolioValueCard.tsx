"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

export default function PortfolioValueCard() {
  const user = useUser();
  const [data, setData] = useState<{ value: number; return_pct: number; return_amount: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    async function fetchPortfolio() {
      const { data: res, error: err } = await supabase
        .from("portfolio")
        .select("value, return_pct, return_amount")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (err) {
        setError(err.message);
        setData(null);
      } else if (res) {
        setData(res);
      } else {
        setData(null);
      }
      setLoading(false);
    }
    fetchPortfolio();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="glass-card flex h-full flex-col justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#ea580c] border-t-transparent" />
          <span className="text-sm text-[#78716c]">Loading portfolio...</span>
        </div>
      </div>
    );
  }

  const value = data?.value ?? 0;
  const returnPct = data?.return_pct ?? 0;
  const returnAmount = data?.return_amount ?? 0;

  return (
    <div className="glass-card flex h-full flex-col justify-between p-7">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-[#78716c]">Total Portfolio</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ea580c]/10">
          <TrendingUp className="h-4 w-4 text-[#ea580c]" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-bold tracking-tight text-white">${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ background: returnPct >= 0 ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)", color: returnPct >= 0 ? "#22c55e" : "#ef4444" }}
          >
            <ArrowUpRight className="h-3 w-3" />
            {returnPct >= 0 ? "+" : ""}{returnPct}%
          </span>
          <span className="text-xs text-[#78716c]">${returnAmount} vs last week</span>
        </div>
      </div>
    </div>
  );
}
