// MVP scope, decided Nov 10, 2026. It narrows the D1 specification to what the client has asked
// for, in concrete, checkable terms. D1 stays as delivered; `replaces` maps each item back to it.
// Pending approval by the Research Policy Navigator Link (Jeanne Lovmo's working group).

export type Status = "Done" | "In progress" | "To do";

export type Requirement = {
  id: string;
  title: string;
  text: string;
  replaces: string;
  status: Status;
};

export type Workflow = {
  id: string;
  title: string;
  requirements: string;
  backend: string;
  frontend: string;
  notes: string;
};

export const SCOPE_INTRO =
  "Our D1 specification listed 34 functional and 13 non-functional requirements, many of them overlapping or vague, and a third of them things we won't build. This page narrows them to what the client has asked for in the Link proposal and her emails, worded so each one can be checked. For the MVP we deliver every functional requirement and at least 8 of the 10 non-functional ones. The list is our draft for the Link to approve.";

export const FUNCTIONAL: Requirement[] = [
  {
    id: "MF1",
    title: "Sign-in and roles",
    text: "Mock Onyen sign-in sends researchers and admins to their own home. Admin pages and endpoints return 403 to researchers.",
    replaces: "F1–F3",
    status: "Done",
  },
  {
    id: "MF2",
    title: "Three equal entry points",
    text: "The researcher home shows Browse, Search and Ask at equal size and weight.",
    replaces: "F21, NF7",
    status: "Done",
  },
  {
    id: "MF3",
    title: "Browse by topic and subtopic",
    text: "The nine topics lead to their documents, and each document page shows its summary, owning office and official Repository link. Subtopics (the client's tags) filter a topic's documents, and a document lists related policies that share a subtopic.",
    replaces: "F4, F5, F9",
    status: "In progress",
  },
  {
    id: "MF4",
    title: "Search",
    text: "A keyword or phrase search over titles, text, topics and subtopics returns ranked active documents, each with its citation and Repository link.",
    replaces: "F8",
    status: "In progress",
  },
  {
    id: "MF5",
    title: "Ask a question",
    text: "A plain-language question gets a concise answer drawn only from the Repository, with numbered citations that link to the policy and section.",
    replaces: "F6, F10, F11",
    status: "To do",
  },
  {
    id: "MF6",
    title: "Referral",
    text: "When retrieval confidence is below the threshold, no answer is generated. Nora says so and shows the responsible office and its contact details as the next step.",
    replaces: "F12",
    status: "To do",
  },
  {
    id: "MF7",
    title: "Answer feedback",
    text: "Every answer has helpful and not-helpful buttons.",
    replaces: "F15",
    status: "To do",
  },
  {
    id: "MF8",
    title: "FAQs",
    text: "Admins write and publish FAQ entries. Researchers browse them on an FAQ page and on the matching topic page.",
    replaces: "F14, part of F20",
    status: "To do",
  },
  {
    id: "MF9",
    title: "Usage logging",
    text: "Every topic view, document view, search (its terms and result count) and question (its outcome and citations) is recorded for the dashboard.",
    replaces: "new: the dashboard needs it",
    status: "To do",
  },
  {
    id: "MF10",
    title: "Admin dashboard",
    text: "For a chosen date range: users and visits; Browse, Search and Ask counts; most-viewed topics and policies; most-cited resources; top search terms; searches with no results; most frequent questions; referred and unanswered questions; the share rated helpful; and weekly trends. Aggregates only, never individual researchers. The tables export to CSV.",
    replaces: "F16–F19, F27",
    status: "To do",
  },
  {
    id: "MF11",
    title: "Content management",
    text: "An admin adds a Repository document by its link, and it's imported as a draft. The admin reviews and publishes it, edits its topic, subtopics, office and authoritative flag, and archives or restores it. Archived documents leave Browse, Search and Ask.",
    replaces: "F7, F20",
    status: "To do",
  },
  {
    id: "MF12",
    title: "Saved items",
    text: "Researchers save a question and its answer, or a document, and see them on a Saved page.",
    replaces: "F13",
    status: "To do",
  },
];

