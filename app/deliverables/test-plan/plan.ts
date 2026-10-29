// Test plan content (D3). Part 1 is the plan we would follow with all the time we needed.
// Part 2, what we will actually test, is added separately.

export type PlanItem = {
  title: string;
  text: string;
};

export type PlanSection = {
  id: string;
  title: string;
  intro?: string;
  items: PlanItem[];
};

export const IDEAL_PLAN_INTRO =
  "If time weren't a constraint, every change to Nora would be tested automatically at every level, in every environment it passes through, and accepted by the people who will rely on it before it reaches researchers. As the course allows, usability testing is left out of this plan.";

export const IDEAL_PLAN: PlanSection[] = [
  {
    id: "users",
    title: "Users We Test For",
    intro:
      "Each kind of person who uses or runs Nora needs to be covered, either as a tester or as a case the tests check for.",
    items: [
      {
        title: "Researchers",
        text: "Faculty, postdocs, graduate and undergraduate students, research coordinators and research administrators. They range from first-time users to policy experts and use Nora on both desktops and phones.",
      },
      {
        title: "Administrators",
        text: "UNC Research staff, starting with Jeanne Lovmo, who manage policy content, FAQs, topics and the admin list, and read the analytics dashboard.",
      },
      {
        title: "The Link and subject-matter experts",
        text: "The client's Research Policy Navigator Link and the offices it consults. They judge whether answers, citations and referrals are correct in their area, and they run acceptance testing.",
      },
      {
        title: "People who should be turned away",
        text: "Signed-out visitors, disabled accounts and researchers trying to reach admin features. Every protected page and endpoint is tested against each of them.",
      },
      {
        title: "Malicious users",
        text: "Anyone trying to raise their role, forge a session, inject scripts, or manipulate the AI with prompt injection.",
      },
      {
        title: "Operators",
        text: "The client's IT team, who will deploy and run Nora on Carolina CloudApps. They need deployments, rollbacks and backups to be tested.",
      },
    ],
  },
  {
    id: "environments",
    title: "Test Environments",
    intro:
      "The same container images move through every environment; only configuration changes between them.",
    items: [
      {
        title: "Local",
        text: "Each developer's Docker Compose stack: PostgreSQL with pgvector, the FastAPI backend and the React frontend, with seed data and the demo sign-in.",
      },
      {
        title: "CI",
        text: "GitHub Actions with a fresh PostgreSQL + pgvector service container for every pull request. Nothing carries over between runs.",
      },
      {
        title: "Preview, one per pull request",
        text: "A short-lived deployment of the pull request's images in its own Kubernetes namespace on Carolina CloudApps (OpenShift), with sidecar containers for the database and a fake AI service. It is torn down when the pull request closes.",
      },
      {
        title: "Dev, QA, UAT and Production",
        text: "One long-lived environment per stage, following our branch flow (dev → qa → main) with a UAT stage before production. UAT and Production use real UNC single sign-on; UAT holds approved documents and test accounts only.",
      },
      {
        title: "Browsers and devices",
        text: "The two latest versions of Chrome, Firefox, Safari and Edge on macOS and Windows, Safari on iOS and Chrome on Android, at screen widths from a 360px phone to a 1920px desktop. Exact versions are listed in Part 2.",
      },
    ],
  },
  {
    id: "unit",
    title: "Unit Testing",
    intro: "Automated, run on every commit, and required to pass before any merge.",
    items: [
      {
        title: "Backend: 100% coverage",
        text: "pytest and pytest-cov at 100% line and branch coverage, enforced in CI. Tests run against a real PostgreSQL database inside a transaction that is rolled back afterwards, so query code is tested on the real database engine rather than a mock.",
      },
      {
        title: "Frontend: 100% coverage",
        text: "Vitest and React Testing Library for every component, page, hook and the API client. Mock Service Worker stands in for the API so each screen's loading, empty, error and success states are all tested.",
      },
      {
        title: "AI calls are faked",
        text: "The language model and embedding services sit behind interfaces with fake implementations, so unit tests never call a real AI API. They stay fast, free and repeatable.",
      },
      {
        title: "Mutation testing",
        text: "mutmut (Python) and Stryker (TypeScript) deliberately change the code and check that a test fails. This shows that 100% coverage actually catches bugs instead of just running every line.",
      },
      {
        title: "Database migrations",
        text: "Every Alembic migration is upgraded and downgraded on an empty database and on a seeded one, and alembic check confirms the models and the schema match.",
      },
      {
        title: "API contract",
        text: "The backend's generated OpenAPI schema is compared with the frontend's TypeScript types in CI, so a renamed field fails the build instead of breaking a page.",
      },
    ],
  },
  {
    id: "integration",
    title: "Integration and System Testing",
    intro:
      "End-to-end testing of every workflow, through both the UI and direct API calls, with the database checked along the way.",
    items: [
      {
        title: "API integration",
        text: "Every endpoint is called over HTTP against a real database by each kind of caller (signed out, researcher, admin, disabled) and checked against an expected result table. For example, a researcher calling an admin endpoint must get 403.",
      },
      {
        title: "End-to-end through the UI",
        text: "Playwright drives real browsers through every workflow: sign-in for each role and the hand-off after sign-out; browsing a topic to a document and its source link; keyword search, including no results; Ask with answered, sources-only and referral outcomes; the admin dashboard; content management (add, edit, archive with confirmation, the authoritative flag); the admin list; feedback; and saved items.",
      },
      {
        title: "Database verification",
        text: "After each end-to-end step, SQL assertions check that the database changed as expected: a question is logged with its outcome and citations, feedback is saved, and archived documents are kept rather than deleted. Testers also inspect the data with a database manager such as DBeaver during exploratory sessions.",
      },
      {
        title: "Full QA pass per environment",
        text: "Before a build is promoted to the next environment, a tester runs the full automated end-to-end suite plus a scripted manual checklist through the UI and the API.",
      },
    ],
  },
  {
    id: "ai-quality",
    title: "AI Answer Quality",
    intro:
      "Nora's answers must be grounded, cited, and willing to refer instead of guess, so they get their own evaluation.",
    items: [
      {
        title: "Scenario set from the Link",
        text: "Realistic questions in every category the Link defined: straightforward, spanning several policies, ambiguous, no authoritative source, needs a referral, outdated or conflicting information, and high-risk. Each has an expected outcome and expected source documents.",
      },
      {
        title: "Automatic scoring",
        text: "For each scenario: was the outcome right (answer or referral), did it cite the expected sources, is every claim supported by a cited passage, is the disclaimer present, and did it avoid stating a formal determination? A model-based judge scores groundedness, and subject-matter experts spot-check the results.",
      },
      {
        title: "Regression gate",
        text: "The full set runs on every change to the prompt, the model, chunking or retrieval. A drop below the agreed thresholds blocks the merge.",
      },
      {
        title: "Adversarial questions",
        text: "Prompt injection in questions and hidden inside documents, off-topic questions, demands for an official determination, and attempts to make Nora drop its citations.",
      },
      {
        title: "Monitoring in production",
        text: "A weekly sample of low-confidence and not-helpful answers is reviewed, so quality problems are caught after launch too.",
      },
    ],
  },
  {
    id: "data",
    title: "Data-Specific Test Cases",
    items: [
      {
        title: "Knowledge base size",
        text: "Empty, a single document, the full Research Policy Repository (about 200 documents), and ten times that with generated documents to test growth.",
      },
      {
        title: "Document content",
        text: "Very long documents, tables, accented characters and symbols, PDF and HTML sources, duplicate uploads, two documents that conflict, and documents replaced by newer versions.",
      },
      {
        title: "Document state",
        text: "Archived, draft and non-authoritative documents never appear in search results or answers. Also: a document in several topics, a topic with no documents, and documents missing optional fields such as a citation, URL or office.",
      },
      {
        title: "User input",
        text: "Empty and whitespace-only input, a single character, 10,000-character questions, HTML and script tags, SQL-like text, non-English text and emoji, and Onyens with capital letters, spaces or invalid characters.",
      },
    ],
  },
  {
    id: "errors",
    title: "Error Conditions",
    items: [
      {
        title: "Database down or slow",
        text: "Users see a clear error message instead of a crash, and Nora recovers on its own when the database returns.",
      },
      {
        title: "AI service failures",
        text: "Timeouts, rate limits and malformed responses make Nora fall back to listing sources or referring to an office. It never shows a partial or uncited answer.",
      },
      {
        title: "Authentication failures",
        text: "Expired or tampered session cookies, missing or spoofed single sign-on headers, and an account disabled mid-session. The demo sign-in must refuse to start in production.",
      },
      {
        title: "Browser-side problems",
        text: "The network dropping mid-request, double submissions, the back button, unknown URLs, and two admins editing the same document at once.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance and Reliability",
    items: [
      {
        title: "Load testing",
        text: "k6 simulates expected peak traffic (the exact number to be confirmed with the client). Targets: search returns in under 1 second and Ask in 5–10 seconds for 95% of requests.",
      },
      {
        title: "Soak testing",
        text: "Steady traffic for 24 hours while watching memory use, database connections and error rates.",
      },
      {
        title: "Retrieval at scale",
        text: "Vector search speed and index build time with the full repository and with growth.",
      },
      {
        title: "Frontend speed",
        text: "Lighthouse performance budgets for every page, on phone and desktop.",
      },
      {
        title: "Reliability",
        text: "Pods and the database are killed and restarted under load to confirm health checks, automatic recovery and zero-downtime deployments. Backup and restore are practiced.",
      },
    ],
  },
  {
    id: "security",
    title: "Security and Accessibility",
    items: [
      {
        title: "Access control",
        text: "The role-by-endpoint result table from integration testing, plus checks that session cookies are HttpOnly, Secure and SameSite, expire on time, and are rejected if tampered with.",
      },
      {
        title: "Scanning on every pull request",
        text: "Dependencies (pip-audit, npm audit, Dependabot), container images (Trivy) and committed secrets (gitleaks).",
      },
      {
        title: "Dynamic scanning",
        text: "An OWASP ZAP scan of the QA environment before every release.",
      },
      {
        title: "Privacy",
        text: "Researchers' questions and Onyens are stored only where UNC approves, and retention and anonymization rules are checked once they are decided.",
      },
      {
        title: "Accessibility",
        text: "Automated axe checks inside the end-to-end tests, plus a manual keyboard and screen-reader pass, aiming at WCAG 2.1 AA without a formal audit.",
      },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD, Regression and Rollback",
    items: [
      {
        title: "Every pull request",
        text: "Linting (Ruff and oxlint), type checks, unit tests with the 100% coverage gates, the API contract check, the migration check, an image build, end-to-end tests against the preview environment, and a quick subset of the AI scenarios. A pull request needs approval and all checks passing before it can merge.",
      },
      {
        title: "Every merge",
        text: "Images are built once, pushed, deployed to that branch's environment and smoke tested, and then the full regression suite runs there. The same image is promoted from Dev to QA to UAT to Production.",
      },
      {
        title: "Regression in every environment",
        text: "After each feature is added, the full automated regression suite (unit, integration, end-to-end and AI scenarios) runs again in each environment the feature reaches, not just where it was built.",
      },
      {
        title: "Sidecars in Kubernetes",
        text: "Preview and test pods run the database, a fake AI service and the test runner as sidecar containers, so tests run with the same network and configuration as production.",
      },
      {
        title: "Feature flags",
        text: "New features such as AI-generated answers or admin editing are behind flags set per environment. If a problem appears after promotion, the feature is switched off without a redeploy.",
      },
      {
        title: "Rollback",
        text: "Any environment can be rolled back by redeploying the previous image. Database changes are made in backward-compatible steps, so the previous version still works with the new schema.",
      },
    ],
  },
  {
    id: "acceptance",
    title: "Acceptance Testing",
    items: [
      {
        title: "UAT environment",
        text: "A copy of the production setup (real UNC single sign-on, approved documents, test accounts) with separate data, where the client tests every release before it goes to production.",
      },
      {
        title: "Who tests",
        text: "Link members and subject-matter experts from each office, a few volunteer researchers, and Jeanne Lovmo for the admin features.",
      },
      {
        title: "What they test",
        text: "Scripted scenarios built from our user stories (US1–US13) with expected results, the Link's AI scenario set, and free exploration.",
      },
      {
        title: "Sign-off",
        text: "Each feature is accepted in writing before it reaches production. Problems are logged as GitHub issues and re-tested in UAT after the fix.",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { title: "Backend tests", text: "pytest, pytest-cov, mutmut, FastAPI TestClient." },
      {
        title: "Frontend tests",
        text: "Vitest, React Testing Library, Mock Service Worker, Stryker.",
      },
      { title: "End-to-end and accessibility", text: "Playwright, axe-core." },
      {
        title: "Database",
        text: "PostgreSQL with pgvector, Alembic for migrations, DBeaver for inspection.",
      },
      { title: "Performance", text: "k6, Lighthouse." },
      {
        title: "Security",
        text: "OWASP ZAP, Trivy, pip-audit, npm audit, Dependabot, gitleaks.",
      },
      { title: "Linting and types", text: "Ruff, oxlint, the TypeScript compiler." },
      {
        title: "CI/CD and hosting",
        text: "GitHub Actions, Docker, and Carolina CloudApps (OpenShift / Kubernetes).",
      },
    ],
  },
];
