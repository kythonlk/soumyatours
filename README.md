# Saumya Tours

Static Astro travel website for Sri Lanka journeys and Dambadiva pilgrimages. The owner’s logo and favicon are in the project root; optimized web copies are under `public/`.

## Development and checks

Requires Node >=22.12.0. Run `npm ci`, then `npm run dev -- --background`. Use `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop` to manage that background server. The requested port is 3003; Astro prints another port if it is occupied.

- `npm run check`: Astro and TypeScript diagnostics.
- `npm run build`: production output in `dist/`, followed by robots.txt and conditional sitemap generation.
- `npm run preview -- --host 127.0.0.1 --port 3005`: serve the built output.
- `npx playwright install chromium`: install the test browser once.
- `TEST_BASE_URL=http://localhost:3005 npm test`: verify pages at mobile/tablet/desktop widths, images, accessibility, navigation, filtering, and inquiry handoff. An existing browser can be selected with `TEST_BROWSER_EXECUTABLE=/absolute/path/to/chrome`.
- `npm audit`: dependency security check.

## Production configuration

Copy `.env.example` to `.env` and confirm the contact email, phone, and WhatsApp number with the owner before launch. The address is 82/4, 3rd Baptist Lane, Beddagane, Pita Kotte, Sri Lanka.

Set `SITE_URL` to the real HTTPS origin in the build environment. It enables absolute canonical/social URLs and `sitemap.xml`. No production domain is invented when it is unset. Upload `dist/` to a static host, serve over HTTPS, and configure its not-found response to use `404.html` with HTTP 404. Build-time environment changes require a rebuild. Never expose the Astro development server as the production server.

The catalog is fetched at build time from `PUBLIC_API_URL` using the existing API client. Without access, the client uses the existing fallback catalog; this can change the available routes and prices. Rebuild when tours change and verify the catalog before publishing. The catalog wrapper normalizes numeric fields and assigns relevant local destination photos, independent of broken or irrelevant remote uploads.

## Inquiries

The site does not take payments or create bookings. Forms validate details and open WhatsApp with an encoded draft. The traveler must review and send it there. A visible fallback link remains if popups are blocked. No delivery or booking confirmation is shown. Configure the correct WhatsApp number before release. Email links use the visitor’s email app.

## Source map

- `src/lib/site.ts`: shared public contact details.
- `src/lib/api.ts`: pre-existing tour API client and fallback data.
- `src/lib/catalog.ts`: normalized build-time catalog and curated local images.
- `src/layouts/Layout.astro`: metadata, navigation, footer, native inquiry dialog.
- `src/components/InquiryForm.astro`: shared inquiry fields.
- `src/scripts/site.ts`: menu, dialog, URL-aware filtering, WhatsApp handoff.
- `src/styles/global.css`: responsive brand system and reduced motion rules.
- `tests/site.spec.ts`: browser and WCAG A/AA checks.
- `public/images/credits.txt`: asset sources.

Content claims such as accreditation, ratings, stock scarcity, and guaranteed response times are not presented without verification. Individual itinerary details and prices still come from the existing catalog and need business review before launch. Privacy details describe the actual static inquiry flow; Google Fonts and third-party links retain their own policies.

## Local hires, fleet, and travel notes

The homepage prioritizes local hires. `/local-hires` has a WhatsApp quote planner and FAQs; `/fleet` lists one Nissan Caravan and one Mercedes-Benz AMG C-Class, as specified by the owner. Representative SVG illustrations are labeled; replace them with approved photos of the actual vehicles when available. No seating capacity, rate, model year, or driver package is invented.

`/guides` explains local guide and pilgrimage arrangements. `/news` contains original practical planning articles, rather than a fabricated live news feed. Article content is in `src/lib/journal.ts`. Update dates only when the content is reviewed.

Business and article JSON-LD, unique page titles/descriptions, crawlable internal links, responsive local images, and conditional sitemap/canonical support form the SEO foundation. Before public launch, set the real `SITE_URL`, verify the business contact information, and validate the deployed URL in Google Search Console. Keep the Google Business Profile address and service information consistent. Search positions cannot be guaranteed.

The guide library contains 12 sourced articles with topic filtering, search, related reading, and interactive planning checklists. Content is split between `src/lib/journal.ts` and `src/lib/travel-guides.ts`; sources appear on each guide page. Destination cards without a relevant approved photo use a labeled typographic cover. Avoid using unrelated travel photos or inventing current news, rates, schedules, and site-access promises.
