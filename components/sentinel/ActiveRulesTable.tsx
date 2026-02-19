"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { MOCK_RULES } from "@/lib/constants";

const FILTERS = ["All", "Active", "Paused"];

export default function ActiveRulesTable() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="glass-card h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <h3 className="text-base font-semibold text-white">Active Rules</h3>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f ? "text-white" : "text-[#94a3b8] hover:text-white"
              }`}
              style={activeFilter === f ? { background: "#3b82f6" } : undefined}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-[#94a3b8]">
              <th className="pb-3 pl-6 pr-4 font-medium">Rule</th>
              <th className="pb-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RULES.map((rule) => (
              <tr key={rule.id} className="border-b border-white/5">
                <td className="py-3 pl-6 pr-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: rule.status === "active" ? "rgba(34, 197, 94, 0.2)" : "rgba(148, 163, 184, 0.15)",
                      }}
                    >
                      <Shield className="h-4 w-4" style={{ color: rule.status === "active" ? "#22c55e" : "#94a3b8" }} />
                    </div>
                    <span className="text-white">{rule.rule}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium" style={{ color: rule.status === "active" ? "#22c55e" : "#94a3b8" }}>
                  {rule.status === "active" ? "Active" : "Paused"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
