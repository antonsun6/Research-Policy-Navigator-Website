// Content for the Design Document (D2). Strings may use inline Markdown:
// `code`, **bold** and [text](url); relative URLs point at files in the Nora
// repo on GitHub. Describes the dev branch as of README_COMMIT (readme.ts).
// When Nora changes, update the matching table here and regenerate the PDF
// with `pnpm design-doc:pdf`.

export const REPO = "https://github.com/jerrywen2005/Nora-Research-Policy-Navigator";
export const REPO_BRANCH = "dev";

export function repoUrl(path: string): string {
  const kind = path.endsWith("/") ? "tree" : "blob";
  return `${REPO}/${kind}/${REPO_BRANCH}/${path.replace(/\/$/, "")}`;
}

export const PDF_PATH = "/design-document/Nora-Design-Document.pdf";

export type Status = "Built" | "Mockup" | "Planned";

// ---------------------------------------------------------------------------
// Glossary: the domain terms a new developer won't know.

export const GLOSSARY: { term: string; meaning: string }[] = [
  {
    term: "Nora",
    meaning:
      "Nora the Policy Navigator, this application. The repository's older name, UNC Research Policy Navigator, still appears in places.",
  },
  {
    term: "Researcher",
    meaning:
      "Anyone at UNC doing research (faculty, staff, students, coordinators) who uses Nora to find policy. The default role.",
  },
  {
    term: "Admin",
    meaning:
      "UNC Research staff who manage Nora's content and see its analytics. The only other role.",
  },
  {
    term: "Onyen",
    meaning:
      "A UNC user ID, such as `jdoe`. It's the identity Nora stores for every user (`users.onyen`).",
  },
  {
    term: "SSO / Shibboleth",
    meaning:
      "UNC's single sign-on, where people log in with their Onyen. Shibboleth is the software behind it. Nora will use it in production; until UNC grants access, a **mock login** stands in for it.",
  },
  {
    term: "Carolina CloudApps (OKD / OpenShift)",
    meaning:
      "UNC's container hosting platform, a Kubernetes distribution. Production Nora will run there; the client's team operates it.",
  },
  {
    term: "OVCR / Research Compliance Services",
    meaning:
      "The Office of the Vice Chancellor for Research and its compliance group: our client (Jeanne Lovmo and Quinton Johnson).",
  },
  {
    term: "The Link",
    meaning:
      "The Research Policy Navigator Link, the client's working group. It owns requirements, content rules, test scenarios and user acceptance testing.",
  },
  {
    term: "UNC Policy Knowledge Base",
    meaning:
      "policies.unc.edu, where UNC publishes its policies. Its Research section (9 categories, under 200 documents) is Nora's content source. Also called the Research Policy Repository.",
  },
  {
    term: "Office",
    meaning:
      "A UNC office responsible for an area, such as the Office of Human Research Ethics. Offices own documents and are where Nora refers people.",
  },
  {
    term: "IRB, COI, IACUC",
    meaning:
      "Common policy areas: the Institutional Review Board (human subjects research), conflict of interest, and the Institutional Animal Care and Use Committee.",
  },
  {
    term: "RAG",
    meaning:
      "Retrieval-augmented generation: find the relevant policy passages first, then have a large language model (LLM) write an answer using only those passages, citing them.",
  },
  {
    term: "Chunk / embedding",
    meaning:
      "A chunk is a section-sized piece of a document, the unit RAG retrieves and cites. An embedding is a list of numbers representing a text's meaning, so similar texts have nearby embeddings.",
  },
  {
    term: "pgvector",
    meaning:
      "A PostgreSQL extension that stores embeddings and finds the nearest ones. Enabled now; used once RAG is built.",
  },
  {
    term: "Full-text search / tsvector",
    meaning:
      "PostgreSQL's built-in keyword search. A `tsvector` is a pre-processed list of a document's words, which makes searching fast.",
  },
  {
    term: "Migration",
    meaning:
      "A versioned script (we use Alembic) that changes the database schema, so every database can be brought to the same structure.",
  },
  {
    term: "Seed data",
    meaning:
      "Fake users and real public policies loaded by a script, so every developer's local database looks the same.",
  },
  {
    term: "SPA",
    meaning:
      "Single-page application: the browser loads the React app once, and it then fetches data from the API as JSON.",
  },
];

// ---------------------------------------------------------------------------
// Architecture

export const ARCHITECTURE_PARTS: { name: string; status: Status; text: string }[] = [
  {
    name: "React app (frontend/)",
    status: "Built",
    text: "Runs in the user's browser. Sign-in, the researcher pages (home, Browse, Topic, Search) and the routing and role guards are built and use the real API. Ask uses fake data and the document page is a placeholder until their endpoints exist. The admin Overview is a mockup with sample numbers.",
  },
  {
    name: "Web server (nginx or Vite)",
    status: "Built",
    text: "Serves the React app and forwards every `/api/*` request to FastAPI, so the browser only talks to one origin and no CORS setup is needed. Vite does this in development and nginx in production.",
  },
  {
    name: "FastAPI backend (backend/app/)",
    status: "Built",
    text: "All application logic, as a JSON API under `/api`: sign-in and roles, topics, and document browse and search. The Ask endpoint (RAG) and the admin endpoints are planned.",
  },
  {
    name: "PostgreSQL 17 + pgvector",
    status: "Built",
    text: "The only data store. Five tables exist (users, offices, topics, documents, document_topics); the RAG and analytics tables are designed but not yet created.",
  },
  {
    name: "UNC Shibboleth SSO",
    status: "Planned",
    text: "UNC's Onyen login. Access has been requested. Until then, a mock login provider models it, and switching is a configuration change plus one new provider module.",
  },
  {
    name: "AI models",
    status: "Planned",
    text: "Local embedding and reranker models to start (no researcher data leaves our servers), and an LLM whose provider UNC hasn't approved yet. Both sit behind interfaces so they can be swapped and faked in tests.",
  },
];

