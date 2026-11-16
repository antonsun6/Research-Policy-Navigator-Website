import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { CHECKLIST_STATUS, CHECKLIST_UPDATED } from "@/lib/checklist";
import { SPEC_SECTIONS, type Priority } from "../deliverables/product-specification/spec";
import Checklist from "./Checklist";

// Only the requirements we're committed to or may build; Improbable items are out of scope.
const SHOWN: Priority[] = ["Definite", "Perhaps"];
const REQUIREMENT_SECTIONS = ["functional-requirements", "non-functional-requirements"];

const SECTIONS = SPEC_SECTIONS.filter((s) => REQUIREMENT_SECTIONS.includes(s.id)).map((s) => ({
  ...s,
  groups: s.groups.filter((g) => g.priority && SHOWN.includes(g.priority)),
}));

export default function ChecklistPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader eyebrow="Checklist" title="Requirements checklist">
        Every Definite and Perhaps requirement from the{" "}
        <Link
          href="/deliverables/product-specification"
          className="font-medium text-[var(--carolina-ink)] underline underline-offset-2"
        >
          product specification
        </Link>
        . Items start ticked as recorded on {CHECKLIST_UPDATED}; your own ticks are saved in this
        browser.
      </PageHeader>

      <Checklist sections={SECTIONS} recorded={CHECKLIST_STATUS} />
    </div>
  );
}
