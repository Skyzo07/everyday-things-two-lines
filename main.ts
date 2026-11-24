import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Everyday Things, Two Lines, Longer Run — winning entry (C02, frozen river).
// Line 1: one vivid sentence explaining a traffic jam to a 10-year-old.
// Line 2: one sentence on what the analogy maps and what it leaves out.
const ENTRY =
  "A traffic jam is a river that has frozen solid, so hundreds of cars sit locked in place until the ice finally cracks and flows again.\n" +
  "It maps how cars stop moving together and pile up bumper to bumper, but leaves out that drivers can still honk, turn off, or pick another road.";

const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  // Each line is exactly one sentence: a single terminal full stop.
  const stops = (line.match(/\./g) ?? []).length;
  if (stops !== 1 || !line.endsWith(".")) {
    throw new Error(`line ${i + 1} must be exactly one sentence, got ${stops} full stops`);
  }
}
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