// One request traced through the code: a keyword search.
export const SEARCH_TRACE: { where: string; what: string }[] = [
  {
    where: "frontend/src/pages/researcher/SearchPage.tsx",
    what: "The researcher types \"irb exemption\". The page keeps the query in the URL (`/search?q=irb+exemption`) and calls `getDocuments({ q })`.",
  },
  {
    where: "frontend/src/pages/researcher/researcherApi.ts",
    what: "`getDocuments` builds the query string and calls `apiGet('/documents?q=irb+exemption')`. Pages never call `fetch` themselves.",
  },
  {
    where: "frontend/src/api/client.ts",
    what: "`apiGet` fetches the relative path `/api/documents?...`. The browser sends the `nora_session` cookie automatically. A non-2xx response becomes an `ApiError` carrying the status.",
  },
  {
    where: "frontend/vite.config.ts · frontend/nginx.conf.template",
    what: "The Vite dev proxy (or nginx in production) forwards `/api/*` to FastAPI on port 8000.",
  },
  {
    where: "backend/app/main.py",
    what: "`SessionMiddleware` verifies the cookie's signature and exposes its contents as `request.session`. The request reaches the documents router.",
  },
  {
    where: "backend/app/api/documents.py · backend/app/auth/dependencies.py",
    what: "The router's `Depends(get_current_user)` reads the user id from the session and loads the user, returning 401 if there is none or the account is disabled. `list_documents` validates the query parameters, then calls `search_documents()`.",
  },
  {
    where: "backend/app/api/documents.py · backend/app/models/content.py",
    what: "`search_documents()` builds a SQLAlchemy query: active documents whose `search_vector` matches `websearch_to_tsquery('english', q)`, ranked by `ts_rank_cd`, with each document's office and topics loaded.",
  },
  {
    where: "PostgreSQL",
    what: "The GIN index on `documents.search_vector` finds the matches. Title matches outrank summary matches, which outrank body matches.",
  },
  {
    where: "backend/app/schemas/content.py → frontend/src/api/types.ts",
    what: "FastAPI serializes the rows through the `DocumentPage` Pydantic schema as `{ items, total }`, matching the TypeScript `Page<DocumentSummary>` type. The page renders each result with its citation, office and source link.",
  },
];

export const SIGNIN_FLOW: string[] = [
  "On load, `AuthProvider` calls `GET /api/me`. A 401 means signed out, so `RequireAuth` sends the user to `/signin`, remembering the page they wanted.",
  "The sign-in page posts an Onyen to `POST /api/auth/mock-login`. The backend trims and lowercases it, checks it against `[a-z0-9._-]{1,64}`, and calls `record_login()`, which finds or creates the user (new users are researchers) and stamps `last_login_at`.",
  "The backend stores only the user's id in the signed `nora_session` cookie (HTTP-only, SameSite=Lax, 8 hours, HTTPS-only in production) and returns the user.",
  "The frontend sends admins to `/admin` and researchers to `/`. `RequireRole` hides the admin area from researchers, but the backend's `require_role()` is what actually enforces it, returning 403.",
  "Every later request re-reads the user and role from the database, so disabling a user or changing their role takes effect immediately.",
];

export const ENVIRONMENTS: string[][] = [
  ["", "Local (Docker Compose)", "Production (Carolina CloudApps)"],
  ["Serves the React app", "Vite dev server, port 5173, hot reload", "nginx-unprivileged, port 8080"],
  ["Forwards /api/*", "Vite's `server.proxy`", "nginx `proxy_pass` to `BACKEND_URL`"],
  ["API", "uvicorn with `--reload`; migrates and seeds on start", "uvicorn as a non-root user; run `alembic upgrade head` before rollout"],
  ["Database", "`pgvector/pgvector:pg17` container", "PostgreSQL + pgvector, set up by the client's team"],
  ["Sign-in", "Mock login (`AUTH_PROVIDER=mock`)", "UNC Shibboleth SSO; the app refuses to start with mock auth"],
  ["Data", "Seed data: 2 fake users, 9 topics, 16 public policies", "Client-approved documents and real users"],
];

// ---------------------------------------------------------------------------
// Code repository

export const LANGUAGES: { language: string; where: string; parts: string }[] = [
  {
    language: "Python 3.12",
    where: "`backend/`",
    parts: "The FastAPI backend: routers, auth, schemas, models, migrations, seed script and tests.",
  },
  {
    language: "TypeScript (TSX)",
    where: "`frontend/src/`",
    parts: "The React app: pages, components, routing, auth state and API client.",
  },
  {
    language: "CSS",
    where: "`frontend/src/**/*.css`",
    parts: "Styles, as plain CSS files next to the components that use them, with shared variables in `theme.css`.",
  },
  {
    language: "SQL",
    where: "inside the Python code",
    parts: "Written mostly through SQLAlchemy. Raw SQL appears in the generated `search_vector` expression and the CHECK constraints.",
  },
  {
    language: "JSON",
    where: "`backend/app/seed/data/`",
    parts: "The 16 seed policies with their full text.",
  },
  {
    language: "YAML, Dockerfile, nginx config",
    where: "repo root, `backend/`, `frontend/`, `.github/`",
    parts: "Docker Compose, the container images, the production web server and the CI workflows.",
  },
  {
    language: "Markdown",
    where: "`README.md`, `CLAUDE.md`, `docs/`",
    parts: "Setup instructions and the project's design records.",
  },
];

export const REPO_TREE = `Nora-Research-Policy-Navigator/
├── README.md              setup, stack, workflow (copied below)
├── CLAUDE.md              short project rules for contributors and AI assistants
├── docker-compose.yml     local stack: db, backend, frontend
├── .env.example           environment variables for local runs
├── .github/workflows/     ci.yml (lint, tests, migrations, image builds), branch-rules.yml
├── docs/                  design records: product, API, database, auth, RAG, decisions…
├── backend/               FastAPI app (Python)
│   ├── app/
│   │   ├── main.py        create_app(): middleware and routers
│   │   ├── config.py      settings from environment variables
│   │   ├── db.py          engine, Base, get_session()
│   │   ├── api/           routers: health, auth, topics, documents
│   │   ├── auth/          get_current_user, require_role, record_login
│   │   ├── models/        SQLAlchemy tables: user.py, content.py
│   │   ├── schemas/       Pydantic request/response shapes
│   │   └── seed/          python -m app.seed, plus data/research_policies.json
│   ├── alembic/versions/  database migrations
│   └── tests/             pytest suite (100% coverage required)
└── frontend/              React app (TypeScript, Vite)
    ├── nginx.conf.template production web server config
    └── src/
        ├── main.tsx, App.tsx  entry point and every route
        ├── api/           client.ts (fetch wrapper), types.ts (API shapes)
        ├── auth/          AuthProvider, useAuth, RequireAuth, RequireRole
        ├── layout/        AppLayout, header, sidebar, navItems.ts
        ├── pages/         SignIn, researcher/, admin/
        └── components/    shared pieces for the researcher pages`;

