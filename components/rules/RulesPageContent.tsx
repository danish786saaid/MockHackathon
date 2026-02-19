"use client";

import { useState, useMemo } from "react";
import type { RuleCategoryId } from "@/lib/constants";
import { MOCK_RULES_EXTENDED, AI_SUGGESTED_RULES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/use-translation";
import RulesTreeSidebar from "./RulesTreeSidebar";
import RuleCategoryCards from "./RuleCategoryCards";
import AISuggestionsPanel from "./AISuggestionsPanel";
import RecentRulesTable from "./RecentRulesTable";
import RuleCreateForm from "./RuleCreateForm";

type ExtendedRule = {
  id: string;
  rule: string;
  status: "active" | "paused";
  category: RuleCategoryId;
  createdAt: string;
};

function nextId(rules: ExtendedRule[]) {
  const max = rules.reduce((m, r) => Math.max(m, parseInt(r.id, 10) || 0), 0);
  return String(max + 1);
}

export default function RulesPageContent() {
  const { t } = useTranslation();
  const [rules, setRules] = useState<ExtendedRule[]>(MOCK_RULES_EXTENDED);
  const [suggestions, setSuggestions] = useState(AI_SUGGESTED_RULES);
  const [selectedCategoryId, setSelectedCategoryId] = useState<RuleCategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"categories" | "tags">("categories");

  const filteredRules = useMemo(() => {
    let list = rules;
    if (selectedCategoryId) list = list.filter((r) => r.category === selectedCategoryId);
    if (searchQuery.trim())
      list = list.filter((r) => r.rule.toLowerCase().includes(searchQuery.toLowerCase()));
    return list;
  }, [rules, selectedCategoryId, searchQuery]);

  const recentRules = useMemo(() => [...rules].slice(0, 10), [rules]);

  const handleAddRule = (rule: string, category: RuleCategoryId) => {
    setRules((prev) => [
      { id: nextId(prev), rule, status: "active", category, createdAt: "Just now" },
      ...prev,
    ]);
  };

  const handleToggleStatus = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "active" ? "paused" : "active" } : r))
    );
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAcceptSuggestion = (id: string) => {
    const s = suggestions.find((x) => x.id === id);
    if (!s) return;
    setRules((prev) => [
      { id: nextId(prev), rule: s.rule, status: "active", category: "market", createdAt: "Just now" },
      ...prev,
    ]);
    setSuggestions((prev) => prev.filter((x) => x.id !== id));
  };

  const handleDismissSuggestion = (id: string) => {
    setSuggestions((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="flex min-h-[60vh] gap-6">
      <RulesTreeSidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        rules={rules}
      />
      <div className="flex flex-1 flex-col gap-6 overflow-auto px-6 pt-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">{t("rules.title")}</h1>
            <p className="text-sm text-[#78716c]">{t("rules.subtitle")}</p>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[320px]">
            <RuleCreateForm onSubmit={handleAddRule} />
          </div>
        </div>

        <RuleCategoryCards
          rules={rules}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        <AISuggestionsPanel
          suggestions={suggestions}
          onAccept={handleAcceptSuggestion}
          onDismiss={handleDismissSuggestion}
        />

        <RecentRulesTable rules={recentRules} onToggleStatus={handleToggleStatus} onDelete={handleDeleteRule} />
      </div>
    </div>
  );
}
