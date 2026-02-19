"use client";

import { Shield } from "lucide-react";
import { MOCK_RULES } from "@/lib/constants";

export default function RulesList() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-white/10 px-6 py-4">
        <h3 className="text-sm font-semibold text-[#94a3b8]">Active Rules</h3>
        <p className="text-xs text-[#94a3b8]/80">Plain English safety rules monitored by AI</p>
      </div>
      <div className="divide-y divide-white/5">
        {MOCK_RULES.map((rule) => (
          <div
            key={rule.id}
            className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-white/5"
          >
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: rule.status === "active" ? "rgba(34, 197, 94, 0.2)" : "rgba(148, 163, 184, 0.15)",
              }}
            >
              <Shield
                className="h-4 w-4"
                style={{ color: rule.status === "active" ? "#22c55e" : "#94a3b8" }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white">{rule.rule}</p>
              <span
                className="mt-1 inline-block text-xs font-medium"
                style={{ color: rule.status === "active" ? "#22c55e" : "#94a3b8" }}
              >
                {rule.status === "active" ? "Active" : "Paused"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
