"use client";

import { Shield, Pause, Play, Trash2 } from "lucide-react";
import type { RuleCategoryId } from "@/lib/constants";
import { RULE_CATEGORIES } from "@/lib/constants";

type ExtendedRule = {
  id: string;
  rule: string;
  status: "active" | "paused";
  category: RuleCategoryId;
  createdAt: string;
};

type Props = {
  rules: ExtendedRule[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
};

const categoryLabelMap = Object.fromEntries(RULE_CATEGORIES.map((c) => [c.id, c.label])) as Record<RuleCategoryId, string>;

export default function RecentRulesTable({ rules, onToggleStatus, onDelete }: Props) {
  return (
    <section className="glass-card overflow-hidden">
      <div className="border-b border-white/10 px-6 py-4">
        <h3 className="text-base font-semibold text-white">Recently added</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-[#a8a29e]">
              <th className="pb-3 pl-6 pr-4 font-medium">Rule</th>
              <th className="pb-3 px-4 font-medium">Category</th>
              <th className="pb-3 px-4 font-medium">Status</th>
              <th className="pb-3 pr-6 pl-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id} className="border-b border-white/5">
                <td className="py-3 pl-6 pr-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: r.status === "active" ? "rgba(34, 197, 94, 0.2)" : "rgba(168, 162, 158, 0.15)",
                      }}
                    >
                      <Shield className="h-4 w-4" style={{ color: r.status === "active" ? "#22c55e" : "#a8a29e" }} />
                    </div>
                    <span className="text-white">{r.rule}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#a8a29e]">{categoryLabelMap[r.category]}</td>
                <td className="py-3 px-4 font-medium" style={{ color: r.status === "active" ? "#22c55e" : "#a8a29e" }}>
                  {r.status === "active" ? "Active" : "Paused"}
                </td>
                <td className="py-3 pr-6 pl-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(r.id)}
                      className="rounded p-1.5 text-[#a8a29e] transition-colors hover:bg-white/10 hover:text-white"
                      title={r.status === "active" ? "Pause" : "Activate"}
                      aria-label={r.status === "active" ? "Pause rule" : "Activate rule"}
                    >
                      {r.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(r.id)}
                      className="rounded p-1.5 text-[#a8a29e] transition-colors hover:bg-white/10 hover:text-[#ef4444]"
                      title="Delete"
                      aria-label="Delete rule"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
