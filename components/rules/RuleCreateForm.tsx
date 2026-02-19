"use client";

import { useState } from "react";
import type { RuleCategoryId } from "@/lib/constants";
import { RULE_CATEGORIES } from "@/lib/constants";

type Props = {
  onSubmit: (rule: string, category: RuleCategoryId) => void;
};

export default function RuleCreateForm({ onSubmit }: Props) {
  const [rule, setRule] = useState("");
  const [category, setCategory] = useState<RuleCategoryId>("market");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = rule.trim();
    if (!trimmed) return;
    onSubmit(trimmed, category);
    setRule("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="min-w-[200px] flex-1">
        <label htmlFor="new-rule" className="sr-only">
          New rule (If... then...)
        </label>
        <input
          id="new-rule"
          type="text"
          placeholder="e.g. If BTC drops 15%, reduce exposure by 50%"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-[#a8a29e] focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c]"
        />
      </div>
      <div className="w-[160px]">
        <label htmlFor="rule-category" className="sr-only">
          Category
        </label>
        <select
          id="rule-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as RuleCategoryId)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c]"
        >
          {RULE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id} className="bg-[#1c1917] text-white">
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-[#ea580c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c2410c]"
      >
        Add rule
      </button>
    </form>
  );
}
