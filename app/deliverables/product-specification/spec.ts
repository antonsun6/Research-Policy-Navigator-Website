// Product specification content (D1). User stories are transcribed from our D1 specification
// document. The requirements and interfaces were revised on Nov 10, 2026 to match the Link
// proposal and the client's follow-up emails; the original lists are in git history.

export type SpecItem = {
  id: string;
  title: string;
  text: string;
};

export type Priority = "Definite" | "Perhaps" | "Improbable";

export type SpecGroup = {
  priority?: Priority; // Omitted for sections that aren't prioritized.
  items: SpecItem[];
};

export type SpecSection = {
  id: string;
  title: string;
  intro?: string;
  groups: SpecGroup[];
};

const USER_STORIES: SpecItem[] = [
  {
    id: "US1",
    title: "Login & Role Detection",
    text: "As a researcher, I can log in with my Onyen so that the Navigator recognizes me and shows me the right role-based view (researcher or admin).",
  },
  {
    id: "US2",
    title: "Browse Topics",
    text: "As a researcher, I can browse the nine research policy topics and their subtopics so that I can find guidance relevant to my area without knowing exactly what to search for.",
  },
  {
    id: "US3",
    title: "Ask a Question",
    text: "As a researcher, I can ask a question in plain language and receive an answer along with the source it was drawn from, so that I can trust and verify the guidance I'm given.",
  },
  {
    id: "US4",
    title: "Unanswerable Question Referral",
    text: "As a researcher, if my question can't be answered confidently from approved sources, I want the Navigator to tell me that and direct me to the appropriate compliance office, rather than guessing.",
  },
  {
    id: "US5",
    title: "Centralized Guidance",
    text: "As a researcher, I can see relevant policy information in one place so that I don't have to search across multiple UNC websites or contact multiple offices for a single answer.",
  },
  {
    id: "US6",
    title: "Save Questions & Resources",
    text: "As a researcher, I can save a question or resource so that I can return to it later without searching again.",
  },
  {
    id: "US7",
    title: "Browse FAQs",
    text: "As a researcher, I can browse frequently asked questions so that I can quickly find answers to common concerns without typing my own question.",
  },
  {
    id: "US8",
    title: "Answer Feedback",
    text: "As a researcher, I can mark whether an answer was helpful so that UNC Research can improve the guidance the Navigator gives.",
  },
  {
    id: "US9",
    title: "View Search Activity",
    text: "As an administrator, I can view what researchers are searching for so that I can identify common struggle points and topics that need clearer guidance.",
  },
  {
    id: "US10",
    title: "Track Unanswered Questions",
    text: "As an administrator, I can track questions the Navigator couldn't answer so that I can identify gaps in current policy coverage.",
  },
  {
    id: "US11",
    title: "Review Feedback",
    text: "As an administrator, I can review researcher feedback on answer helpfulness so that I have metadata to inform training, education, and workshops.",
  },
  {
    id: "US12",
    title: "Manage Policy Content",
    text: "As an administrator, I can add, update, or remove policy and guidance documents, and control which are treated as authoritative, so that Navigator answers stay grounded in current, approved information.",
  },
  {
    id: "US13",
    title: "Search for a Specific Policy",
    text: "As a researcher, I can search using keywords or a specific phrase to find a particular policy or procedure when I already know roughly what I'm looking for, separate from asking a full plain-language question.",
  },
];

