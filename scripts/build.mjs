import { cp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ["index.html", "404.html", ".nojekyll", "assets"]) {
  await cp(path.join(root, name), path.join(output, name), { recursive: true });
}
const html = await readFile(path.join(root, "index.html"), "utf8");
const images = new Set(
  [
    ...html.matchAll(
      /(?:src|data-certificate)="\.\/(Portfolio\/Img\/[^"<>]+)"/g,
    ),
  ].map((match) => match[1]),
);
await mkdir(path.join(output, "Portfolio/Img"), { recursive: true });
for (const image of images)
  await cp(path.join(root, image), path.join(output, image));
await writeFile(path.join(output, "robots.txt"), "User-agent: *\nAllow: /\n");
console.log(
  `Built dist/ with ${images.size} original images. No runtime dependencies.`,
);
