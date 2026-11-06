import EmptyState from "@/components/EmptyState";
import SectionHeading from "@/components/SectionHeading";
import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";
import { Inline } from "../design-document/Markdown";
import {
  DOCS_BY_USER,
  LOCATIONS,
  PLAN_META,
  PURPOSE,
  SCHEDULE,
  USERS,
  USERS_INTRO,
  USERS_NOTE,
  VIDEOS,
  VIDEO_INTRO,
  VIDEO_NOTE,
  type Table,
} from "./plan";

const SECTIONS = [
  { id: "purpose", title: "Purpose" },
  { id: "users", title: "Users" },
  { id: "by-user", title: "Documentation by User" },
  { id: "videos", title: "Video Plan" },
  { id: "locations", title: "Where It Will Live" },
  { id: "schedule", title: "Schedule and Ownership" },
];

function DataTable({ table }: { table: Table }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--carolina-soft)]/60 text-[var(--navy)]">
            {table.head.map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-t border-[var(--border)] align-top">
              {row.map((cell, c) => (
                <td key={c} className="px-3 py-2 text-[var(--foreground)]/80">
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function P({ text }: { text: string }) {
  return (
    <p className="text-sm leading-relaxed text-[var(--foreground)]/80">
      <Inline text={text} />
    </p>
  );
}

function Card({
  n,
  id,
  title,
  children,
}: {
  n: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-4xl scroll-mt-36 overflow-hidden rounded-2xl card-surface text-left"
    >
      <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--carolina-ink)]">
          Section {String(n).padStart(2, "0")}
        </p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--navy)]">
          {title}
        </h3>
      </header>
      <div className="flex flex-col gap-4 px-6 py-6 sm:px-8">{children}</div>
    </section>
  );
}

export default function UserManualPage() {
  const item = findDeliverable("D4");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-xs font-semibold text-[var(--carolina-ink)]">
            {item.id}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
          >
            {item.status}
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
          {item.title}
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          {item.summary}
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <SectionHeading>Part 1: Documentation Plan</SectionHeading>
        <p className="mx-auto max-w-2xl text-center text-sm text-[var(--foreground)]/70">
          <span className="font-semibold text-[var(--navy)]">Team:</span>{" "}
          {PLAN_META.team}
          <br />
          <span className="font-semibold text-[var(--navy)]">Client:</span>{" "}
          {PLAN_META.client}
        </p>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {SECTIONS.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-medium text-[var(--foreground)]/60 transition-colors hover:text-[var(--navy)]"
            >
              <span className="mr-1.5 text-[var(--carolina-ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          ))}
        </nav>
      </section>

      <Card n={1} id="purpose" title="Purpose">
        {PURPOSE.map((text) => (
          <P key={text} text={text} />
        ))}
      </Card>

      <Card n={2} id="users" title="Users">
        <P text={USERS_INTRO} />
        <DataTable table={USERS} />
        <P text={USERS_NOTE} />
      </Card>

      <Card n={3} id="by-user" title="Documentation by User">
        {DOCS_BY_USER.map((user, i) => (
          <div key={user.id} id={user.id} className="flex scroll-mt-36 flex-col gap-3">
            <h4 className="text-lg font-semibold text-[var(--navy)]">
              <span className="mr-2 text-[var(--carolina-ink)]">3.{i + 1}</span>
              {user.title}
            </h4>
            <P text={`**What they need to know:** ${user.needs}`} />
            <DataTable table={user.table} />
            {user.outline && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-[var(--navy)]">
                  {user.outline.title}
                </p>
                <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-relaxed text-[var(--foreground)]/80 marker:text-[var(--carolina-ink)]">
                  {user.outline.items.map((outlineItem) => (
                    <li key={outlineItem} className="pl-1">
                      {outlineItem}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </Card>

      <Card n={4} id="videos" title="Video Plan">
        <P text={VIDEO_INTRO} />
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-relaxed text-[var(--foreground)]/80 marker:text-[var(--carolina-ink)]">
          {VIDEOS.map((video) => (
            <li key={video} className="pl-1">
              <Inline text={video} />
            </li>
          ))}
        </ol>
        <P text={VIDEO_NOTE} />
      </Card>

      <Card n={5} id="locations" title="Where Documentation Will Live">
        <DataTable table={LOCATIONS} />
      </Card>

      <Card n={6} id="schedule" title="Schedule and Ownership">
        <DataTable table={SCHEDULE} />
      </Card>

      <section className="flex flex-col gap-6">
        <SectionHeading>Part 2: Guides and Videos</SectionHeading>
        <EmptyState>
          Coming soon: the Getting Started guide, Administrator User Guide,
          Deployment &amp; Operations Guide, and how-to videos, delivered with
          the final code.
        </EmptyState>
      </section>
    </div>
  );
}
