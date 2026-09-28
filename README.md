# Bilge Ozcanbaz — Portfolio

Personal portfolio for Bilge Ozcanbaz, software developer in Padova, Italy (Android, .NET, retail systems).
Layout inspired by [gazijarin.com](https://www.gazijarin.com/).

## Stack

Plain HTML, CSS and JavaScript — no framework, no build step. Bilingual (EN / IT), responsive, keyboard accessible, respects `prefers-reduced-motion`.

| File | Purpose |
| --- | --- |
| `index.html` | Home page shell and section anchors |
| `pacetasks.html` | PaceTasks case-study page |
| `content.js` | **All text and data** — translations, experience, projects, links |
| `script.js` | Renders `content.js` per page (`<body data-page>`), language switch, typing greeting, tabs, menu, scroll reveal |
| `styles.css` | Theme tokens and layout |
| `assets/icons.svg` | Shared icon sprite (`assets/icons.svg#icon-<name>`) |
| `assets/cv/` | Public CV in EN/IT (HTML + PDF, no phone number or birth date) |
| `tools/build-cv.py` | Regenerates the CV HTML pages from one data source |

## Editing content

Almost every change happens in `content.js`: every text entry has an `en` and `it` value.

- New job → add an object to `experience`.
- New project → add to `featuredProjects` (big alternating cards) or `otherProjects` (grid). Give a featured project `caseStudy` and `repo` to show its links.
- PaceTasks page text → `pacetasksCaseStudy` and the `pt.*` keys in `translations`.
- Profile photo → replace `assets/profile.jpg` and `assets/profile.webp` (square, 640×640).

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
For a custom domain, add a `CNAME` file containing the domain and point the DNS records to GitHub Pages.
