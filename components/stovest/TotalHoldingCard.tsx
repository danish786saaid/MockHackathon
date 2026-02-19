"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Infinity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

export default function TotalHoldingCard() {
  const user = useUser();
  const [data, setData] = useState({ value: 0, returnPct: 0, returnAmount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("total_holding")
      .select("value, return_pct, return_amount")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data: res, error }) => {
        if (!error && res) {
          setData({
            value: Number(res.value),
            returnPct: Number(res.return_pct ?? 0),
            returnAmount: Number(res.return_amount ?? 0),
          });
        } else {
          setData({ value: 0, returnPct: 0, returnAmount: 0 });
        }
        setLoading(false);
      });
  }, [user?.id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
        <div className="h-20 animate-pulse rounded bg-white/5" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">Total Holding</p>
          <p className="mt-2 text-3xl font-bold text-white">$ {data.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p className="mt-1 text-sm text-[#22c55e]">
            Return <span className="font-medium">+{data.returnPct}% (${data.returnAmount})</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-white/10 hover:text-white">
            <Infinity className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-white/10 hover:text-white">
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
