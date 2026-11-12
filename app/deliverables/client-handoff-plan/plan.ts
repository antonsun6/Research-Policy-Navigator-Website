// Client Handoff Plan (M8) content. Strings may use inline Markdown (`code`,
// **bold**, [text](url)); relative URLs point at the Nora repo on GitHub.
// Facts come from the Nora repo's docs/deployment.md, docs/decisions.md and
// backend/app/config.py (dev branch, Nov 12, 2026). Update the status of each
// step and open issue as the handoff happens.

export type StepStatus = "Done" | "In Progress" | "Not Started" | "Waiting on Client";

// ---------------------------------------------------------------------------
// What Nora is, technically

export const SYSTEM_PARTS: { part: string; plain: string; tech: string }[] = [
  {
    part: "The website",
    plain: "The pages researchers and admins see in their browser.",
    tech: "A React app, served by a small nginx web server in its own container.",
  },
  {
    part: "The server",
    plain: "Handles sign-in, search, questions and admin changes, and talks to the database.",
    tech: "A Python (FastAPI) app in its own container. It also runs the AI models that find the right policy sections.",
  },
  {
    part: "The database",
    plain: "Stores the 197 policies, users, questions, feedback and usage statistics.",
    tech: "PostgreSQL 17 with the pgvector extension, on storage that survives restarts.",
  },
  {
    part: "Sign-in",
    plain: "Researchers and admins log in with their Onyen.",
    tech: "UNC single sign-on (Shibboleth). Until UNC grants access, Nora uses a demo login that can't be used in production.",
  },
  {
    part: "The answer writer (optional)",
    plain: "Writes a short answer from the policy sections Nora found. Without it, Nora still shows the matching sections.",
    tech: "Any OpenAI-compatible AI service, turned on with three settings once UNC approves a provider.",
  },
];

export const OWNERSHIP: { item: string; today: string; atHandoff: string }[] = [
  {
    item: "Source code",
    today: "A public GitHub repository owned by a team member's account (jerrywen2005).",
    atHandoff: "Transferred to a GitHub account or UNC organization that UNC Research controls.",
  },
  {
    item: "The running app",
    today: "Runs on our laptops with Docker. Nothing is publicly hosted yet.",
    atHandoff: "Runs in UNC Research's own Carolina CloudApps project, set up by your team.",
  },
  {
    item: "The database",
    today: "A copy on each of our laptops, filled with the Link's 197-policy inventory and demo users.",
    atHandoff: "A PostgreSQL database in your CloudApps project, with the policies loaded and no demo users.",
  },
  {
    item: "Admin access",
    today: "Demo accounts only (`admin1`).",
    atHandoff: "Your admins (Jeanne to start) sign in with their own Onyens and manage the content.",
  },
  {
    item: "Documentation and videos",
    today: "Project docs in the repository and on this website.",
    atHandoff: "This guide, the repository docs and the how-to videos, all linked from this website and emailed to you.",
  },
];

// ---------------------------------------------------------------------------
// Getting Nora running

export const NEEDS: string[] = [
  "**A Carolina CloudApps project** owned by UNC Research, and someone on your team who can manage it. Your team agreed to set this up (target: Mon, Nov 16).",
  "**A PostgreSQL 17 database with the pgvector extension** and persistent storage. It can be a managed database if ITS offers one, or a database container in the same project. A few gigabytes of storage is plenty for under 200 policies.",
  "**Room for three small services:** the website, the server and the database. The server needs the most memory, because it runs the AI models in memory. We'll record the exact CPU and memory used in our test deployment and add them here.",
  "**A web address (route)** for Nora, such as `nora.cloudapps.unc.edu` (example only). UNC single sign-on needs it to register the app.",
  "**UNC single sign-on (Shibboleth) registration** for that address, from UNC ITS. We've requested it; we'll do the code side.",
  "**Optional: an AI service** approved by UNC, if you want written answers rather than just the matching policy sections.",
];

