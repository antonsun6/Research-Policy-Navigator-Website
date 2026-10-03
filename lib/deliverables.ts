export type DeliverableStatus = "Delivered" | "In Progress" | "Planned";

export const STATUS_STYLES: Record<DeliverableStatus, string> = {
  Delivered: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  "In Progress": "bg-amber-100 text-amber-700",
  Planned: "bg-slate-100 text-slate-500",
};

export type Deliverable = {
  id: string;
  title: string;
  status: DeliverableStatus;
  href: string;
  summary: string;
};

// The five formal COMP 523 deliverables, in order. Update a status to
// "Delivered" when it's submitted; the home page's "Next milestone" and
// "Deliverables shipped" stats follow automatically.
export const DELIVERABLES: Deliverable[] = [
  {
    id: "D1",
    title: "Specifications",
    status: "Delivered",
    href: "/deliverables/product-specification",
    summary:
      "User stories, functional and non-functional requirements, and interfaces for Nora.",
  },
  {
    id: "D2",
    title: "Design Document",
    status: "Planned",
    href: "/deliverables/design-document",
    summary:
      "A guide for future developers: architecture diagram, code repository and module structure, data definitions, and the reasoning behind our design decisions.",
  },
  {
    id: "D3",
    title: "Test Plan",
    status: "Planned",
    href: "/deliverables/test-plan",
    summary:
      "What we would test with unlimited time and exactly what we will test: automated unit tests, integration and system tests, acceptance testing, environments, and who tests when.",
  },
  {
    id: "D4",
    title: "User Manual",
    status: "Planned",
    href: "/deliverables/user-manual",
    summary:
      "Our documentation plan, plus guides for researchers using Nora and administrators deploying and managing it, with how-to videos for our client.",
  },
  {
    id: "D5",
    title: "Code",
    status: "Planned",
    href: "/deliverables/code",
    summary:
      "Nora's source code on GitHub, consistently styled and documented, with a README explaining how to install and run it.",
  },
];

// Smaller course milestones along the way. Some live on their own page under
// Deliverables; others point to the part of the site that fulfills them.
export const MILESTONES: Deliverable[] = [
  {
    id: "M1",
    title: "Project Web Site",
    status: "Delivered",
    href: "/",
    summary:
      "This site: our team, schedule, meeting notes, and every deliverable in one place.",
  },
  {
    id: "M2",
    title: "Team Rules & Coding Practices",
    status: "Delivered",
    href: "/rules",
    summary:
      "How we communicate, meet, and share work, plus our style guides and review rules.",
  },
  {
    id: "M3",
    title: "Project Concept",
    status: "Delivered",
    href: "/",
    summary:
      "What Nora is and the problem it solves for UNC researchers, on our overview page.",
  },
  {
    id: "M4",
    title: "User Stories",
    status: "Delivered",
    href: "/deliverables/product-specification#user-stories",
    summary:
      "What researchers and administrators need to do with Nora, from our specification.",
  },
  {
    id: "M5",
    title: "System Metaphor",
    status: "Planned",
    href: "/deliverables/system-metaphor",
    summary: "A shared mental model of how Nora works, for the team and our client.",
  },
  {
    id: "M6",
    title: "Platform Selection",
    status: "In Progress",
    href: "/deliverables/platform-selection",
    summary:
      "The alternatives we evaluated for each part of Nora's stack, and what we chose and why.",
  },
  {
    id: "M7",
    title: "Architecture Diagram",
    status: "In Progress",
    href: "/deliverables/architecture-diagram",
    summary: "How Nora's frontend, backend, database, and external services fit together.",
  },
  {
    id: "M8",
    title: "Client Handoff Plan",
    status: "Planned",
    href: "/deliverables/client-handoff-plan",
    summary:
      "How Nora's code, hosting, and accounts pass to UNC Research at the end of the semester.",
  },
];

export function findDeliverable(id: string): Deliverable {
  const item = [...DELIVERABLES, ...MILESTONES].find((d) => d.id === id);
  if (!item) throw new Error(`Unknown deliverable: ${id}`);
  return item;
}

export const NEXT_DELIVERABLE = DELIVERABLES.find(
  (d) => d.status !== "Delivered",
);

export const DELIVERED_COUNT = DELIVERABLES.filter(
  (d) => d.status === "Delivered",
).length;
