import EmptyState from "@/components/EmptyState";
import SectionHeading from "@/components/SectionHeading";
import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";
import { IDEAL_PLAN, IDEAL_PLAN_INTRO } from "./plan";

export default function TestPlanPage() {
  const item = findDeliverable("D3");

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
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          {item.summary}
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <SectionHeading>Part 1: The Ideal Test Plan</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          {IDEAL_PLAN_INTRO}
        </p>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {IDEAL_PLAN.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-medium text-[var(--foreground)]/60 transition-colors hover:text-[var(--navy)]"
            >
              <span className="mr-1.5 text-[var(--carolina-ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          ))}
        </nav>
      </section>

      {IDEAL_PLAN.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto w-full max-w-3xl scroll-mt-36 overflow-hidden rounded-2xl card-surface text-left"
        >
          <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)]">
              Section {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--navy)]">
              {section.title}
            </h3>
            {section.intro && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/60">
                {section.intro}
              </p>
            )}
          </header>

          <div className="px-6 py-6 sm:px-8">
            <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-[var(--carolina)]">
              {section.items.map((planItem) => (
                <li key={planItem.title} className="pl-1 text-sm leading-relaxed">
                  <span className="font-semibold text-[var(--navy)]">
                    {planItem.title}
                  </span>
                  <span className="text-[var(--foreground)]/70">
                    {" "}— {planItem.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-6">
        <SectionHeading>Part 2: What We Will Actually Test</SectionHeading>
        <EmptyState>
          Coming soon: exactly what we will test, who tests it and when, and the
          environments and software versions we test on.
        </EmptyState>
      </section>
    </div>
  );
}
