"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { ChecklistStatus } from "@/lib/checklist";
import type { SpecSection } from "../deliverables/product-specification/spec";

// Ticks are kept in this browser only; the recorded status in lib/checklist.ts is the shared one.
const STORAGE_KEY = "nora-requirements-checklist";

type Ticks = Record<string, boolean>;

// The saved ticks as a JSON string, with an in-memory copy so ticking still works when storage is
// blocked (a private window, say) until the page is left.
let memory = "{}";
const listeners = new Set<() => void>();

function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? memory;
  } catch {
    return memory;
  }
}

function saveTicks(ticks: Ticks) {
  memory = JSON.stringify(ticks);
  try {
    window.localStorage.setItem(STORAGE_KEY, memory);
  } catch {
    // Storage blocked: the in-memory copy above is used instead.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener("storage", notify); // ticks made in another tab
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

function parse(raw: string): Ticks {
  try {
    return JSON.parse(raw) as Ticks;
  } catch {
    return {};
  }
}

export default function Checklist({
  sections,
  recorded,
}: {
  sections: SpecSection[];
  recorded: Record<string, ChecklistStatus>;
}) {
  // Only the items a visitor changed; everything else follows the recorded status.
  // The server render (and first paint) shows the recorded status; saved ticks apply after load.
  const raw = useSyncExternalStore(subscribe, readRaw, () => "{}");
  const ticks = useMemo(() => parse(raw), [raw]);

  const isChecked = (id: string) => ticks[id] ?? recorded[id]?.done ?? false;

  const toggle = (id: string) => {
    const next = { ...ticks };
    const value = !isChecked(id);
    if (value === (recorded[id]?.done ?? false)) delete next[id];
    else next[id] = value;
    saveTicks(next);
  };

  const reset = () => saveTicks({});

  const allItems = sections.flatMap((s) => s.groups.flatMap((g) => g.items));
  const definite = sections.flatMap((s) =>
    s.groups.filter((g) => g.priority === "Definite").flatMap((g) => g.items),
  );
  const changed = Object.keys(ticks).length;

  return (
    <>
      <div className="mx-auto flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="rounded-full bg-[var(--carolina-soft)] px-3 py-1 font-medium text-[var(--carolina-ink)]">
          Definite: {definite.filter((i) => isChecked(i.id)).length} of {definite.length} done
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
          All: {allItems.filter((i) => isChecked(i.id)).length} of {allItems.length} done
        </span>
        {changed > 0 && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-[var(--border)] px-3 py-1 font-medium text-[var(--foreground)]/70 transition-colors hover:border-[var(--carolina)] hover:text-[var(--navy)]"
          >
            Reset {changed} change{changed === 1 ? "" : "s"}
          </button>
        )}
      </div>

      {sections.map((section) => (
        <section
          key={section.id}
          className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl card-surface text-left"
        >
          <header className="border-b border-[var(--border)] border-l-4 border-l-[var(--navy)] bg-[var(--carolina-soft)]/50 px-6 py-5 sm:px-8">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--navy)]">
              {section.title}
            </h2>
          </header>

          <div className="flex flex-col gap-8 px-6 py-6 sm:px-8">
            {section.groups.map((group) => (
              <div key={group.priority}>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--navy)]">
                    {group.priority}
                  </h3>
                  <span className="h-px flex-1 bg-[var(--border)]" />
                  <span className="text-xs text-[var(--foreground)]/50">
                    {group.items.filter((i) => isChecked(i.id)).length} / {group.items.length}
                  </span>
                </div>

                <ul className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const checked = isChecked(item.id);
                    const note = recorded[item.id]?.note;
                    return (
                      <li key={item.id}>
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 text-sm leading-relaxed transition-colors hover:bg-[var(--carolina-soft)]/60">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(item.id)}
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--carolina-ink)]"
                          />
                          <span>
                            <span
                              className={`font-semibold ${
                                checked
                                  ? "text-[var(--foreground)]/50 line-through decoration-[var(--foreground)]/30"
                                  : "text-[var(--navy)]"
                              }`}
                            >
                              <span className="mr-1.5 font-mono text-xs text-[var(--carolina-ink)]">
                                {item.id}
                              </span>
                              {item.title}
                            </span>
                            <span className="block text-[var(--foreground)]/60">{item.text}</span>
                            {note && !checked && (
                              <span className="mt-1 block text-xs font-medium text-amber-700">
                                {note}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
