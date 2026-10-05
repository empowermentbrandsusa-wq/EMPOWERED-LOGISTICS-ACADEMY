# Empowered Logistics Academy — implementation and review

Review date: October 4, 2026. Repository: empowermentbrandsusa-wq/EMPOWERED-LOGISTICS-ACADEMY. Local implementation branch: `feat/logistics-academy`.

## What was built

A React/TypeScript educational platform with 96 prerendered routes and a separate 404 document. The original repository contained only README.md; there was no existing application, stack, functionality or build to run. README.md is the only pre-existing file modified. All application, data, configuration, tests, visual assets and review documents are new.

| Surface           | Routes / scope                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Homepage          | `/` — brand, sourced 2025 parcel scale, package-system introduction and three entry CTAs                           |
| Package journey   | `/journey` — 17 interactive stages for a fictional sneaker order, with payer, service, cost and entry explanations |
| Opportunities     | `/opportunities`, 14 detail routes and `/opportunities/compare` — filters and qualitative tradeoffs                |
| Academy           | `/academy`, `/academy/carrier`, `/academy/warehouse`, 30 carrier lesson routes and 27 warehouse lesson routes      |
| Money and tools   | `/money`, `/tools`, `/tools/route`, `/tools/warehouse`                                                             |
| Partner proposal  | `/proposal` — market, entry scope, growth gates, readiness checklist, editable model and print/PDF action          |
| Startup           | `/start`, `/start/start-small`, `/start/business-registration`                                                     |
| Vehicle center    | `/vehicles` — seven vehicle classes with qualitative operational considerations                                    |
| Resources         | `/resources`, `/resources/government` — curated official, industry and media records                               |
| Personal learning | `/find-your-lane`, `/glossary`, `/progress`, `/search`                                                             |
| Organization      | `/partners`, `/about`, `/privacy`                                                                                  |

Every major educational surface has sources/further learning and next actions. Lessons include authored explanations, operating controls, a diagram, labeled scenario, costs, actions, knowledge check, completion control and previous/next navigation. Carrier lessons emphasize contract scope, custody, route allocation, labor, vehicle acceptance, insurance, working capital and staged growth. Warehouse lessons cover the requested 27 topics and lead into the simulator.

## Components and architecture

Reusable Layout, PageHead, ButtonLink, Badge, Flow, TermText/GlossaryTerm, ResourceCard, ActionCenter, checklist, calculator input/results and learning controls. The route-specific pages and guides are separate components; content is maintained in structured JSON/TypeScript records, not buried in page markup. Financial models are pure functions with strict typed inputs. Longer course data and major page modules are loaded separately from the homepage. Search indexes lessons, opportunities, resources, glossary terms, tools and pathways.

## Interactive features

- Step selection and previous/next movement through the complete parcel journey.
- Business explorer filters for vehicle access, interest, starting resources, responsibility, experience, facility access, staffing preference and B2B interest. Filters describe models; they do not determine eligibility or declare a winner.
- Side-by-side comparison of up to four models.
- Clickable money-flow participants with costs, capital and margin mechanics.
- Route and warehouse calculators with finite/nonnegative/range validation and honest zero-denominator behavior.
- Source bookmarks, carrier/warehouse lesson completion and fundamentals progress stored locally; corrupt/unavailable storage handled.
- Search queries in the URL, empty states, glossary definitions on focus/hover and Escape dismissal, native expandable navigation and learning sidebars.
- State selector for all 50 states plus DC. Georgia has formation/tax/transport/workers’ compensation resources; California, Florida and Texas have direct formation links; other states use verified official directories and an explicit coverage notice.
- Printable educational partner proposal with live page-memory assumptions.

## Research and sources

Reviewed original Pitney Bowes parcel data and official FMCSA, SBA, IRS, OSHA, Georgia, Census, BTS, USAGov and state-formation resources. Cross-checked safety registration separately from authority and coverage, formation separately from tax/local licensing, and worker classification separately from contractor labels. Reviewed Amazon facility explanations, CSCMP definitions, DHL returns education, a Saltbox facility example and AJC reporting on named Atlanta logistics entrepreneurs.

The 2026 Pitney Bowes report provides 23.1 billion U.S. parcels for **calendar 2025**. Daily and per-second values are derived from that annual figure using 365 days: about 63.3 million/day and 732/second. They are labeled calculated averages, not live counts or available route work. No invented market rates, premiums, profit margins or universal startup figures were published.

Resources record title, publisher/creator where provided, HTTPS destination, type/topic/classification, publication date when available, review date, credibility notes and related lesson IDs. External-link success is not a guarantee that a publisher’s content or current regulations never change. Historical media and company examples do not establish current pricing or universal requirements.

