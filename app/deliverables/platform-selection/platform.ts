// Platform selection content: the alternatives we studied for each part of
// Nora's stack, their trade-offs, and what we picked and why. When a
// "Proposed" or "Open" decision is settled, update its status and rationale.

export type DecisionStatus = "Selected" | "Proposed" | "Open";

export type Reference = { label: string; url: string };

export type PlatformOption = {
  name: string;
  url: string;
  pros: string[];
  cons: string[];
  chosen?: boolean;
};

export type PlatformComponent = {
  id: string;
  title: string;
  question: string;
  status: DecisionStatus;
  // Set when a client or UNC requirement dictated or narrowed the choice.
  constraint?: string;
  options: PlatformOption[];
  rationale: string;
};

export type Constraint = {
  title: string;
  text: string;
  source: string;
};

export const CONSTRAINTS: Constraint[] = [
  {
    title: "Deploy on UNC infrastructure",
    text: "Nora should run on Carolina CloudApps, UNC's OpenShift-based container platform, so it lives on after the semester under UNC ownership rather than on a student or commercial account.",
    source: "Coach meeting, Sep 24",
  },
  {
    title: "Sign in with Onyen",
    text: "Researchers and admins log in with their UNC Onyen. Production SSO (Shibboleth) needs UNC ITS access, so the semester build uses a mock login that models the Onyen flow.",
    source: "Client kickoff, Sep 15; spec F1–F3",
  },
  {
    title: "Curated, approved data only",
    text: "Answers must be grounded in fewer than 200 curated documents from the UNC Policy Knowledge Base, with citations. No confidential records and no live link to IRB, COI, or other enterprise systems.",
    source: "Client kickoff, Sep 15; spec NF5",
  },
  {
    title: "AI providers need UNC approval",
    text: "Researchers' questions may include Onyens and research details, so the LLM and embedding providers, and where telemetry is stored, must be acceptable to UNC. These are still open questions with the client.",
    source: "Open question with client",
  },
  {
    title: "Simple UNC-branded UI",
    text: "Keep UNC colors and a simple design, using UNC Research's official branding. Analytics must be downloadable.",
    source: "Client meeting, Sep 29",
  },
];

