import { STATUS_STYLES, findDeliverable } from "@/lib/deliverables";
import { REPO } from "../design-document/content";
import { Inline } from "../design-document/Markdown";
import {
  CLOUDAPPS_STEPS,
  COSTS,
  FALLBACK,
  ISSUES,
  LOCAL_STEPS,
  NEEDS,
  OWNERSHIP,
  SCALING,
  SYSTEM_PARTS,
  TIMELINE,
  VIDEOS,
  type StepStatus,
} from "./plan";

const STEP_STYLES: Record<StepStatus, string> = {
  Done: "bg-[var(--carolina-soft)] text-[var(--carolina-ink)]",
  "In Progress": "bg-amber-100 text-amber-700",
  "Not Started": "bg-slate-100 text-slate-500",
  "Waiting on Client": "bg-violet-100 text-violet-700",
};

const RECEIVES: string[] = [
  "**Nora running in your own Carolina CloudApps project**, at its own web address, with the 197 policies loaded.",
  "**The code**, in a GitHub account or UNC organization you control.",
  "**This guide**, the developer documentation in the repository, and our [Design Document](/deliverables/design-document).",
  "**Four short how-to videos** for researchers, admins, your CloudApps admin and future developers.",
  "**A handoff meeting** where we install Nora with your team and check that everything works.",
];

const AFTER: string[] = [
  "**Updating content needs no developer.** Admins add, edit, publish and archive policies and FAQs in Nora's admin pages.",
  "**Installing an update** means rebuilding the two containers from GitHub and running `alembic upgrade head`. The setup video shows how.",
  "**Back up the database.** Ask your CloudApps admin to schedule regular backups. It's the only part of Nora that can't be rebuilt from GitHub.",
  "**Until the semester ends**, email us with any questions (contacts are on our [Team page](/team)).",
];

