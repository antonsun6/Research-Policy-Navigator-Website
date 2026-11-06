// User manual content (D4). Part 1 is the documentation plan: who uses Nora,
// what each of them needs to know, and how we deliver it. The guides and
// videos themselves are added with the final code. Text supports the inline
// formatting in design-document/Markdown.tsx: **bold**, `code` and [links](url).

export type Row = string[];

export type Table = {
  head: string[];
  rows: Row[];
};

export type UserDocs = {
  id: string;
  title: string;
  needs: string;
  table: Table;
  outline?: { title: string; items: string[] };
};

export const PLAN_META = {
  team: "Nora Research Policy Navigator (COMP 523)",
  client:
    "Jeanne Lovmo and Quinton Johnson, UNC OVCR Research Compliance Services",
};

export const PURPOSE = [
  "Nora gives UNC researchers one place to find, understand, and act on UNC research policy. This plan identifies who will use Nora, what each type of user needs to know, and how we will deliver that information. It describes the documentation we will deliver. The documentation itself will be submitted with the final code.",
  "Our guiding principle: **most users should never need to open a manual.** We put help where people need it, inside the application, and keep written manuals short. We open each manual with the essential tasks and put detail in separate sections that readers can drill into.",
];

export const USERS_INTRO =
  "Nora has three types of users. Each needs different information at a different technical level.";

export const USERS: Table = {
  head: ["User", "Who they are", "What they do in Nora", "Assumed skill level"],
  rows: [
    [
      "**Researcher**",
      "UNC faculty, graduate students, postdocs, and research staff",
      "Ask questions, search for policies, browse the 9 topic categories, read FAQs, save items, rate answers",
      "**Varies widely.** Some are reluctant computer users. We assume only basic web-browsing skills and use plain language with no technical or compliance jargon.",
    ],
    [
      "**Content Administrator**",
      "OVCR Research Compliance Services staff",
      "Manage policies, documents, FAQs, and topics; mark authoritative documents; review analytics, unanswered questions, and feedback",
      "**Comfortable office software users, not developers.** They can use web forms and dashboards but should never need code, a terminal, or a database.",
    ],
    [
      "**System Administrator**",
      "Whoever deploys and maintains Nora after handoff (for example, UNC ITS or a CloudApps maintainer)",
      "Install, configure, deploy, redeploy, and maintain the system and its integrations",
      "**Technically skilled** (comfortable with Git, the command line, environment variables, and container hosting) but **new to our codebase**.",
    ],
  ],
};

export const USERS_NOTE =
  "The person who manages content is not necessarily the person who runs the system, so we document these two roles separately.";

const MECHANISM_HEAD = ["Delivery mechanism", "What it covers", "Why it fits"];

