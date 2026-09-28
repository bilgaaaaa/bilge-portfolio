# Bilge Ozcanbaz Portfolio

A static personal portfolio for Bilge Ozcanbaz, focused on Android/mobile, backend services, retail systems, integrations, and production debugging.

## Current scope

- One-page responsive portfolio with a dark personal-site style inspired by the reference portfolio.
- English and Italian language switcher.
- Language-aware CV download links.
- No build step and no external dependencies.
- Ready for GitHub Pages, Netlify, Vercel static hosting, or a future custom domain.

## Local preview

From this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Content rules

The portfolio copy is intentionally conservative. It uses verified facts from the candidate truth bank and avoids claims that are not confirmed, such as launched products, seniority, advanced Italian, or cloud expertise.

The CV files are stored in `assets/cv/`. The site updates the download link to the English or Italian CV based on the active language.

## Suggested next updates

- Add LinkedIn URL.
- Replace project-theme sections with public case studies when safe, anonymized examples are ready.
- Connect a custom domain after choosing the final hosting path.