export type Module = { path: string; status: Status; does: string; uses: string };

export const BACKEND_MODULES: Module[] = [
  {
    path: "app/main.py",
    status: "Built",
    does: "`create_app()` builds the FastAPI app: session middleware, optional CORS, and every router under `/api`. The mock login router is mounted only when `AUTH_PROVIDER=mock`.",
    uses: "config, api/*",
  },
  {
    path: "app/config.py",
    status: "Built",
    does: "`Settings` reads environment variables (and a local `.env`). Refuses to start in production with mock auth or the development session secret.",
    uses: "nothing; used by everything",
  },
  {
    path: "app/db.py",
    status: "Built",
    does: "The SQLAlchemy engine, the `Base` class every model extends (with a constraint naming convention), and the `get_session()` dependency.",
    uses: "config",
  },
  {
    path: "app/api/",
    status: "Built",
    does: "One router per area: `health.py`, `auth.py` (`/me`, `/auth/logout`, `/auth/mock-login`), `topics.py` and `documents.py` (which also holds `search_documents()`, the future RAG keyword retriever).",
    uses: "auth, models, schemas, db",
  },
  {
    path: "app/auth/",
    status: "Built",
    does: "`get_current_user` (session → user, or 401), `require_role(role)` (or 403) and `record_login()` (find or create the user). Routes depend on these and never read cookies or headers themselves, so the auth provider can be swapped.",
    uses: "models, db",
  },
  {
    path: "app/models/",
    status: "Built",
    does: "The database tables as SQLAlchemy classes: `user.py` (`User`, `Role`) and `content.py` (`Office`, `Topic`, `Document`, `document_topics`, `DocType`, `DocumentStatus`). Every model must be imported in `__init__.py` so Alembic sees it.",
    uses: "db",
  },
  {
    path: "app/schemas/",
    status: "Built",
    does: "Pydantic models for request and response bodies: `user.py` (`UserOut`, `MockLoginRequest` with Onyen validation) and `content.py`. They must match `docs/api.md` and `frontend/src/api/types.ts` exactly.",
    uses: "nothing",
  },
  {
    path: "app/seed/",
    status: "Built",
    does: "`python -m app.seed` runs idempotent `seed_users` and `seed_content`, loading the fake users, 8 offices, 9 topics and the policies in `data/research_policies.json`.",
    uses: "models, db",
  },
  {
    path: "alembic/",
    status: "Built",
    does: "Migrations, applied in order: enable pgvector (`7fee7dd7b6ac`) → users (`6ddc0a734e48`) → content tables (`6de3ee5b4d8c`).",
    uses: "models (for autogenerate)",
  },
  {
    path: "tests/",
    status: "Built",
    does: "pytest against a real Postgres. Each test runs in a transaction that is rolled back. `conftest.py` has the `db_session`, `client` and `make_user` fixtures and a `login(client, onyen)` helper.",
    uses: "everything",
  },
  {
    path: "app/api/ask.py, app/rag/ (names not final)",
    status: "Planned",
    does: "`POST /api/ask`: retrieve, rerank, confidence gate, LLM answer with citations, then log the question. Design in `docs/rag.md`.",
    uses: "models, AI providers",
  },
  {
    path: "app/api/admin/ (name not final)",
    status: "Planned",
    does: "Admin endpoints under `/api/admin/*` for the admin list, content management and analytics, each guarded by `require_role(Role.ADMIN)`.",
    uses: "auth, models",
  },
];

export const FRONTEND_MODULES: Module[] = [
  {
    path: "src/main.tsx, src/App.tsx",
    status: "Built",
    does: "The entry point (router and global CSS) and every route. All routes except `/signin` sit under `RequireAuth`; `/admin` also sits under `RequireRole role=\"admin\"`.",
    uses: "auth, layout, pages",
  },
  {
    path: "src/api/",
    status: "Built",
    does: "`client.ts`: `apiGet` and `apiPost` over `fetch`, throwing `ApiError` with the status. `types.ts`: TypeScript versions of every API shape.",
    uses: "nothing",
  },
  {
    path: "src/auth/",
    status: "Built",
    does: "`AuthProvider` and `useAuth()` (the current user, `signIn`, `signOut`), the `RequireAuth` and `RequireRole` route guards, and `authApi.ts`.",
    uses: "api",
  },
  {
    path: "src/layout/",
    status: "Built",
    does: "`AppLayout` (header, sidebar and page), `UserMenu`, `NotFound`, and `navItems.ts`. A nav item without a `to` shows disabled with a \"Soon\" tag.",
    uses: "auth",
  },
  {
    path: "src/pages/SignIn.tsx",
    status: "Built",
    does: "The demo sign-in page, with an Onyen field and one-click researcher and admin demo buttons. It's deliberately styled as Nora, not as UNC's real login page.",
    uses: "auth",
  },
  {
    path: "src/pages/researcher/",
    status: "Built",
    does: "`HomePage`, `BrowsePage`, `TopicPage`, `SearchPage` (real API); `AskPage` (fake data until `POST /api/ask`); `DocumentPage` (placeholder). All data comes through `researcherApi.ts`.",
    uses: "api, components",
  },
  {
    path: "src/components/",
    status: "Built",
    does: "Shared pieces for the researcher pages: `TopicGrid`, `SearchBar`, `DocumentResultCard`, `AskPanel`, `AnswerCard` (renders every Ask outcome and always shows the disclaimer), `OfficeContact` and more.",
    uses: "nothing",
  },
  {
    path: "src/pages/admin/",
    status: "Mockup",
    does: "`AdminOverview` with sample numbers from `sampleData.ts` and a \"Sample data\" badge. Charts in `charts/` are plain SVG with no chart library.",
    uses: "nothing yet",
  },
];

