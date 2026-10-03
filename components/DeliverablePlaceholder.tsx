import EmptyState from "@/components/EmptyState";
import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";

// Stand-in page for a deliverable or milestone we haven't written up yet.
export default function DeliverablePlaceholder({ id }: { id: string }) {
  const item = findDeliverable(id);

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
      <EmptyState>Coming soon. We haven&apos;t posted this yet.</EmptyState>
    </div>
  );
}
