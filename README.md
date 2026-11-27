# BV Website (BharatVistaar)

Static website built with **Next.js 16 · React 19 · MUI 9**, exported as plain HTML/CSS/JS and hosted on **AWS S3** (with CloudFront for HTTPS).

## Requirements

- Node **24** (`nvm use` reads `.nvmrc`)

## Commands

| Command                    | What it does                                                    |
| -------------------------- | --------------------------------------------------------------- |
| `npm run dev`              | Local development server                                        |
| `npm run build`            | Static export to `out/`                                         |
| `npm run preview`          | Serves `out/` the way S3 does (http://localhost:4173)           |
| `npm run lint`             | ESLint, including the styling rules below                       |
| `npm run typecheck`        | TypeScript check                                                |
| `npm run format`           | Prettier                                                        |
| `npm run images -- <file>` | Convert a photo to WebP manually (normally automatic on commit) |

## Project structure

```
public/locales/en/     All text: common.json (UI labels), home.json (page content)
public/images/         Photos — WebP only (converted automatically on commit)
public/icons, logos/   SVG assets
src/app/               Routes: page.tsx composes sections; <page>.styles.ts for page-level styles
src/theme/tokens.ts    ★ Every raw design value (colours, type scale, spacing, sizes)
src/theme/theme.ts     MUI theme built from tokens + global component overrides
src/styles/            Global CSS (MUI GlobalStyles)
src/sections/home/     One folder per Home section: Name.tsx + Name.styles.ts + index.ts
src/components/ui/     Shared building blocks (Icon, SectionHeader, StatCard …)
src/components/layout/ Site chrome: Header (GovLockup, SearchBox, TopBarActions, MainNav, MobileMenu), Footer, AccessibilityPanel, LanguageSwitcher
src/accessibility/     `accessibility` package wiring (headless) + Dark Contrast
src/i18n/              Language config + provider (English now, more later)
src/services/          Data access — the only place that knows where content comes from
src/types/             Content types (contract with the future API)
scripts/               optimize-images.mjs (pre-commit), preview.mjs
```

## Styling rules (enforced by ESLint)

1. `.tsx` files contain markup only — **no `sx` and no `style` props**.
2. Every component/page has its own `*.styles.ts` file using MUI `styled()`.
3. `*.styles.ts` files use **theme values only** — no hex, rgb, `px` strings or raw numbers.
4. Raw values live **only** in `src/theme/tokens.ts`.
5. Read colours as `(theme.vars ?? theme).palette.…` so Dark Contrast applies.
6. Mobile first: base styles = Figma mobile frame (375); `theme.breakpoints.up('lg')` = desktop frame (1440).

## Design source & DBIM

Tokens follow the Figma exactly. Values that differ from the GoI DBIM guidelines are marked
`DBIM:` in `tokens.ts` — switching to DBIM is a change to that file only.

## Images

Drop a PNG/JPG into `public/images/` and commit. The pre-commit hook converts it to WebP,
resizes it, removes the original and warns if it exceeds the DBIM limit:

| Folder                                         | Max width | Limit  |
| ---------------------------------------------- | --------- | ------ |
| `public/images/thumbnails/`                    | 640px     | 100 KB |
| `public/images/hi-res/`                        | original  | 5 MB   |
| `public/images/` (banners, backgrounds, cards) | 1920px    | 500 KB |

Icons, logos and the State Emblem are SVG (`public/icons/`, `public/logos/`).

## Deployment (S3)

```bash
npm run build
aws s3 sync out/ s3://<bucket> --delete
```

- Set `404.html` as the S3 error document.
- Cache: `*.html` → `no-cache`; `/_next/static/*` → `max-age=31536000, immutable`.

## Adding a language later

Add `public/locales/<code>/common.json` + `home.json`, add the language in `src/i18n/config.ts`,
and enable the localStorage switch in `LanguageProvider`. URLs stay the same.
