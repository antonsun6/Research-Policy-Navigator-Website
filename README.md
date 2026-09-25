# Research Policy Navigator — Website

Portfolio-style project site: a dashboard overview plus tabs for team &
contacts, scheduling/timeline, and weekly deliverables (starting with the
product specification document).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS · pnpm · deployed on Vercel.

## Getting started

```bash
pnpm install
pnpm dev              # http://localhost:3000
```

Other commands:

```bash
pnpm build             # production build (also type-checks)
pnpm lint              # eslint
```

## Structure

- `app/page.tsx` — dashboard / project overview
- `app/team/` — team roster, client contact, coach/advisor contact
- `app/schedule/` — timeline of coach, client, and internal team meetings
- `app/deliverables/` — weekly deliverables list, with each deliverable
  able to get its own subtab page (see `product-specification/` for the
  first one)
- `components/TopNav.tsx` — top-level tab navigation
- `components/DeliverablesSubNav.tsx` — subtab navigation within Deliverables

Placeholder content (names, dates, emails) lives directly in the page
files as typed arrays — update those as real project details are
finalized.

## Workflow & deployment rules

This project deploys to Vercel on the **Hobby plan**, under a single owner
account. Because of Hobby-plan limits around multiple commit authors
triggering deployments, we follow a strict branching workflow:

- **Nobody pushes directly to `main`** (the initial project setup was the
  one exception).
- All work happens on feature branches, named `feature/<name>`.
- Open a Pull Request on GitHub for any change and request review.
- The repo owner merges approved PRs into `main` using GitHub's
  **"Squash and Merge"** — this keeps `main`'s author history clean, which
  is what avoids Vercel deployment errors on the Hobby plan. Do not use a
  regular merge commit or rebase-merge.

```bash
git checkout -b feature/your-change
# ...make changes...
git push -u origin feature/your-change
# then open a PR on GitHub targeting main
```
