import EmptyState from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader";
import { STATUS_STYLES } from "@/lib/deliverables";

type MeetingType = "client" | "coach" | "team";

type JournalEntry = {
  date: string; // YYYY-MM-DD
  type: MeetingType;
  title: string;
  summary: string;
  keyPoints?: string[];
  decisions?: string[];
  // status is set once work on an item has started.
  actionItems?: { owner?: string; task: string; status?: "In Progress" }[];
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
    date: "2026-11-11",
    type: "team",
    title: "MVP work split",
    summary:
      "Worked on the MVP: five workflows (Ask, feedback and saved items, usage logging and the admin dashboard, content management and subtopics, and FAQs), each with a backend and a frontend owner, plus an owner for each non-functional requirement.",
    keyPoints: [
      "The MVP needs every must-have functional requirement (F1–F12) and at least 8 of the 10 non-functional requirements (NF1–NF10).",
      "Sign-in (F1) and the three entry points (F2) were already done, and NF9 (deployable on CloudApps) was met.",
      "Each pair builds its first workflow first, and adds its endpoints and tables to the API and database docs before coding so backend and frontend can work in parallel.",
    ],
    decisions: ["The MVP deadline moved from Thu, Nov 12 to Sun, Nov 15."],
    actionItems: [
      { owner: "Jerry", task: "Ask (RAG), backend and frontend: answers with citations and low-confidence referrals (F5, F6)." },
      { owner: "Jerry", task: "Frontend for feedback and saved items (F7, F9) and for usage logging and the admin dashboard (F10, F11)." },
      { owner: "Jerry", task: "Own NF1–NF4 (grounded answers, disclaimer and next step, measured answer quality, plain language) and NF5 response time for Ask." },
      { owner: "Andy", task: "Backend for feedback and saved items (F7, F9)." },
      { owner: "Andy", task: "Backend for usage logging and the admin dashboard, including CSV export (F10, F11)." },
      { owner: "Andy", task: "Own NF6 (privacy) and NF9 (deployable on CloudApps)." },
      { owner: "Adithi", task: "Backend for content management and subtopic tags (F3, F4, F12)." },
      { owner: "Adithi", task: "Frontend for FAQs: the researcher FAQ page and FAQs on topic pages (F8)." },
      { owner: "Adithi", task: "Own NF5 response time for browse and search, and NF7 (no silent deletes)." },
      { owner: "Anton", task: "Frontend for content management and subtopic tags: tag pages, the admin Policy Library, Content Management and document editor (F3, F4, F12)." },
      { owner: "Anton", task: "Backend for FAQs (F8)." },
      { owner: "Anton", task: "Own NF8 (check every page is responsive, accessible and on-brand) and NF10 (maintainability and the handoff documentation)." },
    ],
  },
  {
    date: "2026-11-10",
    type: "client",
    title: "RAG demo with the client",
    summary: "Demoed Nora's question answering (RAG) to the client and agreed on tags and delivery dates.",
    keyPoints: ["Demoed the RAG pipeline: asking a question and getting a cited answer."],
    actionItems: [
      { task: "Implement tags." },
      { task: "Client delivery: Carolina CloudApps platform by Mon, Nov 16." },
      { task: "Client delivery: GitHub by early next week." },
    ],
  },
  {
    date: "2026-11-05",
    type: "coach",
    title: "Coach meeting with Vinir Rai",
    summary:
      "Followed up on the doc plan and set the final deadlines: the client handoff and a live demo with a requirements checklist on Nov 12, and the final video submission on Nov 15.",
    keyPoints: [
      "Doc plan from Oct 29: the README, an FAQ, the fall break demo video, and a Getting Started section for users and developers.",
      "The doc plan and the design document were both due tonight, Nov 5 at 11:59 PM.",
      "Current goal: complete the MVP by Nov 12 with at least 75% of the non-functional requirements met, and plan the client handoff.",
      "Final presentation is a 10-minute video submission: create slides, screen-share the application, and show what state the project is left in.",
    ],
    decisions: ["Finish the full project by Nov 15, or Nov 19 at the latest (our last coach meeting)."],
    actionItems: [
      { owner: "Andy", task: "Submit the doc plan by midnight tonight, Nov 5." },
      { owner: "Anton", task: "Plan and deliver the client handoff, due Thu, Nov 12." },
      { owner: "Everyone", task: "Mini live demo, with a checklist of all functional and non-functional requirements on the website, due Thu, Nov 12." },
      { owner: "Everyone", task: "Final video submission after our coach meeting, due Sun, Nov 15." },
    ],
  },
  {
    date: "2026-11-01",
    type: "team",
    title: "Tech talk presentation",
    summary: "Worked on our tech talk presentation about RAG and split it into four parts.",
    actionItems: [
      { owner: "Adithi", task: "Create the slides and cover why RAG and when we would use it." },
      { owner: "Andy", task: "Help create the slides and cover the introduction, different ways to do RAG, and real-world applications." },
      { owner: "Anton", task: "Cover the technical breakdown of RAG." },
      { owner: "Jerry", task: "Run the live demo." },
    ],
  },
  {
    date: "2026-10-29",
    type: "coach",
    title: "Coach meeting with Vinir Rai",
    summary: "Set the plan for the rest of the build: the doc plan next week, the MVP, then the final product.",
    decisions: [
      "The MVP is due Thu, Nov 12.",
      "The final product is due Sun, Nov 15.",
    ],
    actionItems: [
      { owner: "Anton", task: "Complete the doc plan next week." },
      { owner: "Everyone", task: "Complete the MVP by Thu, Nov 12." },
      { owner: "Everyone", task: "Complete the final product by Sun, Nov 15." },
    ],
  },
  {
    date: "2026-10-27",
    type: "client",
    title: "Meeting with Jeanne Lovmo and Amanda Cheng",
    summary:
      "Met Amanda Cheng, heard where the subtopic framework stands, changed who hosts Nora on CloudApps, and answered Jeanne's questions about the RAG model and the project's future.",
    keyPoints: [
      "Amanda Cheng, Director of Operations for the Office of Sponsored Programs, joined the meeting.",
      "The client is still revising the framework for subtopics.",
      "Where is Nora being built? It runs on our local servers and computers for now, and we're contacting UNC ITS for permissions and access.",
      "What happens to the project when we're done? It could be transferred to students in next semester's COMP 523, and the GitHub repository and documents could be forked onto UNC's Git.",
      "What does the rest of the semester look like? A full working demo, then polishing toward the end of the semester.",
    ],
    decisions: [
      "The Office of the Vice Chancellor for Research will host the CloudApps space instead of us.",
    ],
  },
  {
    date: "2026-10-22",
    type: "coach",
    title: "Coach meeting with Vinir Rai",
    summary: "Set the game plan for the week: the ethics assignment and the first part of the test plan.",
    actionItems: [
      { owner: "Anton", task: "Upload the ethics assignment to the website by Sun, Oct 25." },
      { owner: "Jerry", task: "Finish the first part of the test plan document by Sun, Oct 25 at midnight." },
    ],
  },
  {
    date: "2026-10-13",
    type: "client",
    title: "Workflow demo with Jeanne Lovmo",
    summary:
      "Demoed two of Nora's workflows to Jeanne, who gave feedback on topic pages, questions, ratings, and filtering.",
    keyPoints: ["Demoed two of our workflows to the client."],
    actionItems: [
      { owner: "Anton", task: "Include contacts and a webpage for each topic." },
      { owner: "Adithi", task: "Add a question page and include FAQs there." },
      { owner: "Andy", task: "Add a place for researchers to give feedback or leave a comment, with a thumbs up/down or a star rating.", status: "In Progress" },
      { owner: "Jerry", task: "Let researchers and admins filter for a specific office to view its policies in one topic.", status: "In Progress" },
      { owner: "Adithi", task: "Use the Ask a Question page/tab for suggestions and FAQs." },
      { owner: "Andy", task: "Add a quick rating system and an in-depth ranking system." },
    ],
  },
  {
    date: "2026-10-11",
    type: "team",
    title: "Demo workflows and task split",
    summary:
      "Defined the two workflows we'll demo, set up the database and backend schemas and all documentation, and split the demo work into four tasks.",
    keyPoints: [
      "Defined our two workflows that we will demo.",
      "Set up the database and backend schemas.",
      "Set up all documentation.",
    ],
    actionItems: [
      {
        owner: "Anton",
        task: "Content and search backend: build the offices, topics, and documents tables and migration, seed the 9 categories with about 15 cited policy excerpts, and serve them through /api/topics and full-text /api/documents?topic=&q=, with keyword-only /api/ask as a stretch goal.",
      },
      {
        owner: "Adithi",
        task: "Frontend researcher pages: build the researcher home with Browse, Search, and Ask given equal weight, topic cards that open a document list, and a search box whose results show each citation and source link.",
      },
      {
        owner: "Andy",
        task: "Frontend shell, sign-in, and admin mockup: set up the router, layout, and theme, build the sign-in page that sends each user to the researcher home or admin page by role, and guard the admin routes in front of a stub admin page.",
      },
      {
        owner: "Jerry",
        task: "Auth backend: build the users table and migration, the seed users researcher1 and admin1, the mock-login, logout, and /api/me endpoints, and a require_role(\"admin\") check that returns 403 to researchers.",
      },
    ],
  },
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
      { owner: "Anton", task: "Add an Assignments tab with the ethics assignment." },
      { owner: "Andy", task: "Email ITS about getting the OKD environment for hosting, CC Vinir." },
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
      { owner: "Adithi", task: "Plan the Steering Group showcase for Nov 19." },
      { owner: "Jerry", task: "Decide whether to add subtopics within the policy categories." },
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
      { owner: "Anton", task: "Turn the timeline into a journal of meetings, feedback, and upcoming changes, and update it after every coach and client meeting." },
      { owner: "Anton", task: "Put the spec document on the website itself instead of linking to Google Docs." },
      { owner: "Adithi", task: "Client section: list the client's name, department, and email." },
      { owner: "Andy", task: "Team page: list our names, emails, and project roles." },
      { owner: "Jerry", task: "Move the project introduction from the overview to the home page." },
      { owner: "Adithi", task: "Fix the site's fonts." },
      { owner: "Andy", task: "Make screenshots neater, possibly on a separate page." },
      { owner: "Jerry", task: "Talk with the client to set more concrete expectations, especially for the UI." },
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
                          {item.status && (
                            <span
                              className={`ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
                            >
                              {item.status}
                            </span>
                          )}
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
