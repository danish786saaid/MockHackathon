"use client";

import { Folder, TrendingUp, Wallet, Newspaper, ShieldAlert } from "lucide-react";
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
  category: RuleCategoryId;
};

type Props = {
  rules: ExtendedRule[];
  selectedCategoryId: RuleCategoryId | null;
  onSelectCategory: (id: RuleCategoryId | null) => void;
};

export default function RuleCategoryCards({ rules, selectedCategoryId, onSelectCategory }: Props) {
  const countByCategory = rules.reduce<Record<RuleCategoryId, number>>(
    (acc, r) => {
      acc[r.category] = (acc[r.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<RuleCategoryId, number>
  );

  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-[#a8a29e]">Rule categories</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {RULE_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Folder;
          const count = countByCategory[cat.id] ?? 0;
          const isSelected = selectedCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className="glass-card flex min-w-[160px] shrink-0 flex-col items-center gap-3 rounded-xl p-5 text-left transition-all hover:border-[#f59e0b]/30"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <Icon className="h-7 w-7 text-[#a8a29e]" />
              </div>
              <div className="w-full">
                <p className="truncate text-sm font-medium text-white">{cat.label}</p>
                <p className="text-xs text-[#a8a29e]">
                  {count} {count === 1 ? "rule" : "rules"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
