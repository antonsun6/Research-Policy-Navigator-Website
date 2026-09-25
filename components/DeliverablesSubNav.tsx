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
    <nav className="flex flex-wrap justify-center gap-1 rounded-full border border-[var(--border)] bg-white p-1 self-center">
      {SUBTABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[var(--navy)] text-white"
                : "text-[var(--foreground)]/60 hover:text-[var(--navy)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
