# Thu Rein Oo — personal portfolio

A minimal dark cybersecurity portfolio featuring Thu Rein Oo’s portrait, selected projects, a current robotics interest, technical writing, education, and an animated credential gallery. Built with HTML, CSS, and vanilla JavaScript. Fonts are self-hosted with their licenses.

The latest credential names, issuers, issue dates, and IDs come from the user’s supplied LinkedIn list. Dates omitted from that list remain omitted. NCC Levels 4 and 5 are education qualifications, separate from the ten certifications.

Certificate images are original files already in the repository or recovered from the issuers’ public records:

- CRTA: CyberWarFare Labs achievement `690813f62dc1cc412983e712`.
- Belkasoft: certificate `7yzweradta`.
- SkillFront: badge `87372200027181`.
- CAP: the original certificate and 90% with Merit grade images were retrieved from the user-provided public LinkedIn post, https://lnkd.in/p/gnk4MVnb. The issuer’s validation form also confirmed credential `11626359` for Thu Rein Oo, issued June 2026.
- NCC Level 5: the user-supplied Statement of Results is preserved from the root `image.png` as `Portfolio/Img/ncc-level5-statement-of-results.png`. The document is labeled as a Statement of Results for the Level 5 Diploma in Computing (with Cyber Security), dated 26 July 2024, and shown under education.
- NCC Level 4: the Diploma in Computing qualification and Twinkle University attribution are restored from the earlier portfolio. It has a text education card; no certificate image, issue date, or grade is invented.

The 12-card gallery supports previous/next buttons, touch swipes, mouse dragging, arrow keys, and a direct credential selector. It does not advance automatically. Only the active slide is interactive or exposed to assistive technology; transitions follow reduced-motion preferences. Original certificate and grade images still open in the full-size preview. With JavaScript disabled, all records remain readable.

The robotics section uses the exact robotic hand photo supplied in this conversation, stored as `Portfolio/Img/robotic-hand-prototype.png`. It describes an ongoing interest and includes no robotics repository links, names, or source code.

## Local preview

Requires Node.js 20 or newer. No dependency installation is needed.

```sh
npm run check
npm run dev
```

Open http://localhost:4173. The preview also supports `/Portfolio/` to check the GitHub Pages project path.

## Publishing

The primary public site is **https://thurein2003.github.io/**, served from `thurein2003/thurein2003.github.io`. The original **https://thurein2003.github.io/Portfolio/** remains available from `thurein2003/Portfolio`. Both repositories use GitHub Pages **Deploy from a branch → main → / (root)**. The root `index.html` and `.nojekyll` allow publishing without a build service.

This checkout retains the original fetch repository and has two push URLs on `origin`, so `git push origin main` publishes the same source to both sites. On a fresh clone, configure both push destinations once:

```sh
git remote set-url --add --push origin https://github.com/thurein2003/Portfolio.git
git remote set-url --add --push origin https://github.com/thurein2003/thurein2003.github.io.git
```

The canonical URL and social preview metadata use the shorter root address. Published photos and certificates are served from `assets/images/` so they work at both site locations without overlapping the legacy `/Portfolio/` project route. The originals in `Portfolio/Img/` are retained.

For another static host, run `npm run build` and publish `dist/`. The build copies only the images referenced by the site.

## Editing content

- `index.html`: biography, projects, links, writing, education, and certificates.
- `assets/style.css`: layout, colors, typography, and responsive behavior.
- `assets/main.js`: mobile navigation, manual credential gallery, active section links, accessible certificate previews, and email copying.
- `Portfolio/Img/`: original photos and certificate images, retained from the previous site.

Project descriptions use the public repositories and the previous portfolio. Employment details hidden behind LinkedIn sign-in are not inferred. The gallery contains the ten certifications provided by the user and the two NCC education qualifications.