export const DOCS_BY_USER: UserDocs[] = [
  {
    id: "researchers",
    title: "Researchers",
    needs:
      "How to sign in; the three ways to find information (Ask, Search, Browse); how to read an answer, including its citations and confidence indicator; that Nora gives **guidance, not official determinations**; when and how to contact the compliance office; and how to save items and give feedback.",
    table: {
      head: MECHANISM_HEAD,
      rows: [
        [
          "**On-screen text**",
          "Short labels and one-line descriptions on Ask, Search, and Browse; a permanent notice that answers are guidance, not official determinations",
          "Researchers learn the system while using it, and the guidance notice must be seen every time, not hidden in a manual",
        ],
        [
          "**Tooltips and mouseovers**",
          "The confidence indicator, citation links, the save button, and helpful/not-helpful feedback",
          "Explains each unfamiliar element at the moment the user sees it, without cluttering the screen",
        ],
        [
          "**Example prompts and empty states**",
          "Sample questions in the Ask box (for example, \"Do I need IRB approval to use an existing dataset?\"); hints when a search returns nothing",
          "Shows new users what a good question looks like and keeps them from getting stuck",
        ],
        [
          "**Referral messages**",
          "When Nora can't answer confidently, it says so and names the right office with contact information",
          "Tells users exactly what to do next instead of leaving them at a dead end",
        ],
        [
          "**FAQs page**",
          "Common research-policy questions, plus common questions about using Nora",
          "Quick answers that need no search; FAQs are already a core feature",
        ],
        [
          "**Help & Support page**",
          "A short \"Getting Started\" guide with screenshots, linked from the main navigation",
          "One place to go for anyone who wants a walkthrough",
        ],
        [
          "**First-login welcome** (if time permits)",
          "A brief intro to the three entry points the first time a user signs in",
          "Orients new users in seconds",
        ],
        [
          "**Video: Researcher Tour**",
          "Sign in, Ask, Search, Browse, read citations, save items, give feedback",
          "Lets the client show and train new researchers without our team",
        ],
      ],
    },
  },
  {
    id: "content-admins",
    title: "Content Administrators",
    needs:
      "How to sign in as an admin; how to add, edit, and retire policies and documents; how to set the authoritative flag; how to manage FAQs and topics; how to read each dashboard metric; how to review unanswered questions and feedback; and how to export analytics.",
    table: {
      head: MECHANISM_HEAD,
      rows: [
        [
          "**Administrator User Guide** (web page on the project site, also available as a PDF)",
          "Step-by-step instructions with screenshots for each admin task, organized by task (\"How do I add a new policy?\")",
          "Admins do these tasks occasionally and need a reliable reference they can follow without a developer",
        ],
        [
          "**Dashboard tooltips**",
          "Definitions for each metric tile and chart (Questions, Answers Delivered vs. Referred, Low-Confidence Answers, Active Users, Feedback, Top Topics)",
          "Makes the analytics understandable at a glance and prevents misreading the numbers",
        ],
        [
          "**Confirmation dialogs**",
          "Plain-language warnings before any overwrite or delete",
          "Prevents mistakes, and the dialog explains the consequence before it happens",
        ],
        [
          "**Form hints**",
          "Inline guidance on content forms (for example, what \"authoritative\" means and how citations are used)",
          "Answers questions at the point of data entry",
        ],
        [
          "**Video: Managing Content**",
          "Adding and updating policies, the authoritative flag, FAQs, and topics",
          "Gives a visual walkthrough for staff who prefer to watch rather than read",
        ],
        [
          "**Video: Analytics Dashboard**",
          "Reading the dashboard, reviewing unanswered questions and feedback, exporting data",
          "Shows how to turn the dashboard into action",
        ],
      ],
    },
  },
  {
    id: "system-admins",
    title: "System Administrators",
    needs:
      "Everything required to deploy Nora from scratch, redeploy or restart it, and keep it running.",
    table: {
      head: MECHANISM_HEAD,
      rows: [
        [
          "**README** (in the GitHub repository)",
          "Project overview, architecture summary, quick start for local development",
          "The first place a technical maintainer looks",
        ],
        [
          "**Deployment & Operations Guide** (project site and repository `docs/` folder)",
          "See the outline below",
          "A complete, ordered reference for deploying and maintaining the system",
        ],
        [
          "**Technical docs in `docs/`**",
          "Database schema, authentication, the RAG pipeline, API endpoints, and design decisions",
          "Lets a new maintainer understand why the system works the way it does",
        ],
        [
          "**Video: Deploying and Redeploying Nora**",
          "Setting up environment variables, deploying, restarting, and loading or re-indexing policy content",
          "Shortens setup time for someone seeing the system for the first time",
        ],
      ],
    },
    outline: {
      title: "Deployment & Operations Guide outline",
      items: [
        "System architecture overview (React frontend, FastAPI backend, PostgreSQL/Supabase, Claude API, embedding API)",
        "Software dependencies and versions",
        "Accounts and keys required (Supabase, Claude API, embedding API) and how to obtain them",
        "Environment variables and configuration",
        "Step-by-step deployment to a new environment (target: UNC Carolina CloudApps)",
        "Redeploying, restarting, or refreshing the system",
        "Loading policy content and re-indexing (embedding) after changes",
        "Setting up user accounts and roles (the current mock login, and notes for future Onyen SSO integration)",
        "Tested browsers and devices, expected compatibility, and known incompatibilities",
        "Troubleshooting and common errors",
        "Ongoing costs and maintenance (for example, API usage and key rotation)",
      ],
    },
  },
];

export const VIDEO_INTRO =
  "We will record a set of short videos (about 3–7 minutes each) rather than one long one, so the client can find and reshare the one they need:";

export const VIDEOS = [
  "**Researcher Tour:** using Nora as a researcher",
  "**Managing Content:** policies, the authoritative flag, FAQs, and topics",
  "**Analytics Dashboard:** reading and exporting analytics",
  "**Deploying and Redeploying Nora:** setup for a system administrator",
];

export const VIDEO_NOTE =
  "The videos will be recorded with Zoom (camera plus screen share), hosted permanently, **linked from the project website**, and **emailed to the client at handoff**.";

export const LOCATIONS: Table = {
  head: ["Location", "Contents"],
  rows: [
    [
      "**Inside the Nora application**",
      "On-screen text, tooltips, example prompts, referral messages, confirmation dialogs, FAQs page, Help & Support page",
    ],
    [
      "**Project website**",
      "Getting Started guide, Administrator User Guide, Deployment & Operations Guide, video links",
    ],
    [
      "**GitHub repository**",
      "README and the `docs/` folder (technical documentation)",
    ],
    ["**Handoff email to client**", "Links to all videos and guides"],
  ],
};

export const SCHEDULE: Table = {
  head: ["Item", "When", "Owner"],
  rows: [
    [
      "In-app help (on-screen text, tooltips, FAQs, Help page)",
      "Built alongside each feature",
      "Frontend team",
    ],
    [
      "Researcher Getting Started guide and video",
      "After the researcher UI is stable",
      "TBD",
    ],
    [
      "Administrator User Guide and videos",
      "After the admin portal is complete (end of November)",
      "TBD",
    ],
    [
      "README and Deployment & Operations Guide",
      "Updated throughout; finalized after deployment",
      "TBD",
    ],
    [
      "Final review and client handoff",
      "With the final code deliverable",
      "Whole team",
    ],
  ],
};
