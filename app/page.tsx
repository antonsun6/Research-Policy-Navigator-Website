import Link from "next/link";

const STATS = [
  { label: "Team members", value: "—" },
  { label: "Weeks in", value: "—" },
  { label: "Deliverables shipped", value: "1" },
  { label: "Next milestone", value: "TBD" },
];

const QUICK_LINKS = [
  {
    href: "/team",
    title: "Team & Contacts",
    description: "Who's on the project, roles, and how to reach the client.",
  },
  {
    href: "/schedule",
    title: "Scheduling & Timeline",
    description: "Coach check-ins, client meetings, and internal syncs.",
  },
  {
    href: "/deliverables",
    title: "Weekly Deliverables",
    description: "What shipped each week, starting with the product spec.",
  },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          Project Overview
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Research Policy Navigator
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--foreground)]/70">
          A one-page home base for the project: who&apos;s involved, what&apos;s
          scheduled, and what we&apos;ve delivered so far. Replace this summary
          with a short description of the project&apos;s goals and scope.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
          >
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm text-[var(--foreground)]/60">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Jump to</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                {link.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/60">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
