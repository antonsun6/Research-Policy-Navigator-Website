import Link from "next/link";
import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ErDiagram from "./ErDiagram";
import { Inline, Markdown } from "./Markdown";
import { README, README_COMMIT } from "./readme";
import {
  ARCHITECTURE_PARTS,
  BACKEND_MODULES,
  DATA_CONVENTIONS,
  DECISIONS,
  DEPENDENCIES,
  ENVIRONMENTS,
  ENV_VARS,
  FIELD_RULES,
  FRONTEND_MODULES,
  GLOSSARY,
  GOTCHAS,
  LANGUAGES,
  MODULE_RULES,
  NOT_DONE,
  OPEN_QUESTIONS,
  PDF_PATH,
  PLANNED_TABLES,
  REPO,
  REPO_BRANCH,
  REPO_DOCS,
  REPO_TREE,
  RELATED,
  SEARCH_TRACE,
  SEED_FIELDS,
  SIGNIN_FLOW,
  TABLES,
  TASKS,
  repoUrl,
  type Module,
  type Status,
} from "./content";

const LAST_UPDATED = "Nov 2, 2026";

const SECTIONS = [
  { id: "architecture", title: "Architecture" },
  { id: "repository", title: "Code Repository" },
  { id: "data", title: "Detailed Data Definitions" },
  { id: "rationale", title: "Design Rationale" },
  { id: "guide", title: "Guide for the Next Developer" },
  { id: "related", title: "Related Documents" },
  { id: "glossary", title: "Glossary" },
];

const STATUS_BADGE: Record<Status, string> = {
  Built: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  Mockup: "bg-amber-100 text-amber-700",
  Planned: "bg-slate-100 text-slate-500",
};

function Badge({ status }: { status: Status }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE[status]}`}
    >
      {status}
    </span>
  );
}

function Section({
  n,
  id,
  title,
  intro,
  children,
}: {
  n: number;
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-6 print:break-before-page">
      <div className="border-b-2 border-[var(--carolina)] pb-3">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
          <span className="mr-2 text-[var(--carolina-ink)]">{n}.</span>
          {title}
        </h2>
        {intro && (
          <p className="mt-2 leading-relaxed text-[var(--foreground)]/75">
            <Inline text={intro} />
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-20 text-lg font-semibold text-[var(--navy)] print:break-after-avoid">
      {children}
    </h3>
  );
}

function P({ text }: { text: string }) {
  return (
    <p className="leading-relaxed text-[var(--foreground)]/80">
      <Inline text={text} />
    </p>
  );
}

function Bullets({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <List
      className={`flex flex-col gap-2 pl-5 leading-relaxed text-[var(--foreground)]/80 ${
        ordered ? "list-decimal" : "list-disc marker:text-[var(--carolina)]"
      }`}
    >
      {items.map((item) => (
        <li key={item}>
          <Inline text={item} />
        </li>
      ))}
    </List>
  );
}

function Table({
  head,
  rows,
  widths,
}: {
  head: string[];
  rows: React.ReactNode[][];
  widths?: string[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--carolina-soft)]/60 text-[var(--navy)]">
            {head.map((h, i) => (
              <th
                key={h || i}
                style={widths?.[i] ? { width: widths[i] } : undefined}
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t border-[var(--border)] align-top print:break-inside-avoid">
              {row.map((cell, c) => (
                <td key={c} className="px-3 py-2 text-[var(--foreground)]/80">
                  {typeof cell === "string" ? <Inline text={cell} /> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModuleTable({ modules }: { modules: Module[] }) {
  return (
    <Table
      head={["Module", "What it does", "Uses"]}
      widths={["24%", "58%", "18%"]}
      rows={modules.map((m) => [
        <div key="p" className="flex flex-col items-start gap-1">
          <code className="font-mono text-xs font-semibold text-[var(--navy)]">{m.path}</code>
          <Badge status={m.status} />
        </div>,
        m.does,
        <span key="u" className="text-xs">{m.uses}</span>,
      ])}
    />
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl card-surface p-5 print:break-inside-avoid ${className}`}>
      {children}
    </div>
  );
}

