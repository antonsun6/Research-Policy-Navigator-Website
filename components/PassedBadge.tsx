"use client";

import { useSyncExternalStore } from "react";

// Today's date (YYYY-MM-DD) in Chapel Hill's time zone.
function getToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

function subscribe() {
  return () => {};
}

// Rendered in the browser so it stays current without a redeploy; the static
// HTML has no date, so nothing shows until the page loads.
export default function PassedBadge({ date }: { date: string }) {
  const today = useSyncExternalStore(subscribe, getToday, () => null);

  if (!today || date >= today) return null;

  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
      Passed
    </span>
  );
}