function Badge({ status }: { status: StepStatus }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${STEP_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function Section({
  n,
  title,
  intro,
  children,
}: {
  n: number;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="border-b-2 border-[var(--carolina)] pb-3">
        <h3 className="text-xl font-semibold tracking-tight text-[var(--navy)]">
          <span className="mr-2 text-[var(--carolina-ink)]">{n}.</span>
          {title}
        </h3>
        {intro && (
          <p className="mt-2 leading-relaxed text-[var(--foreground)]/75">
            <Inline text={intro} />
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed text-[var(--foreground)]/80 marker:text-[var(--carolina)]">
      {items.map((item) => (
        <li key={item}>
          <Inline text={item} />
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--carolina-soft)]/60 text-[var(--navy)]">
            {head.map((h) => (
              <th key={h} className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t border-[var(--border)] align-top">
              {row.map((cell, c) => (
                <td key={c} className="px-3 py-2 text-[var(--foreground)]/80">
                  {typeof cell === "string" ? <Inline text={cell} /> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ClientHandoffPlanPage() {
  const item = findDeliverable("M8");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-xs font-semibold text-[var(--carolina-ink)]">
            {item.id}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
          >
            {item.status}
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
          {item.title}
        </h2>
        <p className="mx-auto max-w-2xl text-[var(--foreground)]/70">
          How Nora goes from our laptops to a working system that UNC Research
          owns and runs, and how we&apos;ll get it there by the end of the
          semester.
        </p>
      </div>

      <article className="mx-auto flex w-full max-w-4xl flex-col gap-12 text-left">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl card-surface border-l-4 border-l-[var(--navy)] p-5">
            <h3 className="font-semibold text-[var(--navy)]">For our coach and instructor</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/75">
              This is our plan for delivering Nora. Sections 1–5 are written
              for our client, Jeanne Lovmo&apos;s team at the Office of the Vice
              Chancellor for Research, so we can email them as is. Sections
              6–8 are how we&apos;ll carry it out, with owners and dates. Anton
              coordinates the handoff.
            </p>
          </div>
          <div className="rounded-2xl card-surface p-5">
            <h3 className="font-semibold text-[var(--navy)]">What you&apos;ll receive</h3>
            <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-[var(--foreground)]/75 marker:text-[var(--carolina)]">
              {RECEIVES.map((r) => (
                <li key={r}>
                  <Inline text={r} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Section
          n={1}
          title="What Nora is, technically"
          intro="Nora is a **web application**: people use it in a web browser, and nothing is installed on their computers. It's made of three parts, each packaged as a **container** (a self-contained bundle that runs the same way anywhere). In production it runs on **Carolina CloudApps**, UNC's own hosting platform (built on Red Hat OpenShift), in a project that belongs to UNC Research."
        >
          <Table
            head={["Part", "What it does", "What it is"]}
            rows={SYSTEM_PARTS.map((p) => [
              <span key="p" className="font-semibold text-[var(--navy)]">{p.part}</span>,
              p.plain,
              p.tech,
            ])}
          />
        </Section>

        <Section
          n={2}
          title="Where it lives, who owns it, and how you'll own it"
          intro={`Today the code is in [a public GitHub repository](${REPO}) and Nora runs on our laptops. At the handoff, everything moves into accounts and systems UNC Research controls.`}
        >
          <Table
            head={["", "Today", "After the handoff"]}
            rows={OWNERSHIP.map((o) => [
              <span key="i" className="font-semibold text-[var(--navy)]">{o.item}</span>,
              o.today,
              o.atHandoff,
            ])}
          />
        </Section>

        <Section
          n={3}
          title="Setting Nora up on Carolina CloudApps"
          intro="These are the steps to launch Nora in your environment. We'll do them **together with your CloudApps admin** at the handoff, and record them in a video so your team can repeat them. No programming is needed, but someone comfortable with CloudApps should be there."
        >
          <h4 className="font-semibold text-[var(--navy)]">What you&apos;ll need first</h4>
          <Bullets items={NEEDS} />

          <h4 className="font-semibold text-[var(--navy)]">The steps</h4>
          <ol className="flex flex-col gap-2">
            {CLOUDAPPS_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-3 rounded-xl border border-[var(--border)] bg-white p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div className="text-sm leading-relaxed">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-semibold text-[var(--navy)]">{step.title}</span>
                    <span className="text-xs text-[var(--foreground)]/55">{step.who}</span>
                  </div>
                  <p className="mt-1 text-[var(--foreground)]/80">
                    <Inline text={step.detail} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          n={4}
          title="Trying Nora on one computer"
          intro="To see Nora without CloudApps (for a demo, or for a future developer), it can run on a single Mac or Windows computer with demo accounts and the same 197 policies. This isn't for real users: it's only reachable from that computer."
        >
          <ol className="flex list-decimal flex-col gap-2 pl-5 leading-relaxed text-[var(--foreground)]/80">
            {LOCAL_STEPS.map((s) => (
              <li key={s}>
                <Inline text={s} />
              </li>
            ))}
          </ol>
        </Section>

        <Section
          n={5}
          title="Costs, and growing Nora"
          intro="Nora was built so that it costs little to keep running. The one cost that grows with use is the optional AI service for written answers."
        >
          <Table
            head={["Item", "Cost", "Notes"]}
            rows={COSTS.map((c) => [
              <span key="i" className="font-semibold text-[var(--navy)]">{c.item}</span>,
              <span key="c" className="whitespace-nowrap">{c.cost}</span>,
              c.notes,
            ])}
          />
          <h4 className="font-semibold text-[var(--navy)]">Growing from the semester version</h4>
          <Bullets items={SCALING} />
          <h4 className="font-semibold text-[var(--navy)]">After the handoff</h4>
          <Bullets items={AFTER} />
        </Section>

        <Section
          n={6}
          title="What we need to settle with the client"
          intro="We're raising each of these with Jeanne's team now, before the end of the semester."
        >
          <div className="flex flex-col gap-2">
            {ISSUES.map((issue) => (
              <div key={issue.issue} className="rounded-xl border border-[var(--border)] bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-[var(--navy)]">{issue.issue}</span>
                  <Badge status={issue.status} />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/80">
                  <Inline text={issue.note} />
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm leading-relaxed text-[var(--foreground)]/85">
            <span className="font-semibold text-[var(--navy)]">Fallback if UNC sign-in isn&apos;t ready: </span>
            <Inline text={FALLBACK} />
          </div>
        </Section>

        <Section
          n={7}
          title="Our plan and timeline"
          intro="How we'll carry out the handoff. Status is updated as each step happens."
        >
          <Table
            head={["When", "Step", "Owner", "Status"]}
            rows={TIMELINE.map((t) => [
              <span key="w" className="whitespace-nowrap font-medium text-[var(--navy)]">{t.when}</span>,
              t.step,
              t.owner,
              <Badge key="s" status={t.status} />,
            ])}
          />
        </Section>

        <Section
          n={8}
          title="How-to videos for the client"
          intro="We'll record these at the end of the semester on Zoom (talking and screen-sharing Nora), host them permanently, link them on this page, and email the links to the client at the handoff. Several short videos, one per audience, are easier to follow than one long one."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {VIDEOS.map((v, i) => (
              <div key={v.title} className="rounded-2xl card-surface p-5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-[var(--navy)]">
                    <span className="mr-1.5 text-[var(--carolina-ink)]">{i + 1}.</span>
                    {v.title}
                  </h4>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                    Not recorded
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--foreground)]/55">
                  For: {v.audience} · Owner: {v.owner}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/80">
                  {v.covers}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </article>
    </div>
  );
}
