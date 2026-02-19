# Hackathon — Sentinel AI Dashboard

One repo for the full project. This README explains layout and how to run things.

## Repo layout

```
├── app/              # Next.js app router (pages & layouts)
│   ├── page.tsx      # Main dashboard (Sentinel)
│   └── rules/        # Rules feature
├── components/       # UI by feature
│   ├── sentinel/     # Main dashboard
│   ├── dashboard/    # Dashboard widgets
│   ├── rules/        # Rules UI
│   ├── stovest/      # Stovest feature
│   └── widgets/      # Shared widgets
├── lib/              # Shared utils and constants
├── docs/             # How we work (branches, integration)
└── package.json      # Frontend deps (Next.js, React)
```

Right now the **frontend** (this Next app) lives at the repo root. Backend may live on another branch or repo; see `docs/WORKFLOW.md` for branch strategy.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Branch strategy & integration

- **main** — Default branch; stable, deployable state.
- **frontend/main** — Main frontend line (branched from `main`).
- **frontend/dashboard** — Dashboard work (branch from `frontend/main`).
- **frontend/ui**, **frontend/rules** — Other frontend features (from `frontend/main`).
- **backend** — Backend work (if used).

Flow: branch from `main` or from `frontend/main` for frontend work → open PR into `frontend/main` or `main` → merge after review.

Details and merge order: **docs/WORKFLOW.md**.