export const MODULE_RULES: string[] = [
  "**The API shape lives in three places that change together:** `docs/api.md` (for people), `backend/app/schemas/` (FastAPI checks responses against it) and `frontend/src/api/types.ts` (the frontend build fails if code uses a field that isn't there).",
  "**Routes never read cookies or identity headers.** They depend on `get_current_user` or `require_role`, so replacing the mock login with UNC SSO doesn't touch them.",
  "**Pages never call `fetch`.** Researcher pages go through `researcherApi.ts` (one function per endpoint), which uses `api/client.ts`. Swapping fake data for a real endpoint changes one function.",
  "**Roles come from Nora's database, never the identity provider.** The frontend hides admin UI, but only the backend's `require_role()` enforces access.",
  "**Each model module is imported in `app/models/__init__.py`**, which is how Alembic finds tables for autogenerated migrations.",
];

// ---------------------------------------------------------------------------
// Data definitions

export const DATA_CONVENTIONS: string[] = [
  "The schema is defined in `backend/app/models/` and created by the migrations in `backend/alembic/versions/`. If this page and the code disagree, the code is right.",
  "Primary keys are `id bigint generated always as identity`: the database assigns them and they can't be set by hand.",
  "Constraint names follow a convention set in `app/db.py`, such as `pk_users`, `uq_users_onyen` and `ck_users_role_valid`, so later migrations can find them by name.",
  "Enumerations are stored as text with a CHECK constraint rather than Postgres enum types, which are harder to change in migrations.",
  "Timestamps are `timestamptz` (time zone aware). `created_at` defaults to `now()`.",
  "Content is archived (`status = 'archived'`), never deleted by normal app flows.",
];

export type Column = {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
  constraints?: string;
  use: string;
};

export type TableDef = { name: string; purpose: string; columns: Column[] };

export const TABLES: TableDef[] = [
  {
    name: "users",
    purpose:
      "Everyone who has signed in, and their role. Created by migration `6ddc0a734e48`.",
    columns: [
      { name: "id", type: "bigint", nullable: false, constraints: "PK, identity", use: "The id stored in the session cookie." },
      { name: "onyen", type: "varchar(64)", nullable: false, constraints: "unique", use: "The person's UNC identity. Always lowercase and matching `[a-z0-9._-]{1,64}` (checked by the API, not the database). Comes from SSO later; the mock login supplies it now." },
      { name: "display_name", type: "varchar(200)", nullable: true, use: "Shown in the header. From SSO attributes, updated on login." },
      { name: "email", type: "varchar(320)", nullable: true, use: "Contact address, from SSO attributes." },
      { name: "role", type: "varchar(20)", nullable: false, defaultValue: "'researcher'", constraints: "CHECK in ('researcher', 'admin')", use: "What the user may do. Re-read on every request." },
      { name: "is_active", type: "boolean", nullable: false, defaultValue: "true", use: "A disabled user (false) gets 401 on every request and 403 at login." },
      { name: "created_at", type: "timestamptz", nullable: false, defaultValue: "now()", use: "First sign-in." },
      { name: "last_login_at", type: "timestamptz", nullable: true, use: "Set by `record_login()` on every sign-in; feeds user activity analytics." },
    ],
  },
  {
    name: "offices",
    purpose:
      "UNC offices that own documents and receive referrals. Created by migration `6de3ee5b4d8c`.",
    columns: [
      { name: "id", type: "bigint", nullable: false, constraints: "PK, identity", use: "" },
      { name: "name", type: "varchar(200)", nullable: false, constraints: "unique", use: "Display name. The seed script matches offices by name." },
      { name: "description", type: "text", nullable: true, use: "Optional notes about the office." },
      { name: "email", type: "varchar(320)", nullable: true, use: "General office contact shown in referrals. Never an individual's address." },
      { name: "phone", type: "varchar(50)", nullable: true, use: "General office phone, shown in referrals." },
      { name: "url", type: "varchar(2000)", nullable: true, use: "The office's website." },
    ],
  },
  {
    name: "topics",
    purpose:
      "The shared taxonomy for browsing documents and, later, classifying questions, so analytics line up with content. Created by migration `6de3ee5b4d8c`.",
    columns: [
      { name: "id", type: "bigint", nullable: false, constraints: "PK, identity", use: "" },
      { name: "slug", type: "varchar(100)", nullable: false, constraints: "unique", use: "URL identifier, such as `human-subjects-research` in `/browse/:slug` and `?topic=`." },
      { name: "name", type: "varchar(200)", nullable: false, use: "Display name, such as \"Human Research & IRB\"." },
      { name: "description", type: "text", nullable: false, defaultValue: "''", use: "One line shown on the topic card." },
      { name: "parent_id", type: "bigint", nullable: true, constraints: "FK → topics.id", use: "For optional subtopics. Null for top-level topics; all 9 seeded topics are top-level while the client revises the subtopic framework." },
      { name: "default_office_id", type: "bigint", nullable: true, constraints: "FK → offices.id", use: "The office shown on the topic page and used for referrals in that topic." },
      { name: "sort_order", type: "integer", nullable: false, defaultValue: "0", use: "Display order (ascending), then name." },
      { name: "is_active", type: "boolean", nullable: false, defaultValue: "true", use: "Inactive topics are hidden from the API." },
    ],
  },
  {
    name: "documents",
    purpose:
      "One row per source document: a policy, SOP, guidance page, FAQ, web page or job aid. Created by migration `6de3ee5b4d8c`.",
    columns: [
      { name: "id", type: "bigint", nullable: false, constraints: "PK, identity", use: "Used in `/documents/:id`." },
      { name: "title", type: "varchar(500)", nullable: false, use: "Display title. Weighted highest in search." },
      { name: "doc_type", type: "varchar(20)", nullable: false, constraints: "CHECK in ('policy', 'sop', 'guidance', 'faq', 'webpage', 'job_aid', 'other')", use: "Kind of document, shown as a badge." },
      { name: "citation", type: "varchar(200)", nullable: true, use: "Official number or reference, such as \"OHRE SOP 1301\"." },
      { name: "source_url", type: "varchar(2000)", nullable: true, use: "The official page users are sent to. The seed script uses it as the document's identity." },
      { name: "summary", type: "text", nullable: true, use: "Short description for browse and search results. Weighted second in search." },
      { name: "content_text", type: "text", nullable: false, defaultValue: "''", use: "Full extracted text. Weighted lowest in search; the input to RAG chunking." },
      { name: "content_hash", type: "varchar(64)", nullable: true, use: "SHA-256 of `content_text`, in hex. Detects changed or duplicate uploads." },
      { name: "office_id", type: "bigint", nullable: true, constraints: "FK → offices.id", use: "The owning office." },
      { name: "status", type: "varchar(20)", nullable: false, defaultValue: "'draft'", constraints: "CHECK in ('draft', 'active', 'archived')", use: "Lifecycle. Only `active` documents are returned by the API." },
      { name: "is_authoritative", type: "boolean", nullable: false, defaultValue: "false", use: "Only documents that are both authoritative and active will be used for answers." },
      { name: "replaced_by_id", type: "bigint", nullable: true, constraints: "FK → documents.id", use: "Points to the newer document that supersedes this one." },
      { name: "effective_date", type: "date", nullable: true, use: "When the policy took effect." },
      { name: "last_reviewed_at", type: "date", nullable: true, use: "Last content review, shown to users." },
      { name: "review_due_at", type: "date", nullable: true, use: "Next review date, for future \"stale content\" alerts." },
      { name: "created_by, updated_by", type: "bigint", nullable: true, constraints: "FK → users.id", use: "The admin who created or last changed the row (admin portal, planned). Null for seeded rows." },
      { name: "created_at, updated_at", type: "timestamptz", nullable: false, defaultValue: "now()", use: "`updated_at` is reset on every ORM update." },
      { name: "search_vector", type: "tsvector", nullable: false, constraints: "generated, stored; GIN index", use: "Computed by Postgres from title (weight A), summary (B) and content_text (C) with the English dictionary. Never written directly." },
    ],
  },
  {
    name: "document_topics",
    purpose:
      "Links documents to topics; a document can belong to several. Created by migration `6de3ee5b4d8c`.",
    columns: [
      { name: "document_id", type: "bigint", nullable: false, constraints: "PK part; FK → documents.id, ON DELETE CASCADE", use: "" },
      { name: "topic_id", type: "bigint", nullable: false, constraints: "PK part; FK → topics.id, ON DELETE CASCADE; indexed", use: "The index makes \"documents in this topic\" fast." },
    ],
  },
];

