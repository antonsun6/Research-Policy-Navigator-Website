import PageHeader from "@/components/PageHeader";
import { STATUS_STYLES, type DeliverableStatus } from "@/lib/deliverables";

type Assignment = {
  title: string;
  status: DeliverableStatus;
  due: string;
  summary?: string;
  href?: string; // Link to the write-up once it's posted.
};

// Course assignments outside the formal deliverables and milestones.
const ASSIGNMENTS: Assignment[] = [
  {
    title: "Ethics Assignment",
    status: "Planned",
    due: "Due date TBD",
    summary: "COMP 523 ethics assignment. We'll post our work here once it's done.",
  },
];

export default function AssignmentsPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader eyebrow="Assignments" title="Course assignments">
        Other COMP 523 assignments our team completes alongside the
        deliverables.
      </PageHeader>

      <ul className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        {ASSIGNMENTS.map((item) => {
          const content = (
            <div
              className={`rounded-2xl card-surface p-6 transition-colors ${
                item.href ? "hover:border-[var(--carolina)]" : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
                >
                  {item.status}
                </span>
                <span className="text-xs text-[var(--foreground)]/50">{item.due}</span>
              </div>
              <h3 className="mt-2 font-semibold text-[var(--navy)]">
                {item.title}
                {item.href && <span className="ml-1 text-[var(--carolina)]">→</span>}
              </h3>
              {item.summary && (
                <p className="mt-1 text-sm text-[var(--foreground)]/70">{item.summary}</p>
              )}
            </div>
          );
          return (
            <li key={item.title}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
