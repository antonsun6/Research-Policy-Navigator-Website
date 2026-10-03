// Nora's architecture as an inline SVG, drawn in a 1000 x 620 coordinate
// space. Solid borders are our work; dashed gray borders are existing UNC or
// third-party pieces we adapt to. Dashed lines cross the internet.

const OURS = "fill-[var(--carolina-soft)] stroke-[var(--carolina)]";
const EXISTING = "fill-slate-100 stroke-slate-400";
const ZONE = "fill-white/60 stroke-slate-300";

function Label({
  x,
  y,
  children,
  bold,
  size = 12.5,
  anchor = "middle",
  muted,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  bold?: boolean;
  size?: number;
  anchor?: "start" | "middle" | "end";
  muted?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={bold ? 600 : 400}
      className={muted ? "fill-slate-500" : "fill-[var(--navy)]"}
    >
      {children}
    </text>
  );
}

function ZoneTitle({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={11}
      fontWeight={600}
      letterSpacing="0.12em"
      className="fill-[var(--carolina-ink)]"
    >
      {children}
    </text>
  );
}

// labelY centers the rotated label in a stretch of the band no arrow crosses.
function InternetBand({
  x,
  y,
  h,
  labelY,
  label,
}: {
  x: number;
  y: number;
  h: number;
  labelY: number;
  label: string;
}) {
  const cx = x + 28;
  const cy = labelY;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={56}
        height={h}
        rx={14}
        strokeDasharray="4 4"
        className="fill-amber-50 stroke-amber-300"
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        letterSpacing="0.16em"
        transform={`rotate(-90 ${cx} ${cy})`}
        className="fill-amber-700"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({
  d,
  internet,
  both,
  faint,
}: {
  d: string;
  internet?: boolean;
  both?: boolean;
  faint?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={internet ? 2.5 : 1.75}
      strokeDasharray={internet ? "7 5" : faint ? "3 4" : undefined}
      markerEnd="url(#arrow)"
      markerStart={both ? "url(#arrow)" : undefined}
      className={faint ? "stroke-slate-400" : "stroke-[var(--navy)]"}
    />
  );
}

export default function Diagram() {
  return (
    <svg
      viewBox="0 0 1000 620"
      role="img"
      aria-labelledby="arch-title arch-desc"
      className="h-auto w-full"
    >
      <title id="arch-title">Nora architecture diagram</title>
      <desc id="arch-desc">
        Researchers and admins use a web browser to reach Nora over the
        internet. On Carolina CloudApps, UNC Shibboleth sign-in sits in front
        of an nginx web container serving the React app, which forwards API
        calls to a FastAPI container. The API reads and writes a PostgreSQL
        database with pgvector, and calls third-party LLM and embedding APIs
        over the internet. Admins curate documents by hand from the existing
        UNC Policy Knowledge Base.
      </desc>
      <defs>
        <marker
          id="arrow"
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

      {/* Users: the outside world */}
      <rect x={20} y={20} width={200} height={330} rx={18} strokeWidth={1.5} strokeDasharray="5 5" className={ZONE} />
      <ZoneTitle x={120} y={48}>USERS</ZoneTitle>
      <rect x={40} y={80} width={160} height={80} rx={12} strokeWidth={1.5} className="fill-white stroke-slate-400" />
      <Label x={120} y={112} bold size={14}>Researcher</Label>
      <Label x={120} y={132} muted>web browser,</Label>
      <Label x={120} y={149} muted>desktop or phone</Label>
      <rect x={40} y={210} width={160} height={80} rx={12} strokeWidth={1.5} className="fill-white stroke-slate-400" />
      <Label x={120} y={242} bold size={14}>Administrator</Label>
      <Label x={120} y={262} muted>UNC Research staff,</Label>
      <Label x={120} y={279} muted>web browser</Label>

      {/* Pre-existing data source */}
      <rect x={20} y={420} width={200} height={120} rx={14} strokeWidth={1.5} strokeDasharray="5 4" className={EXISTING} />
      <Label x={120} y={452} bold size={13.5}>UNC Policy</Label>
      <Label x={120} y={470} bold size={13.5}>Knowledge Base</Label>
      <Label x={120} y={492} muted>policies.unc.edu</Label>
      <Label x={120} y={510} muted>9 categories · &lt;200 docs</Label>
      <Arrow d="M120,420 L120,294" faint />
      <Label x={128} y={372} anchor="start" size={11} muted>curated by hand,</Label>
      <Label x={128} y={388} anchor="start" size={11} muted>no live sync</Label>

      {/* Internet between users and UNC */}
      <InternetBand x={236} y={20} h={330} labelY={286} label="INTERNET · HTTPS" />

      {/* Carolina CloudApps */}
      <rect x={306} y={20} width={404} height={580} rx={22} strokeWidth={2} strokeDasharray="8 6" className="fill-slate-50 stroke-slate-400" />
      <ZoneTitle x={508} y={46}>CAROLINA CLOUDAPPS (OPENSHIFT)</ZoneTitle>

      <rect x={326} y={64} width={364} height={64} rx={12} strokeWidth={1.5} strokeDasharray="5 4" className={EXISTING} />
      <Label x={508} y={91} bold size={14}>UNC Shibboleth SSO (Onyen)</Label>
      <Label x={508} y={111} muted size={11.5}>production sign-in · mock login during the semester</Label>

      <rect x={326} y={158} width={364} height={70} rx={12} strokeWidth={1.75} className={OURS} />
      <Label x={508} y={187} bold size={14}>Web container · nginx + React app</Label>
      <Label x={508} y={208} muted size={11.5}>serves the UI · forwards /api/* to the API</Label>

      <rect x={326} y={258} width={364} height={212} rx={12} strokeWidth={1.75} className={OURS} />
      <Label x={508} y={285} bold size={14}>API container · FastAPI (Python)</Label>
      <Label x={508} y={303} muted size={11.5}>REST JSON API under /api</Label>
      {[
        { x: 340, y: 316, w: 166, t: "Auth & roles" },
        { x: 510, y: 316, w: 166, t: "Browse & search" },
        { x: 340, y: 364, w: 166, t: "Ask · RAG pipeline" },
        { x: 510, y: 364, w: 166, t: "Admin & analytics" },
        { x: 340, y: 412, w: 336, t: "Document ingestion: chunk + embed policies" },
      ].map((chip) => (
        <g key={chip.t}>
          <rect x={chip.x} y={chip.y} width={chip.w} height={40} rx={8} strokeWidth={1.25} className="fill-white stroke-[var(--carolina)]" />
          <Label x={chip.x + chip.w / 2} y={chip.y + 25} size={12.5}>{chip.t}</Label>
        </g>
      ))}

      <path
        d="M326,510 a182,12 0 0 1 364,0 v62 a182,12 0 0 1 -364,0 z"
        strokeWidth={1.75}
        className={OURS}
      />
      <path d="M326,510 a182,12 0 0 0 364,0" fill="none" strokeWidth={1.75} className="stroke-[var(--carolina)]" />
      <Label x={508} y={546} bold size={14}>PostgreSQL + pgvector</Label>
      <Label x={508} y={565} muted size={11.5}>policies · embeddings · users · questions · feedback</Label>

      {/* Internet between UNC and third parties */}
      <InternetBand x={722} y={190} h={300} labelY={372} label="INTERNET" />

      {/* Third-party services */}
      <rect x={790} y={190} width={192} height={300} rx={18} strokeWidth={1.5} strokeDasharray="5 5" className={ZONE} />
      <ZoneTitle x={886} y={216}>THIRD-PARTY</ZoneTitle>
      <rect x={806} y={232} width={160} height={104} rx={12} strokeWidth={1.5} strokeDasharray="5 4" className={EXISTING} />
      <Label x={886} y={262} bold size={14}>LLM API</Label>
      <Label x={886} y={282} muted>writes cited answers</Label>
      <Label x={886} y={302} muted size={11}>Claude in development;</Label>
      <Label x={886} y={318} muted size={11}>needs UNC approval</Label>
      <rect x={806} y={360} width={160} height={104} rx={12} strokeWidth={1.5} strokeDasharray="5 4" className={EXISTING} />
      <Label x={886} y={390} bold size={14}>Embedding API</Label>
      <Label x={886} y={410} muted>text → vectors</Label>
      <Label x={886} y={430} muted size={11}>provider TBD; local</Label>
      <Label x={886} y={446} muted size={11}>model as fallback</Label>

      {/* Data flow */}
      <Arrow d="M200,120 L322,92" internet both />
      <Arrow d="M200,250 L322,106" internet both />
      <Arrow d="M508,128 L508,154" both />
      <Arrow d="M508,228 L508,254" both />
      <Label x={516} y={246} anchor="start" size={11} muted>JSON</Label>
      <Arrow d="M508,470 L508,494" both />
      <Label x={516} y={488} anchor="start" size={11} muted>SQL · vector search</Label>
      <Arrow d="M690,332 L802,290" internet both />
      <Arrow d="M690,428 L802,412" internet both />
    </svg>
  );
}