export const FIELD_RULES: string[] = [
  "A document appears in the API only when `status = 'active'`. Draft and archived documents are invisible to researchers, and a topic's `document_count` counts only active documents.",
  "A document will be used to answer questions only when `status = 'active'` **and** `is_authoritative = true`.",
  "`content_hash` must equal the SHA-256 of `content_text`; set it whenever `content_text` changes.",
  "`search_vector` is derived from `title`, `summary` and `content_text`, and Postgres recomputes it whenever they change.",
  "`replaced_by_id` should point to a different document, and the replaced document is normally archived. The database doesn't enforce either rule yet.",
  "`topics.parent_id` should not form a cycle (a topic can't be its own ancestor). Not enforced; no subtopics exist yet.",
  "`users.onyen` is stored trimmed and lowercase. The API normalizes it before every lookup, so `JDoe ` and `jdoe` are the same user.",
  "A topic's `default_office_id` is the referral office for questions in that topic. A document's `office_id` is the office that owns that document. They usually match but don't have to.",
  "`review_due_at` should be after `last_reviewed_at` when both are set. Not enforced.",
];

export const SEED_FIELDS: { field: string; rule: string }[] = [
  { field: "title, doc_type, citation, summary", rule: "Copied into the matching `documents` columns. `doc_type` must be one of the allowed values." },
  { field: "source_url", rule: "Required and unique. It's the key: re-running the seed updates the document with this URL instead of adding a copy." },
  { field: "office", rule: "A key of `SEED_OFFICES` in `app/seed/content.py`: `ovcr`, `ohre`, `oct`, `coi`, `osp`, `oacu`, `export` or `opa`." },
  { field: "topics", rule: "A list of slugs from `SEED_TOPICS` in the same file." },
  { field: "content_text", rule: "The full text. The seed sets `content_hash`, `status = 'active'` and `is_authoritative = true`." },
];

export const ENV_VARS: { name: string; default: string; use: string }[] = [
  { name: "DATABASE_URL", default: "local Postgres on 5432", use: "SQLAlchemy connection string, `postgresql+psycopg://user:pass@host:port/db`." },
  { name: "ENVIRONMENT", default: "local", use: "`production` turns on HTTPS-only cookies and the startup safety checks." },
  { name: "AUTH_PROVIDER", default: "mock", use: "Which sign-in provider to use. Only `mock` exists; `shibboleth` is planned." },
  { name: "SESSION_SECRET", default: "a development value", use: "Signs the session cookie. Anyone who knows it can forge a login. Required in production (`openssl rand -hex 32`)." },
  { name: "SESSION_MAX_AGE_SECONDS", default: "28800 (8 hours)", use: "How long a sign-in lasts." },
  { name: "CORS_ORIGINS", default: "empty", use: "Only needed if the frontend is served from a different origin than the API." },
  { name: "POSTGRES_USER, _PASSWORD, _DB", default: "postgres, postgres, policy_navigator", use: "Docker Compose only: credentials for the local database container." },
  { name: "API_PROXY_TARGET", default: "http://localhost:8000", use: "Frontend development: where Vite forwards `/api`." },
  { name: "BACKEND_URL", default: "http://backend:8000", use: "Frontend production image: where nginx forwards `/api`." },
];

