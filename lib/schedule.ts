// Meeting schedule shared by the Scheduling & Timeline page and the home page.

// "event" is for one-off events of major importance (demos, reviews, etc.).
export type EventType = "coach" | "client" | "team" | "event";

export type TimelineEvent = {
  date: string; // YYYY-MM-DD
  time: string;
  title: string;
  type: EventType;
  tbd?: string; // Set when the meeting isn't confirmed; shown instead of the time.
};

export type MeetingSeries = {
  type: EventType;
  title: string;
  cadence: string;
  time: string;
  // First meeting (YYYY-MM-DD) and weeks between meetings; omit if not scheduled yet.
  start?: string;
  everyWeeks?: number;
};

// Recurring meetings. The timeline below is generated from these through SCHEDULE_END.
export const SERIES: MeetingSeries[] = [
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
const EXTRA_EVENTS: TimelineEvent[] = [
  {
    date: "2026-10-30",
    time: "TBD",
    title: "Quarterly meeting",
    type: "event",
    tbd: "potential POC showcase",
  },
];

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDate(date: string): string {
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

export const EVENTS = buildTimeline();
