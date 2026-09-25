"use client";

import { useToday } from "@/lib/useToday";

// Monday of week 1 of the semester.
const SEMESTER_START = "2026-08-17";

export default function WeeksIn() {
  const today = useToday();
  if (!today) return <>—</>;

  const days =
    (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${SEMESTER_START}T00:00:00Z`)) /
    86_400_000;
  return <>{Math.max(1, Math.floor(days / 7) + 1)}</>;
}
