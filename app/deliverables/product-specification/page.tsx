export default function ProductSpecificationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-[var(--foreground)]/50">
          Week 1
        </span>
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          Delivered
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Product Specification Document
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--foreground)]/70">
          Our first deliverable: the product specification defining project
          scope, goals, and requirements. Replace this placeholder with the
          actual document content, an embedded viewer, or a link out to the
          full spec (Google Doc, PDF, Notion, etc.).
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-[var(--foreground)]/50">
        Drop in the product specification content or a link to the document
        here.
      </div>
    </div>
  );
}
