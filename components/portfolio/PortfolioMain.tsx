"use client";

import { useState } from "react";
import TotalHoldingCard from "@/components/stovest/TotalHoldingCard";
import MyPortfolioRow from "@/components/stovest/MyPortfolioRow";
import PortfolioPerformanceChart from "@/components/stovest/PortfolioPerformanceChart";
import PortfolioOverviewTable from "@/components/stovest/PortfolioOverviewTable";
import WatchlistSection from "@/components/stovest/WatchlistSection";
import { PORTFOLIO_STOCKS } from "@/lib/stovest-data";

export default function PortfolioMain() {
  const [profileImgError, setProfileImgError] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [seeAllOpen, setSeeAllOpen] = useState(false);

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
      {/* Row 1: Profile card (4 col) + Total Holding (4 col) + My Portfolio (4 col) */}
      <div className="col-span-4 h-full min-h-0">
        <button
          type="button"
          onClick={() => setProfileOpen(true)}
          className="glass-card flex h-full min-h-[180px] w-full cursor-pointer flex-col items-center justify-center gap-4 p-6 text-left transition-shadow hover:shadow-glassHover"
        >
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10">
            {!profileImgError ? (
              <img
                src="/portfolio/profile.png"
                alt="Profile"
                width={80}
                height={80}
                className="h-full w-full object-cover"
                onError={() => setProfileImgError(true)}
              />
            ) : (
              <span className="text-xl font-bold">NR</span>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Naya Rochel</h3>
            <p className="mt-0.5 text-sm opacity-80">Portfolio overview</p>
          </div>
        </button>
      </div>
      <div className="col-span-4 h-full min-h-0">
        <div className="h-full min-h-[180px]">
          <TotalHoldingCard />
        </div>
      </div>
      <div className="col-span-4 h-full min-h-0">
        <div className="h-full min-h-[180px]">
          <MyPortfolioRow onSeeAllClick={() => setSeeAllOpen(true)} />
        </div>
      </div>

      {/* Row 2: Performance chart full width */}
      <div className="col-span-12">
        <PortfolioPerformanceChart />
      </div>

      {/* Row 3: Overview table (8 col) + Watchlist (4 col) */}
      <div id="portfolio-overview" className="col-span-8 h-full scroll-mt-6">
        <PortfolioOverviewTable />
      </div>
      <div className="col-span-4 h-full">
        <WatchlistSection />
      </div>

      {/* All holdings modal (See all) */}
      {seeAllOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          aria-modal="true"
          role="dialog"
          aria-label="All holdings"
          onClick={() => setSeeAllOpen(false)}
        >
          <div
            className="glass-card w-full max-w-lg max-h-[80vh] flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="text-lg font-semibold">All holdings</h2>
              <button
                type="button"
                onClick={() => setSeeAllOpen(false)}
                className="rounded-lg p-2 opacity-80 hover:bg-white/10 hover:opacity-100"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
              {PORTFOLIO_STOCKS.map((s) => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{s.ticker}</p>
                    <p className="text-xs opacity-80">Units {s.units}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${s.value.toLocaleString("en-US", { minimumFractionDigits: 1 })}</p>
                    <p className={`text-sm font-medium ${s.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                      {s.change >= 0 ? "+" : ""}{s.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile modal */}
      {profileOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          aria-modal="true"
          role="dialog"
          aria-label="User profile"
          onClick={() => setProfileOpen(false)}
        >
          <div
            className="glass-card w-full max-w-md p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Profile</h2>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="rounded-lg p-2 opacity-80 hover:bg-white/10 hover:opacity-100"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10">
                {!profileImgError ? (
                  <img
                    src="/portfolio/profile.png"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    onError={() => setProfileImgError(true)}
                  />
                ) : (
                  <span className="text-2xl font-bold">NR</span>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Naya Rochel</h3>
                <p className="mt-1 text-sm opacity-80">rachel@gmail.com</p>
                <p className="mt-3 text-sm opacity-80">
                  Portfolio overview. View and manage your holdings, performance, and watchlist from this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
