import CopyButton from "@/components/CopyButton";

type Person = {
  name: string;
  role?: string;
  email: string;
};

// Add each person's role once it's decided, e.g. role: "Team Lead".
const TEAM: Person[] = [
  { name: "Anton Sun", email: "asun21@unc.edu" },
  { name: "Jerry Wen", email: "jhwen@unc.edu" },
  { name: "Andy Huoy", email: "anhuo@unc.edu" },
  { name: "Adithi Srikrishna", email: "asrik@unc.edu" },
];

const CLIENT: Person[] = [
  {
    name: "Jeanne Lovmo",
    role: "Director of Policy, Governance, and Process, UNC Research",
    email: "lovmo@unc.edu",
  },
];

const COACH: Person[] = [
  { name: "Vinir Rai", email: "vinirrai@unc.edu" },
];

const TEAM_EMAILS = TEAM.map((person) => person.email).join(", ");

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="w-full rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm sm:w-72">
      <p className="font-semibold">{person.name}</p>
      {person.role && (
        <p className="text-sm text-[var(--foreground)]/60">{person.role}</p>
      )}
      <a
        href={`mailto:${person.email}`}
        className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline"
      >
        {person.email}
      </a>
    </div>
  );
}

function Roster({
  title,
  people,
  children,
}: {
  title: string;
  people: Person[];
  children?: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {people.map((person) => (
          <PersonCard key={person.email} person={person} />
        ))}
      </div>
      {children}
    </section>
  );
}

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          Team & Contacts
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Who&apos;s involved
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-[var(--foreground)]/70">
          Project team, client contact, and coach/advisor info. Update the
          roster arrays in{" "}
          <code className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-sm">
            app/team/page.tsx
          </code>{" "}
          as the team is finalized.
        </p>
      </section>

      <Roster title="Our Team" people={TEAM}>
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="select-all rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 text-sm">
            {TEAM_EMAILS}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={`mailto:${TEAM.map((person) => person.email).join(",")}`}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Email the whole team
            </a>
            <CopyButton text={TEAM_EMAILS} label="Copy all emails" />
          </div>
        </div>
      </Roster>
      <Roster title="Client" people={CLIENT} />
      <Roster title="Coach / Advisor" people={COACH} />
    </div>
  );
}
