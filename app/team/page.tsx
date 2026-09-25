type Person = {
  name: string;
  role: string;
  email: string;
};

const TEAM: Person[] = [
  { name: "Your Name", role: "Team Lead", email: "you@example.com" },
];

const CLIENT: Person[] = [
  { name: "Client Name", role: "Primary Contact", email: "client@example.com" },
];

const COACH: Person[] = [
  { name: "Coach Name", role: "Faculty Coach / Advisor", email: "coach@example.com" },
];

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
      <p className="font-semibold">{person.name}</p>
      <p className="text-sm text-[var(--foreground)]/60">{person.role}</p>
      <a
        href={`mailto:${person.email}`}
        className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline"
      >
        {person.email}
      </a>
    </div>
  );
}

function Roster({ title, people }: { title: string; people: Person[] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <PersonCard key={person.email} person={person} />
        ))}
      </div>
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
        <p className="mt-4 max-w-2xl text-[var(--foreground)]/70">
          Project team, client contact, and coach/advisor info. Update the
          roster arrays in{" "}
          <code className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-sm">
            app/team/page.tsx
          </code>{" "}
          as the team is finalized.
        </p>
      </section>

      <Roster title="Our Team" people={TEAM} />
      <Roster title="Client" people={CLIENT} />
      <Roster title="Coach / Advisor" people={COACH} />
    </div>
  );
}
