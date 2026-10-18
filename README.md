# Bilge Ozcanbaz — Portfolio

Personal portfolio for Bilge Ozcanbaz, software developer in Padova, Italy (Android, .NET, retail systems).
Layout inspired by [gazijarin.com](https://www.gazijarin.com/) and a plum/rose glass design.

## Stack

Plain HTML, CSS and JavaScript — no framework, no build step. Bilingual (EN / IT), responsive, keyboard accessible, respects `prefers-reduced-motion`.

| File | Purpose |
| --- | --- |
| `index.html` | Home page shell and section anchors |
| `pacetasks.html` | PaceTasks case-study page |
| `content.js` | **All text and data** — translations, experience, projects, links |
| `script.js` | Renders `content.js` per page (`<body data-page>`), language switch, typing greeting, tabs, menu, scroll reveal |
| `simulations.js` | Live demo (scan → RabbitMQ → .NET → SQL → fiscal printer), portrait "releases", hero ticker and PaceTasks phone mockup |
| `game-walk.js` | Play section: take Bruno for a walk by writing small code commands |
| `styles.css` | Plum palette tokens (`--plum-*`, `--rose-300`, `--cream-100`), glass components and layout |
| `assets/portrait.webp` | Hero portrait (background removed, colour-graded into the palette) |
| `assets/looks/` | Alternate portraits cycled by the hero "release notes" card |
| `assets/beyond/`, `assets/bruno/` | Baking and Bruno photos for Beyond code and the walk game |
| `assets/arch.svg` | Archway illustration used in the process and contact sections |
| `assets/favicon.svg`, `assets/apple-touch-icon.png` | Browser-tab icon and phone home-screen icon (italic "B" brand mark) |
| `assets/icons.svg` | Shared icon sprite (`assets/icons.svg#icon-<name>`) |
| `assets/cv/` | Public CV in EN/IT (HTML + PDF, no phone number or birth date) |
| `tools/build-cv.py` | Regenerates the CV HTML pages from one data source |

## Editing content

Almost every change happens in `content.js`: every text entry has an `en` and `it` value.

- New job → add an object to `experience`.
- New project → add to `featuredProjects` (big alternating cards) or `otherProjects` (grid). Give a featured project `caseStudy` and `repo` to show its links.
- PaceTasks page text → `pacetasksCaseStudy` and the `pt.*` keys in `translations`.
- Profile photo → replace `assets/portrait.webp` (720×886); alternate looks live in `assets/looks/`.

## CV

```bash
python3 tools/build-cv.py          # regenerate assets/cv/*.html
```

Then print each HTML page to PDF (A4) with the same file name.

## Local preview

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

## Publishing

The site is static, so GitHub Pages works out of the box: **Settings → Pages → Deploy from branch → `main` / root**.
Live at **https://bilgalog.dev** (domain registered at Cloudflare). The `CNAME` file holds the domain; DNS has four `A` records for `@` (185.199.108–111.153) and a `www` CNAME to `bilgaaaaa.github.io`, all set to **DNS only** so GitHub can issue the HTTPS certificate.
