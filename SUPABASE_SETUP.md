# Supabase Setup for Sentinel AI

## 1. Create Tables

Go to your [Supabase Dashboard](https://supabase.com/dashboard) → **SQL Editor** → New query.

Copy and run the entire contents of `supabase-schema.sql` in this project. This creates:

- `portfolio` – portfolio value, return %
- `alerts` – notifications feed
- `rules` – active rules
- `activities` – activity log
- `trust_gauge` – risk state
- `risk_trend` – risk trend chart data
- `news_sentiment` – sentiment pie chart
- `portfolio_holdings` – stovest stock holdings
- `total_holding` – stovest total
- `performance_data` – performance chart

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

- **NEXT_PUBLIC_SUPABASE_URL** – Project URL (Settings → API)
- **NEXT_PUBLIC_SUPABASE_ANON_KEY** – Publishable key

## 3. Enable Realtime (Optional)

For live updates on alerts, activities, rules, and trust gauge:

1. Supabase Dashboard → **Database** → **Replication**
2. Enable replication for: `alerts`, `activities`, `rules`, `trust_gauge`

## 4. Run the App

```bash
npm run dev
```

Visit http://localhost:3000. The UI will load data from Supabase. If tables are missing, components fall back to mock data.
