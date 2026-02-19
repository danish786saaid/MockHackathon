"use client";

import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/use-translation";

export default function PortfolioValueCard() {
  const { t } = useTranslation();
  return (
    <div className="glass-card flex h-full flex-col justify-center p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-theme-secondary text-xs font-medium uppercase tracking-wider">{t("dashboard.portfolioValue")}</p>
          <p className="text-theme-primary mt-3 text-4xl font-bold">$124,520</p>
          <p className="mt-2 text-sm text-[#22c55e]">
            {t("dashboard.portfolioValueReturn")} <span className="font-medium">+2.4% ($530)</span>
          </p>
          <p className="text-theme-muted text-xs">{t("dashboard.vsLastWeek")}</p>
        </div>
        <button className="rounded-lg p-1.5 text-[#a8a29e] hover:bg-white/[0.06] hover:text-white">
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