export const COMPONENTS: PlatformComponent[] = [
  {
    id: "architecture",
    title: "Application Architecture",
    question:
      "Is Nora a client-server web app, a single full-stack app, or something else?",
    status: "Selected",
    options: [
      {
        name: "Separate SPA + API server",
        url: "https://vite.dev/guide/backend-integration",
        chosen: true,
        pros: [
          "Frontend and backend can each use the best language for the job (TypeScript for UI, Python for AI)",
          "Clean JSON API boundary (spec I7) that is easy to test and document",
          "Each half ships as its own container, which suits OpenShift",
        ],
        cons: [
          "Two codebases and two build pipelines",
          "Needs a proxy so the browser talks to one origin",
        ],
      },
      {
        name: "Full-stack JS framework (Next.js)",
        url: "https://nextjs.org",
        pros: [
          "One codebase and one deploy; server and client code side by side",
          "We already use it for this team website",
        ],
        cons: [
          "Pushes the backend into JavaScript, away from Python's RAG and data tooling",
          "Best experience is on Vercel; self-hosting a Node server on OpenShift is more work",
        ],
      },
      {
        name: "Server-rendered monolith (Django templates)",
        url: "https://www.djangoproject.com",
        pros: [
          "Python end to end, with built-in admin and auth",
          "No separate frontend build",
        ],
        cons: [
          "Interactive pieces (chat-style Ask flow, live dashboard charts) are awkward without a JS framework",
          "Template UI is harder to make feel modern",
        ],
      },
    ],
    rationale:
      "A browser-based React single-page app talks to a FastAPI server over JSON, and the server talks to PostgreSQL and the external AI APIs. The frontend only ever calls relative /api paths, forwarded by Vite in development and by nginx in production, so there is no CORS setup. This split lets us keep the AI work in Python while the UI uses mainstream React tooling. There is no specific hardware or OS target: Nora runs in any modern desktop or mobile browser (spec NF1).",
  },
  {
    id: "languages",
    title: "Programming Languages",
    question: "Which languages do we write the frontend and backend in?",
    status: "Selected",
    options: [
      {
        name: "TypeScript + Python",
        url: "https://www.typescriptlang.org",
        chosen: true,
        pros: [
          "TypeScript catches API-shape mistakes in the UI at compile time",
          "Python has the strongest ecosystem for embeddings, RAG, and LLM SDKs",
          "Both are taught and widely known, which helps handoff",
        ],
        cons: ["Two languages to lint, test, and maintain"],
      },
      {
        name: "TypeScript everywhere",
        url: "https://nodejs.org",
        pros: [
          "One language and shared types between client and server",
          "Every major LLM vendor ships a JS SDK",
        ],
        cons: [
          "Thinner ecosystem for document parsing, chunking, and evaluation than Python",
        ],
      },
      {
        name: "Java (Spring Boot) + TypeScript",
        url: "https://spring.io/projects/spring-boot",
        pros: ["Mature, enterprise-standard backend"],
        cons: [
          "Verbose and slower to iterate in for a one-semester project",
          "Weaker AI tooling than Python",
        ],
      },
    ],
    rationale:
      "Python 3.12 on the backend and TypeScript on the frontend. Most of Nora's hard problems (chunking policy documents, embeddings, retrieval, prompting) are in the backend, and Python is where that tooling is best. The team is comfortable in both.",
  },
  {
    id: "frontend",
    title: "Frontend Framework",
    question: "What do we build the researcher and admin UI with?",
    status: "Selected",
    options: [
      {
        name: "React",
        url: "https://react.dev",
        chosen: true,
        pros: [
          "Largest ecosystem: charting, tables, and component libraries for the admin dashboard",
          "Most of the team has used it",
          "Easiest framework for a future UNC developer to pick up",
        ],
        cons: [
          "Only a view library; routing and data fetching are separate choices",
        ],
      },
      {
        name: "Vue.js",
        url: "https://vuejs.org",
        pros: [
          "Gentle learning curve and clear single-file components",
          "Official router and state library",
        ],
        cons: [
          "Smaller ecosystem and less team experience",
        ],
      },
      {
        name: "Angular",
        url: "https://angular.dev",
        pros: [
          "Batteries included: routing, forms, HTTP, and DI out of the box",
        ],
        cons: [
          "Heavy and opinionated for a small app",
          "Steepest learning curve, and no one on the team knows it",
        ],
      },
      {
        name: "Svelte / SvelteKit",
        url: "https://svelte.dev",
        pros: ["Small bundles and very little boilerplate"],
        cons: [
          "Smallest ecosystem and hiring pool of the four, which hurts handoff",
        ],
      },
    ],
    rationale:
      "React 19 with TypeScript. The deciding factors were team experience, the size of its ecosystem for the admin dashboard, and how easy it will be for whoever maintains Nora at UNC to find help.",
  },
  {
    id: "build-tool",
    title: "Frontend Build Tool",
    question: "How do we bundle and serve the React app?",
    status: "Selected",
    options: [
      {
        name: "Vite",
        url: "https://vite.dev",
        chosen: true,
        pros: [
          "Near-instant dev server and hot reload",
          "Builds plain static files that nginx can serve on OpenShift",
          "Built-in dev proxy for /api",
        ],
        cons: ["No server-side rendering out of the box (Nora doesn't need it)"],
      },
      {
        name: "Next.js",
        url: "https://nextjs.org",
        pros: ["Routing, SSR, and API routes included"],
        cons: [
          "Needs a Node server in production; overlaps with FastAPI",
        ],
      },
      {
        name: "Create React App",
        url: "https://react.dev/blog/2025/02/14/sunsetting-create-react-app",
        pros: ["Familiar from older tutorials"],
        cons: ["Deprecated by the React team in 2025"],
      },
    ],
    rationale:
      "Vite. Nora sits behind a login, so it gains nothing from server rendering or SEO, and a static build served by nginx is the simplest thing to run on CloudApps.",
  },
  {
    id: "backend",
    title: "Backend Framework",
    question: "What serves the REST API and runs the RAG pipeline?",
    status: "Selected",
    options: [
      {
        name: "FastAPI",
        url: "https://fastapi.tiangolo.com",
        chosen: true,
        pros: [
          "Async, which suits waiting on LLM and embedding API calls",
          "Request and response validation from Pydantic types",
          "Generates interactive OpenAPI docs automatically (/api/docs)",
        ],
        cons: [
          "No built-in admin panel or auth; we pick those pieces ourselves",
        ],
      },
      {
        name: "Django + Django REST Framework",
        url: "https://www.django-rest-framework.org",
        pros: [
          "Built-in ORM, migrations, auth, and admin site",
        ],
        cons: [
          "Heavier, and its sync-first design fits slow AI calls less well",
          "Its admin site wouldn't match the client's dashboard design anyway",
        ],
      },
      {
        name: "Flask",
        url: "https://flask.palletsprojects.com",
        pros: ["Minimal and easy to learn"],
        cons: [
          "No built-in validation or API docs; more glue code to write",
        ],
      },
      {
        name: "Node.js + Express",
        url: "https://expressjs.com",
        pros: ["Same language as the frontend"],
        cons: ["Moves the AI pipeline out of Python"],
      },
    ],
    rationale:
      "FastAPI, with SQLAlchemy 2.0 as the ORM and Alembic for schema migrations. FastAPI gives us typed endpoints and free API docs with very little code, and async handlers keep the server responsive while it waits on the LLM.",
  },
  {
    id: "database",
    title: "Database & Vector Search",
    question:
      "Where do we store policies, users, questions, and feedback, and how do we search policy text by meaning?",
    status: "Selected",
    constraint:
      "Data must stay where UNC approves; whether telemetry can live off UNC infrastructure is still an open question.",
    options: [
      {
        name: "PostgreSQL + pgvector",
        url: "https://github.com/pgvector/pgvector",
        chosen: true,
        pros: [
          "One database for relational data and vector embeddings",
          "Runs anywhere Postgres runs, including in a CloudApps container",
          "At under 200 documents, pgvector is more than fast enough",
        ],
        cons: [
          "Fewer vector-specific features than a dedicated vector DB",
        ],
      },
      {
        name: "Postgres + a dedicated vector DB (Pinecone, Qdrant, Chroma)",
        url: "https://qdrant.tech",
        pros: [
          "Purpose-built similarity search, filtering, and scaling",
        ],
        cons: [
          "A second datastore to run, secure, and keep in sync",
          "Pinecone is a hosted service, which raises the same data-location question",
        ],
      },
      {
        name: "MongoDB Atlas + Vector Search",
        url: "https://www.mongodb.com/products/platform/atlas-vector-search",
        pros: ["Flexible document model with vector search built in"],
        cons: [
          "Vector search is an Atlas cloud feature, so data leaves UNC",
          "Our data (users, roles, questions, feedback) is relational",
        ],
      },
      {
        name: "Supabase (hosted Postgres)",
        url: "https://supabase.com",
        pros: ["Hosted Postgres with pgvector, auth, and a dashboard"],
        cons: [
          "Hosted outside UNC, pending client approval",
          "Its auth and SDK would tie us to the vendor",
        ],
      },
    ],
    rationale:
      "PostgreSQL 17 with the pgvector extension, enabled by our first Alembic migration. Our corpus is small, and keeping embeddings next to the policy rows they belong to removes a whole system. The app only depends on a DATABASE_URL, so it can point at a CloudApps Postgres or, if UNC allows it, a hosted Postgres like Supabase without code changes. We would use Supabase only as plain Postgres, never its auth or client SDK.",
  },
  {
    id: "llm",
    title: "LLM Provider",
    question:
      "Which model writes the plain-language, cited answer from the retrieved policy passages?",
    status: "Open",
    constraint:
      "Researchers' questions are sent to this provider, so the choice needs UNC approval.",
    options: [
      {
        name: "Anthropic Claude API",
        url: "https://www.anthropic.com/api",
        pros: [
          "Strong at following grounding instructions and citing sources",
          "Built-in citations support for document-grounded answers",
        ],
        cons: [
          "External commercial API; usage cost falls to the client after handoff",
          "Not yet approved for UNC data",
        ],
      },
      {
        name: "OpenAI API",
        url: "https://platform.openai.com/docs",
        pros: ["Widely used, with mature SDKs and docs"],
        cons: [
          "Same data and cost questions as any external API",
        ],
      },
      {
        name: "Azure OpenAI",
        url: "https://azure.microsoft.com/en-us/products/ai-services/openai-service",
        pros: [
          "Enterprise data terms; may fit an existing university Microsoft agreement",
        ],
        cons: [
          "Needs an Azure subscription and approval from UNC",
        ],
      },
      {
        name: "Self-hosted open model (e.g. Llama via Ollama)",
        url: "https://ollama.com",
        pros: ["Data never leaves UNC; no per-call fees"],
        cons: [
          "Needs GPU resources CloudApps may not offer",
          "Noticeably weaker answers and more for UNC to maintain",
        ],
      },
    ],
    rationale:
      "Not decided yet: this depends on which providers UNC approves, and we have asked the client. Until then all LLM calls go through one provider interface in the backend, so swapping providers is a configuration change and tests never call a real API. Claude is our working default for development (spec I8).",
  },
  {
    id: "embeddings",
    title: "Embedding Model",
    question:
      "What turns policy text and questions into vectors for retrieval and FAQ clustering?",
    status: "Open",
    constraint: "Same UNC data-approval question as the LLM provider.",
    options: [
      {
        name: "OpenAI text-embedding-3-small",
        url: "https://platform.openai.com/docs/guides/embeddings",
        pros: ["Cheap, good quality, simple API"],
        cons: ["External API; questions leave UNC"],
      },
      {
        name: "Voyage AI",
        url: "https://www.voyageai.com",
        pros: [
          "Strong retrieval quality; the embedding provider Anthropic recommends",
        ],
        cons: ["Another external vendor to get approved"],
      },
      {
        name: "Open-source (Sentence Transformers)",
        url: "https://sbert.net",
        pros: [
          "Runs on CPU inside our own backend container; data stays on UNC infrastructure",
          "No per-call cost",
        ],
        cons: [
          "Somewhat lower quality than the best hosted models",
          "Larger container image",
        ],
      },
    ],
    rationale:
      "Not decided yet, for the same reason as the LLM. Embeddings sit behind their own interface. If UNC won't approve sending questions to an external vendor, a local Sentence Transformers model is our fallback, since our corpus is small enough to embed on CPU.",
  },
  {
    id: "rag",
    title: "RAG Orchestration",
    question:
      "Do we use a framework to chunk, retrieve, and prompt, or write the pipeline ourselves?",
    status: "Proposed",
    options: [
      {
        name: "Hand-written pipeline",
        url: "https://www.anthropic.com/news/contextual-retrieval",
        chosen: true,
        pros: [
          "Small, readable code we fully understand and can test at 100% coverage",
          "Full control over the \"can't answer confidently, refer to an office\" rule",
          "No fast-moving framework for UNC to keep up with",
        ],
        cons: ["We write chunking, retrieval, and prompt assembly ourselves"],
      },
      {
        name: "LangChain",
        url: "https://www.langchain.com",
        pros: ["Huge library of integrations and examples"],
        cons: [
          "Layers of abstraction that make behavior harder to debug and test",
          "Frequent breaking changes",
        ],
      },
      {
        name: "LlamaIndex",
        url: "https://www.llamaindex.ai",
        pros: ["Focused on document indexing and retrieval"],
        cons: ["Same abstraction and churn concerns, to a lesser degree"],
      },
    ],
    rationale:
      "We plan to write the pipeline directly on SQLAlchemy and pgvector. With under 200 documents, the pipeline is a few hundred lines, and the behavior the client cares most about (citing sources, refusing to guess) has to be explicit and tested rather than hidden in a framework.",
  },
  {
    id: "charts",
    title: "Charting",
    question:
      "What draws the admin dashboard's line and donut charts (spec I4)?",
    status: "Proposed",
    options: [
      {
        name: "Recharts",
        url: "https://recharts.org",
        chosen: true,
        pros: [
          "React components, so charts are written like the rest of the UI",
          "Covers line, donut, and bar charts, which is all the dashboard needs",
        ],
        cons: ["Less flexible than D3 for unusual charts"],
      },
      {
        name: "Chart.js",
        url: "https://www.chartjs.org",
        pros: ["Popular, lightweight, canvas-based"],
        cons: ["Imperative API needs a React wrapper"],
      },
      {
        name: "Apache ECharts",
        url: "https://echarts.apache.org",
        pros: ["Very feature-rich, with built-in export to image"],
        cons: ["Large bundle; more than we need"],
      },
      {
        name: "D3.js",
        url: "https://d3js.org",
        pros: ["Total control over every visual"],
        cons: ["Far more code for standard charts"],
      },
    ],
    rationale:
      "Recharts, pending the dashboard build. Analytics downloads, which the client requires, will be CSV exports generated by the backend, so they don't depend on the chart library.",
  },
  {
    id: "auth",
    title: "Authentication",
    question: "How do users sign in, and how do we know who is an admin?",
    status: "Selected",
    constraint:
      "Must use UNC Onyen. Production SSO requires UNC ITS access (contact: David Cowig).",
    options: [
      {
        name: "Mock Onyen login, then UNC Shibboleth SSO",
        url: "https://www.shibboleth.net",
        chosen: true,
        pros: [
          "Matches the client's requirement and UNC's real login",
          "Mock login lets us build and demo without waiting on ITS",
        ],
        cons: [
          "The final SSO integration pattern on CloudApps is not confirmed",
        ],
      },
      {
        name: "Third-party auth (Auth0, Supabase Auth)",
        url: "https://auth0.com",
        pros: ["Quick to set up, with hosted login pages"],
        cons: [
          "Not Onyen; researchers would need a separate account",
        ],
      },
      {
        name: "Our own username and password",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
        pros: ["No external dependency"],
        cons: [
          "Storing passwords is a security liability, and it isn't Onyen",
        ],
      },
    ],
    rationale:
      "Dictated by the client. The semester build uses a mock login that models Onyen (spec F3), and production will use UNC Shibboleth SSO, likely a proxy in front of the app that passes identity in headers. Either way the backend reads the user's role from our own users and roles tables, and the login provider sits behind an interface so the swap doesn't touch the rest of the app. Per our coach, auth comes near the end of October.",
  },
  {
    id: "hosting",
    title: "Hosting & Deployment",
    question: "Where does Nora run in production, and who keeps it running after we leave?",
    status: "Selected",
    constraint:
      "Our coach directed us to deploy on Carolina CloudApps, UNC's deployment platform.",
    options: [
      {
        name: "Carolina CloudApps (OpenShift)",
        url: "https://www.redhat.com/en/technologies/cloud-computing/openshift",
        chosen: true,
        pros: [
          "Run by UNC, so Nora and its data stay on UNC infrastructure",
          "Lives on after the semester under UNC ownership, with no student-paid accounts",
          "Runs standard Docker images",
        ],
        cons: [
          "Containers must run as non-root with an arbitrary UID",
          "Less turnkey than a commercial PaaS; access goes through UNC",
        ],
      },
      {
        name: "Heroku",
        url: "https://www.heroku.com/pricing",
        pros: [
          "Easy git-push deploys with Postgres add-ons",
        ],
        cons: [
          "Free tier ended in November 2022, so the client would pay ongoing fees",
          "Data hosted outside UNC",
        ],
      },
      {
        name: "Vercel / Render / Railway",
        url: "https://render.com",
        pros: [
          "Fast setup with generous hobby tiers for demos (spec NF10)",
        ],
        cons: [
          "Hobby tiers aren't meant for production; paid plans after handoff",
          "Data hosted outside UNC",
        ],
      },
      {
        name: "AWS directly (ECS, RDS)",
        url: "https://aws.amazon.com",
        pros: ["Most control and scalability"],
        cons: [
          "Far more setup and ops work; needs a UNC-owned AWS account and billing",
        ],
      },
    ],
    rationale:
      "Carolina CloudApps. Our coach directed it, and it also answers the handoff question: Nora runs on UNC infrastructure, owned by UNC, with no commercial account for the client to pay for or take over. Our images are built for it (non-root, arbitrary UID, the frontend served by nginx-unprivileged on port 8080). Because everything is a standard container, Nora could still move to another host if needed.",
  },
  {
    id: "tooling",
    title: "Containers, CI & Dev Tooling",
    question: "How do we run the stack locally, and what checks every change?",
    status: "Selected",
    options: [
      {
        name: "Docker + Docker Compose, GitHub Actions",
        url: "https://docs.docker.com/compose/",
        chosen: true,
        pros: [
          "One command (docker compose up) runs Postgres, backend, and frontend identically on every laptop",
          "The same images we test are what CloudApps runs",
          "GitHub Actions is free for our repo and lives next to the code",
        ],
        cons: ["Docker adds some setup and memory overhead on laptops"],
      },
      {
        name: "Local installs only, no containers",
        url: "https://www.postgresql.org/download/",
        pros: ["No Docker to learn"],
        cons: [
          "\"Works on my machine\" problems across Mac and Windows",
          "Doesn't match how CloudApps runs the app",
        ],
      },
      {
        name: "Other CI (GitLab CI, CircleCI)",
        url: "https://circleci.com",
        pros: ["Capable, mature CI services"],
        cons: ["Our code is on GitHub; another service adds accounts and setup"],
      },
    ],
    rationale:
      "Docker images for the backend and frontend (with dev and prod targets), Docker Compose for local development, and GitHub Actions for CI. Every PR runs ruff and pytest (100% backend coverage required), oxlint and a type-checked frontend build, the database migrations, and the Docker builds. A second workflow enforces our feature → dev → qa → main branch flow.",
  },
];

