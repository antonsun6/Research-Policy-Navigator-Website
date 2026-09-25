"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Overview" },
  { href: "/team", label: "Team & Contacts" },
  { href: "/schedule", label: "Scheduling & Timeline" },
  { href: "/journal", label: "Meetings & Decisions" },
  { href: "/deliverables", label: "Deliverables" },
  { href: "/rules", label: "Team Rules" },
  { href: "/links", label: "Related Links" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/90 backdrop-blur">
      <div className="h-1 bg-[var(--navy)]" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 pt-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--navy)] text-xs font-bold text-white">
            RP
          </span>
          <span className="text-lg font-semibold tracking-tight text-[var(--navy)]">
            Research Policy Navigator
          </span>
        </Link>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {TABS.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`border-b-2 pb-3 pt-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[var(--carolina)] text-[var(--navy)]"
                    : "border-transparent text-[var(--foreground)]/60 hover:text-[var(--navy)]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
