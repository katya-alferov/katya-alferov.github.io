# Katya Alferov — portfolio

A single-page portfolio for Katya Alferov, ETL & BI Developer. The visual idea is
"the architecture of data": editorial typography, a fine drafting grid, and an
interactive pipeline diagram (sources → extraction → transformation → SQL/DB →
warehouse → BI, with an orchestration layer) built in plain SVG.

All content comes from `public/cv/Katya_Alferov_CV.docx` (the original CV,
byte-for-byte unchanged).

## Run it locally

Requirements: Node.js 20.9 or newer (tested with Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build (static files in `out/`):

```bash
npm run build
npx serve out      # preview the built site locally
```

Checks:

```bash
npm run lint
npx tsc --noEmit
```

No accounts, API keys or environment variables are needed locally. The build
reads two optional variables, which the GitHub Pages workflow sets automatically:
`NEXT_PUBLIC_BASE_PATH` (the sub-path, e.g. `/katya-alferov`) and
`NEXT_PUBLIC_SITE_URL` (the public address, used for Open Graph and the sitemap).

Next.js collects anonymous build telemetry by default; `npx next telemetry disable`
turns it off.

## Editing content

Everything personal lives in **`src/content/profile.ts`**: name, contact details,
hero copy, pipeline stages, roles, skills, education and projects. Components only
render that data.

- **Jobs / dates / technologies:** edit `roles` (and `earlierRoles`).
- **Skills:** edit `skillCategories`. Each skill lists its `evidence` (`partner`,
  `isracard`, `progeeks`, `studies`, `marketing`, `toolkit`). Skills with evidence
  from a role are shown with a filled marker; the filter buttons use the same data.
- **Pipeline:** edit `pipelineStages` and `orchestrationLayer`.
- **LinkedIn:** the CV has no LinkedIn URL, so none is shown. Set
  `person.linkedin` to the verified profile URL and the link appears in the contact
  section, footer and structured data.
- **Projects:** add entries to `projects`. The "Project index" switches from its
  empty state to a list automatically. Keep the synthetic-data demo or remove
  `<ConceptDemo />` from `src/components/sections/Work.tsx`.

### Adding a portrait

1. Put the image Katya chose at `public/images/portrait.jpg` (4:5 crop, about
   800×1000 px).
2. In `src/content/profile.ts` set
   `portrait: { src: "/images/portrait.jpg", alt: "Portrait of Katya Alferov" }`.

It renders in the hero through `next/image` (responsive, optimised).

### Updating the CV

Replace both files in `public/cv/` and keep the names
(`Katya_Alferov_CV.docx`, `Katya_Alferov_CV.pdf`). The PDF was produced locally
with LibreOffice (`soffice --headless --convert-to pdf`); LibreOffice substitutes
Carlito for Calibri, which has identical metrics, so layout matches but letterforms
differ slightly from Word's export. Exporting the PDF from Word gives an exact match.

## Project structure

```
src/
  app/                  layout, page, 404, metadata, icons, OG image, robots, sitemap
  content/profile.ts    all personal content
  components/
    pipeline/           interactive pipeline (SVG diagram, accessible tablist, mobile view)
    sections/           Hero, Story, Experience, Skills, Education, Work, Contact
    work/               ConceptDemo (synthetic data), ProjectCard
    layout/             header, footer, background grid
    ui/                 small shared pieces
  fonts/                self-hosted OFL fonts + licence
public/cv/              downloadable CV (original .docx + PDF)
```

Only the pieces that need interaction are Client Components: the header menu,
the pipeline, the skills filter and the concept demo. Everything else renders on
the server at build time, and the whole site is exported as static files
(`output: "export"`), so any static host can serve it.

## Accessibility and motion

- Pipeline stages are a keyboard tablist (arrow keys, Home/End) over a decorative
  SVG; the details panel is real text. Narrow screens get a vertical disclosure list.
- Moving signals are CSS animations and stop under `prefers-reduced-motion`; Motion
  transitions follow the same setting. Nothing depends on hover.
- Lighthouse (local production build): Accessibility 100, Best Practices 100,
  SEO 100, Performance 99 desktop / about 90 on the simulated mobile profile.

## Deployment: GitHub Pages (free)

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages
on every push to `main`. The address is `https://<github-user>.github.io/katya-alferov/`.

One-time setup in the GitHub repository:

1. The repository must be **public** (GitHub Pages is free for public repositories).
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.

After that, every `git push` to `main` updates the live site within a few minutes
(Actions tab shows progress). GitHub Pages has soft limits (1 GB site, 100 GB
bandwidth a month) that a portfolio stays far below; there is no billing.

## Cost audit

| Item | What it is | Cost / licence |
| --- | --- | --- |
| Next.js 16, React 19 | framework | MIT, free |
| TypeScript, ESLint | tooling | Apache-2.0 / MIT, free |
| Tailwind CSS 4 | styling | MIT, free |
| Motion for React | small UI transitions (LazyMotion, `domAnimation`) | MIT, free |
| Lucide React | icons | ISC, free |
| Newsreader, Instrument Sans, IBM Plex Mono | fonts, self-hosted in `src/fonts` | SIL OFL 1.1, free (licence included) |
| LibreOffice | local DOCX → PDF conversion | MPL-2.0, free |
| Playwright / Chromium, Lighthouse | local testing only, not shipped | Apache-2.0, free |
| Images and graphics | hand-written SVG and CSS; share image and app icon are PNGs generated in code | no assets bought |
| External services at runtime | none (no analytics, APIs, AI services, CMS, forms or fonts CDN) | $0 |
| GitHub (public repository), GitHub Actions, GitHub Pages | code hosting, build, hosting | free for public repositories |
| Domain | none; free `*.github.io` address | $0 |

**Total mandatory cost: $0.**
