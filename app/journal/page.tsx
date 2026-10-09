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
    date: "2026-10-08",
    type: "coach",
    title: "Coach meeting with Vinir Rai",
    summary:
      "Followed up on journal action items, discussed hosting through ITS, and set requirements for next week's demo.",
    keyPoints: [
      "Demo requirements: target at least one core functionality, use dummy data, and show at least two workflows. Hard deadline for the demo video is Wed, Oct 14 at 11:59 PM.",
      "The ethics assignment is due in two weeks.",
    ],
    decisions: [
      "Every journal action item gets an owner; pairs are fine.",
      "Pursue the OKD environment (OpenShift on Carolina CloudApps) through ITS for hosting.",
    ],
    actionItems: [
      { owner: "Anton", task: "Assign an owner to every action item in the journal." },
      { owner: "Anton", task: "Add a team meeting to the website." },
      { owner: "TBD", task: "Add an Assignments tab with the ethics assignment." },
      { owner: "TBD", task: "Email ITS about getting the OKD environment for hosting, CC Vinir." },
      { owner: "Everyone", task: "Prepare a demo video of 2 workflows, due Wed, Oct 14 at 11:59 PM." },
    ],
  },
  {
    date: "2026-10-01",
    type: "coach",
    title: "Coach meeting with Vinir Rai",
    summary:
      "Reviewed this week's milestones, discussed deployment options, and planned the first check-in demo.",
    keyPoints: [
      "Deployment options: UNC CloudApps or GitHub Pages.",
      "Discussed the three milestones due Saturday, Oct 3: the architecture diagram, system metaphor, and platform selection.",
      "First check-in demo is in two weeks.",
    ],
    decisions: ["Every journal action item must be assigned to a person."],
    actionItems: [
      { owner: "Anton", task: "Fill out the team meeting box on the website." },
      { owner: "Anton", task: "Assign a person to every action item in the journal." },
      { owner: "Jerry", task: "Architecture diagram, due Sat, Oct 3." },
      { owner: "Jerry", task: "Platform selection, due Sat, Oct 3." },
      { owner: "Andy", task: "System metaphor, due Sat, Oct 3." },
      { owner: "Adithi", task: "Prepare midterm talk slides." },
      { owner: "Everyone", task: "Prepare for the first check-in demo in two weeks." },
    ],
  },
  {
    date: "2026-09-29",
    type: "client",
    title: "UI direction and dashboard requirements with Jeanne Lovmo",
    summary:
      "Jeanne set direction for Nora's look and the admin dashboard, gave the project a new name, and scheduled the Steering Group showcase.",
    keyPoints: [
      "Must-have dashboard features (the rest is up to us): top topics being asked; answers delivered vs. referred to an office; the number and types of questions; questions that couldn't be answered confidently; user activity, i.e. how much the tool is used; and feedback analytics.",
      "Open question: whether to create subtopics within the policy categories.",
    ],
    decisions: [
      "The project's new name is Nora the Policy Navigator.",
      "Keep UNC colors and a simple design, using UNC Research's official branding page for images and logos.",
      "Analytics data should be downloadable.",
      "The showcase will be for the Steering Group on Nov 19, 3–4 PM, replacing the tentative Oct 30 showcase.",
    ],
    actionItems: [
      { task: "Plan the Steering Group showcase for Nov 19." },
      { task: "Decide whether to add subtopics within the policy categories." },
    ],
  },
  {
    date: "2026-09-28",
    type: "team",
    title: "Codebase setup and project architecture",
    summary:
      "Set up Nora's codebase, its file and project architecture, and the repository workflow, and updated the team website.",
    keyPoints: [
      "Backend: FastAPI skeleton with a SQLAlchemy and Alembic database layer; the first migration enables pgvector for retrieval.",
      "Frontend: React and TypeScript app scaffolded with Vite, which forwards /api requests to FastAPI during development.",
      "Docker: Dockerfiles for the backend and frontend (with dev and prod targets) and a Docker Compose stack for local development.",
      "CI: a GitHub Actions workflow builds the backend, frontend, and Docker images.",
      "Documentation: a README covering setup, architecture, and workflow, plus a CLAUDE.md with shared project context for Claude Code.",
    ],
    decisions: [
      "Branch flow is dev → qa → main, enforced by a GitHub workflow.",
      "PostgreSQL with pgvector stores the policy data for retrieval.",
      "Local development runs through Docker Compose.",
    ],
  },
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
      "Researchers should be able to ask plain-language questions and get clear answers, and Nora must recognize when it shouldn't give an answer.",
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
