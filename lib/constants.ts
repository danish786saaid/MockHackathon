export const MOCK_KPI = [
  {
    label: "Portfolio Value",
    value: "$124,520",
    change: "+2.4%",
    changeLabel: "vs last week",
    positive: true,
  },
  {
    label: "Rules Active",
    value: "5",
    change: "+2",
    changeLabel: "configured",
    positive: true,
  },
  {
    label: "Circuit Breakers",
    value: "0",
    change: "0",
    changeLabel: "triggered today",
    positive: true,
  },
  {
    label: "Risk Level",
    value: "Low",
    change: "Safe",
    changeLabel: "AI confidence 94%",
    positive: true,
  },
];

export const MOCK_ALERTS = [
  {
    id: "1",
    title: "Fed holds rates steady",
    severity: "safe" as const,
    time: "2 min ago",
    matchedRule: null,
  },
  {
    id: "2",
    title: "Stablecoin legislation draft in US Senate",
    severity: "warning" as const,
    time: "15 min ago",
    matchedRule: "Regulatory crackdown on stablecoins",
  },
  {
    id: "3",
    title: "56 new users registered",
    severity: "safe" as const,
    time: "1 hour ago",
    matchedRule: null,
  },
  {
    id: "4",
    title: "Major exchange reports outage",
    severity: "danger" as const,
    time: "3 hours ago",
    matchedRule: "Exchange security incident",
  },
];

export const MOCK_ACTIVITIES = [
  { id: "1", action: "Rule 'USDT to USDC swap' added", time: "2 hours ago" },
  { id: "2", action: "News scan completed - 12 articles", time: "5 min ago" },
  { id: "3", action: "Portfolio sync successful", time: "1 hour ago" },
  { id: "4", action: "Trust gauge updated: Low Risk", time: "5 min ago" },
];

export const MOCK_RULES = [
  {
    id: "1",
    rule: "If major regulatory crackdown on stablecoins in US, swap USDT to USDC",
    status: "active" as const,
  },
  {
    id: "2",
    rule: "If exchange hack reported, pause all trading",
    status: "active" as const,
  },
  {
    id: "3",
    rule: "If BTC drops >15% in 24h on bad news, reduce exposure by 50%",
    status: "active" as const,
  },
  {
    id: "4",
    rule: "If Fed signals aggressive rate hike, move 20% to stablecoins",
    status: "paused" as const,
  },
];

export const MOCK_RISK_TREND = [
  { day: "Mon", risk: 12, value: 118200 },
  { day: "Tue", risk: 18, value: 121500 },
  { day: "Wed", risk: 8, value: 119800 },
  { day: "Thu", risk: 22, value: 120100 },
  { day: "Fri", risk: 15, value: 122400 },
  { day: "Sat", risk: 10, value: 123100 },
  { day: "Sun", risk: 6, value: 124520 },
];

export const MOCK_SENTIMENT = [
  { name: "Safe", value: 72, color: "#22c55e" },
  { name: "Warning", value: 18, color: "#f59e0b" },
  { name: "Danger", value: 10, color: "#ef4444" },
];
