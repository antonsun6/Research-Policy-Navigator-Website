"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Overview" },
  { href: "/team", label: "Team & Contacts" },
  { href: "/schedule", label: "Scheduling & Timeline" },
  { href: "/deliverables", label: "Weekly Deliverables" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Research Policy Navigator
        </Link>
        <nav className="flex gap-1">
          {TABS.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--foreground)]/70 hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
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
