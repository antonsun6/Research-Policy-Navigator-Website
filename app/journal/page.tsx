import EmptyState from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader";

type MeetingType = "client" | "coach" | "team";

type JournalEntry = {
  date: string; // YYYY-MM-DD
  type: MeetingType;
  title: string;
  summary: string;
  decisions?: string[];
  actionItems?: { owner: string; task: string }[];
};

const TYPE_STYLES: Record<MeetingType, { label: string; badge: string }> = {
  client: {
    label: "Client Meeting",
    badge: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  },
  coach: {
    label: "Coach Meeting",
    badge: "bg-[var(--navy)]/10 text-[var(--navy)]",
  },
  team: { label: "Team Meeting", badge: "bg-slate-100 text-slate-600" },
};

// One entry per client, coach, and team meeting. Order doesn't matter here:
// entries are shown newest first.
const ENTRIES: JournalEntry[] = [];

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function JournalPage() {
  const entries = [...ENTRIES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex flex-col gap-12">
      <PageHeader eyebrow="Meetings & Decisions" title="Journal">
        A short summary of every client, coach, and team meeting: what we
        discussed, what we decided, and who is doing what next. Newest
        meetings are listed first.
      </PageHeader>

      {entries.length === 0 ? (
        <EmptyState>Meeting summaries will be posted here.</EmptyState>
      ) : (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 text-left">
          {entries.map((entry) => {
            const style = TYPE_STYLES[entry.type];
            return (
              <article
                key={`${entry.date}-${entry.type}`}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--navy)]">
                    {formatDate(entry.date)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
                  >
                    {style.label}
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-[var(--navy)]">
                  {entry.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/75">
                  {entry.summary}
                </p>

                {entry.decisions && entry.decisions.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
                      Decisions
                    </h3>
                    <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-[var(--foreground)]/75 marker:text-[var(--carolina)]">
                      {entry.decisions.map((decision) => (
                        <li key={decision}>{decision}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.actionItems && entry.actionItems.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
                      Action items
                    </h3>
                    <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-[var(--foreground)]/75 marker:text-[var(--carolina)]">
                      {entry.actionItems.map((item) => (
                        <li key={`${item.owner}-${item.task}`}>
                          <span className="font-medium text-[var(--navy)]">
                            {item.owner}:
                          </span>{" "}
                          {item.task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
