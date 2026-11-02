import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    // Resolve original asset paths first, then the GitHub Pages project prefix.
    let relative = pathname === "/" ? "/index.html" : pathname;
    try {
      if (!(await stat(path.join(root, relative))).isFile())
        throw new Error("Not a file");
    } catch {
      relative = pathname.replace(/^\/Portfolio(?=\/|$)/, "") || "/";
    }
    const file = path.resolve(
      root,
      `.${relative === "/" ? "/index.html" : relative}`,
    );
    if (!file.startsWith(root) || !(await stat(file)).isFile())
      throw new Error("Not found");
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(path.join(root, "404.html")));
  }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://localhost:${port}`),
);
