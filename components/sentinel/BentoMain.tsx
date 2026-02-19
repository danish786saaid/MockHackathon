"use client";

import PortfolioValueCard from "./PortfolioValueCard";
import KpiCardsRow from "./KpiCardsRow";
import TrustGaugeCard from "./TrustGaugeCard";
import NewsSentimentCard from "./NewsSentimentCard";
import RiskTrendChart from "./RiskTrendChart";
import ActiveRulesTable from "./ActiveRulesTable";
import CircuitBreakerCard from "./CircuitBreakerCard";
import NotificationsCard from "./NotificationsCard";
import LatestNewsCard from "./LatestNewsCard";

export default function BentoMain() {
  return (
    <main className="mx-auto max-w-[1440px] px-8 pb-12 pt-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-[#78716c]">Welcome back, Naya. Here&apos;s your portfolio overview.</p>
      </div>

      <div className="bento-grid">
        {/* Row 1: Portfolio hero (5 col) + KPI cards (7 col) */}
        <div className="col-span-5">
          <PortfolioValueCard />
        </div>
        <div className="col-span-7">
          <KpiCardsRow />
        </div>

        {/* Row 2: Risk chart (8 col) + Trust gauge (4 col) */}
        <div className="col-span-8">
          <RiskTrendChart />
        </div>
        <div className="col-span-4">
          <TrustGaugeCard />
        </div>

        {/* Row 3: Active rules (5 col) + Sentiment (3 col) + Notifications (4 col) */}
        <div className="col-span-5">
          <ActiveRulesTable />
        </div>
        <div className="col-span-3">
          <NewsSentimentCard />
        </div>
        <div className="col-span-4">
          <NotificationsCard />
        </div>

        {/* Row 4: Latest News (8 col) + Circuit breaker (4 col) */}
        <div className="col-span-8">
          <LatestNewsCard />
        </div>
        <div className="col-span-4">
          <CircuitBreakerCard />
        </div>
      </div>
    </main>
  );
}
