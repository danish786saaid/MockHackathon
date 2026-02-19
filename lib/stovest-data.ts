export const PORTFOLIO_STOCKS = [
  { ticker: "AAPL", value: 1721.3, change: 0.92, units: 104 },
  { ticker: "TSLA", value: 1521.3, change: -0.45, units: 124 },
  { ticker: "MSFT", value: 1721.3, change: 1.2, units: 10 },
  { ticker: "GOOG", value: 1521.3, change: 0.88, units: 90 },
  { ticker: "NVDA", value: 1721.3, change: 2.1, units: 104 },
];

export const TOTAL_HOLDING = { value: 12304.11, returnPct: 3.6, returnAmount: 530 };

export const PERFORMANCE_DATA = [
  { month: "Jan", value: 50000 },
  { month: "Feb", value: 75000 },
  { month: "Mar", value: 95000 },
  { month: "Apr", value: 125000 },
  { month: "May", value: 155000 },
  { month: "Jun", value: 165500 },
  { month: "Jul", value: 172000 },
];

/** Day: 24 hourly points */
export const PERFORMANCE_DATA_DAY = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}:00`,
  value: 120000 + Math.sin((i / 24) * Math.PI * 2) * 15000 + i * 800,
}));

/** Week: 7 days */
export const PERFORMANCE_DATA_WEEK = [
  { month: "Mon", value: 158000 },
  { month: "Tue", value: 161000 },
  { month: "Wed", value: 159500 },
  { month: "Thu", value: 164000 },
  { month: "Fri", value: 165500 },
  { month: "Sat", value: 166000 },
  { month: "Sun", value: 172000 },
];

/** 1 month: ~4 weeks */
export const PERFORMANCE_DATA_1M = [
  { month: "W1", value: 158000 },
  { month: "W2", value: 162000 },
  { month: "W3", value: 168000 },
  { month: "W4", value: 172000 },
];

/** 6 months – same as PERFORMANCE_DATA */
export const PERFORMANCE_DATA_6M = PERFORMANCE_DATA;

/** 1 year: 12 months */
export const PERFORMANCE_DATA_1Y = [
  { month: "Jul", value: 45000 },
  { month: "Aug", value: 52000 },
  { month: "Sep", value: 61000 },
  { month: "Oct", value: 72000 },
  { month: "Nov", value: 88000 },
  { month: "Dec", value: 95000 },
  { month: "Jan", value: 50000 },
  { month: "Feb", value: 75000 },
  { month: "Mar", value: 95000 },
  { month: "Apr", value: 125000 },
  { month: "May", value: 155000 },
  { month: "Jun", value: 172000 },
];

export const OVERVIEW_ROWS = [
  { stock: "TSLA", lastPrice: 26000.21, change: 3.4, marketCap: "564.06 B", volume: "3798", trend: "up" as const },
  { stock: "NVDA", lastPrice: 14200.5, change: 2.1, marketCap: "512.00 B", volume: "4201", trend: "up" as const },
  { stock: "MSFT", lastPrice: 38500.0, change: 0.8, marketCap: "2.86 T", volume: "2100", trend: "up" as const },
  { stock: "AAPL", lastPrice: 32000.21, change: -1.4, marketCap: "564.06 B", volume: "3798", trend: "down" as const },
  { stock: "GOOG", lastPrice: 18500.75, change: -0.6, marketCap: "2.31 T", volume: "1890", trend: "down" as const },
];

export const WATCHLIST = [
  { name: "Spotify", exchange: "NYSE SPOT", price: 2310.5, change: 2.34 },
  { name: "Amazon", exchange: "NYSE AMZN", price: 2310.5, change: 2.34 },
  { name: "Netflix", exchange: "NASDAQ NFLX", price: 485.2, change: -1.2 },
  { name: "Meta", exchange: "NASDAQ META", price: 512.0, change: -0.8 },
];
