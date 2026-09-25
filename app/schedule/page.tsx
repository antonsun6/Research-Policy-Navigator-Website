import PageHeader from "@/components/PageHeader";
import PassedBadge from "@/components/PassedBadge";
import SectionHeading from "@/components/SectionHeading";
import { EVENTS, SERIES, formatDate, type EventType } from "@/lib/schedule";

const TYPE_STYLES: Record<EventType, { label: string; dot: string; badge: string }> = {
  client: {
    label: "Client Meeting",
    dot: "bg-[var(--carolina)]",
    badge: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  },
  coach: {
    label: "Coach Meeting",
    dot: "bg-[var(--navy)]",
    badge: "bg-[var(--navy)]/10 text-[var(--navy)]",
  },
  team: {
    label: "Team Meeting",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600",
  },
};

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-16">
      <PageHeader eyebrow="Scheduling & Timeline" title="Meetings & milestones">
        Our recurring client, coach, and team meetings, and every meeting date
        through the end of the semester.
      </PageHeader>

      <section className="flex flex-col gap-6">
        <SectionHeading>Recurring meetings</SectionHeading>
        <div className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {SERIES.map((series) => {
            const style = TYPE_STYLES[series.type];
            return (
              <div
                key={series.type}
                className="rounded-2xl border border-[var(--border)] bg-white p-6"
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  {style.label}
                </span>
                <p className="mt-4 font-semibold text-[var(--navy)]">
                  {series.cadence}
                </p>
                <p className="text-sm text-[var(--foreground)]/60">{series.time}</p>
                {series.start && (
                  <p className="mt-3 text-xs text-[var(--foreground)]/50">
                    First meeting: {formatDate(series.start)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Timeline</SectionHeading>
        <ol className="relative mx-auto w-full max-w-2xl border-l border-[var(--border)] text-left">
          {EVENTS.map((event) => {
            const style = TYPE_STYLES[event.type];
            return (
              <li
                key={`${event.type}-${event.date}`}
                className="relative pb-7 pl-8 last:pb-0"
              >
                <span
                  className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--background)] ${style.dot}`}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--navy)]">
                    {formatDate(event.date)}
                  </span>
                  <span className="text-sm text-[var(--foreground)]/50">
                    {event.tbd ? `TBD (${event.tbd})` : event.time}
                  </span>
                  {event.tbd && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      TBD
                    </span>
                  )}
                  <PassedBadge date={event.date} />
                </div>
                <p className="mt-1 text-sm text-[var(--foreground)]/70">
                  {event.title}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
