"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/use-translation";
import TotalHoldingCard from "@/components/stovest/TotalHoldingCard";
import MyPortfolioRow from "@/components/stovest/MyPortfolioRow";
import PortfolioPerformanceChart from "@/components/stovest/PortfolioPerformanceChart";
import PortfolioOverviewTable from "@/components/stovest/PortfolioOverviewTable";
import WatchlistSection from "@/components/stovest/WatchlistSection";
import { PORTFOLIO_STOCKS } from "@/lib/stovest-data";

export default function PortfolioMain() {
  const { t } = useTranslation();
  const [profileImgError, setProfileImgError] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [seeAllOpen, setSeeAllOpen] = useState(false);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Portfolio-only header: no sidebars, no notifications */}
      <header className="border-b border-white/[0.06] bg-white/[0.02] [border-color:var(--glass-border)] [background:var(--glass-bg)]">
        <div className="mx-auto max-w-[1200px] px-6 py-6 sm:px-8">
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="flex cursor-pointer items-center gap-4 rounded-2xl p-2 text-left transition-opacity hover:opacity-90"
            aria-label="Open profile"
          >
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.05] sm:h-14 sm:w-14">
              {!profileImgError ? (
                <img
                  src="/portfolio/profile.png"
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                  onError={() => setProfileImgError(true)}
                />
              ) : (
                <span className="text-theme-primary text-base font-bold sm:text-lg">NR</span>
              )}
            </div>
            <div>
              <h1 className="text-theme-primary text-xl font-semibold tracking-tight sm:text-2xl">{t("portfolio.title")}</h1>
              <p className="text-theme-muted text-sm">{t("portfolio.subtitle")}</p>
            </div>
          </button>
        </div>
      </header>

      {/* Content: full width, no left/right bars */}
      <div className="mx-auto max-w-[1200px] px-6 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-1">
            <TotalHoldingCard />
          </div>
          <div className="lg:col-span-2">
            <MyPortfolioRow onSeeAllClick={() => setSeeAllOpen(true)} />
          </div>
        </div>

        <section className="mb-8">
          <PortfolioPerformanceChart />
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          <section id="portfolio-overview" className="lg:col-span-2 scroll-mt-6">
            <PortfolioOverviewTable />
          </section>
          <section>
            <WatchlistSection />
          </section>
        </div>
      </div>

      {/* All holdings modal */}
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
            <div className="flex items-center justify-between border-b border-white/[0.08] p-4">
              <h2 className="text-lg font-semibold">All holdings</h2>
              <button
                type="button"
                onClick={() => setSeeAllOpen(false)}
                className="rounded-lg p-2 text-[#78716c] hover:bg-white/[0.06] hover:text-white"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
              {PORTFOLIO_STOCKS.map((s) => (
                <div
                  key={s.ticker}
                  className="glass-subtle flex items-center justify-between px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{s.ticker}</p>
                    <p className="text-xs text-[#78716c]">Units {s.units}</p>
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
                className="rounded-lg p-2 text-[#78716c] hover:bg-white/[0.06] hover:text-white"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.05]">
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
                <p className="mt-1 text-sm text-[#78716c]">rachel@gmail.com</p>
                <p className="mt-3 text-sm text-[#78716c]">
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
