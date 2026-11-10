import SectionHeading from "@/components/SectionHeading";
import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";
import {
  FUNCTIONAL,
  NON_FUNCTIONAL,
  OUT_OF_SCOPE,
  PENDING_FROM_CLIENT,
  PERHAPS,
  SCOPE_INTRO,
  WORKFLOWS,
  type Requirement,
  type Status,
} from "./scope";

const STATUS_BADGES: Record<Status, string> = {
  Done: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  "In progress": "bg-amber-100 text-amber-700",
  "To do": "bg-slate-100 text-slate-500",
};

function Card({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-3xl scroll-mt-36 overflow-hidden rounded-2xl card-surface text-left"
    >
      <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)]">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--navy)]">
          {title}
        </h3>
      </header>
      <div className="px-6 py-6 sm:px-8">{children}</div>
    </section>
  );
}

function RequirementList({ items }: { items: Requirement[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.id} className="text-sm leading-relaxed">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[var(--carolina-ink)]">{item.id}</span>
            <span className="font-semibold text-[var(--navy)]">{item.title}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGES[item.status]}`}
            >
              {item.status}
            </span>
          </div>
          <p className="mt-1 text-[var(--foreground)]/70">{item.text}</p>
          <p className="mt-0.5 text-xs text-[var(--foreground)]/45">D1: {item.replaces}</p>
        </li>
      ))}
    </ul>
  );
}

function PlainList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-[var(--foreground)]/70 marker:text-[var(--carolina)]">
      {items.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function MvpPage() {
  const item = findDeliverable("M9");
  const done = NON_FUNCTIONAL.filter((r) => r.status === "Done").length;

  return (
    <div className="flex flex-col gap-10">
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
          {item.title}
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">{SCOPE_INTRO}</p>
        <p className="text-sm text-[var(--foreground)]/50">
          Decided Nov 10, 2026 · MVP due Thu, Nov 12 · Steering Group demo Nov 19
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <SectionHeading>Requirements</SectionHeading>
        <Card
          id="functional"
          eyebrow={`${FUNCTIONAL.length} items · all required`}
          title="Functional"
        >
          <RequirementList items={FUNCTIONAL} />
        </Card>
        <Card
          id="non-functional"
          eyebrow={`${NON_FUNCTIONAL.length} items · at least 8 required · ${done} done`}
          title="Non-Functional"
        >
          <RequirementList items={NON_FUNCTIONAL} />
        </Card>
        <Card id="perhaps" eyebrow="If time allows" title="Perhaps">
          <PlainList items={PERHAPS} />
        </Card>
        <Card id="out-of-scope" eyebrow="Not this semester" title="Out of Scope">
          <PlainList items={OUT_OF_SCOPE} />
        </Card>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Who Builds What</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          Five remaining workflows. Jerry builds Ask end to end. The other four are split between
          two pairs, each workflow with one backend and one frontend owner.
        </p>
        <ul className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {WORKFLOWS.map((w) => (
            <li key={w.id} className="rounded-2xl card-surface p-6 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[var(--carolina-ink)]">
                  {w.id}
                </span>
                <h3 className="font-semibold text-[var(--navy)]">{w.title}</h3>
                <span className="text-xs text-[var(--foreground)]/50">{w.requirements}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--foreground)]/70">
                <span className="font-medium text-[var(--navy)]">Backend:</span> {w.backend}
                <span className="mx-2 text-[var(--foreground)]/30">·</span>
                <span className="font-medium text-[var(--navy)]">Frontend:</span> {w.frontend}
              </p>
              <p className="mt-1 text-sm text-[var(--foreground)]/60">{w.notes}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Waiting on the Client</SectionHeading>
        <div className="mx-auto w-full max-w-3xl rounded-2xl card-surface p-6 text-left">
          <PlainList items={PENDING_FROM_CLIENT} />
        </div>
      </section>
    </div>
  );
}
