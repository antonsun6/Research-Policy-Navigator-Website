#!/bin/sh
# Regenerates public/design-document/Nora-Design-Document.pdf from the Design
# Document page, using headless Google Chrome. Start the site first
# (`pnpm dev`, or `pnpm build && pnpm start`), then run `pnpm design-doc:pdf`.
# Set CHROME to use a different Chrome or Chromium binary, and URL for another port.
set -e

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
URL="${URL:-http://localhost:3000/deliverables/design-document}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/design-document/Nora-Design-Document.pdf"

if ! curl -sf -o /dev/null "$URL"; then
  echo "Can't reach $URL. Start the site with 'pnpm dev' first." >&2
  exit 1
fi

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=10000 --print-to-pdf="$OUT" "$URL"
echo "Wrote $OUT"
