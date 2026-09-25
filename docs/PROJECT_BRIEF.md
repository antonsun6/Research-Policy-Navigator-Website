# Project Brief

The original request that this repository was scaffolded from (recorded
verbatim/near-verbatim so future sessions have the source intent, not just
the resulting code).

## Setup ask

1. Initialize Git locally; create a baseline `README.md` and a standard
   `.gitignore` (ignoring `node_modules`, `.env`, build output, etc.).
2. Set the default branch to `main`.
3. Link the local repository to the remote GitHub repository:
   `https://github.com/antonsun6/Research-Policy-Navigator-Website.git`
4. Stage the initial setup, commit, and push it directly to `main` on
   origin.
5. Set up the baseline project template/files needed to start building the
   website.

## Site content/structure ask

The website is to showcase the project like a portfolio, with a main
dashboard giving an overview of the project. It should have multiple tabs
at the top:

- **Team & Contacts** — team and contact info, as well as client info.
- **Scheduling & Timeline** — meetings with the coach, the client, and
  internal team meetings. Should look visually appealing, like an actual
  timeline.
- **Weekly Deliverables** — one entry per week. The first deliverable was
  the product specification document, which should live as a subtab
  within Deliverables.

Overall goal: visually appealing, but also clean and usable.

## Vercel deployment & workflow rules (ongoing, not just initial setup)

- The user is the sole Vercel account owner and maintainer, deploying on a
  **Vercel Hobby plan**.
- All teammates/collaborators must work on their own feature branches
  (e.g. `feature/name`) and submit Pull Requests on GitHub.
- Nobody pushes directly to `main` except during the initial repo setup.
- All PRs must be merged into `main` by the owner using GitHub's
  **"Squash and Merge"** — this avoids Vercel author-related deployment
  errors on the Hobby plan. No regular merge commits, no rebase-merge.

These rules are also summarized in the root `README.md`; this file exists
so the original ask (including phrasing/intent) survives even if the
README's wording drifts over time.
