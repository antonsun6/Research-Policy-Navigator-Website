import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";

const STATS = [
  { label: "Team members", value: "4" },
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
    <div className="flex flex-col gap-16">
      <PageHeader eyebrow="Team A - COMP 523" title="Research Policy Navigator">
        An AI-assisted policy navigator helping UNC researchers get fast,
        source-grounded answers to compliance questions.
      </PageHeader>

      <section className="mx-auto flex max-w-3xl flex-col gap-5">
        <SectionHeading>Our Project</SectionHeading>
        <p className="text-base leading-relaxed text-[var(--foreground)]/75">
          The Research Policy Navigator is a web application designed to help
          UNC researchers quickly find and understand research-related
          policies and guidance. Instead of searching across numerous policy
          documents, websites, FAQs, and resources, researchers can ask
          questions in plain language and receive concise, source-grounded
          answers with citations and links to the relevant UNC Research
          materials.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-white sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-5 py-6 ${i > 0 ? "sm:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t sm:border-t-0" : ""} border-[var(--border)]`}
          >
            <p className="text-3xl font-semibold tracking-tight text-[var(--navy)]">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--foreground)]/50">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading>Jump to</SectionHeading>
        <div className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-[var(--border)] bg-white p-6 transition-colors hover:border-[var(--carolina)]"
            >
              <h3 className="font-semibold text-[var(--navy)]">
                {link.title}
                <span className="ml-1 inline-block text-[var(--carolina)] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
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
