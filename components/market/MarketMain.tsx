"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";

const COINGECKO_MARKETS =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
};

function formatPrice(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(6)}`;
}

function formatLarge(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

export default function MarketMain() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMarkets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(COINGECKO_MARKETS);
      if (!res.ok) throw new Error("Failed to fetch market data");
      const data = await res.json();
      setCoins(data);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 60_000);
    return () => clearInterval(interval);
  }, [fetchMarkets]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Market</h1>
          <p className="mt-1 text-sm text-[#78716c]">
            Live prices and market data. Updates every 60 seconds.
            {lastUpdated && (
              <span className="ml-2 text-[#a8a29e]">
                Last updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => fetchMarkets()}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        {error && (
          <div className="border-b border-white/[0.08] bg-[#ef4444]/10 px-6 py-3 text-sm text-[#fca5a5]">
            {error} — Check your connection or try again later.
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-left text-[#a8a29e]">
                <th className="pb-3 pl-6 pr-4 font-medium">#</th>
                <th className="pb-3 px-4 font-medium">Coin</th>
                <th className="pb-3 px-4 font-medium text-right">Price</th>
                <th className="pb-3 px-4 font-medium text-right">24h %</th>
                <th className="pb-3 px-4 font-medium text-right">Market Cap</th>
                <th className="pb-3 pr-6 pl-4 font-medium text-right">Volume</th>
              </tr>
            </thead>
            <tbody>
              {loading && !coins.length ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#78716c]">
                    Loading market data…
                  </td>
                </tr>
              ) : (
                coins.map((coin) => {
                  const change = coin.price_change_percentage_24h ?? 0;
                  const positive = change >= 0;
                  const TrendIcon = positive ? TrendingUp : TrendingDown;
                  return (
                    <tr
                      key={coin.id}
                      className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="py-3 pl-6 pr-4 text-[#78716c]">
                        {coin.market_cap_rank}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={coin.image}
                            alt=""
                            className="h-8 w-8 rounded-full"
                            width={32}
                            height={32}
                          />
                          <div>
                            <span className="font-medium text-white">{coin.name}</span>
                            <span className="ml-2 text-xs uppercase text-[#78716c]">
                              {coin.symbol}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-white">
                        {formatPrice(coin.current_price)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className="inline-flex items-center gap-1 font-medium"
                          style={{ color: positive ? "#22c55e" : "#ef4444" }}
                        >
                          <TrendIcon className="h-3.5 w-3.5" />
                          {change >= 0 ? "+" : ""}
                          {change.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-[#a8a29e]">
                        {formatLarge(coin.market_cap)}
                      </td>
                      <td className="py-3 pr-6 pl-4 text-right text-[#a8a29e]">
                        {formatLarge(coin.total_volume)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
