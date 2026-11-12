import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { CHECKLIST_STATUS, CHECKLIST_UPDATED } from "@/lib/checklist";
import { SPEC_SECTIONS, type Priority } from "../deliverables/product-specification/spec";

// Only the requirements we're committed to or may build; Improbable items are out of scope.
const SHOWN: Priority[] = ["Definite", "Perhaps"];
const REQUIREMENT_SECTIONS = ["functional-requirements", "non-functional-requirements"];

const SECTIONS = SPEC_SECTIONS.filter((s) => REQUIREMENT_SECTIONS.includes(s.id)).map((s) => ({
  ...s,
  groups: s.groups.filter((g) => g.priority && SHOWN.includes(g.priority)),
}));

function isDone(id: string) {
  return CHECKLIST_STATUS[id]?.done ?? false;
}

export default function ChecklistPage() {
  const items = SECTIONS.flatMap((s) => s.groups.flatMap((g) => g.items));
  const definite = SECTIONS.flatMap((s) =>
    s.groups.filter((g) => g.priority === "Definite").flatMap((g) => g.items),
  );

  return (
    <div className="flex flex-col gap-10">
      <PageHeader eyebrow="Checklist" title="Requirements checklist">
        Every Definite and Perhaps requirement from the{" "}
        <Link
          href="/deliverables/product-specification"
          className="font-medium text-[var(--carolina-ink)] underline underline-offset-2"
        >
          product specification
        </Link>
        , ticked when it&apos;s built. Updated {CHECKLIST_UPDATED}.
      </PageHeader>

      <div className="mx-auto flex flex-wrap justify-center gap-3 text-sm">
        <span className="rounded-full bg-[var(--carolina-soft)] px-3 py-1 font-medium text-[var(--carolina-ink)]">
          Definite: {definite.filter((i) => isDone(i.id)).length} of {definite.length} done
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
          All: {items.filter((i) => isDone(i.id)).length} of {items.length} done
        </span>
      </div>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl card-surface text-left"
        >
          <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--navy)]">
              {section.title}
            </h2>
          </header>

          <div className="flex flex-col gap-8 px-6 py-6 sm:px-8">
            {section.groups.map((group) => {
              const done = group.items.filter((i) => isDone(i.id)).length;
              return (
                <div key={group.priority}>
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--navy)]">
                      {group.priority}
                    </h3>
                    <span className="h-px flex-1 bg-[var(--border)]" />
                    <span className="text-xs text-[var(--foreground)]/50">
                      {done} / {group.items.length}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      const status = CHECKLIST_STATUS[item.id];
                      const checked = status?.done ?? false;
                      return (
                        <li key={item.id}>
                          <label className="flex items-start gap-3 rounded-lg px-2 py-2 text-sm leading-relaxed">
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled
                              aria-label={`${item.id} ${item.title}`}
                              className="mt-1 h-4 w-4 shrink-0 accent-[var(--carolina-ink)] disabled:opacity-100"
                            />
                            <span>
                              <span
                                className={`font-semibold ${
                                  checked ? "text-[var(--foreground)]/50" : "text-[var(--navy)]"
                                }`}
                              >
                                <span className="mr-1.5 font-mono text-xs text-[var(--carolina-ink)]">
                                  {item.id}
                                </span>
                                {item.title}
                              </span>
                              <span className="block text-[var(--foreground)]/60">{item.text}</span>
                              {status?.note && (
                                <span className="mt-1 block text-xs font-medium text-amber-700">
                                  {status.note}
                                </span>
                              )}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
