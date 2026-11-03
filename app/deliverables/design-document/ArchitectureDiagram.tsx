// Nora's detailed architecture (as built on dev, plus what's planned), drawn
// in a 1120 x 790 coordinate space. Solid Carolina boxes are built; dashed
// gray boxes are planned or belong to UNC or a third party.

const BUILT = "fill-[var(--carolina-soft)] stroke-[var(--carolina)]";
const CHIP = "fill-white stroke-[var(--carolina)]";
const PLANNED = "fill-slate-50 stroke-slate-400";
const ZONE = "fill-white/60 stroke-slate-300";

function T({
  x,
  y,
  children,
  bold,
  size = 11.5,
  muted,
  mono,
  accent,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  bold?: boolean;
  size?: number;
  muted?: boolean;
  mono?: boolean;
  accent?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={bold ? 600 : 400}
      fontFamily={mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined}
      className={
        accent ? "fill-[var(--carolina-ink)]" : muted ? "fill-slate-500" : "fill-[var(--navy)]"
      }
    >
      {children}
    </text>
  );
}

function Box({
  x,
  y,
  w,
  h,
  kind = "built",
  rx = 10,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  kind?: "built" | "chip" | "planned" | "zone";
  rx?: number;
}) {
  const className =
    kind === "built" ? BUILT : kind === "chip" ? CHIP : kind === "planned" ? PLANNED : ZONE;
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      strokeWidth={kind === "chip" ? 1.25 : 1.5}
      strokeDasharray={kind === "planned" ? "5 4" : kind === "zone" ? "6 5" : undefined}
      className={className}
    />
  );
}

function ZoneTitle({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={10.5}
      fontWeight={600}
      letterSpacing="0.12em"
      className="fill-[var(--carolina-ink)]"
    >
      {children}
    </text>
  );
}

function Arrow({
  d,
  both,
  faint,
  internet,
}: {
  d: string;
  both?: boolean;
  faint?: boolean;
  internet?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={internet ? 2.25 : 1.6}
      strokeDasharray={internet ? "7 5" : faint ? "3 4" : undefined}
      markerEnd="url(#dd-arrow)"
      markerStart={both ? "url(#dd-arrow)" : undefined}
      className={faint ? "stroke-slate-400" : "stroke-[var(--navy)]"}
    />
  );
}

// A two-line chip: a title and one detail line.
function Chip({ x, y, w, h, title, detail }: { x: number; y: number; w: number; h: number; title: string; detail: string }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} kind="chip" rx={8} />
      <T x={x + w / 2} y={y + 22} bold size={12}>{title}</T>
      <T x={x + w / 2} y={y + 41} muted size={10.5} mono>{detail}</T>
    </g>
  );
}

function Pill({ x, y, w, label, planned }: { x: number; y: number; w: number; label: string; planned?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={24}
        rx={12}
        strokeWidth={1.1}
        strokeDasharray={planned ? "4 3" : undefined}
        className={planned ? PLANNED : "fill-[var(--carolina-soft)] stroke-[var(--carolina)]"}
      />
      <T x={x + w / 2} y={y + 16} size={10.5} mono muted={planned}>{label}</T>
    </g>
  );
}

const BUILT_TABLES = ["users", "offices", "topics", "documents", "document_topics"];
const PLANNED_TABLES = [
  "document_chunks",
  "questions",
  "question_citations",
  "feedback",
  "faqs",
  "saved_items",
  "usage_events",
];