## Calculators and model limitations

**Route:** daily packages, stops, total miles, days, carrier compensation, loaded driver cost, fuel price/MPG, vehicle, insurance, maintenance, technology and administration. Outputs monthly revenue, driver/fuel costs, allocations, reserve, operating cost/income, margin, revenue at cost for the selected volume, contribution-based break-even days, revenue/package, revenue/stop, cost/stop and income/stop. Fixed allocations remain due during zero operating days. Nonpositive contribution does not produce invented break-even days.

**Warehouse:** square footage, annual rent/square foot, staff/count and loaded pay, utilities, coverage, racking/equipment allocations, software, security, vehicles, other occupancy/operating costs, assumed revenue, variable expense share and separate one-time setup cash. Outputs monthly fixed/variable cost, rent/labor, operating profit, margin and contribution-based break-even revenue. A 100% variable expense share is identified as having no positive contribution.

Neither model is an earnings guarantee, tax calculation, cash-flow forecast, valuation, loan quote or live contract offer. Financing structure, detailed invoice timing and income taxes require separate analysis. Quotes and budgets remain user assumptions.

## Three-pass review evidence

### Pass 1 — functionality and engineering

Strict TypeScript, ESLint, production client/SSR build, content integrity, 96-route prerender checks and numerical unit tests. Browser scenarios exercise every route, the journey, money flow, explorer filtering, lesson/quiz/progress/bookmarks, corrupt storage, calculators, search, state selection, comparison and unknown-route handling. Nested paths are loaded directly against the production preview. No uncaught JavaScript errors were observed in the route sweep.

### Pass 2 — content, research and UX

Reviewed payer/service/cost explanations, financial category labels, regulatory qualification language, resource destination/purpose and realistic launch/growth framing. Expanded lesson-specific operational controls, added official/company examples, kept Georgia’s guidance distinct from other states and included explicit unknown/unverified requirements. Simulated the requested visitor goals through pathway inspection: current driver to carrier course, SUV to start-small/vehicle guide, warehouse interest to its course and simulator, partner to proposal, 3PL to glossary/profile and source-seeker to resource center. This was an internal editorial/UX review, not a review performed by an outside logistics expert or operator.

### Pass 3 — production, accessibility and security

Production browser viewport checks at 320×640, 375×812, 390×844, 430×932, 412×915, 768×1024, 1366×768, 1920×1080 and 2560×1440 across five representative surfaces (45 layout combinations). Corrected the narrow-screen homepage overflow. Reviewed desktop/mobile screenshots. Automated axe WCAG A/AA-related scans cover eight representative pages; reduced-motion rendering and keyboard mobile-menu open/Escape behavior are exercised. Input labels, semantic headings, native menus, focus visibility, scrollable comparison tables, readable mobile journeys and glossary dismissal are implemented. These checks are not a WCAG certification or a manual screen-reader audit.

Security source review covers escaping, URLs, numeric limits, browser-storage parsing, no public credentials and no unnecessary identity collection. Pattern scanning found no unsanitized HTML, dynamic evaluation, supported secret patterns or application console logging. Dependency audit found zero known vulnerabilities. CSP/response-header templates are supplied for compatible hosts; actual deployment enforcement has not been tested because the site is not deployed. CSRF/auth/upload controls are not claimed for nonexistent endpoints; the future server boundary is documented in SECURITY.md.

### Adversarial cases covered

Zero and negative inputs, nonfinite and oversized values, invalid unit counts, zero MPG, zero operating days, zero revenue, losses, 100% variable cost, corrupt local data, no-match search/filter states, unknown routes, direct nested-route loads, very small/large viewports and keyboard menu controls. Actual hardware/device browsers, assistive-technology sessions, network-failure injection and a live host remain outside this environment’s verification.

## Executed results

| Check                         | Result                                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| TypeScript                    | Passed                                                                                                                      |
| ESLint                        | Passed                                                                                                                      |
| Unit tests                    | 14 passed                                                                                                                   |
| Browser scenarios             | 6 passed against production preview                                                                                         |
| Route sweep                   | All 96 public routes load with headings; no uncaught page errors                                                            |
| Responsive layouts            | 45 tested page/viewport combinations pass overflow checks                                                                   |
| Automated accessibility       | Eight representative pages: zero axe violations for the configured WCAG-related tags                                        |
| Content integrity             | 30 carrier lessons, 27 warehouse lessons, 17 stages, 14 opportunities, 32 resources; no missing references/mandatory fields |
| External links                | 32/32 successful on 2026-10-04; hardened recheck on 2026-10-05 returned 31 and one AJC timeout; no 404/410 results            |
| Source/security pattern check | 36 source/data files checked; zero pattern findings                                                                         |
| Dependencies                  | Zero known vulnerabilities in the executed audit                                                                            |
| Production build              | Passed; 96 prerendered routes plus 404                                                                                      |
| Built route/metadata/assets   | Passed; lesson metadata matches its rendered content                                                                        |

