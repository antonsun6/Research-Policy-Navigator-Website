import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import {
  DELIVERABLES,
  MILESTONES,
  STATUS_STYLES,
  type Deliverable,
} from "@/lib/deliverables";

function DeliverableList({ items }: { items: Deliverable[] }) {
  return (
    <ul className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <Link href={item.href}>
            <div className="rounded-2xl card-surface p-6 transition-colors hover:border-[var(--carolina)]">
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
              <h3 className="mt-2 font-semibold text-[var(--navy)]">
                {item.title}
                <span className="ml-1 text-[var(--carolina)]">→</span>
              </h3>
              <p className="mt-1 text-sm text-[var(--foreground)]/70">
                {item.summary}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function DeliverablesPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <SectionHeading>Formal Deliverables</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          The five major documents and code we hand in over the semester.
        </p>
        <DeliverableList items={DELIVERABLES} />
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Milestones</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          Smaller checkpoints along the way, several of which feed into the
          formal deliverables.
        </p>
        <DeliverableList items={MILESTONES} />
      </section>
    </div>
  );
}
