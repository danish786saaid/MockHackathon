"use client";

import { ChevronDown, Infinity } from "lucide-react";
import { TOTAL_HOLDING } from "@/lib/stovest-data";

export default function TotalHoldingCard() {
  const { value, returnPct, returnAmount } = TOTAL_HOLDING;
  return (
    <div className="rounded-2xl border border-white/10 bg-[#16181c] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">Total Holding</p>
          <p className="mt-2 text-3xl font-bold text-white">$ {value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p className="mt-1 text-sm text-[#22c55e]">
            Return <span className="font-medium">+{returnPct}% (${returnAmount})</span>
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
