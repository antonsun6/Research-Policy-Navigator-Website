type EventType = "coach" | "client" | "team";

type TimelineEvent = {
  date: string;
  title: string;
  type: EventType;
  description?: string;
};

const TYPE_STYLES: Record<EventType, { label: string; dot: string; badge: string }> = {
  coach: {
    label: "Coach Meeting",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  client: {
    label: "Client Meeting",
    dot: "bg-[var(--accent)]",
    badge: "bg-[var(--accent-soft)] text-[var(--accent)]",
  },
  team: {
    label: "Team Meeting",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

// Replace with real dates as the schedule is confirmed.
const EVENTS: TimelineEvent[] = [
  {
    date: "Week 1",
    title: "Kickoff with coach",
    type: "coach",
    description: "Align on scope, expectations, and cadence for the term.",
  },
  {
    date: "Week 1",
    title: "Client intro call",
    type: "client",
    description: "Introductions, initial requirements, and success criteria.",
  },
  {
    date: "Week 2",
    title: "Internal planning sync",
    type: "team",
    description: "Break down the product spec into workstreams.",
  },
  {
    date: "Week 3",
    title: "Product spec review with client",
    type: "client",
    description: "Walk through the first deliverable and gather feedback.",
  },
];

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          Scheduling & Timeline
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Meetings & milestones
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--foreground)]/70">
          Coach check-ins, client meetings, and internal team syncs in one
          timeline. Update the{" "}
          <code className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-sm">
            EVENTS
          </code>{" "}
          array in{" "}
          <code className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-sm">
            app/schedule/page.tsx
          </code>{" "}
          as dates are confirmed.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {(Object.keys(TYPE_STYLES) as EventType[]).map((key) => (
            <span
              key={key}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${TYPE_STYLES[key].badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${TYPE_STYLES[key].dot}`} />
              {TYPE_STYLES[key].label}
            </span>
          ))}
        </div>
      </section>

      <section className="relative pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />
        <ol className="flex flex-col gap-8">
          {EVENTS.map((event, i) => {
            const style = TYPE_STYLES[event.type];
            return (
              <li key={i} className="relative pl-8">
                <span
                  className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[var(--background)] ${style.dot}`}
                />
                <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-[var(--foreground)]/50">
                      {event.date}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold">{event.title}</h3>
                  {event.description && (
                    <p className="mt-1 text-sm text-[var(--foreground)]/70">
                      {event.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