export const NON_FUNCTIONAL: Requirement[] = [
  {
    id: "MNF1",
    title: "Grounded only",
    text: "Answers use only active, authoritative Repository documents. Off-topic questions get a referral, not an answer.",
    replaces: "NF5",
    status: "To do",
  },
  {
    id: "MNF2",
    title: "Disclaimer and next step",
    text: "Every answer shows the client's AI disclaimer, never reads as a compliance determination, and gives a next step: a source link or an office.",
    replaces: "NF3",
    status: "To do",
  },
  {
    id: "MNF3",
    title: "Measured answer quality",
    text: "An evaluation runs on the client's sample questions. Targets: the right policy in the top five for at least 90% of answerable questions, and at least 90% of out-of-scope questions referred.",
    replaces: "new",
    status: "To do",
  },
  {
    id: "MNF4",
    title: "Concise and plain",
    text: "Answers run about 150 words or fewer and never just paste raw policy text.",
    replaces: "NF2",
    status: "To do",
  },
  {
    id: "MNF5",
    title: "Speed",
    text: "A typical answer arrives in under 10 seconds. Browse and search respond in under 1 second.",
    replaces: "NF8",
    status: "To do",
  },
  {
    id: "MNF6",
    title: "Privacy",
    text: "The dashboard shows aggregates only. Questions are sent only to an AI provider UNC approves.",
    replaces: "new: client's dashboard guidance",
    status: "To do",
  },
  {
    id: "MNF7",
    title: "No silent deletes",
    text: "Documents are archived, not deleted. A hard delete needs explicit confirmation.",
    replaces: "NF6",
    status: "To do",
  },
  {
    id: "MNF8",
    title: "Responsive, accessible, on-brand",
    text: "Usable from 375 to 1440 pixels wide, by keyboard, with AA color contrast and UNC colors.",
    replaces: "NF1",
    status: "In progress",
  },
  {
    id: "MNF9",
    title: "Deployable on CloudApps",
    text: "OpenShift-compatible Docker images, every setting in environment variables, and the deployment steps documented.",
    replaces: "NF10",
    status: "Done",
  },
  {
    id: "MNF10",
    title: "Maintainable and handed off",
    text: "CI enforces lint and 100% backend test coverage. Handoff documentation covers architecture, conventions, deployment, maintenance, known limitations and next steps.",
    replaces: "new: client's handoff request",
    status: "In progress",
  },
];

export const PERHAPS: string[] = [
  "Matching plain-language synonyms in search",
  "Review-due dates on documents",
  "Flagging conflicting or outdated content to its owning office",
  "Filtering the dashboard by topic",
  "Real UNC SSO, once ITS grants access",
  "Related and follow-up questions",
  "Grouping similar questions",
  "Document version history",
];

export const OUT_OF_SCOPE: string[] = [
  "Our own multi-factor authentication",
  "Live sync with the Knowledge Base",
  "Languages other than English",
  "Auto-published FAQs",
  "Predictive analytics",
  "IRB, COI or other enterprise integrations",
  "Sub-second answers under heavy load",
  "A formal WCAG audit",
  "High-availability failover",
];

export const WORKFLOWS: Workflow[] = [
  {
    id: "A",
    title: "Ask (RAG)",
    requirements: "MF5, MF6",
    backend: "Jerry",
    frontend: "Jerry",
    notes: "Ingestion into document chunks, POST /api/ask, logging each question and its citations, and the Ask page on real data. Returns the question_id that B and C use.",
  },
  {
    id: "B",
    title: "Feedback and saved items",
    requirements: "MF7, MF12",
    backend: "Andy",
    frontend: "Jerry",
    notes: "Feedback and saved-item tables and endpoints, the buttons on answers and documents, and the Saved page.",
  },
  {
    id: "C",
    title: "Usage logging and admin dashboard",
    requirements: "MF9, MF10",
    backend: "Andy",
    frontend: "Jerry",
    notes: "Usage events, the analytics and CSV endpoints, and the admin Overview on real data in place of the sample data.",
  },
  {
    id: "D",
    title: "Content management and subtopics",
    requirements: "MF3, MF4, MF11",
    backend: "Adithi",
    frontend: "Anton",
    notes: "Admin document pages (add by link, review and publish, edit, archive), subtopic tags, and topic and subtopic matching in search. The tag UI stays hidden until the client sends the tags.",
  },
  {
    id: "E",
    title: "FAQs",
    requirements: "MF8",
    backend: "Anton",
    frontend: "Adithi",
    notes: "The FAQ table and endpoints, the admin FAQ editor, and the researcher FAQ page.",
  },
];

export const PENDING_FROM_CLIENT: string[] = [
  "The subtopic tags for each of the nine topics, needed by about Nov 12 to appear in the Nov 19 demo",
  "Approved disclaimer wording and citation format",
  "Referral offices and contacts for each topic",
  "Sample researcher questions for the evaluation",
  "Approval of this requirements list",
];
