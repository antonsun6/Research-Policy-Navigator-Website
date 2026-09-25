import { SPEC_SECTIONS, type Priority } from "./spec";

const PRIORITY_STYLES: Record<Priority, string> = {
  Definite: "bg-emerald-100 text-emerald-700",
  Perhaps: "bg-amber-100 text-amber-700",
  Improbable: "bg-[var(--foreground)]/10 text-[var(--foreground)]/60",
};

export default function ProductSpecificationPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-medium text-[var(--foreground)]/50">
            Week 1
          </span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Delivered
          </span>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">
          Product Specification Document
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          User stories, functional and non-functional requirements, and
          interfaces for the Research Policy Navigator. Requirements are
          prioritized as Definite, Perhaps, or Improbable.
        </p>

        <nav className="flex flex-wrap justify-center gap-2">
          {SPEC_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-sm font-medium text-[var(--foreground)]/70 transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      {SPEC_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto flex w-full max-w-3xl scroll-mt-32 flex-col gap-6"
        >
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h3>
            {section.intro && (
              <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--foreground)]/60">
                {section.intro}
              </p>
            )}
          </div>

          {section.groups.map((group) => (
            <div key={group.priority ?? "all"} className="flex flex-col gap-3">
              {group.priority && (
                <span
                  className={`self-center rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_STYLES[group.priority]}`}
                >
                  {group.priority}
                </span>
              )}

              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
                  >
                    <p className="font-semibold">
                      <span className="mr-2 text-sm font-medium text-[var(--accent)]">
                        {item.id}
                      </span>
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-[var(--foreground)]/70">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
