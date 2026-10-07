# Visual Experience Redesign Plan

## 1. Preserve

- The structured data layer: 32 curated resources, 17 package-journey stages, 14 opportunity profiles, 30 carrier lessons, 27 warehouse lessons, glossary definitions, vehicle data and centralized parcel statistics.
- All 96 public routes, prerendering, route metadata, custom 404, security headers and GitHub/Netlify deployment architecture.
- Search, saved resources, local learning progress, calculators, business comparison, state registration guide, proposal, accessibility behavior and automated quality checks.
- Verified language that distinguishes facts, requirements to verify, educational examples and assumption-based financial models.

## 2. Current UX problems

- The homepage explains the system but does not let the package itself lead the story.
- Journey and money pages expose dense grids of detail before a visitor has formed a mental model.
- Opportunity discovery begins with eight filters instead of a short, motivating conversation.
- Course indexes are accurate but read like long lesson directories.
- Desktop navigation exposes nine categories; mobile navigation inherits that complexity.
- Strong sources appear before the visitor has completed the main narrative, interrupting momentum.

## 3. Transform

- Turn the homepage into a sequence: hook, moving package, system reveal, scale, ownership pathway, economics and next step.
- Turn Follow a Package into a stage rail with one primary fact and user-selected detail layers.
- Turn Follow the Money into an explicitly illustrative $100 story with selectable participants and clear caveats.
- Turn Find Your Lane into a five-question discovery flow that surfaces matches without declaring a winner.
- Add a visual carrier progression and a warehouse-versus-fulfillment process comparison before course lists.
- Move deep detail behind purposeful controls while keeping every existing lesson and source available.

## 4. Interaction system

- `StoryScene`: full-width, high-contrast narrative moments with one idea.
- `PackageTrack`: a semantic ordered flow with a package as the visual anchor.
- `RevealPanel`: keyboard-accessible progressive disclosure for business, cost, risk and entry layers.
- `ChoiceFlow`: one question at a time with back/reset controls and transparent matching logic.
- `PathwayRail`: selectable maturity stages that explain what changes next.
- `ProcessCompare`: paired visual processes before deeper explanation.
- `BookOffer`: content-ready, non-transactional future offer with no invented title, price, artwork or link.

## 5. Homepage storytelling

1. “You just pressed BUY NOW.”
2. A package crosses six understandable system chapters.
3. “Every handoff is work. Some handoffs are businesses.”
4. Verified parcel scale appears as evidence, not as the opening burden.
5. The visitor chooses: follow the package, follow the money or find a lane.
6. A driver-to-carrier pathway makes ownership progression concrete.
7. Route economics reinforces disciplined decision-making.
8. Book/carrier/explore choices appear only after educational value is delivered.

## 6. Signature experiences

- **Follow a Package:** 17 retained stages, horizontal/touch stage rail, animated package position, one-sentence scene, selectable detail categories, persistent next/previous controls and full text equivalents.
- **Follow the Money:** illustrative $100 purchase, visible separation of product revenue and logistics costs, selectable participants, six retained business dimensions and a route-model handoff.
- **Find Your Lane:** questions about preferred work, vehicle/facility ownership, people management, operating mode and starting scale; ranked relevance only, never eligibility or “best” claims.
- **Carrier pathway:** driver → owner-operator → first route → business owner → first driver → multiple routes → carrier → fleet → direct clients, with changing responsibilities, risks, skills and next actions.

## 7. Navigation

- Primary: Home, Follow a Package, Follow the Money, Find Your Lane, Start a Carrier, Tools, Resources.
- Secondary destinations remain available in a single “Explore the Academy” menu and the footer.
- Mobile uses a compact menu with clear experience-first grouping and minimum 44px targets.

## 8. Mobile and motion

- Compose for 320–430px first: vertical scenes, sticky-but-nonblocking progress, swipe-friendly rails, no hover dependency and no dense tables in primary experiences.
- Use CSS transforms, opacity and lightweight SVG/CSS shapes; no animation library.
- Motion communicates custody, distance, sorting, money separation and business growth.
- `prefers-reduced-motion` removes travel/scroll effects while preserving position, sequence and text.

## 9. Accessibility

- Semantic ordered lists for flows; buttons for every selection; visible current state; live regions only for user-initiated changes.
- Full textual meaning accompanies every visual; diagrams never carry unique information alone.
- Logical focus and reading order, strong focus styles, labeled progress and touch-sized controls.

## 10. Performance

- Reuse existing local imagery and icons; avoid video autoplay and new animation dependencies.
- Lazy-load noncritical media, keep transforms compositor-friendly and preserve route code splitting and prerendering.
- Monitor initial bundle and route chunks after implementation.

## 11. Book and paid pathway

- Add a premium placeholder-ready book section only after the main educational journey. It clearly says details are forthcoming and provides no fake purchase link.
- Present the carrier course as a future deeper pathway without pricing, checkout or locked content. Preserve the free 30-lesson course during this phase.

## 12. Testing and implementation order

1. Experience components and navigation.
2. Homepage.
3. Package journey.
4. Money flow.
5. Opportunity discovery.
6. Carrier and warehouse course landing experiences.
7. Book and paid-path presentation.
8. Responsive/accessibility/performance refinement.
9. Engineering, education/UX and production-quality review passes.
10. Five-weakest-aspects improvements, then full lint, type, unit, content, security, link, browser and production-build gates.