export const CLOUDAPPS_STEPS: { title: string; who: string; detail: string }[] = [
  {
    title: "Take ownership of the code",
    who: "Us, with your team",
    detail: "We transfer the GitHub repository to the account or UNC organization you choose. You'll get an email from GitHub to accept it. Nothing needs to be installed for this.",
  },
  {
    title: "Build the two app containers",
    who: "Your CloudApps admin, with us",
    detail: "CloudApps builds the website image from `frontend/Dockerfile` (the `prod` stage) and the server image from `backend/Dockerfile`, straight from the GitHub repository. Both already follow CloudApps' rules: they run without administrator rights and under any user id.",
  },
  {
    title: "Create the database",
    who: "Your CloudApps admin",
    detail: "Create a PostgreSQL 17 database with the pgvector extension and persistent storage, and note its connection address and password.",
  },
  {
    title: "Enter the settings",
    who: "Your CloudApps admin, with us",
    detail: "Store these as secrets in the project: `DATABASE_URL` (the database address), `ENVIRONMENT=production`, `SESSION_SECRET` (a long random value; we'll show how to make one), `AUTH_PROVIDER` (UNC single sign-on) and `MODEL_CACHE_DIR` (a writable folder for the AI models). Add `LLM_PROVIDER`, `LLM_API_KEY` and `LLM_MODEL` only once an AI service is approved.",
  },
  {
    title: "Start the server and prepare the database",
    who: "Us, on a call with your team",
    detail: "Start the server, then run three one-time commands in it: `alembic upgrade head` (creates the tables), the policy loading step (loads the 197 policies and their tags, without the demo accounts), and `python -m app.rag` (prepares every policy for question answering, which takes a few minutes).",
  },
  {
    title: "Start the website and give it an address",
    who: "Your CloudApps admin",
    detail: "Start the website container with `BACKEND_URL` pointing at the server, then create a route so it has a web address. Only the website should be reachable from the internet, never the server directly.",
  },
  {
    title: "Turn on UNC sign-in",
    who: "Us and UNC ITS",
    detail: "Register the web address with UNC single sign-on, then switch `AUTH_PROVIDER` to it. Anyone with an Onyen can then sign in as a researcher.",
  },
  {
    title: "Make the first admins",
    who: "Us, with Jeanne",
    detail: "Jeanne and any other admins sign in once, then we give them the admin role. The in-app admin list (Users & Roles) is planned; until it's built, this is a one-line database change we'll do with you and write down.",
  },
  {
    title: "Check that everything works",
    who: "Everyone, at the handoff meeting",
    detail: "Open the web address, sign in, browse a topic, search, ask a question, save an item, and as an admin, open the dashboard and add a document. We'll use a written checklist so you can repeat it after any update.",
  },
];

export const LOCAL_STEPS: string[] = [
  "Install **Docker Desktop** on a Mac or Windows computer with at least 8 GB of memory and 10 GB of free disk space.",
  "On the GitHub page for the repository, click **Code → Download ZIP** and unzip it. (Developers can use `git clone` instead.)",
  "Open the Terminal (Mac) or PowerShell (Windows) in the unzipped folder and run `docker compose up --build`. The first run downloads everything and takes several minutes.",
  "Open **http://localhost:5173** in a browser and sign in with the demo accounts `researcher1` or `admin1`. Press Ctrl+C in the terminal to stop it.",
];

// ---------------------------------------------------------------------------
// Costs

export const COSTS: { item: string; cost: string; notes: string }[] = [
  {
    item: "Carolina CloudApps hosting",
    cost: "To confirm with ITS",
    notes: "Depends on UNC's CloudApps pricing for the CPU, memory and storage the project uses. We'll ask your team to confirm before the handoff.",
  },
  {
    item: "GitHub",
    cost: "Free",
    notes: "A free GitHub account or UNC's GitHub organization is enough to keep the code.",
  },
  {
    item: "Search models (find policy sections)",
    cost: "Free",
    notes: "The models that find policy sections run inside Nora's server; there's no per-use fee and no researcher data leaves UNC.",
  },
  {
    item: "Written answers (AI service)",
    cost: "Free while off; pay per use once on",
    notes: "Optional. Hosted AI services charge per question, usually a fraction of a cent to a few cents each, depending on the provider UNC approves. A free developer tier we used for testing isn't meant for production.",
  },
  {
    item: "UNC single sign-on",
    cost: "Free",
    notes: "A UNC ITS service.",
  },
  {
    item: "Maintenance",
    cost: "Staff or student time",
    notes: "Updating content is done by admins in the app. Code changes need a developer, such as a future COMP 523 team.",
  },
];

export const SCALING: string[] = [
  "**More policies:** the database and search grow comfortably to thousands of documents. Each new policy needs the one-time preparation step, which the admin pages will run automatically.",
  "**More researchers:** answering a question uses the server's CPU for a few seconds. If many people ask at once, CloudApps can give the server more CPU or run a second copy, which raises the hosting cost.",
  "**Written answers:** the AI service cost grows with the number of questions asked, so it's the cost to watch. The admin dashboard shows how many questions are asked each day.",
];

// ---------------------------------------------------------------------------
// Issues to settle with the client

