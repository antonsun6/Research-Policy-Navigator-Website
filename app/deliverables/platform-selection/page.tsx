import SectionHeading from "@/components/SectionHeading";
import {
  COMPONENTS,
  CONSTRAINTS,
  REFERENCES,
  STACK_SUMMARY,
  type DecisionStatus,
} from "./platform";

const STATUS_STYLES: Record<DecisionStatus, string> = {
  Selected: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  Proposed: "bg-amber-100 text-amber-700",
  Open: "bg-slate-100 text-slate-500",
};

function StatusBadge({ status }: { status: DecisionStatus }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-[var(--carolina)]/40 underline-offset-2 transition-colors hover:text-[var(--carolina-ink)] hover:decoration-[var(--carolina)] ${className}`}
    >
      {children}
    </a>
  );
}

export default function PlatformSelectionPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-xs font-semibold text-[var(--carolina-ink)]">
            D2
          </span>
          <span className="text-xs font-medium text-[var(--foreground)]/60">
            Part of the Design Document
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
          Platform Selection
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          The technologies we use to build Nora, the alternatives we
          considered for each, and why we chose what we did. We first listed
          the alternatives, then compared their trade-offs and made a
          selection. This becomes part of our design document.
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[var(--foreground)]/60">
          {(["Selected", "Proposed", "Open"] as const).map((s) => (
            <span key={s} className="flex items-center gap-2">
              <StatusBadge status={s} />
              {s === "Selected" && "in the codebase"}
              {s === "Proposed" && "our plan, not built yet"}
              {s === "Open" && "waiting on the client or UNC"}
            </span>
          ))}
        </div>
      </div>

      {/* Client constraints */}
      <section className="flex flex-col gap-6">
        <SectionHeading>Client & UNC Constraints</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          These requirements from our client and coach dictated or narrowed
          some choices. Components they affected are marked{" "}
          <span className="font-semibold text-[var(--navy)]">Constrained</span>{" "}
          below.
        </p>
        <ul className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          {CONSTRAINTS.map((c) => (
            <li key={c.title} className="rounded-2xl card-surface p-5 text-left">
              <h3 className="font-semibold text-[var(--navy)]">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/70">
                {c.text}
              </p>
              <p className="mt-2 text-xs text-[var(--carolina-ink)]">
                {c.source}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Phase one: list of alternatives */}
      <section className="flex flex-col gap-6">
        <SectionHeading>Phase 1 · Alternatives</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          Every option we studied for each part of the platform. Our pick is
          highlighted.
        </p>
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl card-surface text-left">
          {COMPONENTS.map((comp, i) => (
            <a
              key={comp.id}
              href={`#${comp.id}`}
              className={`flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-[var(--carolina-soft)]/40 sm:flex-row sm:items-start sm:gap-4 ${
                i > 0 ? "border-t border-[var(--border)]" : ""
              }`}
            >
              <span className="shrink-0 text-sm font-semibold text-[var(--navy)] sm:w-48">
                {comp.title}
              </span>
              <span className="flex flex-wrap gap-1.5">
                {comp.options.map((opt) => (
                  <span
                    key={opt.name}
                    className={`rounded-full px-2.5 py-0.5 text-xs ${
                      opt.chosen
                        ? "bg-[var(--navy)] font-medium text-white"
                        : "border border-[var(--border)] text-[var(--foreground)]/70"
                    }`}
                  >
                    {opt.name}
                  </span>
                ))}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Phase two: comparisons and selections */}
      <section className="flex flex-col gap-6">
        <SectionHeading>Phase 2 · Comparison & Selection</SectionHeading>

        {COMPONENTS.map((comp, i) => (
          <article
            key={comp.id}
            id={comp.id}
            className="mx-auto w-full max-w-3xl scroll-mt-36 overflow-hidden rounded-2xl card-surface text-left"
          >
            <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)]">
                  Component {String(i + 1).padStart(2, "0")}
                </p>
                <StatusBadge status={comp.status} />
                {comp.constraint && (
                  <span className="rounded-full bg-[var(--navy)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--navy)]">
                    Constrained
                  </span>
                )}
              </div>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--navy)]">
                {comp.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/60">
                {comp.question}
              </p>
              {comp.constraint && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--navy)]">
                  <span className="font-semibold">Client constraint:</span>{" "}
                  {comp.constraint}
                </p>
              )}
            </header>

            <div className="flex flex-col gap-4 px-6 py-6 sm:px-8">
              {comp.options.map((opt) => (
                <div
                  key={opt.name}
                  className={`rounded-xl border p-4 ${
                    opt.chosen
                      ? "border-[var(--carolina)] bg-[var(--carolina-soft)]/40"
                      : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-[var(--navy)]">
                      <ExternalLink href={opt.url}>{opt.name}</ExternalLink>
                    </h4>
                    {opt.chosen && (
                      <span className="rounded-full bg-[var(--navy)] px-2 py-0.5 text-[11px] font-medium text-white">
                        {comp.status === "Selected" ? "Our selection" : "Leading option"}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--carolina-ink)]">
                        Pros
                      </p>
                      <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 leading-relaxed text-[var(--foreground)]/75 marker:text-[var(--carolina)]">
                        {opt.pros.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Cons
                      </p>
                      <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 leading-relaxed text-[var(--foreground)]/75 marker:text-slate-400">
                        {opt.cons.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border-l-4 border-l-[var(--carolina)] bg-[var(--background)] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
                  {comp.status === "Selected"
                    ? "Our selection"
                    : comp.status === "Proposed"
                      ? "Our plan"
                      : "Where it stands"}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/80">
                  {comp.rationale}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Final stack */}
      <section className="flex flex-col gap-6">
        <SectionHeading>Nora&apos;s Platform at a Glance</SectionHeading>
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl card-surface text-left">
          {STACK_SUMMARY.map((row, i) => (
            <div
              key={row.layer}
              className={`flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 text-sm ${
                i > 0 ? "border-t border-[var(--border)]" : ""
              }`}
            >
              <span className="w-28 shrink-0 font-semibold text-[var(--navy)]">
                {row.layer}
              </span>
              <span className="min-w-0 flex-1 text-[var(--foreground)]/80">
                {row.choice}
              </span>
              <StatusBadge status={row.status} />
            </div>
          ))}
        </div>
      </section>

      {/* References */}
      <section className="flex flex-col gap-6">
        <SectionHeading>References</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          Each option above links to its official site or docs. These are
          the other sources we used in making the decisions.
        </p>
        <ul className="mx-auto flex w-full max-w-3xl list-disc flex-col gap-2 rounded-2xl card-surface py-5 pl-10 pr-6 text-left text-sm marker:text-[var(--carolina)]">
          {REFERENCES.map((ref) => (
            <li key={ref.url} className="text-[var(--foreground)]/80">
              <ExternalLink href={ref.url}>{ref.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
