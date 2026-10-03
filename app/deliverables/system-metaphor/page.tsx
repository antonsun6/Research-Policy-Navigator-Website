import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";

export default function SystemMetaphorPage() {
  const item = findDeliverable("M5");

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

      <section className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl card-surface text-left">
        <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)]">
            Our metaphor
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--navy)]">
            A reference library for UNC research policy
          </h3>
        </header>
        <p className="px-6 py-6 text-base leading-relaxed text-[var(--foreground)]/80 sm:px-8">
          Nora is a reference library for UNC research policy. Researchers can
          walk the shelves by topic (Browse), look up a specific policy in the
          catalog (Search), or ask the reference librarian a question (Ask).
          The librarian answers only from books in this library&apos;s
          collection, points you to the exact page the answer came from, and
          when a question needs an official ruling, sends you to the right
          compliance office instead of guessing. Behind the desk, library staff
          (administrators) decide which books are on the shelves, pull outdated
          editions, and review the librarian&apos;s logbook to see what patrons
          keep asking and where the collection falls short.
        </p>
      </section>
    </div>
  );
}
