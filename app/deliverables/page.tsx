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
  Delivered: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Planned: "bg-[var(--foreground)]/10 text-[var(--foreground)]/60",
};

export default function DeliverablesPage() {
  return (
    <div className="flex flex-col gap-4">
      <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
        One entry per week. Add new weeks to the{" "}
        <code className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-sm">
          DELIVERABLES
        </code>{" "}
        array in{" "}
        <code className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-sm">
          app/deliverables/page.tsx
        </code>
        , and give any deliverable its own subtab page (like the product
        spec) when it needs more than a summary.
      </p>

      <ul className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        {DELIVERABLES.map((item) => {
          const content = (
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-medium text-[var(--foreground)]/50">
                  {item.week}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="mt-2 font-semibold">{item.title}</h3>
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
    </div>
  );
}
