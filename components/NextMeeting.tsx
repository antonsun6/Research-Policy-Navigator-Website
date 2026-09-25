"use client";

import { EVENTS, type EventType } from "@/lib/schedule";
import { useToday } from "@/lib/useToday";

const SHORT_LABELS: Record<EventType, string> = {
  client: "Client",
  coach: "Coach",
  team: "Team",
  event: "Event",
};

// The next meeting on the timeline (today's counts), read in the browser so
// it stays current without a redeploy.
export default function NextMeeting() {
  const today = useToday();
  if (!today) return <>—</>;

  const next = EVENTS.find((event) => event.date >= today);
  if (!next) return <>None scheduled</>;

  const day =
    next.date === today
      ? "Today"
      : new Date(`${next.date}T00:00:00Z`).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });
  return (
    <>
      {day} · {SHORT_LABELS[next.type]}
      {next.tbd ? " (TBD)" : ""}
    </>
  );
}
