# Thu Rein Oo — personal portfolio

A minimal dark cybersecurity portfolio featuring Thu Rein Oo’s portrait, selected projects, technical writing, education, and licenses & certifications. Built with HTML, CSS, and vanilla JavaScript. Fonts are self-hosted with their licenses.

The latest credential names, issuers, issue dates, and IDs come from the user’s supplied LinkedIn list. Dates omitted from that list remain omitted. NCC Level 5 (Cybersecurity) is shown as an education qualification.

Certificate images are original files already in the repository or recovered from the issuers’ public records:

- CRTA: CyberWarFare Labs achievement `690813f62dc1cc412983e712`.
- Belkasoft: certificate `7yzweradta`.
- SkillFront: badge `87372200027181`.
- CAP: the issuer’s validation form confirmed `11626359` for Thu Rein Oo, issued June 2026 with Merit. The preview is an accurately labeled screenshot of that verification result, not a recreated certificate.
- CAP’s original certificate image and the NCC Level 5 document remain unavailable because LinkedIn requires sign-in. Replace the CAP record preview and add the NCC image when direct files become available.


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
- `assets/main.js`: mobile navigation, active section links, accessible certificate previews, and email copying.
- `Portfolio/Img/`: original photos and certificate images, retained from the previous site.

Project descriptions use the public repositories and the previous portfolio. Employment details hidden behind LinkedIn sign-in are not inferred. The certifications section contains only the ten credentials provided by the user.
