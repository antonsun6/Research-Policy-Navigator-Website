import SectionHeading from "@/components/SectionHeading";
import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";
import Diagram from "./Diagram";

type Owner = "Ours" | "Existing (UNC)" | "Third-party";
type BuildState = "Scaffolded" | "Planned";

const OWNER_STYLES: Record<Owner, string> = {
  Ours: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  "Existing (UNC)": "bg-slate-100 text-slate-600",
  "Third-party": "bg-slate-100 text-slate-600",
};

const COMPONENTS: {
  name: string;
  owner: Owner;
  state: BuildState;
  text: string;
}[] = [
  {
    name: "Web container (nginx + React)",
    owner: "Ours",
    state: "Scaffolded",
    text: "Runs in the user's browser once loaded: the researcher views (Browse, Search, Ask) and the admin portal. In production, an unprivileged nginx serves the built app on port 8080 and forwards /api/* to the API, so the browser only ever talks to one origin.",
  },
  {
    name: "API container (FastAPI)",
    owner: "Ours",
    state: "Scaffolded",
    text: "All application logic, behind a JSON API under /api: resolving the user and their role, keyword search and topic browsing, the Ask pipeline, admin content management and analytics, and ingesting new documents. Only a health check exists so far.",
  },
  {
    name: "PostgreSQL + pgvector",
    owner: "Ours",
    state: "Scaffolded",
    text: "The single data store: policy documents and their chunks with embeddings, users and roles, questions asked, and feedback. Our first migration enables pgvector; the tables come next.",
  },
  {
    name: "UNC Shibboleth SSO",
    owner: "Existing (UNC)",
    state: "Planned",
    text: "UNC's Onyen sign-in. We adapt to it rather than build it: in production it will likely sit in front of the app and pass the user's identity in, with the exact pattern still to confirm with UNC ITS. Until then we use a mock login that models it.",
  },
  {
    name: "Carolina CloudApps",
    owner: "Existing (UNC)",
    state: "Planned",
    text: "UNC's OpenShift platform, which runs our containers. It requires non-root images that work under any user ID, which ours already do.",
  },
  {
    name: "UNC Policy Knowledge Base",
    owner: "Existing (UNC)",
    state: "Planned",
    text: "The source of Nora's content. There is no live connection: admins choose documents and upload them through the admin portal.",
  },
  {
    name: "LLM and embedding APIs",
    owner: "Third-party",
    state: "Planned",
    text: "External AI services reached over the internet. Both sit behind interfaces in the API so the provider can change once UNC approves one, and so tests never call them.",
  },
];

const ASK_FLOW = [
  "The researcher types a question in the browser, which sends it to /api over HTTPS.",
  "The API turns the question into a vector with the embedding API.",
  "pgvector finds the policy passages closest in meaning to the question.",
  "If nothing relevant enough is found, Nora says so and points the researcher to the right compliance office, without calling the LLM.",
  "Otherwise the API sends the question and those passages to the LLM, which writes a plain-language answer that cites them.",
  "The API saves the question, whether it was answered, and later any feedback, which feed the admin dashboard, and returns the answer with its sources.",
];

