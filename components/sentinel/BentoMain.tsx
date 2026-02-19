"use client";

import PortfolioValueCard from "./PortfolioValueCard";
import KpiCardsRow from "./KpiCardsRow";
import TrustGaugeCard from "./TrustGaugeCard";
import NewsSentimentCard from "./NewsSentimentCard";
import RiskTrendChart from "./RiskTrendChart";
import ActiveRulesTable from "./ActiveRulesTable";
import CircuitBreakerCard from "./CircuitBreakerCard";

export default function BentoMain() {
  return (
    <main
      className="bento-grid"
      style={{
        marginLeft: 260,
        marginRight: 320,
        paddingTop: "calc(3.5rem + 24px)",
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        minHeight: "calc(100vh - 3.5rem)",
      }}
    >
      {/* Row 1: Portfolio Value (4 col) + KPI 2×2 grid (8 col) */}
      <div className="col-span-4 h-full">
        <PortfolioValueCard />
      </div>
      <div className="col-span-8 h-full">
        <KpiCardsRow />
      </div>

      {/* Row 2: Trust Gauge (4 col) + News Sentiment (8 col) */}
      <div className="col-span-4 h-full">
        <TrustGaugeCard />
      </div>
      <div className="col-span-8 h-full">
        <NewsSentimentCard />
      </div>

      {/* Row 3: Risk Trend full width */}
      <div className="col-span-12">
        <RiskTrendChart />
      </div>

      {/* Row 4: Active Rules (8 col) + Circuit Breaker (4 col) */}
      <div className="col-span-8 h-full">
        <ActiveRulesTable />
      </div>
      <div className="col-span-4 h-full">
        <CircuitBreakerCard />
      </div>
    </main>
  );
}
