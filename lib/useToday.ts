"use client";

import { useSyncExternalStore } from "react";

// Today's date (YYYY-MM-DD) in Chapel Hill's time zone.
function getToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

function subscribe() {
  return () => {};
}

// Read in the browser so date-based UI stays current without a redeploy.
// Returns null during server rendering, before the page loads.
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, getToday, () => null);
}
