# Project Memory — Saumya Tours

> Shared work log + context for all AI agents (opencode · codex · agy).
> **New chat? Read this whole file first. Update it after every task.**

## Project snapshot
- Travel website | Location: /var/home/kythonlk/sam/saumya | Stack: Astro 7, Tailwind 4.

## Commands that matter
- Build: `npm run build`. No test script configured.
- Dev: `npm run dev -- --background`; manage with `astro dev status`, `astro dev logs`, `astro dev stop`.

## Current state (update me)
- Existing user change in src/lib/api.ts; preserve it.
- Two new branding PNGs supplied in project root.

## Work log

## Gotchas
- Do not commit unless explicitly requested.

## File map
- src/layouts/Layout.astro: shared header/footer and metadata.
- src/styles/global.css: shared theme.
- public/images: site imagery.

### 2026-11-16 — codex — Refresh branding from supplied images
- What: New full logo in responsive header/footer; swan favicon and Apple touch icon; orange, gold, cream and deep brown theme throughout pages, tour cards and inquiry form. Optimized supplied assets for web delivery.
- Files: src/layouts/Layout.astro, src/styles/global.css, src/components/TourCard.astro, src/pages/*.astro, src/pages/tour/[slug].astro, public/images/saumya-logo.png, public/favicon.png, public/apple-touch-icon.png.
- Verified: `npm run build` passed with live API (8 pages); `git diff --check` passed. No test script exists. Browser appearance not checked.

## Current state — latest
- Branding changes pending, uncommitted. Existing user change in src/lib/api.ts preserved.
- Production build passes with network access to tour API. No services started.

## Gotchas — build network
- Sandboxed build cannot reach tour API and uses fallback catalog (9 pages). Network-enabled build uses live catalog (8 pages).

### 2026-11-16 — codex — Rebuild the site for local hires and guided travel
- What: Executed requested `npx skills use "https://github.com/anthropics/skills" --skill "frontend-design"`; read complete output from /tmp/saumya-frontend-design-skill-network.txt (supporting files /tmp/skills-use-6wexjr/frontend-design). Rebuilt all pages with Fraunces/Manrope typography and orange/gold identity. New owner-provided new-logo.png/new-fav.png optimized as versioned web assets. Address updated to 82/4, 3rd Baptist Lane, Beddagane, Pita Kotte.
- What: Homepage prioritizes local hires. Added fleet (one Nissan Caravan, one Mercedes-Benz AMG C-Class), route/date/vehicle quote planner, guide arrangements, privacy, 404, 12 original sourced travel guides with search/topics/checklists/related articles. Fleet art is explicitly illustrative; specs and prices not invented.
- What: Replaced simulated success forms with actual WhatsApp draft handoff, native accessible dialog and mobile menu, fixed URL-aware tour filtering, removed unsupported ratings/accreditation/scarcity. Curated local image mapping fixes broken API uploads and irrelevant remote 404 photo. API client's existing user change preserved.
- Files: src/layouts, src/pages, src/components, src/scripts/site.ts, src/lib/{site,catalog,fleet,journal,travel-guides}.ts, src/styles/global.css, public branding and destination assets, scripts/postbuild.mjs, tests/site.spec.ts, playwright.config.ts, package files, README.md, .env.example.
- Verified: Production build 26 pages; Astro check 0 errors/warnings/hints; crawl checked 26 HTML pages and 31 internal targets, all HTTP 200. npm audit fix applied compatible security updates (0 vulnerabilities). Final expanded browser suite recorded below when complete.

## Current state — local hire release
- All website work is pending/uncommitted. Original src/lib/api.ts environment URL change preserved.
- Real production SITE_URL and phone/email confirmation are still needed before launch. Canonical/absolute social URLs and sitemap generation activate when SITE_URL is set at build time; domain is not guessed.
- WhatsApp requests require the visitor to press Send there. No server submission, payment, or booking confirmation.
- Guide source links and editorial planning advice are separated; no fabricated news feed. Photos of the actual fleet are not supplied; illustrated fleet cards say so.

## Commands — updated
- `npm run check`, `npm run build`, `npm test` (Playwright; serve production first with `npm run preview -- --host 127.0.0.1 --port 3005`).
- This host: `TEST_BASE_URL=http://localhost:3005 TEST_BROWSER_EXECUTABLE=/var/home/kythonlk/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome npm test`.
- `npm audit`; `npx astro dev --port 3003 --background`; manage Astro preview with `npx astro preview status/stop`.

## Gotchas — production checks
- API /uploads paths were remapped to missing /images assets; one remote Unsplash URL served an actual 404-themed photo. src/lib/catalog.ts now deliberately chooses relevant checked local covers by slug/country.
- Playwright version's expected browser may not be installed; TEST_BROWSER_EXECUTABLE selects an installed Chromium. Browser tests need elevated local-network/process permission in this environment.
- When checking images, force lazy images eager or scroll through each; a full-page screenshot alone can leave offscreen images unrequested. Disable Astro dev toolbar or use the production preview for accessibility tests.
- Use Playwright `toHaveTitle` for document titles; head title text locator produced empty text despite a valid browser title in this environment.
