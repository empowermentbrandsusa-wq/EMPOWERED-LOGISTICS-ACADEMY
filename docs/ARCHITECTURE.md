# Architecture and publishing

React + strict TypeScript + Vite, React Router, modular content records, lazy-loaded product routes and static prerendering. The original repository had only README.md; no application or dependencies existed to run or preserve.

- `src/components`: shared navigation, typography, actions, resource cards, terminology and diagrams.
- `src/data`: reviewed lessons, opportunities, journey, resources and qualitative vehicle comparisons. `courses.ts` keeps long curriculum content out of the initial homepage chunk.
- `src/lib`: pure financial models, search index and bounded local progress.
- `src/pages`: homepage, package journey, explorer, courses, resources, tools and guides.
- `src/entry-server.tsx` and `scripts/prerender.mjs`: generate HTML for every known route, distinct titles/descriptions/Open Graph text and an actual 404 document.
- `tests`: independent model expectations plus browser-level route, interaction, accessibility and viewport checks.
- `.github/workflows/quality.yml`: review gates and evidence artifacts for a pull request.

## Local commands

Use Node 24 and `npm ci`, then `npm run dev`. Review with `npm run lint`, `npm run typecheck`, `npm test`, `npm run check:content`, `npm run check:links`, `npm audit --audit-level=moderate`, `npm run build` and `npm run test:e2e`. Install Playwright Chromium using `npx playwright install chromium` where needed. `PLAYWRIGHT_EXECUTABLE_PATH` supports an existing browser binary in restricted environments. Playwright starts its own server.

## Publish

The build produces `dist/` with prerendered directories for known routes and `404.html`. Serve known route directories as index.html and unknown routes as 404.html with status 404. `_redirects` and `_headers` target compatible static hosts; other hosts need equivalent configuration. No site has been deployed by this repository build. The default asset paths assume a root-domain deployment. A repository-subdirectory deployment requires a deliberate base-path change and a full nested-route/asset check.

Set a trusted deployment origin before adding canonical URLs, sitemap and absolute social URLs. Page-specific titles/descriptions and Open Graph text are already generated. No generic or invented social image is included.

## Content maintenance

Update resources and review dates in `src/data/resources.json`; lesson dates in the course records. `check:content` flags aging reviews and validates resource references, HTTPS URLs, official-domain classification, lesson fields and mandatory content counts. Rebuild after changes. Research publication dates are optional when not stated. Never refresh the verification date without checking the resource. Curated JSON content records are the production source of truth. Review content edits directly rather than regenerating over maintained records.

## Future capabilities

Introduce accounts, private uploads, forms and shared saved state only through a deliberately designed backend (see SECURITY.md). No placeholder submission or fake dashboard is exposed. Courses are education, not accreditation. The proposal is a printable educational conversation aid, not an active investment solicitation or contracted carrier offer.
