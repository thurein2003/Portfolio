import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const html = await readFile(path.join(root, "index.html"), "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, new Set(ids).size, "HTML IDs must be unique");
for (const [, target] of html.matchAll(/href="#([^"]+)"/g))
  assert(ids.includes(target), `Missing anchor: ${target}`);
for (const [, target] of html.matchAll(
  /(?:src|href|data-certificate)="\.\/([^"<>]+)"/g,
))
  await access(path.join(root, target));
const css = await readFile(path.join(root, "assets/style.css"), "utf8");
for (const [, target] of css.matchAll(/url\(["']\.\/([^"']+)["']\)/g))
  await access(path.join(root, "assets", target));
assert.equal([...html.matchAll(/<h1\b/g)].length, 1, "Use one page heading");
assert(!/href=""/.test(html), "Links cannot be empty");
console.log(
  "Page anchors, local assets, fonts, and document structure passed.",
);
