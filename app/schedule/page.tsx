import PassedBadge from "@/components/PassedBadge";

type EventType = "coach" | "client" | "team";

type TimelineEvent = {
  date: string; // YYYY-MM-DD
  time: string;
  title: string;
  type: EventType;
  tbd?: string; // Set when the meeting isn't confirmed; shown instead of the time.
};

type MeetingSeries = {
  type: EventType;
  title: string;
  cadence: string;
  time: string;
  // First meeting (YYYY-MM-DD) and weeks between meetings; omit if not scheduled yet.
  start?: string;
  everyWeeks?: number;
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

// Recurring meetings. The timeline below is generated from these through SCHEDULE_END.
const SERIES: MeetingSeries[] = [
  {
    type: "client",
    title: "Client meeting with Jeanne Lovmo",
    cadence: "Every 2 weeks, Tuesdays",
    time: "2:00 – 3:00 PM",
    start: "2026-09-15",
    everyWeeks: 2,
  },
  {
    type: "coach",
    title: "Coach meeting with Vinir Rai",
    cadence: "Weekly, Thursdays",
    time: "2:30 – 3:00 PM",
    start: "2026-09-24",
    everyWeeks: 1,
  },
  {
    type: "team",
    title: "Team meeting",
    cadence: "Not scheduled yet",
    time: "TBD",
  },
];

// Last date to generate meetings for (last day of fall classes).
const SCHEDULE_END = "2026-12-02";

// Generated meetings that aren't confirmed yet, keyed by date.
const TBD_DATES: Record<string, string> = {
  "2026-11-26": "Thanksgiving",
};

// One-off meetings that don't follow a series (e.g. a rescheduled or extra meeting).
const EXTRA_EVENTS: TimelineEvent[] = [];

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function buildTimeline(): TimelineEvent[] {
  const events = [...EXTRA_EVENTS];
  for (const series of SERIES) {
    if (!series.start || !series.everyWeeks) continue;
    for (
      let date = series.start;
      date <= SCHEDULE_END;
      date = addDays(date, series.everyWeeks * 7)
    ) {
      events.push({
        date,
        time: series.time,
        title: series.title,
        type: series.type,
        tbd: TBD_DATES[date],
      });
    }
  }
  return events.sort((a, b) => a.date.localeCompare(b.date));
}

const EVENTS = buildTimeline();

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
        <p className="mt-4 mx-auto max-w-2xl text-[var(--foreground)]/70">
          Our recurring client, coach, and team meetings, and every meeting
          date through the end of the semester.
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-4">
        {SERIES.map((series) => {
          const style = TYPE_STYLES[series.type];
          return (
            <div
              key={series.type}
              className="w-full rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm sm:w-64"
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
              >
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                {style.label}
              </span>
              <p className="mt-3 font-semibold">{series.cadence}</p>
              <p className="text-sm text-[var(--foreground)]/60">{series.time}</p>
              {series.start && (
                <p className="mt-2 text-xs text-[var(--foreground)]/50">
                  First meeting: {formatDate(series.start)}
                </p>
              )}
            </div>
          );
        })}
      </section>

      <section className="relative mx-auto w-full max-w-2xl pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />
        <ol className="flex flex-col gap-8">
          {EVENTS.map((event) => {
            const style = TYPE_STYLES[event.type];
            return (
              <li key={`${event.type}-${event.date}`} className="relative pl-8">
                <span
                  className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[var(--background)] ${style.dot}`}
                />
                <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="text-sm font-medium text-[var(--foreground)]/50">
                      {formatDate(event.date)} ·{" "}
                      {event.tbd ? `TBD (${event.tbd})` : event.time}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
                    >
                      {style.label}
                    </span>
                    {event.tbd && (
                      <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                        TBD
                      </span>
                    )}
                    <PassedBadge date={event.date} />
                  </div>
                  <h3 className="mt-2 font-semibold">{event.title}</h3>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
