import CopyButton from "@/components/CopyButton";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";

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

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex w-full flex-col items-center rounded-2xl border border-[var(--border)] bg-white p-6 sm:w-60">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--carolina-soft)] text-sm font-semibold text-[var(--navy)]">
        {initials(person.name)}
      </span>
      <p className="mt-3 font-semibold text-[var(--navy)]">{person.name}</p>
      {person.role && (
        <p className="mt-0.5 text-sm text-[var(--foreground)]/60">{person.role}</p>
      )}
      <a
        href={`mailto:${person.email}`}
        className="mt-2 text-sm text-[var(--carolina-ink)] hover:underline"
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
    <section className="flex flex-col gap-6">
      <SectionHeading>{title}</SectionHeading>
      <div className="flex flex-wrap justify-center gap-4">
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
    <div className="flex flex-col gap-16">
      <PageHeader eyebrow="Team & Contacts" title="Who's involved">
        Our development team, our client at UNC Research, and our course coach.
      </PageHeader>

      <Roster title="Our Team" people={TEAM}>
        <div className="flex flex-col items-center gap-3">
          <p className="select-all rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 font-mono text-xs text-[var(--foreground)]/70">
            {TEAM_EMAILS}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={`mailto:${TEAM.map((person) => person.email).join(",")}`}
              className="rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
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
