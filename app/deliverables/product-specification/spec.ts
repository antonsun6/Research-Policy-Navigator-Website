// Product specification content, transcribed from the Week 1 spec document.

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
    text: "As a researcher, I can browse the nine research policy categories so that I can find guidance relevant to my topic without knowing exactly what to search for.",
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
        title: "Role-Based Authentication",
        text: "The system shall authenticate users and distinguish between researcher and administrator roles.",
      },
      {
        id: "F2",
        title: "Role-Based Access",
        text: "Researchers shall have access only to researcher-facing features; administrators shall have access to administrative analytics and content management.",
      },
      {
        id: "F3",
        title: "Mock Login",
        text: "For the semester build, the system shall use a mock login (email/role-based) that models UNC's Onyen-style flow, since production UNC SSO infrastructure is not available to the student team.",
      },
      {
        id: "F4",
        title: "Policy Repository Access",
        text: "The system shall provide access to a curated collection of research policy documents sourced from the UNC Policy Knowledge Base.",
      },
      {
        id: "F5",
        title: "Category Organization",
        text: "The system shall organize policy information according to the nine existing policy categories.",
      },
      {
        id: "F6",
        title: "Source Citation",
        text: "The system shall maintain the source/citation associated with each piece of policy information.",
      },
      {
        id: "F7",
        title: "Authoritative Document Control",
        text: "Administrators shall be able to mark which documents are treated as authoritative, and remove or replace outdated materials.",
      },
      {
        id: "F8",
        title: "Keyword & Phrase Search",
        text: "Researchers shall be able to search the Policy Repository for a specific policy, procedure, topic, or phrase using keywords, returning matching source documents — distinct from the plain-language Ask a Question flow.",
      },
      {
        id: "F9",
        title: "Topic Browsing",
        text: "Researchers shall be able to browse policy information by category/topic.",
      },
      {
        id: "F10",
        title: "Sourced Answers",
        text: "Search results shall identify relevant policy information and return a sourced, plain-language answer rather than raw documents.",
      },
      {
        id: "F11",
        title: "Answer Citations",
        text: "Responses shall identify the specific policy source(s) used to generate the guidance.",
      },
      {
        id: "F12",
        title: "Unanswerable Question Handling",
        text: "The system shall identify when a question cannot be answered confidently from approved sources and direct the user to the appropriate compliance office instead of guessing.",
      },
      {
        id: "F13",
        title: "Saved Questions & Resources",
        text: "Researchers shall be able to save a question or resource to revisit later.",
      },
      {
        id: "F14",
        title: "FAQ Browsing",
        text: "Researchers shall be able to browse a list of frequently asked questions.",
      },
      {
        id: "F15",
        title: "Answer Feedback",
        text: "Researchers shall be able to submit feedback (helpful / not helpful) on a given answer.",
      },
      {
        id: "F16",
        title: "Search History View",
        text: "Administrators shall be able to view the history of questions researchers have asked.",
      },
      {
        id: "F17",
        title: "Topic Analytics",
        text: "The admin dashboard shall identify frequently searched topics and questions.",
      },
      {
        id: "F18",
        title: "Unanswered Question Tracking",
        text: "The admin dashboard shall identify questions the system was unable to answer confidently.",
      },
      {
        id: "F19",
        title: "Feedback Dashboard",
        text: "The admin dashboard shall display researcher feedback on the helpfulness of responses.",
      },
      {
        id: "F20",
        title: "Content Management",
        text: "Administrators shall be able to add, edit, and remove policies, guidance documents, FAQs, and topic categories.",
      },
      {
        id: "F21",
        title: "Equal-Weight Entry Points",
        text: "The system shall present Browse Topics, Search Policies & Guidance, and Ask a Question as three equally prominent, independent entry points into the same Policy Repository, with none positioned as the default or primary experience.",
      },
    ],
  },
  {
    priority: "Perhaps",
    items: [
      {
        id: "F22",
        title: "UNC SSO Integration",
        text: "The system may integrate with UNC's actual single sign-on system (Onyen/Connect Carolina), subject to UNC ITS access being granted.",
      },
      {
        id: "F23",
        title: "Document Version History",
        text: "The system may maintain a version history of edits to policy and guidance documents.",
      },
      {
        id: "F24",
        title: "Related Question Suggestions",
        text: "The system may suggest related or follow-up questions based on the current query.",
      },
      {
        id: "F25",
        title: "Multi-Turn Follow-Up",
        text: "The system may support basic multi-turn conversation (a follow-up question that references the prior answer).",
      },
      {
        id: "F26",
        title: "Automated FAQ Clustering",
        text: "The system may automatically cluster semantically similar questions to surface FAQ candidates for administrator review.",
      },
      {
        id: "F27",
        title: "Analytics Export",
        text: "Administrators may be able to export analytics reports (e.g., CSV or PDF) for a selected date range.",
      },
      {
        id: "F28",
        title: "Analytics Filtering",
        text: "The dashboard may support filtering analytics by topic, date range, or user role.",
      },
    ],
  },
  {
    priority: "Improbable",
    items: [
      {
        id: "F29",
        title: "Built-In Multi-Factor Auth",
        text: "The system will not implement its own multi-factor authentication; this remains the responsibility of UNC's SSO provider.",
      },
      {
        id: "F30",
        title: "Live Knowledge Base Sync",
        text: "The system will not maintain a live, automatic sync with UNC's production Policy Knowledge Base; documents are curated and uploaded manually for the semester build.",
      },
      {
        id: "F31",
        title: "Multi-Language Support",
        text: "The system will not support languages other than English.",
      },
      {
        id: "F32",
        title: "Auto-Published FAQs",
        text: "The system will not auto-publish FAQ entries without administrator review and approval.",
      },
      {
        id: "F33",
        title: "Predictive Analytics",
        text: "The system will not provide predictive analytics or machine-learning-driven recommendations for guidance gaps.",
      },
      {
        id: "F34",
        title: "Enterprise System Integration",
        text: "The system will not directly integrate with enterprise research systems such as IRB or COI platforms; this is identified as a future enhancement beyond the semester scope.",
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
        title: "Responsive Design",
        text: "The application shall be responsive and usable on both desktop and mobile browser widths.",
      },
      {
        id: "NF2",
        title: "Plain-Language Answers",
        text: "Answers shall be written in plain, non-technical language rather than returning raw policy text.",
      },
      {
        id: "NF3",
        title: "Guidance vs. Determination Clarity",
        text: "Every AI-generated response shall clearly distinguish informational guidance from a formal determination, and shall not present itself as making a compliance decision on behalf of a university office.",
      },
      {
        id: "NF4",
        title: "Admin-Manageable Content",
        text: "Administrators shall be able to add, edit, or remove source documents and FAQs through the admin portal without developer involvement.",
      },
      {
        id: "NF5",
        title: "Curated Data Scope",
        text: "The system shall be built using only a curated set of publicly available or client-approved documents; it shall not access confidential research records or production compliance systems.",
      },
      {
        id: "NF6",
        title: "Document Overwrite Protection",
        text: "The system shall not overwrite or delete a policy document without explicit administrator confirmation.",
      },
      {
        id: "NF7",
        title: "Equal-Weight Navigation",
        text: "Browse, Search, and Ask shall receive equal visual prominence on the researcher home screen (comparable size, placement, and call-to-action styling), rather than emphasizing Ask a Question over the other two.",
      },
    ],
  },
  {
    priority: "Perhaps",
    items: [
      {
        id: "NF8",
        title: "Response Time",
        text: "A typical question shall return an answer within approximately 5–10 seconds.",
      },
      {
        id: "NF9",
        title: "Confidence Indicator",
        text: "The system may report an internal confidence indicator alongside each answer for administrator review.",
      },
      {
        id: "NF10",
        title: "Portable Hosting",
        text: "The system should be deployable to a standard cloud hosting provider (e.g., Vercel, Railway, Render) without dependence on UNC-specific infrastructure, so the team can develop and demo independently.",
      },
    ],
  },
  {
    priority: "Improbable",
    items: [
      {
        id: "NF11",
        title: "High-Concurrency Performance",
        text: "Guaranteed sub-second response times under high concurrent load; this would require production-grade infrastructure beyond semester scope.",
      },
      {
        id: "NF12",
        title: "Formal Accessibility Certification",
        text: "A formal WCAG 2.1 AA accessibility audit; the team will follow general accessibility best practices but not pursue formal certification.",
      },
      {
        id: "NF13",
        title: "High-Availability Infrastructure",
        text: "Automated high-availability/failover infrastructure (e.g., multi-region redundancy).",
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
        title: "Researcher Home Screen",
        text: 'Presents Browse Topics, Search Policies & Guidance, and Ask a Question as three equally weighted entry points (comparable size and placement), rather than centering the page on Ask a Question; left navigation includes Home, Ask a Question, Search Policies, Browse Topics, FAQs, Announcements, Help & Support, Contact Compliance; the page also includes a "Grounded Answer" panel with a confidence indicator, a References list, and a helpful/not-helpful feedback control for the Ask a Question flow.',
      },
      {
        id: "I2",
        title: "Researcher Right Rail",
        text: 'Related/Popular Topics, Saved Questions, Recommended Guidance, and a "Need Help? Contact Compliance Team" panel for unanswerable questions.',
      },
      {
        id: "I3",
        title: "Topic Category Grid",
        text: "A grid of the nine Research Policy Topic categories shown on the home screen.",
      },
      {
        id: "I4",
        title: "Admin Overview Dashboard",
        text: "Summary metric tiles (Questions Asked, Answers Delivered, Active Users, Policies Published, Positive Feedback), a Questions Over Time line chart, a Top Topics donut chart, Content Overview counts, a Recent Activity feed, a Feedback Overview donut chart, and a System Health panel.",
      },
      {
        id: "I5",
        title: "Admin Navigation",
        text: "Left navigation (Overview, Policy Library, Topics, Content Management, Users & Roles, Analytics & Reports, System Settings, Integrations).",
      },
      {
        id: "I6",
        title: "Mock Login Screen",
        text: "A sign-in screen modeling UNC's Onyen login, using a mocked authentication flow for the semester build.",
      },
      {
        id: "I7",
        title: "Internal REST API",
        text: "JSON endpoints exposed by the application server (e.g., POST /ask, GET /topics, GET /policies, GET /faqs, POST /feedback, and an /admin/* namespace), gated by role.",
      },
      {
        id: "I8",
        title: "Generative AI API",
        text: "An external API (e.g., Claude API) that receives retrieved policy chunks and the user's question and returns the generated answer.",
      },
      {
        id: "I9",
        title: "Embedding Model API",
        text: "An external API that converts policy text and user questions into vectors for similarity search and FAQ clustering.",
      },
    ],
  },
  {
    priority: "Perhaps",
    items: [
      {
        id: "I10",
        title: "Dashboard Date-Range & Export Controls",
        text: "A date-range selector and an Export Report control on the admin dashboard.",
      },
    ],
  },
  {
    priority: "Improbable",
    items: [
      {
        id: "I11",
        title: "Live UNC SSO Interface",
        text: "A production connection to UNC's authentication system (Onyen/Connect Carolina) for login.",
      },
      {
        id: "I12",
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
