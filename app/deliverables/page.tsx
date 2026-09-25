import Link from "next/link";
import { DELIVERABLES, type DeliverableStatus } from "@/lib/deliverables";

const STATUS_STYLES: Record<DeliverableStatus, string> = {
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
            className={`rounded-2xl card-surface p-6 transition-colors ${
              item.href ? "hover:border-[var(--carolina)]" : ""
            }`}
          >
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
          <li key={item.id}>
            {item.href ? <Link href={item.href}>{content}</Link> : content}
          </li>
        );
      })}
    </ul>
  );
}
