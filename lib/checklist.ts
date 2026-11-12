// Which D1 requirements are built. The requirement text comes from the product specification
// (app/deliverables/product-specification/spec.ts); this file only records progress. Tick an
// item by setting `done: true` when its work is merged to Nora's dev branch, and add a note when
// part of it is still open.

export type ChecklistStatus = {
  done: boolean;
  note?: string;
};

export const CHECKLIST_UPDATED = "Nov 12, 2026";

export const CHECKLIST_STATUS: Record<string, ChecklistStatus> = {
  // Functional, Definite
  F1: { done: true },
  F2: { done: true },
  F3: { done: true },
  F4: { done: true },
  F5: { done: true },
  F6: { done: true },
  F7: { done: true },
  F8: { done: true },
  F9: { done: true },
  F10: { done: true },
  F11: { done: true },
  F12: {
    done: false,
    note: "Admin pages are done; changing a document doesn't re-run ingestion for Ask yet.",
  },

  // Functional, Perhaps
  F13: { done: false },
  F14: { done: false, note: "Documents have a review-due date; the dashboard doesn't list overdue ones yet." },
  F15: { done: false },
  F16: { done: false },
  F17: { done: false },
  F18: { done: false },
  F19: { done: false },
  F20: { done: false },
  F21: { done: false },
  F22: { done: false },

  // Non-functional, Definite
  NF1: { done: true },
  NF2: { done: true },
  NF3: {
    done: false,
    note: "The evaluation runs; 31 of 39 out-of-scope questions are referred, below the 90% target.",
  },
  NF4: { done: true },
  NF5: { done: false, note: "A typical answer takes about 7 s, but the slowest take about 14 s." },
  NF6: { done: false, note: "Waiting on UNC to approve an AI provider." },
  NF7: { done: true },
  NF8: { done: false },
  NF9: { done: true },
  NF10: { done: false, note: "CI enforces linting and coverage; the handoff documentation is in progress." },
};
