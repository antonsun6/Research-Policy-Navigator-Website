export type DeliverableStatus = "Delivered" | "In Progress" | "Planned";

export type Deliverable = {
  id: string;
  title: string;
  status: DeliverableStatus;
  href?: string;
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
      "User stories, functional and non-functional requirements, and interfaces for the Navigator.",
  },
  {
    id: "D2",
    title: "Design Document",
    status: "Planned",
    summary:
      "A guide for future developers: architecture diagram, code repository and module structure, data definitions, and the reasoning behind our design decisions.",
  },
  {
    id: "D3",
    title: "Test Plan",
    status: "Planned",
    summary:
      "What we would test with unlimited time and exactly what we will test: automated unit tests, integration and system tests, acceptance testing, environments, and who tests when.",
  },
  {
    id: "D4",
    title: "User Manual",
    status: "Planned",
    summary:
      "Our documentation plan, plus guides for researchers using the Navigator and administrators deploying and managing it, with how-to videos for our client.",
  },
  {
    id: "D5",
    title: "Code",
    status: "Planned",
    summary:
      "The Navigator's source code on GitHub, consistently styled and documented, with a README explaining how to install and run it.",
  },
];

export const NEXT_DELIVERABLE = DELIVERABLES.find(
  (d) => d.status !== "Delivered",
);

export const DELIVERED_COUNT = DELIVERABLES.filter(
  (d) => d.status === "Delivered",
).length;