const FUNCTIONAL: SpecGroup[] = [
  {
    priority: "Definite",
    items: [
      {
        id: "F1",
        title: "Sign-In & Roles",
        text: "Users shall sign in through a mock login that models UNC's Onyen flow and land on the researcher or administrator home for their role. Administrator pages and endpoints shall return 403 to researchers.",
      },
      {
        id: "F2",
        title: "Three Equal Entry Points",
        text: "The researcher home shall present Browse Topics, Search Policies & Guidance, and Ask a Question at equal size and weight, with none positioned as the default.",
      },
      {
        id: "F3",
        title: "Browse by Topic & Subtopic",
        text: "Researchers shall browse the nine topics, then a topic's documents, then a document page showing its summary, owning office, and official Research Policy Repository link. Subtopics (tags defined by the Link) shall filter a topic's documents, and each document shall list related policies that share a subtopic.",
      },
      {
        id: "F4",
        title: "Search Policies",
        text: "Researchers shall search by keyword or phrase across policy titles, text, topics, and subtopics, and get ranked active documents, each with its citation and Repository link.",
      },
      {
        id: "F5",
        title: "Ask a Question",
        text: "Researchers shall ask a plain-language question and receive a concise answer drawn only from Repository content, with numbered citations that link to the specific policy and section used.",
      },
      {
        id: "F6",
        title: "Low-Confidence Referral",
        text: "When the retrieved sources can't support a confident answer, the system shall not generate one. It shall say so and show the responsible office and its contact details as the next step.",
      },
      {
        id: "F7",
        title: "Answer Feedback",
        text: "Researchers shall mark any answer helpful or not helpful.",
      },
      {
        id: "F8",
        title: "FAQs",
        text: "Administrators shall write and publish FAQ entries. Researchers shall browse them on an FAQ page and on the matching topic page.",
      },
      {
        id: "F9",
        title: "Saved Items",
        text: "Researchers shall save a question and its answer, or a document, and return to them on a Saved page.",
      },
      {
        id: "F10",
        title: "Usage Logging",
        text: "The system shall record topic views, document views, searches (terms and result count), and questions (outcome and citations) as the data behind the admin dashboard.",
      },
      {
        id: "F11",
        title: "Admin Dashboard",
        text: "For a chosen date range, the dashboard shall show users and visits; Browse, Search, and Ask counts; most-viewed topics and policies; most-cited resources; common search terms; searches with no results; questions asked most often; questions referred or not answered confidently; the share of answers rated helpful; and trends over time. It shall show aggregates only, never individual researchers, and export its data as CSV.",
      },
      {
        id: "F12",
        title: "Content Management",
        text: "Administrators shall add a Repository document by its link (imported as a draft), review and publish it, edit its topic, subtopics, owning office, and authoritative flag, and archive or restore it. Only active, authoritative documents are used in Browse, Search, and Ask. The Repository remains the authoritative text, so documents aren't edited inside Nora.",
      },
    ],
  },
  {
    priority: "Perhaps",
    items: [
      {
        id: "F13",
        title: "Plain-Language Search Matching",
        text: "Search may match everyday terms to policy language (for example, \"lab notebook\" to research data), reusing the Ask pipeline's retrieval.",
      },
      {
        id: "F14",
        title: "Review Dates",
        text: "Documents may carry review-due dates, with the dashboard listing documents overdue for review.",
      },
      {
        id: "F15",
        title: "Conflicting-Content Flags",
        text: "The system may flag conflicting, outdated, or duplicate content to its owning office, once the Link decides how such content should be handled.",
      },
      {
        id: "F16",
        title: "Dashboard Filters",
        text: "The dashboard may filter its measures by topic.",
      },
      {
        id: "F17",
        title: "UNC SSO Integration",
        text: "The system may sign users in through UNC's single sign-on (Onyen), once UNC ITS grants access.",
      },
      {
        id: "F18",
        title: "Related Questions",
        text: "The system may suggest related or follow-up questions after an answer.",
      },
      {
        id: "F19",
        title: "Multi-Turn Follow-Up",
        text: "The system may answer a follow-up question that refers to the previous answer.",
      },
      {
        id: "F20",
        title: "Question Grouping",
        text: "The dashboard may group similar questions, rather than exact matches, to surface FAQ candidates for administrator review.",
      },
      {
        id: "F21",
        title: "Document Version History",
        text: "The system may keep a history of changes to each document's metadata.",
      },
      {
        id: "F22",
        title: "Admin List Management",
        text: "Administrators may add and remove other administrators by Onyen from a Users & Roles page, instead of the list being set at deployment.",
      },
    ],
  },
  {
    priority: "Improbable",
    items: [
      {
        id: "F23",
        title: "Built-In Multi-Factor Auth",
        text: "The system will not implement its own multi-factor authentication; that remains the job of UNC's SSO provider.",
      },
      {
        id: "F24",
        title: "Live Knowledge Base Sync",
        text: "The system will not sync automatically with the Research Policy Repository; administrators import and update documents.",
      },
      {
        id: "F25",
        title: "Multi-Language Support",
        text: "The system will not support languages other than English.",
      },
      {
        id: "F26",
        title: "Auto-Published FAQs",
        text: "The system will not publish FAQ entries without administrator review.",
      },
      {
        id: "F27",
        title: "Predictive Analytics",
        text: "The system will not provide predictive analytics or machine-learning recommendations for guidance gaps.",
      },
      {
        id: "F28",
        title: "Enterprise System Integration",
        text: "The system will not integrate with IRB, COI, or other enterprise research systems; this is a future enhancement beyond the semester.",
      },
    ],
  },
];

