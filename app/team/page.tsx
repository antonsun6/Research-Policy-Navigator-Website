import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import CopyButton from "@/components/CopyButton";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";

type Person = {
  name: string;
  role?: string;
  email: string;
  // File name (without extension) of a photo in public/assets/team/.
  photo?: string;
};

// Add each person's role once it's decided, e.g. role: "Team Lead".
const TEAM: Person[] = [
  { name: "Anton Sun", email: "asun21@unc.edu", photo: "anton-sun" },
  { name: "Jerry Wen", email: "jhwen@unc.edu", photo: "jerry-wen" },
  { name: "Andy Huoy", email: "anhuo@unc.edu", photo: "andy-huoy" },
  {
    name: "Adithi Srikrishna",
    email: "asrik@unc.edu",
    photo: "adithi-srikrishna",
  },
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

const PHOTO_DIR = path.join(process.cwd(), "public", "assets", "team");
const PHOTO_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

// Returns the public URL of a person's photo, or null if it hasn't been added yet.
function findPhoto(name: string): string | null {
  for (const ext of PHOTO_EXTENSIONS) {
    if (fs.existsSync(path.join(PHOTO_DIR, name + ext))) {
      return `/assets/team/${name}${ext}`;
    }
  }
  return null;
}

function Avatar({ person, photo }: { person: Person; photo: string }) {
  const src = findPhoto(photo);
  return (
    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-[var(--carolina-soft)] ring-1 ring-[var(--border)]">
      {src ? (
        <Image
          src={src}
          alt={`Photo of ${person.name}`}
          fill
          sizes="128px"
          className="object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          aria-label={`Photo of ${person.name} coming soon`}
          className="absolute inset-x-0 bottom-0 mx-auto h-24 w-24 text-[var(--navy)]/20"
          fill="currentColor"
        >
          <circle cx="12" cy="8" r="4.5" />
          <path d="M3 24c0-5 4-8.5 9-8.5s9 3.5 9 8.5z" />
        </svg>
      )}
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex w-full flex-col items-center rounded-2xl card-surface p-6 sm:w-60">
      {person.photo && (
        <div className="mb-4">
          <Avatar person={person} photo={person.photo} />
        </div>
      )}
      <p className="font-semibold text-[var(--navy)]">{person.name}</p>
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
