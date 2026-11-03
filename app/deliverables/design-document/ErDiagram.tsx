// Entity-relationship diagram of the tables that exist today, in a 1000 x 380
// coordinate space. Each line connects a foreign key to the table it points at.

type Row = { name: string; note?: string };

function Table({ x, y, w, name, rows }: { x: number; y: number; w: number; name: string; rows: Row[] }) {
  const h = 34 + rows.length * 22 + 8;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} strokeWidth={1.5} className="fill-white stroke-[var(--carolina)]" />
      <path
        d={`M${x},${y + 34} V${y + 10} a10,10 0 0 1 10,-10 H${x + w - 10} a10,10 0 0 1 10,10 V${y + 34} Z`}
        className="fill-[var(--carolina-soft)]"
      />
      <text x={x + 14} y={y + 22} fontSize={13} fontWeight={600} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" className="fill-[var(--navy)]">
        {name}
      </text>
      {rows.map((row, i) => (
        <g key={row.name}>
          <text x={x + 14} y={y + 54 + i * 22} fontSize={11.5} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" className="fill-[var(--navy)]">
            {row.name}
          </text>
          {row.note && (
            <text x={x + w - 12} y={y + 54 + i * 22} fontSize={10.5} textAnchor="end" className="fill-slate-500">
              {row.note}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

function Link({ d, label, lx, ly, anchor = "middle" }: { d: string; label: string; lx: number; ly: number; anchor?: "start" | "middle" | "end" }) {
  return (
    <g>
      <path d={d} fill="none" strokeWidth={1.5} markerEnd="url(#er-one)" markerStart="url(#er-many)" className="stroke-[var(--navy)]" />
      <text x={lx} y={ly} fontSize={10.5} textAnchor={anchor} className="fill-slate-500">
        {label}
      </text>
    </g>
  );
}

export default function ErDiagram() {
  return (
    <svg viewBox="0 0 1000 380" role="img" aria-labelledby="er-title er-desc" className="h-auto w-full">
      <title id="er-title">Database tables and relationships</title>
      <desc id="er-desc">
        documents points to offices (office_id), to users (created_by and
        updated_by) and to itself (replaced_by_id). topics points to offices
        (default_office_id) and to itself (parent_id). document_topics links
        many documents to many topics. Self-references are noted in the rows.
      </desc>
      <defs>
        {/* Crow's foot for the "many" end, a bar for the "one" end. */}
        <marker id="er-many" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
          <path d="M0,6 L12,0 M0,6 L12,6 M0,6 L12,12" fill="none" strokeWidth={1.4} className="stroke-[var(--navy)]" />
        </marker>
        <marker id="er-one" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto">
          <path d="M8,0 L8,12" fill="none" strokeWidth={1.6} className="stroke-[var(--navy)]" />
        </marker>
      </defs>

      <Table
        x={20}
        y={30}
        w={210}
        name="users"
        rows={[
          { name: "id", note: "PK" },
          { name: "onyen", note: "unique" },
          { name: "role", note: "researcher | admin" },
          { name: "is_active" },
        ]}
      />
      <Table
        x={300}
        y={30}
        w={250}
        name="documents"
        rows={[
          { name: "id", note: "PK" },
          { name: "title, summary" },
          { name: "doc_type", note: "7 values" },
          { name: "status", note: "draft | active | archived" },
          { name: "is_authoritative" },
          { name: "office_id", note: "→ offices" },
          { name: "replaced_by_id", note: "→ documents" },
          { name: "created_by, updated_by", note: "→ users" },
          { name: "search_vector", note: "generated" },
        ]}
      />
      <Table
        x={760}
        y={30}
        w={220}
        name="offices"
        rows={[
          { name: "id", note: "PK" },
          { name: "name", note: "unique" },
          { name: "email, phone, url" },
        ]}
      />
      <Table
        x={760}
        y={210}
        w={220}
        name="topics"
        rows={[
          { name: "id", note: "PK" },
          { name: "slug", note: "unique" },
          { name: "parent_id", note: "→ topics" },
          { name: "default_office_id", note: "→ offices" },
        ]}
      />
      <Table
        x={560}
        y={280}
        w={140}
        name="document_topics"
        rows={[{ name: "document_id" }, { name: "topic_id" }]}
      />

      {/* documents.created_by / updated_by → users */}
      <Link d="M300,234 H265 V90 H232" label="created_by, updated_by" lx={258} ly={180} anchor="end" />
      {/* documents.office_id → offices */}
      <Link d="M550,190 H640 V80 H758" label="office_id" lx={646} ly={70} anchor="start" />
      {/* topics.default_office_id → offices */}
      <Link d="M870,210 V140" label="default_office_id" lx={878} ly={180} anchor="start" />
      {/* document_topics links documents and topics */}
      <Link d="M560,330 H520 V272" label="document_id" lx={514} ly={304} anchor="end" />
      <Link d="M700,330 H758" label="topic_id" lx={729} ly={322} />
    </svg>
  );
}
