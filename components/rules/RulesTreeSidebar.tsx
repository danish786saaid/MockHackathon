"use client";

import { useState } from "react";
import { Search, Folder, ChevronDown, ChevronRight, TrendingUp, Wallet, Newspaper, ShieldAlert } from "lucide-react";
import type { RuleCategoryId } from "@/lib/constants";
import { RULE_CATEGORIES } from "@/lib/constants";

const iconMap = {
  TrendingUp,
  Wallet,
  Newspaper,
  ShieldAlert,
} as const;

type ExtendedRule = {
  id: string;
  rule: string;
  status: "active" | "paused";
  category: RuleCategoryId;
  createdAt: string;
};

type Props = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: "categories" | "tags";
  onTabChange: (tab: "categories" | "tags") => void;
  selectedCategoryId: RuleCategoryId | null;
  onSelectCategory: (id: RuleCategoryId | null) => void;
  rules: ExtendedRule[];
};

export default function RulesTreeSidebar({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  selectedCategoryId,
  onSelectCategory,
  rules,
}: Props) {
  const [expandedIds, setExpandedIds] = useState<Set<RuleCategoryId>>(new Set(RULE_CATEGORIES.map((c) => c.id)));

  const toggleExpanded = (id: RuleCategoryId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const countByCategory = rules.reduce<Record<RuleCategoryId, number>>(
    (acc, r) => {
      acc[r.category] = (acc[r.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<RuleCategoryId, number>
  );

  const filteredRules = searchQuery.trim()
    ? rules.filter((r) => r.rule.toLowerCase().includes(searchQuery.toLowerCase()))
    : rules;

  return (
    <aside
      className="flex w-[280px] shrink-0 flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl"
      style={{ background: "rgba(28, 25, 23, 0.6)" }}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Rules</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a8a29e]" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-[#a8a29e] focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c]"
          />
        </div>

        <div className="flex gap-0 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
          <button
            type="button"
            onClick={() => onTabChange("categories")}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "categories" ? "text-white" : "text-[#a8a29e] hover:text-white"
            }`}
            style={activeTab === "categories" ? { background: "rgba(234, 88, 12, 0.2)", color: "#f97316" } : undefined}
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => onTabChange("tags")}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "tags" ? "text-white" : "text-[#a8a29e] hover:text-white"
            }`}
            style={activeTab === "tags" ? { background: "rgba(234, 88, 12, 0.2)", color: "#f97316" } : undefined}
          >
            Tags
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "categories" ? (
            <ul className="space-y-0.5">
              {RULE_CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Folder;
                const count = countByCategory[cat.id] ?? 0;
                const isExpanded = expandedIds.has(cat.id);
                const isSelected = selectedCategoryId === cat.id;
                const categoryRules = filteredRules.filter((r) => r.category === cat.id);

                return (
                  <li key={cat.id}>
                    <div
                      className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                        isSelected ? "" : "hover:bg-white/5"
                      }`}
                      style={isSelected ? { background: "rgba(234, 88, 12, 0.2)", color: "#f97316" } : undefined}
                      onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                    >
                      <button
                        type="button"
                        className="flex shrink-0 items-center justify-center p-0.5 hover:bg-white/5 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(cat.id);
                        }}
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-[#a8a29e]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#a8a29e]" />
                        )}
                      </button>
                      <Icon className="h-4 w-4 shrink-0 text-[#a8a29e]" />
                      <span className={`min-w-0 flex-1 truncate text-sm ${isSelected ? "font-medium text-[#f97316]" : "text-[#a8a29e]"}`}>
                        {cat.label}
                      </span>
                      <span
                        className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-[#a8a29e]"
                      >
                        {count}
                      </span>
                    </div>
                    {isExpanded && categoryRules.length > 0 && (
                      <ul className="ml-6 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
                        {categoryRules.slice(0, 5).map((r) => (
                          <li
                            key={r.id}
                            className="flex items-center gap-2 rounded px-2 py-1 text-xs text-[#a8a29e]"
                          >
                            <span className="min-w-0 flex-1 truncate">{r.rule}</span>
                          </li>
                        ))}
                        {categoryRules.length > 5 && (
                          <li className="px-2 py-1 text-xs text-[#a8a29e]">+{categoryRules.length - 5} more</li>
                        )}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-4 text-center text-sm text-[#a8a29e]">
              Tags view — add tags to rules to filter here.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