export const PLANNED_TABLES: { name: string; use: string }[] = [
  { name: "document_chunks", use: "The RAG units: section-sized pieces of each document with their heading, token count, embedding (`vector(384)` for the planned bge-small model, HNSW index) and a `tsvector`. Regenerated when a document changes." },
  { name: "questions", use: "One row per Ask: the question, classified topic, outcome (`answered`, `referred`, `no_answer`, `error`), confidence, the answer text, referral office, model, prompt version and latency." },
  { name: "question_citations", use: "Which chunks were retrieved and which the answer cited, with rank and score. Drives \"most cited resources\"." },
  { name: "feedback", use: "Helpful or not, plus an optional comment, one per user per question." },
  { name: "faqs, faq_documents", use: "Admin-written FAQs and the documents they cite. Never auto-published." },
  { name: "saved_items", use: "A researcher's saved documents or answers (exactly one of the two per row)." },
  { name: "usage_events", use: "Logins, topic browses, searches, document views and source link clicks, for activity analytics." },
];

// ---------------------------------------------------------------------------
// Design rationale

export const DECISIONS: { title: string; decision: string; why: string; rejected?: string }[] = [
  {
    title: "A three-tier web app behind one origin",
    decision: "A React single-page app, a FastAPI JSON API and PostgreSQL. A proxy (Vite in development, nginx in production) serves the app and forwards `/api/*`, so the browser sees a single origin.",
    why: "Each tier can be built and tested on its own, and the same images run locally and on CloudApps. One origin means no CORS configuration, and cookies just work.",
    rejected: "A server-rendered framework, which would mix UI and API code that two pairs of teammates needed to build in parallel.",
  },
  {
    title: "Python and FastAPI for the backend",
    decision: "FastAPI with SQLAlchemy 2 and Alembic, on Python 3.12.",
    why: "The RAG work (embeddings, rerankers, LLM clients) lives in the Python ecosystem. FastAPI validates requests and responses with Pydantic and generates interactive API docs at `/api/docs`.",
  },
  {
    title: "One database: PostgreSQL with pgvector",
    decision: "PostgreSQL 17 stores users, content, embeddings and analytics, using pgvector for vector search and built-in full-text search for keywords.",
    why: "Under 200 documents and low traffic don't justify a second system. Keeping vectors next to the documents makes filtering (active, authoritative, topic) a normal SQL query.",
    rejected: "A separate vector database (Pinecone, Chroma), and Supabase as anything more than hosted Postgres.",
  },
  {
    title: "Authentication separated from authorization",
    decision: "A provider (mock now, Shibboleth later) establishes who the person is. Nora's own `users.role` decides what they may do. Routes depend only on `get_current_user` and `require_role`.",
    why: "SSO access was pending when we started. Building against an interface let us finish everything else, and switching to UNC SSO is one new provider plus `AUTH_PROVIDER=shibboleth`.",
  },
  {
    title: "A signed cookie holding only the user id",
    decision: "Starlette's `SessionMiddleware` signs a cookie containing just the user id. The user and role are re-read from the database on every request.",
    why: "Disabling a user or changing their role takes effect immediately, there's no token handling in the frontend, and no sessions table to maintain.",
    rejected: "JWTs stored in the browser, and a server-side sessions table (unless we later need to revoke sessions).",
  },
  {
    title: "A single role column",
    decision: "`users.role` is `researcher` or `admin`. The admin list is simply the users whose role is `admin`.",
    why: "There are two roles and nobody needs both, so `roles`, `user_roles` and `permissions` tables would add joins without any benefit.",
  },
  {
    title: "Documents, chunks, topics and offices as separate tables",
    decision: "`documents` are what admins manage and users see; `document_chunks` (planned) are what RAG retrieves. Topics are a shared taxonomy with many-to-many links, and offices are their own table.",
    why: "Admins edit whole documents while retrieval works on sections. Questions and documents sharing one taxonomy makes topic analytics line up with content, and both referrals and ownership need offices.",
  },
  {
    title: "Weighted full-text search in the database",
    decision: "A generated, stored `tsvector` with a GIN index, weighting title over summary over body, queried with `websearch_to_tsquery`.",
    why: "Fast keyword search with stemming and familiar syntax (quotes, `or`, `-word`) and no search service. The same function becomes the keyword half of hybrid retrieval for RAG.",
  },
  {
    title: "Archive instead of delete, and lifecycle fields on documents",
    decision: "Documents have `status`, `is_authoritative`, `replaced_by_id` and review dates, and normal flows never hard-delete.",
    why: "The client requires every source to have an owner and review cycle, outdated content to be replaceable and surfaced, and nothing deleted without explicit admin confirmation.",
  },
  {
    title: "Grounded answers or a referral, never a guess (planned RAG)",
    decision: "Ask retrieves passages (hybrid keyword and vector search, then a reranker). If the best score is below a threshold, Nora skips the LLM and refers the user to the topic's office. Otherwise the LLM answers only from numbered passages and cites them. Every answer shows a disclaimer.",
    why: "Researchers act on this guidance, so a wrong answer is worse than none. The gate also makes refusals free, since no LLM call is made. See the Ethics 1 paper's MyCity case for what happens without these safeguards.",
  },
  {
    title: "Local AI models to start",
    decision: "Embeddings with `BAAI/bge-small-en-v1.5` and a local cross-encoder reranker; the LLM sits behind an `LLMProvider` interface.",
    why: "UNC hasn't approved any AI provider. Local models are free, need no API key, and send no researcher data off our servers. Tests use fake providers and never call real AI.",
  },
  {
    title: "Plain React with no UI or chart framework",
    decision: "React Router v7 in declarative mode, plain CSS with UNC colors as variables in `theme.css`, and charts drawn in plain SVG.",
    why: "Few dependencies for the next team to learn or upgrade. Navy is used for text and links, and Carolina Blue only for accents, because Carolina Blue text on white fails contrast checks.",
  },
  {
    title: "The demo sign-in page doesn't imitate UNC's login",
    decision: "The mock sign-in uses Nora's own theme and is labeled \"Demo sign-in. UNC SSO will replace this.\"",
    why: "So the demo can never be mistaken for, or misused as, a real UNC login page.",
  },
  {
    title: "Tests against real Postgres, with 100% backend coverage",
    decision: "Backend tests run against a real Postgres database, each inside a transaction that's rolled back. CI fails below 100% line coverage.",
    why: "Full-text search, CHECK constraints and generated columns only behave correctly in real Postgres. Rolling back keeps tests independent and fast.",
  },
  {
    title: "Git flow enforced in CI",
    decision: "`feature/*` → `dev` → `qa` → `main`. A CI check rejects a PR into `qa` from anything but `dev`, into `main` from anything but `qa`, and into `dev` from a branch not named `<type>/<short-name>` (such as `feature/ask-endpoint`).",
    why: "`dev` is where work integrates, `qa` is what gets tested, and `main` is what's deployed.",
  },
  {
    title: "The client's team hosts Nora",
    decision: "UNC Research runs the Carolina CloudApps deployment (decided Oct 27, 2026). We keep the images OpenShift-ready and every setting configurable by environment variable.",
    why: "The service will outlive the course. Images run as non-root under any user id and write only to `/tmp`, as OpenShift requires.",
  },
];

