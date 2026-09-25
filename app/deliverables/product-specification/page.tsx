import { SPEC_SECTIONS, type Priority } from "./spec";

const PRIORITY_DOTS: Record<Priority, string> = {
  Definite: "bg-[var(--carolina)]",
  Perhaps: "border-2 border-[var(--carolina)]",
  Improbable: "bg-slate-300",
};

export default function ProductSpecificationPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/50">
            Week 1
          </span>
          <span className="rounded-full bg-[var(--carolina-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--carolina-ink)]">
            Delivered
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
          Product Specification Document
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          User stories, functional and non-functional requirements, and
          interfaces for the Research Policy Navigator. Requirements are
          prioritized as Definite, Perhaps, or Improbable.
        </p>

        <nav className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {SPEC_SECTIONS.map((section, i) => (
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
      </div>

      {SPEC_SECTIONS.map((section, i) => {
        const count = section.groups.reduce((n, g) => n + g.items.length, 0);
        return (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto w-full max-w-3xl scroll-mt-36 overflow-hidden rounded-2xl border border-[var(--border)] bg-white text-left"
          >
            <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)]">
                Section {String(i + 1).padStart(2, "0")} · {count} items
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

            <div className="flex flex-col gap-8 px-6 py-6 sm:px-8">
              {section.groups.map((group) => (
                <div key={group.priority ?? "all"}>
                  {group.priority && (
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${PRIORITY_DOTS[group.priority]}`}
                      />
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--navy)]">
                        {group.priority}
                      </h4>
                      <span className="h-px flex-1 bg-[var(--border)]" />
                      <span className="text-xs text-[var(--foreground)]/40">
                        {group.items.length}
                      </span>
                    </div>
                  )}

                  <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-[var(--carolina)]">
                    {group.items.map((item) => (
                      <li key={item.id} className="pl-1 text-sm leading-relaxed">
                        <span className="font-semibold text-[var(--navy)]">
                          <span className="mr-1.5 font-mono text-xs text-[var(--carolina-ink)]">
                            {item.id}
                          </span>
                          {item.title}
                        </span>
                        <span className="text-[var(--foreground)]/70">
                          {" "}— {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
