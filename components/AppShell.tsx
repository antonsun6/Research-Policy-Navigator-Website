"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TABS = [
  { href: "/", label: "Overview" },
  { href: "/team", label: "Team & Contacts" },
  { href: "/schedule", label: "Scheduling & Timeline" },
  { href: "/journal", label: "Meetings & Decisions" },
  { href: "/deliverables", label: "Deliverables" },
  { href: "/rules", label: "Team Rules" },
  { href: "/links", label: "Related Links" },
];

// Matches Tailwind's `lg` breakpoint: sidebar docks beside content at or above
// this width, and overlays it below.
const DESKTOP_QUERY = "(min-width: 1024px)";

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // null = follow the breakpoint default (open on desktop, closed on mobile),
  // so the server render matches and nothing flashes on load.
  const [open, setOpen] = useState<boolean | null>(null);

  const isOpenNow = () =>
    open ?? window.matchMedia(DESKTOP_QUERY).matches;
  const closeOnMobile = () => {
    if (!window.matchMedia(DESKTOP_QUERY).matches) setOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOnMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sidebarPosition =
    open === null
      ? "-translate-x-full lg:translate-x-0"
      : open
        ? "translate-x-0"
        : "-translate-x-full";
  const contentOffset =
    open === null ? "lg:pl-64" : open ? "lg:pl-64" : "lg:pl-0";
  const backdrop =
    open === true ? "opacity-100 lg:hidden" : "pointer-events-none opacity-0";

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center gap-3 bg-[var(--navy)] px-4 shadow-[0_1px_0_rgb(255_255_255/0.06),0_4px_16px_-8px_rgb(13_31_58/0.5)]">
        <button
          type="button"
          onClick={() => setOpen(!isOpenNow())}
          aria-controls="site-sidebar"
          aria-expanded={open ?? undefined}
          aria-label="Toggle navigation"
          className="flex h-9 w-9 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--carolina)] text-xs font-bold text-white">
            RP
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Research Policy Navigator
          </span>
        </Link>
      </header>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 top-14 z-30 bg-[var(--navy-deep)]/40 transition-opacity ${backdrop}`}
      />

      <aside
        id="site-sidebar"
        className={`fixed bottom-0 left-0 top-14 z-40 w-64 overflow-y-auto bg-[var(--navy)] transition-transform duration-200 ${sidebarPosition}`}
      >
        <nav className="flex flex-col gap-1 p-3">
          {TABS.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={closeOnMobile}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md border-l-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[var(--carolina)] bg-white/10 text-white"
                    : "border-transparent text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div
        className={`flex min-h-[calc(100vh-3.5rem)] flex-col transition-[padding] duration-200 ${contentOffset}`}
      >
        {children}
      </div>
    </>
  );
}
