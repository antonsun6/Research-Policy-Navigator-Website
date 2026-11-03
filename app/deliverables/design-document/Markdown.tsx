// A small Markdown renderer for the README copy and the inline formatting in
// content.ts. Handles what those use: headings, paragraphs, "-" lists, fenced
// code, pipe tables, `code`, **bold** and [links](url). Relative links point
// at the Nora repo's dev branch on GitHub.

import { repoUrl } from "./content";

const LINK_CLASS = "text-[var(--carolina-ink)] underline-offset-2 hover:underline";

function href(url: string): string {
  return /^(https?:|mailto:|#|\/)/.test(url) ? url : repoUrl(url);
}

// Inline formatting: `code`, **bold** and [text](url).
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          return (
            <code
              key={i}
              className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-[var(--navy)] [overflow-wrap:anywhere]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-[var(--navy)]">
              <Inline text={part.slice(2, -2)} />
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const url = href(link[2]);
          const external = url.startsWith("http");
          return (
            <a
              key={i}
              href={url}
              className={LINK_CLASS}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Inline text={link[1]} />
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

function cells(row: string): string[] {
  return row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
}

// Block-level Markdown, used for the README.
export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre
          key={blocks.length}
          className="overflow-x-auto rounded-lg bg-[var(--navy)] px-4 py-3 font-mono text-xs leading-relaxed text-white print:whitespace-pre-wrap"
        >
          {code.join("\n")}
        </pre>,
      );
    } else if (/^#{1,3} /.test(line)) {
      const level = line.indexOf(" ");
      const text = line.slice(level + 1);
      const className =
        level === 1
          ? "text-lg font-semibold text-[var(--navy)]"
          : level === 2
            ? "mt-2 border-b border-[var(--border)] pb-1 font-semibold text-[var(--navy)]"
            : "text-sm font-semibold text-[var(--navy)]";
      blocks.push(
        <p key={blocks.length} className={className}>
          <Inline text={text} />
        </p>,
      );
      i++;
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s:|-]+\|$/.test(lines[i].trim())) rows.push(cells(lines[i]));
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={blocks.length} className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[var(--carolina-soft)]/60 text-[var(--navy)]">
                {head.map((c) => (
                  <th key={c} className="border border-[var(--border)] px-2.5 py-1.5 font-semibold">
                    <Inline text={c} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r}>
                  {row.map((c, j) => (
                    <td key={j} className="border border-[var(--border)] px-2.5 py-1.5 align-top">
                      <Inline text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^(- |  \S)/.test(lines[i])) {
        if (lines[i].startsWith("- ")) items.push(lines[i].slice(2));
        else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      blocks.push(
        <ul key={blocks.length} className="flex list-disc flex-col gap-1 pl-5">
          {items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>,
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      const para: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !/^(```|#{1,3} |\||- )/.test(lines[i])
      ) {
        para.push(lines[i++].trim());
      }
      blocks.push(
        <p key={blocks.length}>
          <Inline text={para.join(" ")} />
        </p>,
      );
    }
  }
  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed text-[var(--foreground)]/80">
      {blocks}
    </div>
  );
}