const NON_FUNCTIONAL: SpecGroup[] = [
  {
    priority: "Definite",
    items: [
      {
        id: "NF1",
        title: "Grounded Answers Only",
        text: "Answers shall use only active, authoritative Repository documents, never the model's general knowledge. Questions the sources don't cover shall get a referral, not an answer.",
      },
      {
        id: "NF2",
        title: "Disclaimer & Next Step",
        text: "Every answer shall display the Link-approved AI disclaimer, shall never read as a regulatory or compliance determination, and shall give a clear next step: a source link or an office to contact.",
      },
      {
        id: "NF3",
        title: "Measured Answer Quality",
        text: "An evaluation shall run on the Link's sample questions before each change to retrieval or prompts. Targets: the right policy among the top five sources for at least 90% of answerable questions, and at least 90% of out-of-scope questions referred.",
      },
      {
        id: "NF4",
        title: "Concise, Plain Language",
        text: "Answers shall be written in plain language, about 150 words or fewer, and shall never just reproduce raw policy text.",
      },
      {
        id: "NF5",
        title: "Response Time",
        text: "A typical answer shall arrive in under 10 seconds. Browse and search shall respond in under 1 second.",
      },
      {
        id: "NF6",
        title: "Privacy",
        text: "The dashboard shall show aggregate patterns only. Researchers' questions shall be sent only to an AI provider UNC approves.",
      },
      {
        id: "NF7",
        title: "No Silent Deletes",
        text: "Documents shall be archived rather than deleted, and a permanent delete shall require explicit administrator confirmation.",
      },
      {
        id: "NF8",
        title: "Responsive, Accessible, On-Brand",
        text: "The application shall be usable from 375 to 1440 pixels wide and by keyboard, meet WCAG AA color contrast, and follow UNC Research branding.",
      },
      {
        id: "NF9",
        title: "Deployable on Carolina CloudApps",
        text: "The application shall ship as OpenShift-compatible Docker images with every setting in environment variables, and its deployment steps shall be documented.",
      },
      {
        id: "NF10",
        title: "Maintainable & Handed Off",
        text: "CI shall enforce linting and 100% backend test coverage. Handoff documentation shall cover the architecture, coding conventions, deployment, maintenance, known limitations, and recommended next steps.",
      },
    ],
  },
  {
    priority: "Improbable",
    items: [
      {
        id: "NF11",
        title: "High-Concurrency Performance",
        text: "Guaranteed sub-second answers under heavy concurrent load; this would need production-grade infrastructure beyond the semester.",
      },
      {
        id: "NF12",
        title: "Formal Accessibility Certification",
        text: "A formal WCAG 2.1 AA audit; we follow accessibility best practices (NF8) but won't pursue certification.",
      },
      {
        id: "NF13",
        title: "High-Availability Infrastructure",
        text: "Automated failover or multi-region redundancy.",
      },
    ],
  },
];

const INTERFACES: SpecGroup[] = [
  {
    priority: "Definite",
    items: [
      {
        id: "I1",
        title: "Researcher Home",
        text: "Browse Topics, Search Policies & Guidance, and Ask a Question as three equal cards, a grid of the nine topics, a right rail (popular topics, saved items, and a Need Help panel pointing to the responsible offices), and left navigation: Home, Ask a Question, Search Policies, Browse Topics, FAQs, Saved, Help & Support, and Contact Compliance.",
      },
      {
        id: "I2",
        title: "Answer Panel",
        text: "The answer with numbered citations, a References list linking to each policy and section, a confidence indicator, the AI disclaimer, helpful/not-helpful and save controls, and, when Nora can't answer, a referral panel with the responsible office's contact details.",
      },
      {
        id: "I3",
        title: "Mock Login Screen",
        text: "A sign-in screen for the semester build, clearly labeled as a demo so it can't be mistaken for UNC's real login.",
      },
      {
        id: "I4",
        title: "Admin Dashboard",
        text: "Summary tiles, a trend-over-time chart, top topics, policies, search terms and questions, referred and low-confidence questions, feedback results, a date-range selector, and an Export CSV control.",
      },
      {
        id: "I5",
        title: "Admin Content Pages",
        text: "Left navigation (Overview, Policy Library, Topics, Content Management, Analytics & Reports, and Users & Roles once F22 is built) with pages to import, review, publish, edit, and archive documents, manage topics and subtopics, and write FAQs.",
      },
      {
        id: "I6",
        title: "Internal REST API",
        text: "JSON endpoints under /api (auth, topics, documents, ask, feedback, saved items, FAQs, and an /api/admin namespace), gated by role.",
      },
      {
        id: "I7",
        title: "LLM Provider",
        text: "An interface to a generative AI service that receives the question and the retrieved policy excerpts and returns a cited answer. The provider is configurable and will be one UNC approves; tests use a fake.",
      },
      {
        id: "I8",
        title: "Embedding & Reranking Models",
        text: "Models that turn policy text and questions into vectors for retrieval and rescore the top matches. Like the LLM, they sit behind an interface, so they can run on Nora's own server or through a hosted API, whichever UNC approves.",
      },
    ],
  },
  {
    priority: "Perhaps",
    items: [
      {
        id: "I9",
        title: "UNC SSO",
        text: "A connection to UNC's single sign-on (Onyen) in place of the mock login, once UNC ITS grants access.",
      },
    ],
  },
  {
    priority: "Improbable",
    items: [
      {
        id: "I10",
        title: "Enterprise System APIs",
        text: "Direct API integration with IRB, COI, or other UNC enterprise research systems.",
      },
    ],
  },
];

export const SPEC_SECTIONS: SpecSection[] = [
  {
    id: "user-stories",
    title: "User Stories",
    groups: [{ items: USER_STORIES }],
  },
  {
    id: "functional-requirements",
    title: "Functional Requirements",
    groups: FUNCTIONAL,
  },
  {
    id: "non-functional-requirements",
    title: "Non-Functional Requirements",
    intro:
      "Organized using FURPS+ (Usability, Reliability, Performance, Supportability, +Design/Implementation, +Physical, +Interface); not every category applies, so items are listed together rather than under separate headings.",
    groups: NON_FUNCTIONAL,
  },
  {
    id: "interfaces",
    title: "Interfaces",
    groups: INTERFACES,
  },
];
