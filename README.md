# Thu Rein Oo — personal portfolio

A personal cybersecurity portfolio inspired by the visual direction of [CSume v4](https://csume-v4.framer.ai/): black surfaces, lime accents, Space Grotesk typography, a terminal-style profile, and alternating project case studies. Content uses Thu Rein Oo’s own photo, projects, background, writing, and training records. Built with HTML, CSS, and vanilla JavaScript. Fonts are self-hosted with their licenses. The decorative network background is drawn once and updated on resize; the page has no loading gate or continuous animation.

## Local preview

Requires Node.js 20 or newer. No dependency installation is needed.

```sh
npm run check
npm run dev
```

Open http://localhost:4173. The preview also supports `/Portfolio/` to check the GitHub Pages project path.

## Publishing

The public site is **https://thurein2003.github.io/Portfolio/**. GitHub Pages should use **Deploy from a branch → main → / (root)**. The root `index.html` and `.nojekyll` allow publishing without a build service. Changes pushed to `main` republish automatically.

For another static host, run `npm run build` and publish `dist/`. The build copies only the images referenced by the site.

## Editing content

- `index.html`: biography, projects, links, writing, education, and certificates.
- `assets/style.css`: layout, colors, typography, and responsive behavior.
- `assets/main.js`: mobile navigation, active section links, certificate dialog, email copying, and the decorative canvas background.
- `Portfolio/Img/`: original photos and certificate images, retained from the previous site.

The content uses the previous portfolio, verified public GitHub repository descriptions, and public LinkedIn writing. Employment details hidden behind LinkedIn sign-in are not inferred. Course completions are labeled separately from professional certification.