Evidence: browser-results.json, link-check.json, dependency-audit.json, security-check.json, routes.json and home-desktop.jpg/home-mobile.jpg in this directory. Pull request #1 was opened on October 5, 2026. Its first CodeQL review identified five build-script hardening findings: an overly broad USPS hostname suffix, two metadata extraction sanitization patterns and two link-checker data-flow concerns. All five were addressed locally before the follow-up review by using an exact hostname rule, explicit route metadata with HTML encoding, and an exact reviewed URL allowlist with bounded response recording.

## Performance and SEO

Measured build output: initial application JavaScript approximately 327.5 kB raw / 101.4 kB gzip; shared stylesheet approximately 26.8 kB raw / 6.5 kB gzip; curriculum module approximately 102.8 kB raw / 21.8 kB gzip loaded separately. Main image is about 528 KiB and served locally with stable dimensions. Major page modules are split; videos do not autoplay or fetch an embedded player on initial load. Fonts currently load from Google Fonts with fallbacks.

All known pages have prerendered HTML, titles, descriptions and Open Graph text. No Lighthouse score, live LCP, mobile-network benchmark or SEO ranking is claimed. Trusted-origin canonical URLs/sitemap and live-host header/status checks are deferred until a deployment origin exists. Repository-subdirectory hosting needs an explicit base-path configuration and verification.

## Demonstration boundaries and remaining limitations

- Package order and proposal are educational scenarios. No active fleet, route inventory, client list, carrier approval or earnings guarantee is represented.
- Financial results come from page-memory assumptions. No payments, lender feed, contract-rate feed or quote backend exists.
- Learning/bookmarks are device-local. No account, shared database, email capture, upload portal or contact submission is present.
- State-specific depth is strongest in Georgia. Complete direct formation/tax/labor/transport/local resources for all other states remain editorial work.
- Video/media collection is deliberately small: official videos, a company tour and a local facility example. Further operator interviews need verification and editorial review.
- Hosted headers, canonical URLs, real 404 statuses, production caching and origin privacy disclosures need deployment validation.
- Deployment remains intentionally pending; pull request #1 is open and must not merge until its follow-up quality and security checks complete.
- Internal editorial and automated browser reviews do not replace expert logistics/legal/tax/insurance review, penetration testing, screen-reader testing or hardware-based mobile verification.

## Five strongest parts

1. Complete post-purchase handoff journey connects physical work to the business and payer.
2. Carrier pathway translates delivery work into contracting, operating and growth responsibilities.
3. Transparent financial tools expose costs, zero cases, contribution and user assumptions without promised income.
4. Structured sources distinguish original official information, company examples and practitioner reporting.
5. Premium responsive interface, search and local progress support understandable learning without mandatory registration.

## Five areas to improve next

1. Obtain external operator and subject-matter review of the curriculum.
2. Extend direct state/local resource coverage beyond the strongest initial jurisdictions.
3. Curate more credible, culturally relevant operator videos and real case studies.
4. Validate actual devices, screen readers, cross-browser behavior and real mobile-network performance.
5. Publish with a trusted origin and verified production headers, caching, status behavior and privacy disclosures.

## Next 10 development priorities

1. Review the GitHub quality checks, CodeQL findings and Copilot feedback; resolve actionable issues.
2. Select the hosting origin and publish the reviewed release; validate deep links and assets.
3. Confirm production security headers, 404 status, cache policy, canonical URLs and sitemap.
4. Arrange independent carrier/warehouse curriculum review and record outcomes honestly.
5. Expand all-state formation, tax, employment, transport and local licensing records with fresh verification.
6. Add vetted operator interviews, facility tours and transcripts where the academy owns media.
7. Add workbook-style carrier-packet, contract-question and cash-timing exercises using synthetic data.
8. Extend sensitivity/scenario modeling and a separate cash-flow tool with tested accounting assumptions.
9. Run Safari/Firefox, screen-reader and actual-device checks and real-network performance measurements.
10. Introduce editorial review tools and, if needed, authenticated cross-device progress through a reviewed backend.

## Official / primary government resources

