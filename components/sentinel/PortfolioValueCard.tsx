"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
          <span className="text-sm text-[#94a3b8]">Loading portfolio...</span>
        </div>
      </div>
    );
  }

  const value = data?.value ?? 0;
  const returnPct = data?.return_pct ?? 0;
  const returnAmount = data?.return_amount ?? 0;

  return (
    <div className="glass-card flex h-full flex-col justify-center p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">Portfolio Value</p>
          <p className="mt-3 text-4xl font-bold text-white">
            ${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
          <p className="mt-2 text-sm" style={{ color: returnPct >= 0 ? "#22c55e" : "#ef4444" }}>
            Return <span className="font-medium">{returnPct >= 0 ? "+" : ""}{returnPct}% (${returnAmount})</span>
          </p>
          <p className="text-xs text-[#94a3b8]">vs last week</p>
        </div>
        <button className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-white/10 hover:text-white">
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