export const ISSUES: { issue: string; status: StepStatus; note: string }[] = [
  {
    issue: "CloudApps project and database",
    status: "Waiting on Client",
    note: "Your team is setting up the CloudApps project (target: Mon, Nov 16). We need to know whether ITS offers PostgreSQL with pgvector or whether we run our own database container.",
  },
  {
    issue: "Where the code will live",
    status: "In Progress",
    note: "Agreed at our Nov 10 meeting to hand over GitHub early next week. We need the account or UNC organization to transfer it to.",
  },
  {
    issue: "UNC single sign-on",
    status: "In Progress",
    note: "Requested from ITS; a reply has come in. Production can't open to researchers without it, so this is the biggest risk (see the fallback below).",
  },
  {
    issue: "AI service approval",
    status: "Waiting on Client",
    note: "Which AI service, if any, UNC approves for written answers. Nora works without one.",
  },
  {
    issue: "Privacy and data retention",
    status: "Waiting on Client",
    note: "How long researchers' questions should be kept, and whether they should be anonymized after a period.",
  },
  {
    issue: "Who maintains Nora after December",
    status: "Not Started",
    note: "Who updates the code and keeps CloudApps running: UNC Research IT, a future COMP 523 team, or both. This decides who the videos and docs are mainly for.",
  },
  {
    issue: "Answer wording and test questions",
    status: "Waiting on Client",
    note: "The Link's final disclaimer wording, and sample questions to check Nora's answers before launch.",
  },
];

export const FALLBACK =
  "If UNC single sign-on isn't ready by the end of the semester, we'll deliver Nora in the same CloudApps project as a **pilot** (`ENVIRONMENT` set to something other than `production`) with the demo login and only public policies, so your team can still use and evaluate it. Switching it to UNC sign-on later is a settings change plus the sign-in step above, which we'll document step by step.";

// ---------------------------------------------------------------------------
// Execution timeline (Anton coordinates the handoff)

export const TIMELINE: { when: string; step: string; owner: string; status: StepStatus }[] = [
  { when: "Thu, Nov 12", step: "Draft this plan and review it with our coach", owner: "Anton", status: "In Progress" },
  { when: "Sun, Nov 15", step: "Finish the MVP and the formal submission", owner: "Everyone", status: "In Progress" },
  { when: "Mon, Nov 16", step: "Client's CloudApps project ready", owner: "Client's team", status: "Waiting on Client" },
  { when: "Week of Nov 16", step: "Transfer the GitHub repository to UNC Research", owner: "Jerry (repository owner) and Anton", status: "Not Started" },
  { when: "Thu, Nov 19", step: "Steering Group demo", owner: "Everyone", status: "Not Started" },
  { when: "Week of Nov 23", step: "Test deployment in the client's CloudApps project, with the production policy loading step", owner: "Andy (deployment) and Anton", status: "Not Started" },
  { when: "Week of Nov 23", step: "Record the how-to videos", owner: "Video owners below", status: "Not Started" },
  { when: "By Wed, Dec 2", step: "Handoff meeting: install, verify with the checklist, make the first admins, walk through the videos", owner: "Everyone, with Jeanne and her team", status: "Not Started" },
  { when: "After the meeting", step: "Email the client the links to this guide, the repository and the videos", owner: "Anton", status: "Not Started" },
];

// ---------------------------------------------------------------------------
// Videos (recorded at the end, on Zoom; linked here and emailed to the client)

export const VIDEOS: { title: string; audience: string; covers: string; owner: string }[] = [
  {
    title: "Using Nora as a researcher",
    audience: "Researchers, and the Link for training",
    covers: "Signing in; browsing topics and tags; searching; asking a question and reading the citations, confidence and referral; feedback; saved items; FAQs.",
    owner: "Adithi",
  },
  {
    title: "Managing Nora as an admin",
    audience: "Jeanne and other admins",
    covers: "Adding a policy by its Repository link, reviewing and publishing drafts, editing topics and tags, archiving, writing FAQs, and reading and exporting the dashboard.",
    owner: "Jerry",
  },
  {
    title: "Setting up Nora on Carolina CloudApps",
    audience: "The client's CloudApps admin",
    covers: "Every step in the setup section above, from building the containers to checking that it works, plus how to install an update later.",
    owner: "Andy",
  },
  {
    title: "Getting started as a developer",
    audience: "A future COMP 523 team or UNC developer",
    covers: "Running Nora on a laptop, where the code and docs are, how to make and test a change, and the design document.",
    owner: "Anton",
  },
];