export const STACK_SUMMARY: { layer: string; choice: string; status: DecisionStatus }[] = [
  { layer: "Architecture", choice: "React SPA + FastAPI REST API (web, browser-based)", status: "Selected" },
  { layer: "Languages", choice: "TypeScript, Python 3.12", status: "Selected" },
  { layer: "Frontend", choice: "React 19 + Vite", status: "Selected" },
  { layer: "Backend", choice: "FastAPI, SQLAlchemy 2.0, Alembic", status: "Selected" },
  { layer: "Database", choice: "PostgreSQL 17 + pgvector", status: "Selected" },
  { layer: "LLM", choice: "Behind an interface; Claude in development", status: "Open" },
  { layer: "Embeddings", choice: "Behind an interface; local model as fallback", status: "Open" },
  { layer: "RAG", choice: "Hand-written pipeline", status: "Proposed" },
  { layer: "Charts", choice: "Recharts", status: "Proposed" },
  { layer: "Auth", choice: "Mock Onyen login → UNC Shibboleth SSO", status: "Selected" },
  { layer: "Hosting", choice: "Carolina CloudApps (OpenShift)", status: "Selected" },
  { layer: "Tooling", choice: "Docker, Docker Compose, GitHub Actions", status: "Selected" },
];

export const REFERENCES: Reference[] = [
  { label: "COMP 523 deliverables", url: "https://www.cs.unc.edu/~stotts/COMP523-F26/deliverables.html" },
  { label: "Nora code repository (README and architecture)", url: "https://github.com/jerrywen2005/UNC-Research-Policy-Navigator" },
  { label: "Stack Overflow Developer Survey: technology", url: "https://survey.stackoverflow.co/2025/technology" },
  { label: "FastAPI: alternatives, inspiration and comparisons", url: "https://fastapi.tiangolo.com/alternatives/" },
  { label: "pgvector: open-source vector similarity search for Postgres", url: "https://github.com/pgvector/pgvector" },
  { label: "Anthropic: building effective agents (on keeping LLM systems simple)", url: "https://www.anthropic.com/engineering/building-effective-agents" },
  { label: "Anthropic: contextual retrieval", url: "https://www.anthropic.com/news/contextual-retrieval" },
  { label: "React: sunsetting Create React App", url: "https://react.dev/blog/2025/02/14/sunsetting-create-react-app" },
  { label: "Heroku: next chapter (end of free plans)", url: "https://blog.heroku.com/next-chapter" },
];
