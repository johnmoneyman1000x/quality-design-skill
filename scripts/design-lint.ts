// Design lint for the rules in design-skill/references/rules.md that code can
// find with a text search. Everything else stays a written rule.
//
// Run: node --experimental-strip-types scripts/design-lint.ts [dir]   (default ./src)
//
// Each finding prints as: file:line id message fix
// A comment containing `design-lint allow <id>` on the same line or within the
// three lines above it marks an accepted exception.
// Exits 1 when any error is found. Warnings print but do not fail.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

type Severity = "error" | "warn";

type Finding = {
  file: string;
  line: number;
  id: string;
  severity: Severity;
  message: string;
  fix: string;
};

type LineRule = {
  id: string;
  severity: Severity;
  // Return a message for each problem found on the line, or none.
  check: (line: string, file: string) => string[];
  fix: string;
};

const EXTENSIONS = [".tsx", ".jsx", ".ts", ".css"];
const ALLOW_WINDOW = 3;

// colour-tokens-only: no hex, rgb or hsl outside styles/.
const HEX = /(?<![\w&])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;
const COLOUR_FN = /\b(?:rgba?|hsla?)\(/g;

// type-min-12: Tailwind arbitrary sizes and CSS font-size under 12px.
const TEXT_PX = /\btext-\[(\d+(?:\.\d+)?)px\]/g;
const FONT_SIZE_PX = /font-size:\s*(\d+(?:\.\d+)?)px/g;

// layout-spacing-scale: arbitrary padding, margin, gap and space values.
const SPACING_PX =
  /(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|inset|top|right|bottom|left)-\[(\d+(?:\.\d+)?)px\]/g;

// icons-sized-by-role: icon components named *Icon, and inline <svg> elements.
// Tailwind size units are 4px each, so w-6 or h-6 is 24px and too big.
const ICON_TAG = /<(?:[A-Z]\w*Icon|Icon)\b[^>]*/g;
const SVG_TAG = /<svg\b[^>]*/g;
const MAX_ICON_PX = 20;

// edges-borders-visible: opacity borders and near-white greys.
const FAINT_BORDER = [
  /\bborder(?:-[xytrbl])?-(?:black|white)\/\[?\d/,
  /\bborder(?:-[xytrbl])?-gray-(?:50|100)\b/,
  /\bborder-opacity-\d/,
];

function iconSizesPx(tag: string): number[] {
  const sizes: number[] = [];
  for (const m of tag.matchAll(/\bsize=\{?["']?(\d+)/g)) sizes.push(Number(m[1]));
  for (const m of tag.matchAll(/(?<![\w-])(?:size|[hw])-(\d+(?:\.5)?)\b/g)) sizes.push(Number(m[1]) * 4);
  for (const m of tag.matchAll(/(?<![\w-])(?:size|[hw])-\[(\d+)px\]/g)) sizes.push(Number(m[1]));
  return sizes;
}

const lineRules: LineRule[] = [
  {
    id: "colour-tokens-only",
    severity: "error",
    fix: "use a colour token from DESIGN.md, or add a new token",
    check: (line, file) => {
      if (file.split(sep).includes("styles")) return [];
      const hits = [...line.matchAll(HEX), ...line.matchAll(COLOUR_FN)];
      return hits.map((m) => `raw colour ${m[0]}`);
    },
  },
  {
    id: "type-min-12",
    severity: "error",
    fix: "use text-xs (12px meta) or a larger role",
    check: (line) => {
      const hits = [...line.matchAll(TEXT_PX), ...line.matchAll(FONT_SIZE_PX)];
      return hits.filter((m) => Number(m[1]) < 12).map((m) => `text size ${m[1]}px is under 12px`);
    },
  },
  {
    id: "layout-spacing-scale",
    severity: "error",
    fix: "use a 4px step, or add an allow comment naming what it aligns to",
    check: (line) =>
      [...line.matchAll(SPACING_PX)]
        .filter((m) => Number(m[1]) % 4 !== 0)
        .map((m) => `${m[0]} is off the 4px scale`),
  },
  {
    id: "icons-sized-by-role",
    severity: "error",
    fix: "16px inline with text, 20px in buttons and nav",
    check: (line) => {
      const out: string[] = [];
      for (const re of [ICON_TAG, SVG_TAG]) {
        for (const m of line.matchAll(re)) {
          const big = iconSizesPx(m[0]).filter((px) => px > MAX_ICON_PX);
          if (big.length > 0) out.push(`icon is ${Math.max(...big)}px, larger than ${MAX_ICON_PX}px`);
        }
      }
      return out;
    },
  },
  {
    id: "edges-borders-visible",
    severity: "error",
    fix: "use border-divider or border-divider-strong",
    check: (line) => {
      const hit = FAINT_BORDER.map((re) => line.match(re)).find(Boolean);
      return hit ? [`faint border ${hit[0]}`] : [];
    },
  },
];

function isAllowed(lines: string[], index: number, id: string): boolean {
  const marker = `design-lint allow ${id}`;
  for (let i = Math.max(0, index - ALLOW_WINDOW); i <= index; i++) {
    if (lines[i].includes(marker)) return true;
  }
  return false;
}

// layout-no-card-in-card: track <Card> nesting across the file.
function checkCardNesting(lines: string[]): Array<{ index: number; message: string }> {
  const out: Array<{ index: number; message: string }> = [];
  let depth = 0;
  lines.forEach((line, index) => {
    const tokens = line.matchAll(/<Card(?=[\s>])[^>]*?(\/)?>|<Card(?=\s*$)|<\/Card>/g);
    for (const t of tokens) {
      if (t[0] === "</Card>") {
        depth = Math.max(0, depth - 1);
      } else if (t[1] !== "/") {
        depth++;
        if (depth >= 2) out.push({ index, message: `Card nested ${depth} deep` });
      }
    }
  });
  return out;
}

// controls-icon-button-label: read each <IconButton ...> tag, even across lines.
function checkIconButtonLabels(lines: string[]): Array<{ index: number; message: string }> {
  const out: Array<{ index: number; message: string }> = [];
  const text = lines.join("\n");
  for (const m of text.matchAll(/<IconButton\b/g)) {
    let braces = 0;
    let end = m.index;
    for (let i = m.index; i < text.length; i++) {
      const c = text[i];
      if (c === "{") braces++;
      else if (c === "}") braces--;
      else if (c === ">" && braces === 0) {
        end = i;
        break;
      }
    }
    const tag = text.slice(m.index, end);
    if (!/\blabel=/.test(tag)) {
      out.push({ index: text.slice(0, m.index).split("\n").length - 1, message: "IconButton has no label" });
    }
  }
  return out;
}

function lintFile(path: string, root: string): Finding[] {
  const file = relative(process.cwd(), path) || path;
  const lines = readFileSync(path, "utf8").split("\n");
  const findings: Finding[] = [];

  const add = (index: number, id: string, severity: Severity, message: string, fix: string) => {
    if (!isAllowed(lines, index, id)) findings.push({ file, line: index + 1, id, severity, message, fix });
  };

  const relToRoot = relative(root, path);
  lines.forEach((line, index) => {
    if (line.includes("design-lint allow")) return;
    for (const rule of lineRules) {
      for (const message of rule.check(line, relToRoot)) add(index, rule.id, rule.severity, message, rule.fix);
    }
  });

  if (path.endsWith(".tsx") || path.endsWith(".jsx")) {
    for (const f of checkCardNesting(lines)) {
      add(f.index, "layout-no-card-in-card", "warn", f.message, "replace the inner Card with a heading and a hairline");
    }
    for (const f of checkIconButtonLabels(lines)) {
      add(f.index, "controls-icon-button-label", "error", f.message, 'add label="..." (it is the name and the tooltip)');
    }
  }
  return findings;
}

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else if (EXTENSIONS.some((ext) => name.endsWith(ext))) files.push(path);
  }
  return files;
}

const root = process.argv[2] ?? "src";
const findings = walk(root)
  .flatMap((f) => lintFile(f, root))
  .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

for (const f of findings) {
  console.log(`${f.file}:${f.line} ${f.id} ${f.severity === "warn" ? "(warn) " : ""}${f.message}. Fix: ${f.fix}`);
}

const errors = findings.filter((f) => f.severity === "error").length;
const warnings = findings.length - errors;
console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors > 0 ? 1 : 0);
