import Link from "next/link";
import { STATUS_STYLES } from "@/lib/deliverables";
import { AUTHORS, INTRO, REFERENCES, SECTIONS, type Block } from "./ethics";

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string") {
    return <p className="leading-relaxed text-[var(--foreground)]/80">{block}</p>;
  }
  if ("list" in block) {
    const List = block.ordered ? "ol" : "ul";
    return (
      <List
        className={`flex flex-col gap-2 pl-5 leading-relaxed text-[var(--foreground)]/80 ${
          block.ordered ? "list-decimal" : "list-disc"
        }`}
      >
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--carolina-soft)]/50 text-left text-[var(--navy)]">
          <tr>
            {block.table.head.map((cell) => (
              <th key={cell} className="px-4 py-2.5 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map(([failure, response]) => (
            <tr key={failure} className="border-t border-[var(--border)] align-top">
              <td className="px-4 py-2.5 text-[var(--foreground)]/70">{failure}</td>
              <td className="px-4 py-2.5 text-[var(--foreground)]/80">{response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Ethics1Page() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/assignments"
          className="text-sm text-[var(--carolina-ink)] hover:underline"
        >
          ← All assignments
        </Link>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES.Delivered}`}
        >
          Delivered
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--navy)]">
          Ethics 1: Ethics in Software Engineering
        </h2>
        <p className="text-sm text-[var(--foreground)]/60">
          {AUTHORS.join(", ")} · COMP 523, Dr. Paul Stotts
        </p>
      </div>

      <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 text-left">
        <section className="flex flex-col gap-4 rounded-2xl card-surface px-6 py-6 sm:px-8">
          {INTRO.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </section>

        {SECTIONS.map((section) => (
          <section
            key={section.heading}
            className="overflow-hidden rounded-2xl card-surface"
          >
            <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-4 sm:px-8">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--navy)]">
                {section.heading}
              </h3>
            </header>
            <div className="flex flex-col gap-6 px-6 py-6 sm:px-8">
              {section.parts.map((part, i) => (
                <div key={part.heading ?? i} className="flex flex-col gap-3">
                  {part.heading && (
                    <h4 className="font-semibold text-[var(--navy)]">{part.heading}</h4>
                  )}
                  {part.blocks.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl card-surface px-6 py-6 sm:px-8">
          <h3 className="text-xl font-semibold tracking-tight text-[var(--navy)]">
            References
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-[var(--foreground)]/80">
            {REFERENCES.map((ref) => (
              <li key={ref.url}>
                {ref.citation}{" "}
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-[var(--carolina-ink)] hover:underline"
                >
                  {ref.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
