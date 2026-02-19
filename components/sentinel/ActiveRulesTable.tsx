"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { MOCK_RULES } from "@/lib/constants";

const FILTERS = ["All", "Active", "Paused"];

export default function ActiveRulesTable() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="glass-card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-7 py-5">
        <h3 className="text-base font-semibold text-white">Active Rules</h3>
        <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeFilter === f ? "text-white" : "text-[#78716c] hover:text-[#a8a29e]"
              }`}
              style={activeFilter === f ? { background: "rgba(234, 88, 12, 0.2)", color: "#f97316" } : undefined}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {MOCK_RULES.map((rule) => (
          <div
            key={rule.id}
            className="flex items-center gap-4 border-b border-white/[0.04] px-7 py-4 transition-colors hover:bg-white/[0.02]"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: rule.status === "active" ? "rgba(34, 197, 94, 0.1)" : "rgba(168, 162, 158, 0.08)",
              }}
            >
              <Shield className="h-4 w-4" style={{ color: rule.status === "active" ? "#22c55e" : "#78716c" }} />
            </div>
            <p className="flex-1 text-sm text-[#a8a29e]">{rule.rule}</p>
            <span
              className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{
                background: rule.status === "active" ? "rgba(34, 197, 94, 0.1)" : "rgba(168, 162, 158, 0.08)",
                color: rule.status === "active" ? "#22c55e" : "#78716c",
              }}
            >
              {rule.status === "active" ? "Active" : "Paused"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