export default function DesignDocumentPage() {
  const item = findDeliverable("D2");

  return (
    <div className="design-doc flex flex-col gap-10">
      {/* Title block */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2 print:hidden">
          <span className="font-mono text-xs font-semibold text-[var(--carolina-ink)]">
            {item.id}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
          >
            {item.status}
          </span>
        </div>
        <p className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)] print:block">
          COMP 523 · Team A · Deliverable D2
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--navy)]">
          Nora Design Document
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          A tutorial for the code behind Nora the Policy Navigator, written for
          a developer who needs to maintain it, extend it, or reuse parts of it.
        </p>
        <p className="text-xs text-[var(--foreground)]/55">
          Andy Huoy · Adithi Srikrishna · Anton Sun · Jerry Wen · Last updated {LAST_UPDATED}
          <br />
          Describes the <code className="font-mono">{REPO_BRANCH}</code> branch of{" "}
          <a href={REPO} className="text-[var(--carolina-ink)] hover:underline">
            {REPO.replace("https://", "")}
          </a>{" "}
          at commit <code className="font-mono">{README_COMMIT.sha}</code>
        </p>
        <div className="flex flex-wrap justify-center gap-3 print:hidden">
          <a
            href={PDF_PATH}
            download
            className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--navy-deep)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
            </svg>
            Download PDF
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--navy)] transition-colors hover:border-[var(--carolina)]"
          >
            Code on GitHub →
          </a>
        </div>
      </div>

      <article className="mx-auto flex w-full max-w-4xl flex-col gap-14 text-left">
        {/* How to use */}
        <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
          <Card>
            <h3 className="font-semibold text-[var(--navy)]">How to use this document</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/75">
              It assumes you know basic programming and object-oriented ideas,
              and nothing about UNC research policy. Domain terms (Onyen, RAG,
              CloudApps…) are explained in the{" "}
              <a href="#glossary" className="text-[var(--carolina-ink)] hover:underline">Glossary</a>.
            </p>
            <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-[var(--foreground)]/75 marker:text-[var(--carolina)]">
              <li><strong className="text-[var(--navy)]">New to the project?</strong> Read sections 1 and 2, then run it with the README.</li>
              <li><strong className="text-[var(--navy)]">Have a specific task?</strong> Start at section 5, which links back to what you need.</li>
              <li><strong className="text-[var(--navy)]">Touching the database?</strong> Section 3 defines every table and field.</li>
              <li><strong className="text-[var(--navy)]">Wondering why it&apos;s built this way?</strong> Section 4.</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/75">
              Nora is partly built. <Badge status="Built" /> parts exist and work,{" "}
              <Badge status="Mockup" /> parts show sample data, and{" "}
              <Badge status="Planned" /> parts are designed but not written yet.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-[var(--navy)]">Contents</h3>
            <ol className="mt-2 flex flex-col gap-1.5 text-sm">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[var(--carolina-ink)] hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* What Nora is */}
        <Card className="border-l-4 border-l-[var(--navy)]">
          <h3 className="font-semibold text-[var(--navy)]">What Nora does, in one paragraph</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/80">
            UNC research policy is spread across many websites and offices, and
            it&apos;s hard to interpret even once you find it. Nora gives
            researchers one place to <strong className="text-[var(--navy)]">browse</strong> policy
            by topic, <strong className="text-[var(--navy)]">search</strong> it by keyword, or{" "}
            <strong className="text-[var(--navy)]">ask</strong> a plain-language question and get a
            short answer that cites the policy it came from, or a referral to the
            right office when the policies don&apos;t clearly answer it. UNC
            Research staff (admins) manage the content and see what researchers
            ask. Our client is UNC&apos;s Office of the Vice Chancellor for
            Research.
          </p>
        </Card>

        {/* 1. Architecture */}
        <Section
          n={1}
          id="architecture"
          title="Architecture"
          intro="Nora is a three-tier, client-server web application: a React app in the browser, a FastAPI server, and a PostgreSQL database. It works by request and response; nothing is event-driven or real-time. This diagram expands our [first architecture diagram](/deliverables/architecture-diagram) with the modules that now exist."
        >
          <div className="rounded-2xl card-surface p-4 sm:p-6 print:break-inside-avoid print:p-2">
            <div className="overflow-x-auto">
              <div className="min-w-[820px] print:min-w-0">
                <ArchitectureDiagram />
              </div>
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--foreground)]/70">
              <li className="flex items-center gap-2">
                <span className="h-3.5 w-5 rounded border-[1.5px] border-[var(--carolina)] bg-[var(--carolina-soft)]" />
                Built (ours)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3.5 w-5 rounded border-[1.5px] border-dashed border-slate-400 bg-slate-50" />
                Planned, or owned by UNC or a third party
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 border-t-[2.25px] border-dashed border-[var(--navy)]" />
                Over the internet
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 border-t-[1.5px] border-dotted border-slate-400" />
                Planned or manual connection
              </li>
              <li>* Ask uses fake data and Document is a placeholder until their endpoints exist.</li>
            </ul>
            <p className="mt-2 text-center text-xs text-[var(--foreground)]/50 sm:hidden print:hidden">
              Scroll sideways to see the whole diagram.
            </p>
          </div>

          <H3>The parts</H3>
          <div className="grid gap-3 sm:grid-cols-2">
            {ARCHITECTURE_PARTS.map((part) => (
              <Card key={part.name}>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-[var(--navy)]">{part.name}</h4>
                  <Badge status={part.status} />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--foreground)]/75">
                  <Inline text={part.text} />
                </p>
              </Card>
            ))}
          </div>

          <H3>Following one request: a keyword search</H3>
          <P text="This trace shows how the layers in the diagram connect. Every other feature follows the same path, with a different page, router and query." />
          <ol className="flex flex-col gap-2">
            {SEARCH_TRACE.map((step, i) => (
              <li key={step.where} className="flex gap-3 rounded-xl border border-[var(--border)] bg-white p-3 print:break-inside-avoid">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <div className="text-sm leading-relaxed">
                  <code className="font-mono text-xs font-semibold text-[var(--carolina-ink)]">{step.where}</code>
                  <p className="mt-0.5 text-[var(--foreground)]/80">
                    <Inline text={step.what} />
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <H3>How sign-in works</H3>
          <Bullets items={SIGNIN_FLOW} ordered />

          <H3>Local vs. production</H3>
          <Table
            head={ENVIRONMENTS[0]}
            widths={["22%", "39%", "39%"]}
            rows={ENVIRONMENTS.slice(1).map(([label, ...rest]) => [
              <span key="l" className="font-semibold text-[var(--navy)]">{label}</span>,
              ...rest,
            ])}
          />
        </Section>

        {/* 2. Code repository */}
        <Section
          n={2}
          id="repository"
          title="Code Repository"
          intro={`Nora's code is on GitHub at [${REPO.replace("https://", "")}](${REPO}). Work happens on the \`dev\` branch (the default); \`main\` is reserved for production releases.`}
        >
          <pre className="overflow-x-auto rounded-lg bg-[var(--navy)] px-4 py-3 font-mono text-xs text-white">
            {`git clone ${REPO}.git\ncd Nora-Research-Policy-Navigator\ndocker compose up --build     # then open http://localhost:5173`}
          </pre>

          <H3>Languages, and which parts use them</H3>
          <Table
            head={["Language", "Where", "Diagram parts written in it"]}
            widths={["20%", "26%", "54%"]}
            rows={LANGUAGES.map((l) => [
              <span key="l" className="font-semibold text-[var(--navy)]">{l.language}</span>,
              l.where,
              l.parts,
            ])}
          />

          <H3>Repository layout</H3>
          <pre className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white px-4 py-3 font-mono text-[11.5px] leading-relaxed text-[var(--navy)] print:whitespace-pre-wrap">
            {REPO_TREE}
          </pre>

          <H3>Backend modules (Python)</H3>
          <P text="Listed from the outside in, matching the FastAPI box in the diagram. Paths are relative to `backend/`." />
          <ModuleTable modules={BACKEND_MODULES} />

          <H3>Frontend modules (TypeScript)</H3>
          <P text="Paths are relative to `frontend/`." />
          <ModuleTable modules={FRONTEND_MODULES} />

          <H3>How the modules relate</H3>
          <P text="Dependencies point one way: pages → data access → HTTP client on the frontend, and routers → auth and schemas → models → database on the backend. A few rules hold this together:" />
          <Bullets items={MODULE_RULES} />

          <H3 id="readme">The README</H3>
          <P
            text={`Copied verbatim from [README.md](README.md) on \`dev\` (commit \`${README_COMMIT.sha}\`). It explains how to build and run the system from the repository.`}
          />
          <div className="rounded-2xl border-2 border-dashed border-[var(--carolina)]/50 bg-white p-5 sm:p-6">
            <Markdown source={README} />
          </div>
        </Section>

        {/* 3. Data definitions */}
        <Section
          n={3}
          id="data"
          title="Detailed Data Definitions"
          intro="Nora keeps all of its data in one PostgreSQL database. Five tables exist today; the rest are designed and listed at the end. Seed data comes from one JSON file, and configuration from environment variables."
        >
          <H3>Conventions</H3>
          <Bullets items={DATA_CONVENTIONS} />

          <H3>Tables and relationships</H3>
          <div className="rounded-2xl card-surface p-4 sm:p-6 print:break-inside-avoid">
            <div className="overflow-x-auto">
              <div className="min-w-[680px] print:min-w-0">
                <ErDiagram />
              </div>
            </div>
            <p className="mt-2 text-xs text-[var(--foreground)]/60">
              Lines run from a foreign key (crow&apos;s foot: many) to the row it
              points at (bar: one). A document has one office and many topics;
              a topic has one default office and many documents.
            </p>
          </div>

          {TABLES.map((table) => (
            <div key={table.name} className="flex flex-col gap-3">
              <H3 id={`table-${table.name}`}>
                <code className="font-mono">{table.name}</code>
              </H3>
              <P text={table.purpose} />
              <Table
                head={["Column", "Type", "Null", "Default / constraints", "Use"]}
                widths={["17%", "13%", "7%", "23%", "40%"]}
                rows={table.columns.map((c) => [
                  <code key="n" className="font-mono text-xs font-semibold text-[var(--navy)]">{c.name}</code>,
                  <code key="t" className="font-mono text-xs">{c.type}</code>,
                  c.nullable ? "yes" : "no",
                  <span key="d" className="text-xs">
                    <Inline text={[c.defaultValue && `default \`${c.defaultValue}\``, c.constraints].filter(Boolean).join("; ")} />
                  </span>,
                  c.use,
                ])}
              />
            </div>
          ))}

          <H3>Rules between fields</H3>
          <P text="These relationships between fields aren't visible from the column types. Where the database doesn't enforce a rule, the application must." />
          <Bullets items={FIELD_RULES} />

          <H3>Seed data file: research_policies.json</H3>
          <P text="[backend/app/seed/data/research_policies.json](backend/app/seed/data/research_policies.json) is a JSON array with one object per policy. Its 16 entries are real public policies from the UNC Policy Knowledge Base. The seed script also defines 8 offices, 9 topics and the 2 demo users (`researcher1`, `admin1`) in Python." />
          <Table
            head={["Field", "Format and rules"]}
            widths={["28%", "72%"]}
            rows={SEED_FIELDS.map((f) => [
              <code key="f" className="font-mono text-xs font-semibold text-[var(--navy)]">{f.field}</code>,
              f.rule,
            ])}
          />

          <H3>Session cookie</H3>
          <P text="`nora_session` is the only data stored in the browser. Starlette signs it with `SESSION_SECRET` and it holds one value, `user_id` (the `users.id`). It's HTTP-only (JavaScript can't read it), SameSite=Lax, expires after `SESSION_MAX_AGE_SECONDS`, and is HTTPS-only in production. Logging out clears it." />

          <H3>Configuration (environment variables)</H3>
          <Table
            head={["Variable", "Default", "Use"]}
            widths={["28%", "22%", "50%"]}
            rows={ENV_VARS.map((v) => [
              <code key="n" className="font-mono text-xs font-semibold text-[var(--navy)]">{v.name}</code>,
              <span key="d" className="text-xs">{v.default}</span>,
              v.use,
            ])}
          />

          <H3>Planned tables</H3>
          <P text="Designed in [docs/database.md](docs/database.md), which has their full column lists. They'll be added through migrations as the features that need them are built." />
          <Table
            head={["Table", "Use", ""]}
            widths={["24%", "66%", "10%"]}
            rows={PLANNED_TABLES.map((t) => [
              <code key="n" className="font-mono text-xs font-semibold text-[var(--navy)]">{t.name}</code>,
              t.use,
              <Badge key="b" status="Planned" />,
            ])}
          />
        </Section>

        {/* 4. Design rationale */}
        <Section
          n={4}
          id="rationale"
          title="Design Rationale"
          intro="The decisions that shaped Nora, why we made them, and what we chose not to do. The dated, running record is [docs/decisions.md](docs/decisions.md); our [meeting notes](/journal) show where many of them came from."
        >
          <H3>Design decisions</H3>
          <div className="flex flex-col gap-3">
            {DECISIONS.map((d, i) => (
              <Card key={d.title}>
                <h4 className="font-semibold text-[var(--navy)]">
                  <span className="mr-1.5 text-[var(--carolina-ink)]">4.{i + 1}</span>
                  {d.title}
                </h4>
                <dl className="mt-2 grid gap-x-4 gap-y-1.5 text-sm leading-relaxed sm:grid-cols-[6.5rem_1fr]">
                  <dt className="font-medium text-[var(--navy)]">Decision</dt>
                  <dd className="text-[var(--foreground)]/80"><Inline text={d.decision} /></dd>
                  <dt className="font-medium text-[var(--navy)]">Why</dt>
                  <dd className="text-[var(--foreground)]/80"><Inline text={d.why} /></dd>
                  {d.rejected && (
                    <>
                      <dt className="font-medium text-[var(--navy)]">Not chosen</dt>
                      <dd className="text-[var(--foreground)]/80"><Inline text={d.rejected} /></dd>
                    </>
                  )}
                </dl>
              </Card>
            ))}
          </div>

          <H3>Dependencies, and why we depend on them</H3>
          <P text="Exact versions are pinned in [backend/pyproject.toml](backend/pyproject.toml) and [frontend/package.json](frontend/package.json)." />
          <Table
            head={["Dependency", "Area", "Why"]}
            widths={["26%", "18%", "56%"]}
            rows={DEPENDENCIES.map((d) => [
              <span key="n" className="font-semibold text-[var(--navy)]">{d.name}</span>,
              <span key="a" className="text-xs">{d.area}</span>,
              d.why,
            ])}
          />

          <H3>What we chose not to do</H3>
          <Table
            head={["Not done", "Why"]}
            widths={["40%", "60%"]}
            rows={NOT_DONE.map((n) => [
              <span key="w" className="font-medium text-[var(--navy)]">{n.what}</span>,
              n.why,
            ])}
          />

          <H3>Open questions</H3>
          <P text="Still waiting on answers from the client, the Link or UNC ITS. Each one affects the code where noted." />
          <Bullets items={OPEN_QUESTIONS} />
        </Section>

        {/* 5. Guide */}
        <Section
          n={5}
          id="guide"
          title="Guide for the Next Developer"
          intro="Step-by-step recipes for the tasks a new developer is most likely to be handed, and the mistakes that are easy to make."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {TASKS.map((t) => (
              <Card key={t.task}>
                <h4 className="font-semibold text-[var(--navy)]">{t.task}</h4>
                <ol className="mt-2 flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-relaxed text-[var(--foreground)]/80">
                  {t.steps.map((s) => (
                    <li key={s}>
                      <Inline text={s} />
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>

          <H3>Things that will trip you up</H3>
          <Bullets items={GOTCHAS} />
        </Section>

        {/* 6. Related */}
        <Section
          n={6}
          id="related"
          title="Related Documents"
          intro="This is the one document meant to outlive the semester, so it points to everything else."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {RELATED.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-2xl card-surface p-4 transition-colors hover:border-[var(--carolina)] print:break-inside-avoid"
              >
                <h4 className="font-semibold text-[var(--navy)]">
                  {r.title} <span className="text-[var(--carolina)]">→</span>
                </h4>
                <p className="mt-1 text-sm text-[var(--foreground)]/70">{r.text}</p>
              </Link>
            ))}
          </div>

          <H3>Design records in the repository</H3>
          <P text="The `docs/` folder holds the detailed, continuously updated records this document summarizes. When they disagree with this document, they (and the code) are newer." />
          <Table
            head={["File", "What it covers"]}
            widths={["30%", "70%"]}
            rows={REPO_DOCS.map((d) => [
              <a key="f" href={repoUrl(d.file)} target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-semibold text-[var(--carolina-ink)] hover:underline">
                {d.file}
              </a>,
              d.text,
            ])}
          />
        </Section>

        {/* 7. Glossary */}
        <Section
          n={7}
          id="glossary"
          title="Glossary"
          intro="The domain and technical terms used in this document and the code."
        >
          <dl className="grid gap-3 sm:grid-cols-2">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-xl border border-[var(--border)] bg-white p-3 print:break-inside-avoid">
                <dt className="font-semibold text-[var(--navy)]">{g.term}</dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-[var(--foreground)]/75">
                  <Inline text={g.meaning} />
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </article>
    </div>
  );
}
