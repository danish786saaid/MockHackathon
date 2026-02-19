---
name: Sentinel AI App Overview
overview: A single-document overview of the Sentinel AI Dashboard application (purpose, stack, structure, features, and workflow) for teammates to stay aligned while building.
todos: []
isProject: false
---

# Sentinel AI Dashboard — Application Overview for Teammates

Use this as the single source of truth when building so everyone stays on the same page.

---

## What This App Is

**Sentinel AI Dashboard** is a Next.js frontend for an AI-powered risk/portfolio “command center”: main **Sentinel** dashboard, **Rules** UI, and **Stovest**-style portfolio views. All data is **mock** in this repo (no backend or database here; backend may live on another branch/repo).

---

## Tech Stack


| Layer           | Stack                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Framework**   | Next.js 14 (App Router), React 18, TypeScript                                               |
| **Styling**     | Tailwind CSS ([tailwind.config.ts](tailwind.config.ts): sentinel theme, glass, gradients)   |
| **UI**          | Lucide React (icons), Recharts (charts)                                                     |
| **Data**        | Mock only: [lib/constants.ts](lib/constants.ts), [lib/stovest-data.ts](lib/stovest-data.ts) |
| **Backend/API** | None in this repo; no `app/api/` routes, no auth                                            |


---

## Repo Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (Inter font, dark gradient background)
│   ├── page.tsx            # Home = Sentinel dashboard
│   ├── globals.css         # Global styles
│   └── rules/              # Rules feature
│       ├── layout.tsx      # Same shell as home (TopBar, sidebars, RightPanel)
│       └── page.tsx        # Rules page content
├── components/             # UI by feature (no single “components” dump)
│   ├── sentinel/           # Main dashboard: TopBar, LeftSidebar, RightPanel, BentoMain + bento widgets
│   ├── dashboard/          # Dashboard layout and content
│   ├── rules/              # Rules: forms, table, AI suggestions, tree sidebar
│   ├── stovest/            # Portfolio: overview table, performance chart, watchlist
│   └── widgets/            # Shared: ActivityLog, AlertsFeed, RiskChart, KpiCard, TrustGauge, etc.
├── lib/                    # Shared code and data
│   ├── constants.ts        # Sentinel mock: MOCK_KPI, MOCK_ALERTS, MOCK_RULES, MOCK_RISK_TREND, etc.
│   └── stovest-data.ts     # Stovest mock: PORTFOLIO_STOCKS, TOTAL_HOLDING, PERFORMANCE_DATA, WATCHLIST
└── docs/
    └── WORKFLOW.md         # Branch strategy and merge flow
```

- **Path alias:** `@/`* points to project root ([tsconfig.json](tsconfig.json)).

---

## Routes and Entry Points


| Route    | File                                     | What it renders                                                   |
| -------- | ---------------------------------------- | ----------------------------------------------------------------- |
| `/`      | [app/page.tsx](app/page.tsx)             | Sentinel: TopBar, LeftSidebar, RightPanel, BentoMain              |
| `/rules` | [app/rules/page.tsx](app/rules/page.tsx) | Rules feature inside same shell (TopBar, LeftSidebar, RightPanel) |


Root layout ([app/layout.tsx](app/layout.tsx)) wraps all pages: HTML shell, Inter font, full-height dark gradient background.

---

## Features (and Where They Live)

1. **Sentinel (main dashboard)** — [app/page.tsx](app/page.tsx) + [components/sentinel/](components/sentinel/)
  - TopBar, LeftSidebar, RightPanel, BentoMain.
  - Bento grid: portfolio value, KPI row, trust gauge, news/sentiment, risk trend chart, active rules table, circuit breaker.
  - Data: [lib/constants.ts](lib/constants.ts) (e.g. `MOCK_KPI`, `MOCK_ALERTS`, `MOCK_RULES`, `MOCK_RISK_TREND`).
2. **Rules** — [app/rules/](app/rules/) + [components/rules/](components/rules/)
  - Rule create form, recent rules table, AI suggestions panel, category cards, rules tree sidebar.
  - Same layout shell as Sentinel.
3. **Stovest (portfolio)** — [components/stovest/](components/stovest/)
  - Portfolio overview table, performance chart, watchlist, “My portfolio” row, total holding card.
  - Data: [lib/stovest-data.ts](lib/stovest-data.ts).
4. **Shared widgets** — [components/widgets/](components/widgets/), [components/dashboard/](components/dashboard/)
  - Reusable: ActivityLog, AlertsFeed, RiskChart, KpiCard, TrustGauge, CircuitBreakerPanel, RulesList.

---

## Data Flow (Current)

- No API calls. All data is imported from `lib/`:
  - **Sentinel / Rules:** [lib/constants.ts](lib/constants.ts).
  - **Stovest:** [lib/stovest-data.ts](lib/stovest-data.ts).
- When a backend is added, swap these for API/client calls; keep components consuming the same shape where possible.

---

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Home = Sentinel; `/rules` = Rules.

- **Build:** `npm run build` then `npm run start`.
- **Lint:** `npm run lint`.

---

## Branch Strategy (Stay Aligned Here)

From [docs/WORKFLOW.md](docs/WORKFLOW.md):

- **main** — Deployable “whole product”; integrate here for release.
- **frontend/main** — Main frontend line; feature branches branch off here.
- **frontend/dashboard**, **frontend/ui**, **frontend/rules** — Feature branches; PR into **frontend/main**.
- **backend** — Backend work; branch from **main**, PR into **main**.


| You work on…           | Branch from   | Open PR into         |
| ---------------------- | ------------- | -------------------- |
| Dashboard / UI / Rules | frontend/main | frontend/main        |
| Backend                | main          | main                 |
| Release                | —             | frontend/main → main |


Sync before PRs: e.g. on a feature branch run `git fetch && git merge frontend/main`.

---

## One-Paragraph Summary for Teammates

**Sentinel AI Dashboard** is a single Next.js 14 (App Router) app at repo root: **Sentinel** (main dashboard), **Rules** (rule creation and management), and **Stovest**-style portfolio components. Stack: React 18, TypeScript, Tailwind, Recharts, Lucide. Data is mock in `lib/` (no backend in this repo). Structure: `app/` = routes and layouts; `components/` = feature folders (sentinel, rules, stovest, dashboard, widgets); `lib/` = constants and mock data. Run: `npm install && npm run dev` → [http://localhost:3000](http://localhost:3000). Use **frontend/main** for frontend features and **docs/WORKFLOW.md** for branching and PR targets so everyone stays on the same page.