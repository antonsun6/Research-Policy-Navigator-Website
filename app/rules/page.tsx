import PageHeader from "@/components/PageHeader";

type Rule = {
  title?: string;
  text: string;
  links?: { label: string; url: string }[];
};

type RuleGroup = {
  title?: string;
  rules: Rule[];
};

type RuleSection = {
  id: string;
  title: string;
  groups: RuleGroup[];
};

const SECTIONS: RuleSection[] = [
  {
    id: "team-behavior",
    title: "Team Behavior",
    groups: [
      {
        rules: [
          {
            title: "Communication",
            text: "We use our iMessage group chat for day-to-day communication, since it's the fastest way to reach everyone.",
          },
          {
            title: "Lateness and absences",
            text: "If you'll be more than 5–10 minutes late or will miss a meeting, message the team as soon as you know, not after the fact. If you miss a meeting, ask the team to fill you in on what you missed.",
          },
          {
            title: "Email responses",
            text: "Respond to emails as soon as possible, prioritizing by urgency. Emails from our coach, client, or professor always get a response; leaving them unanswered is not acceptable.",
          },
          {
            title: "Backups and slippage",
            text: "Each major component has a designated backup who has enough context to take over if the primary owner is stuck or unavailable. Backups are assigned at sprint planning, not after something breaks.",
          },
        ],
      },
    ],
  },
  {
    id: "coding-practices",
    title: "Coding Practices",
    groups: [
      {
        title: "Style standards",
        rules: [
          {
            text: "Python backend (FastAPI) follows PEP 8.",
            links: [
              { label: "PEP 8", url: "https://peps.python.org/pep-0008/" },
            ],
          },
          {
            text: "React/TypeScript frontend follows the Airbnb JavaScript Style Guide.",
            links: [
              {
                label: "Airbnb style guide",
                url: "https://github.com/airbnb/javascript",
              },
            ],
          },
          {
            text: "Formatting and linting are automated, not left to manual review: Black and Ruff (or flake8) for Python, Prettier and ESLint for JS/TS, enforced by a pre-commit hook or CI check.",
          },
          {
            text: "Both style guides are linked in the project repository's README.",
          },
        ],
      },
      {
        title: "Check-in / check-out",
        rules: [
          {
            text: "Keep branches short-lived: merge each feature/* branch into dev within 2–3 days of creating it. Split bigger features into smaller PRs.",
          },
          {
            text: "Before opening a PR, code must run locally, pass linting, and include or update tests for new logic — especially retrieval and AI-response logic, where breakage is most likely to go unnoticed.",
          },
          {
            text: "Before merging dev → qa, the full test suite passes with no known failures.",
          },
          {
            text: "Before merging qa → main, run a manual smoke test of the core flow (ask a question → get a sourced answer) in addition to the automated tests.",
          },
        ],
      },
      {
        title: "Testing",
        rules: [
          {
            text: "Unit tests are required for backend logic: parsing, retrieval, and access control.",
          },
          {
            text: "100% coverage isn't required, but critical paths — authentication, role-based access, and source citation — never merge untested.",
          },
        ],
      },
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader eyebrow="Team Rules" title="How we work together">
        The informal agreement our team follows for team behavior and coding
        practices.
      </PageHeader>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--border)] bg-white text-left"
        >
          <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
              {section.title}
            </h2>
          </header>

          <div className="flex flex-col gap-8 px-6 py-6 sm:px-8">
            {section.groups.map((group, i) => (
              <div key={group.title ?? i}>
                {group.title && (
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--carolina)]" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--navy)]">
                      {group.title}
                    </h3>
                    <span className="h-px flex-1 bg-[var(--border)]" />
                  </div>
                )}

                <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-[var(--carolina)]">
                  {group.rules.map((rule) => (
                    <li key={rule.text} className="pl-1 text-sm leading-relaxed">
                      {rule.title && (
                        <span className="font-semibold text-[var(--navy)]">
                          {rule.title}.{" "}
                        </span>
                      )}
                      <span className="text-[var(--foreground)]/75">{rule.text}</span>
                      {rule.links?.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1.5 font-medium text-[var(--carolina-ink)] hover:underline"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
