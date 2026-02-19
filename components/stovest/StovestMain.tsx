"use client";

import TotalHoldingCard from "./TotalHoldingCard";
import MyPortfolioRow from "./MyPortfolioRow";
import PortfolioPerformanceChart from "./PortfolioPerformanceChart";
import PortfolioOverviewTable from "./PortfolioOverviewTable";
import WatchlistSection from "./WatchlistSection";

export default function StovestMain() {
  return (
    <main className="ml-64 min-h-[calc(100vh-3.5rem)] p-6 pt-14">
      <div className="space-y-6">
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TotalHoldingCard />
          </div>
          <div className="lg:col-span-2">
            <MyPortfolioRow />
          </div>
        </section>

        <section>
          <PortfolioPerformanceChart />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PortfolioOverviewTable />
          </div>
          <div className="lg:col-span-1">
            <WatchlistSection />
          </div>
        </section>
      </div>
    </main>
  );
}