export const DEPENDENCIES: { name: string; area: string; why: string }[] = [
  { name: "FastAPI", area: "Backend", why: "Web framework: routing, dependency injection (used for sessions and auth) and automatic API docs." },
  { name: "uvicorn", area: "Backend", why: "The server that runs FastAPI, with hot reload in development." },
  { name: "Pydantic + pydantic-settings", area: "Backend", why: "Validates request and response bodies, and reads settings from environment variables." },
  { name: "SQLAlchemy 2", area: "Backend", why: "ORM and query builder; keeps queries in Python and composable, as `search_documents()` shows." },
  { name: "psycopg 3", area: "Backend", why: "The PostgreSQL driver SQLAlchemy uses." },
  { name: "Alembic", area: "Backend", why: "Versioned schema migrations, autogenerated from the models." },
  { name: "itsdangerous", area: "Backend", why: "Signs the session cookie (required by Starlette's SessionMiddleware)." },
  { name: "pytest, pytest-cov, httpx", area: "Backend (dev)", why: "Tests, the coverage check, and FastAPI's test client." },
  { name: "Ruff", area: "Backend (dev)", why: "Linting and formatting in one fast tool." },
  { name: "React 19, react-dom", area: "Frontend", why: "UI library; the most widely known choice for a future team." },
  { name: "React Router 7", area: "Frontend", why: "Client-side routes and the nested auth and role guards." },
  { name: "Vite + @vitejs/plugin-react", area: "Frontend (dev)", why: "Dev server with hot reload and the `/api` proxy, and the production build." },
  { name: "TypeScript", area: "Frontend (dev)", why: "Type checks against `types.ts` catch API mismatches at build time." },
  { name: "oxlint", area: "Frontend (dev)", why: "Fast linting." },
  { name: "PostgreSQL 17 + pgvector", area: "Infrastructure", why: "The database, as the `pgvector/pgvector:pg17` image locally." },
  { name: "Docker and Docker Compose", area: "Infrastructure", why: "Identical environments for every developer, CI and production." },
  { name: "nginx-unprivileged", area: "Infrastructure", why: "Production web server that runs as non-root, as OpenShift requires." },
  { name: "GitHub Actions", area: "Infrastructure", why: "CI: lint, tests, migrations, image builds and branch rules on every PR." },
  { name: "UNC Shibboleth SSO", area: "External (planned)", why: "Production sign-in with Onyens. Requested from UNC ITS." },
  { name: "Carolina CloudApps", area: "External", why: "Production hosting, run by the client's team." },
  { name: "Embedding, reranker and LLM models", area: "External (planned)", why: "RAG. Local models first; the LLM provider is pending UNC approval." },
];

export const NOT_DONE: { what: string; why: string }[] = [
  { what: "No Supabase Auth or other third-party login", why: "UNC SSO is the only identity source; roles stay in our database." },
  { what: "No roles or permissions tables", why: "Two roles, and nobody needs both." },
  { what: "No separate vector database or search service", why: "Postgres handles both at our scale." },
  { what: "No live sync with the Policy Knowledge Base", why: "Out of scope. Admins choose and load documents, which keeps unapproved content out." },
  { what: "No stored analytics tables", why: "Dashboard numbers will be SQL queries over the event tables. At this scale precomputed stats aren't needed." },
  { what: "No sessions table", why: "The signed cookie is enough until we need server-side revocation." },
  { what: "No Postgres enum types", why: "Text with a CHECK constraint is easier to change in a migration." },
  { what: "No CSS framework or chart library", why: "Fewer dependencies; the admin charts are small enough to draw in SVG." },
  { what: "No auto-published FAQs", why: "Admins review and write every FAQ, as the client requires." },
  { what: "No integration with IRB, COI or other enterprise systems, and no confidential records", why: "Out of scope; Nora uses only curated public or client-approved documents." },
  { what: "No MFA of our own, and English only", why: "UNC SSO provides MFA; multiple languages are out of scope this semester." },
  { what: "No compliance determinations", why: "Nora gives informational guidance with sources and refers anything else to the responsible office." },
];

export const OPEN_QUESTIONS: string[] = [
  "**Privacy:** may researchers' questions and Onyens be stored outside UNC infrastructure, and should questions be stored with the user id or anonymized? (client, ITS)",
  "**AI providers:** which LLM and embedding providers UNC approves. This fixes the embedding size in `document_chunks`. (client, ITS)",
  "**SSO:** the integration pattern on CloudApps and which attributes arrive (Onyen, name, email). A reply to our request has come in and needs recording in `docs/auth.md`. (ITS)",
  "**Hosting details:** Postgres with pgvector, outbound API access, image registry, hostname and secrets on CloudApps. (client's team)",
  "**Content:** which documents are approved to load, which office handles which topic, and the exact disclaimer and referral criteria. (the Link)",
  "**Subtopics:** the client is still revising the subtopic framework; `topics.parent_id` is ready for it. (client)",
];

