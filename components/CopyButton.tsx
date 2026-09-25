"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. non-HTTPS); the text stays selectable.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border-[1.5px] border-[var(--card-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)]/70 transition-colors hover:border-[var(--carolina)] hover:text-[var(--navy)]"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
