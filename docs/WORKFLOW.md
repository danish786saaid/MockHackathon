# Branch strategy & how we integrate

One place for: which branch to use, how to merge, and how to avoid mess.

## Branch hierarchy

```
main                    ← default branch, what we deploy
│
├── frontend/main       ← main frontend line (from main)
│   ├── frontend/dashboard
│   ├── frontend/ui
│   └── frontend/rules
│
└── backend             ← backend work (from main)
```

- **main** = source of truth for “whole product” (frontend + backend).
- **frontend/main** = frontend-only line; all frontend feature branches branch off here (or off each other when it makes sense, e.g. dashboard off frontend/main).
- **frontend/dashboard**, **frontend/ui**, **frontend/rules** = feature branches. Merge back into **frontend/main** when ready.
- **backend** = backend work. Merge into **main** when ready.

## What to do as a teammate

1. **Starting frontend work (e.g. dashboard)**  
   - Branch from **frontend/main**:  
     `git fetch && git checkout frontend/main && git pull && git checkout -b frontend/dashboard`  
   - Or if the branch already exists:  
     `git checkout frontend/dashboard && git pull`

2. **Starting backend work**  
   - Branch from **main**:  
     `git checkout main && git pull && git checkout -b backend`  
   - Or use a sub-branch like **backend/api** from **backend** if you prefer.

3. **Integrating your work**  
   - Frontend: open a PR **frontend/dashboard** (or ui, rules) → **frontend/main**. After review, merge.  
   - When frontend is ready for release: PR **frontend/main** → **main**.  
   - Backend: open a PR **backend** (or backend/…) → **main**.

4. **Staying in sync**  
   - On **frontend/dashboard**:  
     `git fetch && git merge frontend/main`  
   - On **frontend/main**:  
     `git fetch && git merge main`  
   Do this before opening PRs so integration stays clean.

## Summary

| I work on…   | Branch from     | Open PR into     |
|-------------|-----------------|------------------|
| Dashboard   | frontend/main   | frontend/main    |
| UI / Rules  | frontend/main   | frontend/main    |
| Backend     | main            | main             |
| Release     | —               | frontend/main → main |

This keeps main stable, frontend work grouped under **frontend/main**, and makes it clear where to merge for integration.
