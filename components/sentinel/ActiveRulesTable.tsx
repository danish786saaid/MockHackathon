"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { useTranslation } from "@/lib/i18n/use-translation";
import { MOCK_RULES } from "@/lib/constants";

const FILTER_KEYS = ["dashboard.filterAll", "dashboard.filterActive", "dashboard.filterPaused"] as const;
const FILTER_VALUES = ["All", "Active", "Paused"] as const;

export default function ActiveRulesTable() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<typeof FILTER_VALUES[number]>("All");

  const filtered =
    activeFilter === "All"
      ? MOCK_RULES
      : MOCK_RULES.filter((r) => (activeFilter === "Active" ? r.status === "active" : r.status === "paused"));

  return (
    <div className="glass-card h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
        <h3 className="text-theme-primary text-base font-semibold">{t("dashboard.activeRules")}</h3>
        <div className="flex gap-1 rounded-lg p-1 bg-white/[0.05]">
          {FILTER_VALUES.map((f, i) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === f ? "text-white" : "text-[#a8a29e] hover:text-white"
              }`}
              style={activeFilter === f ? { background: "rgba(234, 88, 12, 0.3)", color: "#f97316" } : undefined}
            >
              {t(FILTER_KEYS[i])}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-[#a8a29e]">
              <th className="pb-3 pl-6 pr-4 font-medium">{t("dashboard.rule")}</th>
              <th className="pb-3 px-4 font-medium">{t("dashboard.status")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rule) => (
              <tr key={rule.id} className="border-b border-white/[0.05]">
                <td className="py-3 pl-6 pr-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: rule.status === "active" ? "rgba(34, 197, 94, 0.2)" : "rgba(168, 162, 158, 0.15)",
                      }}
                    >
                      <Shield className="h-4 w-4" style={{ color: rule.status === "active" ? "#22c55e" : "#a8a29e" }} />
                    </div>
                    <span className="text-theme-primary">{rule.rule}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium" style={{ color: rule.status === "active" ? "#22c55e" : "#a8a29e" }}>
                  {rule.status === "active" ? t("dashboard.filterActive") : t("dashboard.filterPaused")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