export const TASKS: { task: string; steps: string[] }[] = [
  {
    task: "Run Nora on your machine",
    steps: [
      "Install Docker, clone the repo, and run `docker compose up --build` from the repo root.",
      "Open http://localhost:5173 and sign in as `researcher1` or `admin1`. API docs are at http://localhost:8000/api/docs.",
      "Both servers hot-reload. `docker compose down -v` wipes the database; the next start re-creates and re-seeds it.",
    ],
  },
  {
    task: "Add an API endpoint",
    steps: [
      "Write the request and response shapes in `docs/api.md` first.",
      "Add matching Pydantic models in `backend/app/schemas/` and TypeScript types in `frontend/src/api/types.ts`.",
      "Add the route to a router in `backend/app/api/` (or a new router, included in `create_app()` in `main.py`). Depend on `get_current_user`, or on `require_role(Role.ADMIN)` for admin routes.",
      "Write tests in `backend/tests/` using the `client` and `make_user` fixtures and the `login` helper. Coverage must stay at 100%.",
      "Add a function to `researcherApi.ts` (or an admin equivalent) and call it from the page.",
    ],
  },
  {
    task: "Add or change a table",
    steps: [
      "Edit or add a model in `backend/app/models/`; import any new module in `app/models/__init__.py`. Name CHECK constraints (`name=\"role_valid\"`).",
      "From `backend/`, run `alembic revision --autogenerate -m \"what changed\"`, then read the generated file and fix anything Alembic missed (for example, generated columns or extensions).",
      "Run `alembic upgrade head`, update the seed script if needed, and update `docs/database.md` and this document.",
      "If two branches each add a migration, set one's `down_revision` to the other's revision so Alembic doesn't end up with two heads.",
    ],
  },
  {
    task: "Add a frontend page",
    steps: [
      "Create the component in `frontend/src/pages/researcher/` or `pages/admin/`.",
      "Add its route in `App.tsx`, inside the right `AppLayout` (and under `RequireRole` for admin pages).",
      "Give its item in `layout/navItems.ts` a `to` so it stops showing as \"Soon\".",
      "Use the variables in `theme.css` for colors and spacing; check it at phone width (the layout switches below 48rem).",
    ],
  },
  {
    task: "Add policies to the seed data",
    steps: [
      "Append an entry to `backend/app/seed/data/research_policies.json` using the fields in the Data Definitions section.",
      "Run `python -m app.seed` (or restart Docker Compose). The seed is idempotent, so re-running it updates existing rows instead of duplicating them.",
    ],
  },
  {
    task: "Build Ask (RAG)",
    steps: [
      "Read `docs/rag.md`: the stages, retrieval design, gate and evaluation plan.",
      "Implement `POST /api/ask` with the response shape already agreed in `docs/api.md`. Put AI calls behind `EmbeddingProvider` and `LLMProvider`, with fakes for tests.",
      "In `researcherApi.ts`, replace the body of `ask()` with the `apiPost` call in its comment, then delete `fakeData.ts`. `AnswerCard` already renders every outcome.",
    ],
  },
  {
    task: "Switch to UNC SSO",
    steps: [
      "Add a Shibboleth provider that reads the identity headers set by the SSO proxy (trusting them only from the proxy), then calls `record_login()` and sets the session.",
      "Allow `shibboleth` in `Settings.auth_provider` and set `AUTH_PROVIDER=shibboleth`. The mock login router then isn't mounted.",
      "Point logout at the SSO logout URL. Routes need no changes. See `docs/auth.md`.",
    ],
  },
];

export const GOTCHAS: string[] = [
  "Production refuses to start if `AUTH_PROVIDER=mock` or `SESSION_SECRET` is the development default. That's intentional.",
  "CI fails if backend coverage drops below 100%, if Ruff finds issues, if migrations don't apply, or if either Docker image fails to build.",
  "Changing an API shape means changing `docs/api.md`, the Pydantic schema and `types.ts` in the same PR.",
  "Carolina Blue (`#4B9CD3`) is too light for text on white. Use navy for text and links.",
  "The seed policies' `content_text` has its headings flattened, so RAG ingestion must re-extract the HTML to chunk by section.",
  "Each reranker scores on its own scale, so re-tune the confidence gate's threshold whenever the reranker changes.",
  "The project's design records in `docs/` are kept current with each change. When a decision is made, add a dated entry to `docs/decisions.md`.",
];

export const RELATED: { title: string; href: string; text: string }[] = [
  { title: "Specifications (D1)", href: "/deliverables/product-specification", text: "User stories and the functional, non-functional and interface requirements (the F, NF and I numbers referenced in code and docs)." },
  { title: "Test Plan (D3)", href: "/deliverables/test-plan", text: "What we test and how: unit, integration, system and acceptance testing." },
  { title: "User Manual (D4)", href: "/deliverables/user-manual", text: "Guides for researchers and administrators. Coming later this semester." },
  { title: "Code (D5)", href: "/deliverables/code", text: "The final code deliverable." },
  { title: "Architecture Diagram (M7)", href: "/deliverables/architecture-diagram", text: "The first, simpler architecture diagram, including the planned production setup." },
  { title: "Platform Selection (M6)", href: "/deliverables/platform-selection", text: "The alternatives we compared for each part of the stack." },
  { title: "System Metaphor (M5)", href: "/deliverables/system-metaphor", text: "Nora as a reference library: a quick mental model." },
  { title: "Client Handoff Plan (M8)", href: "/deliverables/client-handoff-plan", text: "How the code, hosting and accounts pass to UNC Research." },
];

export const REPO_DOCS: { file: string; text: string }[] = [
  { file: "docs/product.md", text: "Clients, users, product rules and the admin dashboard requirements" },
  { file: "docs/api.md", text: "Every endpoint's request and response" },
  { file: "docs/database.md", text: "The full schema, including the planned tables" },
  { file: "docs/auth.md", text: "Mock login, UNC SSO plans and the admin list" },
  { file: "docs/frontend.md", text: "Routes, layout, navigation and styling rules" },
  { file: "docs/rag.md", text: "The Ask pipeline design, models and evaluation" },
  { file: "docs/deployment.md", text: "Environments and CloudApps requirements" },
  { file: "docs/roadmap.md", text: "Milestones and what's built" },
  { file: "docs/decisions.md", text: "Dated decision log and open questions" },
];
