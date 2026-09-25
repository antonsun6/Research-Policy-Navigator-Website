"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SUBTABS = [
  { href: "/deliverables", label: "All Deliverables" },
  { href: "/deliverables/product-specification", label: "Product Specification" },
];

export default function DeliverablesSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap justify-center gap-1 border-b border-[var(--border)] pb-2">
      {SUBTABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[var(--foreground)] text-white"
                : "text-[var(--foreground)]/60 hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
