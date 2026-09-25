import Link from "next/link";

type Deliverable = {
  week: string;
  title: string;
  status: "Delivered" | "In Progress" | "Planned";
  href?: string;
  summary: string;
};

const DELIVERABLES: Deliverable[] = [
  {
    week: "Week 1",
    title: "Product Specification Document",
    status: "Delivered",
    href: "/deliverables/product-specification",
    summary:
      "User stories, functional and non-functional requirements, and interfaces for the Navigator.",
  },
  {
    week: "Week 2",
    title: "TBD",
    status: "Planned",
    summary: "Add next week's deliverable here.",
  },
];

const STATUS_STYLES: Record<Deliverable["status"], string> = {
  Delivered: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  "In Progress": "bg-amber-100 text-amber-700",
  Planned: "bg-slate-100 text-slate-500",
};

export default function DeliverablesPage() {
  return (
    <ul className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      {DELIVERABLES.map((item) => {
        const content = (
          <div
            className={`rounded-2xl border border-[var(--border)] bg-white p-6 transition-colors ${
              item.href ? "hover:border-[var(--carolina)]" : ""
            }`}
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/50">
                {item.week}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
              >
                {item.status}
              </span>
            </div>
            <h3 className="mt-2 font-semibold text-[var(--navy)]">
              {item.title}
              {item.href && (
                <span className="ml-1 text-[var(--carolina)]">→</span>
              )}
            </h3>
            <p className="mt-1 text-sm text-[var(--foreground)]/70">
              {item.summary}
            </p>
          </div>
        );

        return (
          <li key={item.title}>
            {item.href ? <Link href={item.href}>{content}</Link> : content}
          </li>
        );
      })}
    </ul>
  );
}
