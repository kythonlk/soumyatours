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
- Design refresh & SEO upgrades pending, uncommitted (`src/lib/api.ts` untouched/preserved).
- Built with Sri Lankan tropical modernism palette (`#ffffff` canvas, `#f4f5f1` stone, `#102a22` deep Ceylon canopy, `#c24604` accessible saffron, `#f5c352` gold on dark) and `Newsreader` + `Plus Jakarta Sans` typography following Anthropic's `frontend-design` skill.
- Production build outputs 26 static pages cleanly; `public/images` reduced from 3.9 MB to 916 KB by removing unused legacy assets and adding a 120 KB 1200×630 `og-cover.jpg` and swan `favicon.ico`.
- Launch prerequisites still open: set `SITE_URL` in production build env (activates canonicals, `sitemap.xml`, absolute OG/schema URLs), confirm real phone/WhatsApp/email, and supply real fleet & destination photos.

### 2026-11-21 — agy — Prioritize local trips on homepage & realistic fleet photography
- What: Reordered homepage sections so Sri Lanka trip packages are Section 2 (local Sri Lanka trips first in the 2-column grid, followed by the Dambadiva horizontal spotlight) and Fleet is Section 3, followed by the Hire Quote Planner (Section 4) and Planning strip (Section 5). Generated natural documentary-style Sri Lankan DSLR photos for both fleet vehicles (white Nissan Caravan NV350 on Colombo-suburb pebble driveway; black Mercedes-Benz AMG C-Class outside a tropical-modernist courtyard), optimized to WebP (~200 KB each), integrated into `FleetCards.astro`, and removed unused `VehicleArt.astro`.
- Files: `src/pages/index.astro`, `src/pages/fleet.astro`, `src/components/FleetCards.astro`, `src/lib/fleet.ts`, `src/styles/global.css`, `public/images/{fleet-nissan-caravan.webp,fleet-amg-c-class.webp,credits.txt}`, deleted `src/components/VehicleArt.astro`.
- Verified: `npm run check` (0 errors/warnings/hints across 30 files), `npm run build` (26 pages), `npm test` (8/8 Playwright + WCAG A/AA axe tests passed across 360/768/1440px), visual review on `/tmp/saumya-v3-*.png`.

### 2026-11-21 — agy — Frontend-design refresh, declutter, and SEO upgrade
- What: Applied Anthropic's `frontend-design` skill (`/tmp/skills-use-6wexjr/frontend-design/SKILL.md`) to break out of generic cream/terracotta defaults into a Sri Lankan tropical modernism visual system (`Newsreader` + `Plus Jakarta Sans`, crisp white `#ffffff`, limestone `#f4f5f1`, deep Ceylon canopy `#102a22`, accessible saffron `#c24604`).
- What (Removed unwanted parts): Removed top announcement bar, decorative hero sunburst (`✺`), hero photo overlay card blocking Sigiriya's Lion Paws, generic yellow travel-strip platitudes, bloated duplicate homepage sections (9 sections streamlined to 5), pasted-on footer logo sticker box, appended `↗` button arrows, duplicate CSS rules, duplicate image error listener in `site.ts`, empty `tools/` dir, 8 unused legacy assets in `public/`, and 4 stale multi-MB raw PNGs in project root.
- What (UI & SEO): Fixed awkward 1-card Dambadiva orphan grid with a full-width horizontal spotlight card; upgraded `VehicleArt.astro` SVGs to architectural studio side profiles; redesigned `/news` text covers as canopy/limestone monographs; added `Journeys` (`/tours`) to main nav; tightened page `<title>` lengths to <60 chars; added `BreadcrumbList`, `FAQPage`, `Service`, `TouristTrip`, `ItemList`, and `CollectionPage` JSON-LD schemas; added per-page `og:image`/`og:type`; generated `og-cover.jpg` (1200×630) and swan `favicon.ico`; added `<lastmod>` to `scripts/postbuild.mjs`.
- Files: `src/styles/global.css`, `src/layouts/Layout.astro`, `src/scripts/site.ts`, `src/components/{VehicleArt,FleetCards,HirePlanner,TourCard,InquiryForm}.astro`, `src/pages/{index,local-hires,fleet,guides,dambadiva-tours,tours,about,contact,privacy,404}.astro`, `src/pages/tour/[slug].astro`, `src/pages/news/{index,[slug]}.astro`, `scripts/postbuild.mjs`, `public/favicon.ico`, `public/images/{og-cover.jpg,credits.txt}`.
- Verified: `npm run check` (0 errors, 0 warnings, 0 hints), `npm run build` (26 pages in 659ms), full Playwright test suite (`8 passed` across 360/768/1440px, 0 axe WCAG A/AA violations, all images verified, interactive filters/forms/checklists passing), visual inspection of desktop & mobile screenshots (`/tmp/saumya-v2-*.png`).

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
- Final verification: all 8 Playwright tests passed (all published content at 360/768/1440px, image loading, WCAG A/AA axe checks, menus/dialog, tour filtering/history, inquiry handoff, fleet selection, and 12-guide search/checklists). Conditional SITE_URL sitemap/robots generation passed with an isolated fixture. Production domain remains unset intentionally.
- Teardown: stopped the owned production preview at port 3005 after tests; visual review completed on desktop and mobile screenshots in /tmp/saumya-*.png.