- [Do I need a USDOT number?](https://www.fmcsa.dot.gov/registration/do-i-need-usdot-number) — FMCSA; reviewed 2026-10-04.
- [Get operating authority](https://www.fmcsa.dot.gov/registration/get-mc-number-authority-operate) — FMCSA; reviewed 2026-10-04.
- [Insurance filing requirements](https://www.fmcsa.dot.gov/registration/insurance-filing-requirements) — FMCSA; reviewed 2026-10-04.
- [Launch your business](https://www.sba.gov/counseling/launch-your-business/) — U.S. Small Business Administration; reviewed 2026-10-04.
- [Plan your business](https://www.sba.gov/counseling/plan-your-business/) — U.S. Small Business Administration; reviewed 2026-10-04.
- [Break-even point](https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point) — U.S. Small Business Administration; reviewed 2026-10-04.
- [Get an employer identification number](https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number) — Internal Revenue Service; reviewed 2026-10-04.
- [Small business and self-employed tax center](https://www.irs.gov/businesses/small-businesses-self-employed) — Internal Revenue Service; reviewed 2026-10-04.
- [Register a Georgia LLC](https://georgia.gov/register-llc) — Georgia.gov; reviewed 2026-10-04.
- [Register a new business in Georgia](https://dor.georgia.gov/taxes/register-new-business-georgia) — Georgia Department of Revenue; reviewed 2026-10-04.
- [Workers’ compensation insurance FAQs](https://sbwc.georgia.gov/frequently-asked-questions/workers-compensation-insurance-faqs) — Georgia State Board of Workers’ Compensation; reviewed 2026-10-04.
- [Motor carrier compliance](https://dps.georgia.gov/motor-carrier-compliance) — Georgia Department of Public Safety; reviewed 2026-10-04.
- [Employee or independent contractor?](https://www.dol.gov/agencies/whd/flsa/misclassification) — U.S. Department of Labor; reviewed 2026-10-04.
- [Warehousing safety](https://www.osha.gov/warehousing) — Occupational Safety and Health Administration; reviewed 2026-10-04.
- [Powered industrial trucks](https://www.osha.gov/powered-industrial-trucks) — Occupational Safety and Health Administration; reviewed 2026-10-04.
- [Retail and e-commerce data](https://www.census.gov/retail/data.html) — U.S. Census Bureau; reviewed 2026-10-04.
- [Freight transportation data](https://www.bts.gov/topics/freight-transportation) — Bureau of Transportation Statistics; reviewed 2026-10-04.
- [State government directory](https://www.usa.gov/state-governments) — USAGov; reviewed 2026-10-04.
- [Local government directory](https://www.usa.gov/local-governments) — USAGov; reviewed 2026-10-04.
- [Starting a business in California](https://www.sos.ca.gov/business-programs/business-entities/starting-business) — California Secretary of State; reviewed 2026-10-04.
- [Start a business in Florida](https://dos.fl.gov/sunbiz/start-business) — Florida Department of State; reviewed 2026-10-04.
- [Texas business filings](https://www.sos.state.tx.us/corp/do-business.shtml) — Texas Secretary of State; reviewed 2026-10-04.
- [SAFER company snapshot](https://safer.fmcsa.dot.gov/CompanySnapshot.aspx) — FMCSA; reviewed 2026-10-04.
- [New entrant program videos](https://www.fmcsa.dot.gov/carrier-safety/new-entrant/new-entrant-program-videos) — FMCSA; reviewed 2026-10-04.
- [Business shipping resources](https://www.usps.com/business/business-shipping.htm) — USPS; reviewed 2026-10-04.

## Industry / original company resources

- [Parcel Shipping Index · 2026 report](https://www.pitneybowes.com/us/shipping-index.html) — Pitney Bowes; reviewed 2026-10-04.
- [Guided fulfillment-center video tour](https://www.aboutamazon.com/news/operations/join-our-team-on-a-guided-video-tour-through-a-fulfillment-center) — Amazon; reviewed 2026-10-04.
- [Inside fulfillment with Hassan Davis](https://www.aboutamazon.com/news/operations/amazon-fulfillment-center-photo-tour) — About Amazon; reviewed 2026-10-04.
- [Reverse logistics explained](https://lot.dhl.com/reverse-logistics-explained/) — DHL Logistics of Things; reviewed 2026-10-04.
- [Supply chain definitions and glossary](https://cscmp.org/CSCMP/cscmp/educate/scm_definitions_and_glossary_of_terms.aspx) — CSCMP; reviewed 2026-10-04.
- [Saltbox Atlanta facility and virtual tour](https://www.saltbox.com/location/atlanta-upper-westside) — Saltbox; reviewed 2026-10-04.

## Media / practitioner reporting

- [Local Black-owned logistics hubs](https://www.ajc.com/news/business/local-black-owned-logistics-hubs-help-support-small-businesses/QLS36NM775A6DOVBQ7RHA7QURE/) — The Atlanta Journal-Constitution; reviewed 2026-10-04.
