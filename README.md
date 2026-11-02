# Thu Rein Oo — personal portfolio

A fast, responsive portfolio with original photography, selected software projects, security writing, community tutorials, and accessible certificate previews. Built with HTML, CSS, and vanilla JavaScript. Fonts are self-hosted.

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
- `assets/main.js`: mobile navigation, certificate dialog, and email copying.
- `Portfolio/Img/`: original photos and certificate images, retained from the previous site.

The content uses the previous portfolio, verified public GitHub repository descriptions, and public LinkedIn writing. Employment details hidden behind LinkedIn sign-in are not inferred. Course completions are labeled separately from professional certification.
