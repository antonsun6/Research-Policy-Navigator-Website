"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DELIVERABLES, MILESTONES, type Deliverable } from "@/lib/deliverables";

const GROUPS: { label: string; items: Pick<Deliverable, "href" | "title">[] }[] = [
  { label: "Overview", items: [{ href: "/deliverables", title: "All Deliverables" }] },
  { label: "Formal", items: DELIVERABLES },
  { label: "Milestones", items: MILESTONES },
];

export default function DeliverablesSubNav() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex w-full max-w-4xl flex-col gap-3">
      {GROUPS.map((group) => (
        <div
          key={group.label}
          className="flex flex-col items-center gap-2 sm:flex-row sm:items-start"
        >
          <span className="shrink-0 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)] sm:w-24 sm:text-right">
            {group.label}
          </span>
          <div className="flex flex-wrap justify-center gap-1 rounded-3xl card-surface p-1 sm:justify-start">
            {group.items.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.title}
                  href={tab.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--navy)] text-white"
                      : "text-[var(--foreground)]/60 hover:text-[var(--navy)]"
                  }`}
                >
                  {tab.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
