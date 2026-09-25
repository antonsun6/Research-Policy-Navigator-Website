import EmptyState from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader";

type MeetingType = "client" | "coach" | "team";

type JournalEntry = {
  date: string; // YYYY-MM-DD
  type: MeetingType;
  title: string;
  summary: string;
  keyPoints?: string[];
  decisions?: string[];
  actionItems?: { owner?: string; task: string }[];
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
const ENTRIES: JournalEntry[] = [
  {
    date: "2026-09-15",
    type: "client",
    title: "Project kickoff with Jeanne Lovmo",
    summary:
      "Jeanne presented her vision for the project: one place for researchers to find, understand, and act on UNC research policy.",
    keyPoints: [
      "Goals: save researchers time, organize policy information, and make it easier to navigate.",
      "Content comes from the UNC Policy Knowledge Base, organized into 9 categories, with fewer than 200 documents in the repository.",
      "Researcher flow: sign in with Onyen, browse or search a topic, ask a question, and receive guidance.",
      "Researchers should be able to ask plain-language questions and get clear answers, and the Navigator must recognize when it shouldn't give an answer.",
      "Admin side: a quick view of what researchers are searching for, common struggle points, unanswerable questions (gaps in current policy coverage), and helpfulness feedback, which is important metadata for training, education, and workshops.",
    ],
  },
  {
    date: "2026-09-24",
    type: "coach",
    title: "First coach meeting with Vinir Rai",
    summary:
      "Reviewed our team website and project plan. We received a list of website updates and guidance on the project's technical direction.",
    decisions: [
      "Follow the client's lead when designing the interface and visualizations.",
      "Build the database for RAG (retrieval) first.",
      "Implement authentication toward the end, around the end of October.",
      "Deploy on UNC CloudApps (AWS), UNC's deployment platform.",
      "David Cowig is our contact for UNC Onyen authentication and admin permissions.",
    ],
    actionItems: [
      { task: "Turn the timeline into a journal of meetings, feedback, and upcoming changes, and update it after every coach and client meeting." },
      { task: "Put the spec document on the website itself instead of linking to Google Docs." },
      { task: "Client section: list the client's name, department, and email." },
      { task: "Team page: list our names, emails, and project roles." },
      { task: "Move the project introduction from the overview to the home page." },
      { task: "Fix the site's fonts." },
      { task: "Make screenshots neater, possibly on a separate page." },
      { task: "Talk with the client to set more concrete expectations, especially for the UI." },
    ],
  },
];

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
                className="rounded-2xl card-surface p-6 sm:p-8"
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

                {entry.keyPoints && entry.keyPoints.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
                      Key points
                    </h3>
                    <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-[var(--foreground)]/75 marker:text-[var(--carolina)]">
                      {entry.keyPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

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
                        <li key={item.task}>
                          {item.owner && (
                            <span className="font-medium text-[var(--navy)]">
                              {item.owner}:{" "}
                            </span>
                          )}
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