export default function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 1120 790"
      role="img"
      aria-labelledby="dd-arch-title dd-arch-desc"
      className="h-auto w-full"
    >
      <title id="dd-arch-title">Nora detailed architecture</title>
      <desc id="dd-arch-desc">
        In the user&apos;s browser, the React app (pages, routing and guards,
        auth state, data access and an HTTP client) calls /api over HTTPS. A
        web server (nginx in production, Vite in development) serves the app
        and forwards /api to the FastAPI backend, whose layers are the app
        factory and session middleware, routers, auth dependencies, Pydantic
        schemas and SQLAlchemy models. The models read and write PostgreSQL
        with pgvector, whose schema comes from Alembic migrations and whose
        demo data comes from the seed script, copied by hand from the UNC
        Policy Knowledge Base. UNC SSO, the RAG pipeline, AI models and
        several tables are planned.
      </desc>
      <defs>
        <marker
          id="dd-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" className="fill-[var(--navy)]" />
        </marker>
      </defs>

      {/* ---- User's browser ---- */}
      <Box x={20} y={20} w={270} h={600} kind="zone" rx={18} />
      <ZoneTitle x={155} y={46}>USER&apos;S BROWSER</ZoneTitle>
      <rect x={36} y={60} width={115} height={40} rx={10} strokeWidth={1.4} className="fill-white stroke-slate-400" />
      <T x={93.5} y={85} bold size={12.5}>Researcher</T>
      <rect x={159} y={60} width={115} height={40} rx={10} strokeWidth={1.4} className="fill-white stroke-slate-400" />
      <T x={216.5} y={85} bold size={12.5}>Admin</T>
      <Arrow d="M93,100 L93,114" />
      <Arrow d="M216,100 L216,114" />

      <Box x={36} y={118} w={238} h={486} />
      <T x={155} y={142} bold size={14}>React app · TypeScript</T>
      <T x={155} y={160} muted size={11} mono>frontend/src</T>

      <Box x={50} y={176} w={210} h={86} kind="chip" rx={8} />
      <T x={155} y={198} bold size={12}>Pages</T>
      <T x={155} y={218} muted size={10.5} mono>researcher/: Home, Browse,</T>
      <T x={155} y={234} muted size={10.5} mono>Topic, Search, Ask*, Document*</T>
      <T x={155} y={250} muted size={10.5} mono>admin/: Overview (mockup)</T>
      <Chip x={50} y={274} w={210} h={56} title="Routing & guards" detail="App.tsx · RequireAuth/Role" />
      <Chip x={50} y={342} w={210} h={56} title="Auth state" detail="AuthProvider · useAuth()" />
      <Chip x={50} y={410} w={210} h={56} title="Data access" detail="researcherApi.ts · authApi.ts" />
      <Box x={50} y={478} w={210} h={110} kind="chip" rx={8} />
      <T x={155} y={500} bold size={12}>HTTP client</T>
      <T x={155} y={520} muted size={10.5} mono>api/client.ts: fetch /api/…</T>
      <T x={155} y={538} muted size={10.5} mono>api/types.ts: API shapes</T>
      <T x={155} y={556} muted size={10.5} mono>ApiError(401/403/404)</T>
      <T x={155} y={576} muted size={10}>sends the nora_session cookie</T>

      {/* ---- Internet ---- */}
      <rect x={300} y={20} width={50} height={600} rx={14} strokeDasharray="4 4" className="fill-amber-50 stroke-amber-300" />
      <text
        x={325}
        y={170}
        textAnchor="middle"
        fontSize={10.5}
        fontWeight={600}
        letterSpacing="0.16em"
        transform="rotate(-90 325 170)"
        className="fill-amber-700"
      >
        HTTPS · ONE ORIGIN
      </text>

      {/* ---- Server side ---- */}
      <Box x={360} y={20} w={740} h={750} kind="zone" rx={20} />
      <ZoneTitle x={730} y={46}>CAROLINA CLOUDAPPS (OPENSHIFT) · LOCALLY: DOCKER COMPOSE</ZoneTitle>

      <Box x={376} y={64} w={200} h={70} kind="planned" />
      <T x={476} y={92} bold size={12.5}>UNC Shibboleth SSO</T>
      <T x={476} y={112} muted size={10.5}>planned · mock login today</T>

      <Box x={376} y={200} w={200} h={150} />
      <T x={476} y={226} bold size={13}>Web server</T>
      <T x={476} y={248} size={11}>nginx :8080 in production</T>
      <T x={476} y={266} size={11}>Vite :5173 in development</T>
      <T x={476} y={292} muted size={10.5}>serves the built React app,</T>
      <T x={476} y={310} muted size={10.5}>forwards /api/* to FastAPI</T>

      <Box x={376} y={380} w={200} h={64} />
      <T x={476} y={406} bold size={12}>Settings · config.py</T>
      <T x={476} y={426} muted size={10.5}>env vars, e.g. AUTH_PROVIDER</T>

      {/* FastAPI */}
      <Box x={600} y={60} w={280} h={564} />
      <T x={740} y={86} bold size={14}>FastAPI backend · Python 3.12</T>
      <T x={740} y={104} muted size={11} mono>backend/app</T>
      <Chip x={614} y={116} w={252} h={56} title="App factory · main.py" detail="create_app() · session cookie" />
      <Box x={614} y={184} w={252} h={124} kind="chip" rx={8} />
      <T x={740} y={206} bold size={12}>Routers · app/api, under /api</T>
      <Pill x={622} y={216} w={74} label="health" />
      <Pill x={702} y={216} w={74} label="auth" />
      <Pill x={782} y={216} w={76} label="mock auth" />
      <Pill x={622} y={246} w={115} label="topics" />
      <Pill x={743} y={246} w={115} label="documents" />
      <Pill x={622} y={276} w={236} label="ask · admin (planned)" planned />
      <Chip x={614} y={318} w={252} h={56} title="Auth · app/auth" detail="get_current_user · require_role" />
      <Chip x={614} y={386} w={252} h={56} title="Schemas · app/schemas" detail="Pydantic = the API contract" />
      <Chip x={614} y={454} w={252} h={56} title="Models · app/models, db.py" detail="SQLAlchemy · get_session()" />
      <Box x={614} y={522} w={252} h={88} kind="planned" rx={8} />
      <T x={740} y={546} bold size={12} muted>RAG pipeline (planned)</T>
      <T x={740} y={566} muted size={10.5}>chunk · embed · hybrid retrieve</T>
      <T x={740} y={582} muted size={10.5}>rerank · confidence gate</T>
      <T x={740} y={598} muted size={10.5}>LLM answer with citations</T>

      {/* Database */}
      <path d="M900,74 a92,14 0 0 1 184,0 v330 a92,14 0 0 1 -184,0 z" strokeWidth={1.5} className={BUILT} />
      <path d="M900,74 a92,14 0 0 0 184,0" fill="none" strokeWidth={1.5} className="stroke-[var(--carolina)]" />
      <T x={992} y={112} bold size={13.5}>PostgreSQL 17</T>
      <T x={992} y={130} muted size={11}>+ pgvector</T>
      <T x={992} y={156} bold size={10} accent>BUILT</T>
      {BUILT_TABLES.map((t, i) => (
        <T key={t} x={992} y={174 + i * 18} size={11} mono>{t}</T>
      ))}
      <T x={992} y={272} bold size={10} muted>PLANNED</T>
      {PLANNED_TABLES.map((t, i) => (
        <T key={t} x={992} y={290 + i * 18} size={11} mono muted>{t}</T>
      ))}

      <Box x={900} y={440} w={184} h={64} />
      <T x={992} y={466} bold size={12}>Alembic migrations</T>
      <T x={992} y={486} muted size={10} mono>backend/alembic/versions</T>

      <Box x={900} y={524} w={184} h={86} />
      <T x={992} y={548} bold size={12}>Seed data</T>
      <T x={992} y={566} muted size={10.5} mono>python -m app.seed</T>
      <T x={992} y={584} muted size={10.5}>2 demo users · 9 topics</T>
      <T x={992} y={600} muted size={10.5}>16 public UNC policies</T>

      <Box x={600} y={648} w={280} h={76} kind="planned" />
      <T x={740} y={674} bold size={12} muted>AI models (planned)</T>
      <T x={740} y={694} muted size={10.5}>local embedding + reranker models</T>
      <T x={740} y={712} muted size={10.5}>LLM: provider pending UNC approval</T>

      {/* ---- Content source ---- */}
      <Box x={20} y={648} w={330} h={92} kind="planned" rx={14} />
      <T x={185} y={676} bold size={12.5}>UNC Policy Knowledge Base</T>
      <T x={185} y={696} muted size={11}>policies.unc.edu · 9 research categories</T>
      <T x={185} y={716} muted size={11}>copied by hand into research_policies.json</T>

      {/* ---- Flows ---- */}
      <Arrow d="M274,533 C318,533 330,330 372,330" internet both />
      <Arrow d="M476,134 L476,196" faint />
      <T x={484} y={170} anchor="start" muted size={10}>planned: SSO in front</T>
      <Arrow d="M576,275 H594 V246 H610" both />
      <Arrow d="M866,482 H896" both />
      <T x={882} y={474} muted size={9.5}>SQL</T>
      <Arrow d="M992,440 L992,422" />
      <Arrow d="M1084,567 H1096 V240 H1088" />
      <Arrow d="M740,610 L740,644" faint both />
      <Arrow d="M350,700 H376 V746 H992 V614" faint />
      <T x={680} y={740} muted size={10.5}>curated by hand, no live sync</T>
    </svg>
  );
}
