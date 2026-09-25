"use client";

import { useToday } from "@/lib/useToday";

export default function PassedBadge({ date }: { date: string }) {
  const today = useToday();

  if (!today || date >= today) return null;

  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
      Passed
    </span>
  );
}
