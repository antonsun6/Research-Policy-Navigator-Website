"use client";

import { useToday } from "@/lib/useToday";

export default function PassedBadge({ date }: { date: string }) {
  const today = useToday();

  if (!today || date >= today) return null;

  return (
    <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 ring-1 ring-red-100">
      Passed
    </span>
  );
}