export default function ArchitectureDiagramPage() {
  const item = findDeliverable("M7");

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-xs font-semibold text-[var(--carolina-ink)]">
            {item.id}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
          >
            {item.status}
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
          Architecture Diagram
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          Nora is a <strong className="text-[var(--navy)]">client-server web application</strong>{" "}
          with three tiers: a React app in the user&apos;s browser, a FastAPI
          server, and a PostgreSQL database. It works by request and response,
          and is not event-driven or real-time. The server answers questions
          with retrieval-augmented generation (RAG): it finds the relevant
          policy passages first, then has an LLM write an answer from them.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <div className="mx-auto w-full max-w-5xl overflow-x-auto rounded-2xl card-surface p-4 sm:p-6">
          <div className="min-w-[760px]">
            <Diagram />
          </div>
        </div>

        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[var(--foreground)]/70">
          <li className="flex items-center gap-2">
            <span className="h-3.5 w-5 rounded border-[1.5px] border-[var(--carolina)] bg-[var(--carolina-soft)]" />
            Our work
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3.5 w-5 rounded border-[1.5px] border-dashed border-slate-400 bg-slate-100" />
            Existing UNC or third-party, which we adapt to
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 border-t-[1.75px] border-[var(--navy)]" />
            Inside CloudApps (fast, internal network)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 border-t-[2.5px] border-dashed border-[var(--navy)]" />
            Over the internet (much slower)
          </li>
        </ul>
        <p className="text-center text-xs text-[var(--foreground)]/50 sm:hidden">
          Scroll sideways to see the whole diagram.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Where Things Run</SectionHeading>
        <div className="mx-auto grid w-full max-w-4xl gap-3 sm:grid-cols-3">
          {[
            {
              title: "The user's browser",
              text: "Researchers and admins are the outside world. Their browser, on any desktop or phone, runs the React app and sends every request across the internet.",
            },
            {
              title: "Carolina CloudApps",
              text: "UNC's servers run our web container, API container, and database. Traffic between them stays on CloudApps' internal network.",
            },
            {
              title: "Third-party AI services",
              text: "The LLM and embedding providers run on their own servers. Each call crosses the internet, which is why an answer takes seconds, not milliseconds (spec NF8).",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl card-surface p-5 text-left">
              <h3 className="font-semibold text-[var(--navy)]">{card.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/70">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Data Flow: Asking a Question</SectionHeading>
        <ol className="mx-auto flex w-full max-w-3xl flex-col gap-3 text-left">
          {ASK_FLOW.map((step, i) => (
            <li key={step} className="flex gap-4 rounded-2xl card-surface p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-semibold text-white">
                {i + 1}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-[var(--foreground)]/80">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Components</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          <span className="font-semibold text-[var(--navy)]">Scaffolded</span>{" "}
          means the piece exists in our repository as a working skeleton;{" "}
          <span className="font-semibold text-[var(--navy)]">Planned</span>{" "}
          means we haven&apos;t connected to it yet.
        </p>
        <ul className="mx-auto flex w-full max-w-3xl flex-col gap-3 text-left">
          {COMPONENTS.map((c) => (
            <li key={c.name} className="rounded-2xl card-surface p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-[var(--navy)]">{c.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${OWNER_STYLES[c.owner]}`}>
                  {c.owner}
                </span>
                <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--foreground)]/60">
                  {c.state}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/70">
                {c.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Development vs. Production</SectionHeading>
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl card-surface text-left text-sm">
          {[
            ["", "On a laptop (Docker Compose)", "In production (CloudApps)"],
            ["Serves the React app", "Vite dev server, port 5173, hot reload", "nginx-unprivileged, port 8080"],
            ["Forwards /api/*", "Vite's dev proxy", "nginx proxy_pass"],
            ["API", "FastAPI with --reload; runs migrations on start", "FastAPI as a non-root user"],
            ["Database", "pgvector/pgvector:pg17 container", "PostgreSQL + pgvector on UNC infrastructure"],
            ["Sign-in", "Mock Onyen login", "UNC Shibboleth SSO"],
          ].map((row, i) => (
            <div
              key={row[0] || "head"}
              className={`grid grid-cols-[8rem_1fr_1fr] gap-3 px-5 py-3 sm:grid-cols-[11rem_1fr_1fr] ${
                i === 0
                  ? "bg-[var(--carolina-soft)]/50 text-xs font-semibold uppercase tracking-wider text-[var(--carolina-ink)]"
                  : "border-t border-[var(--border)] text-[var(--foreground)]/75"
              }`}
            >
              {row.map((cell, j) => (
                <span key={j} className={j === 0 && i > 0 ? "font-semibold text-[var(--navy)]" : ""}>
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
