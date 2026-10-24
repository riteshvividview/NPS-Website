# Homepage loading and navigation checkpoint - 2026-10-24

Rollback snapshot: revert/experience-2026-10-24/ (paths mirror the repository).
This snapshot was taken before this loader/cache/transition/loop change. It preserves the preceding full-width hero image adjustment and the previous slider implementation. Do not use a broad Git reset: other work may have been added since.

## Restore this change
Copy these snapshot files over their matching repository paths:
- web/components/home/Hero/Hero.tsx
- web/app/page.tsx
- web/next.config.ts
- web/components/pages/shared/RouteTransitionRunner.tsx
- web/components/pages/shared/PageEntranceRunner.tsx

Then remove only these newly introduced files if nothing else uses them:
- web/components/home/HomeLoader.tsx
- web/components/home/HomeLoader.module.css
- web/components/home/HomeReadyAnimations.tsx
- web/components/pages/shared/RouteTransition.module.css

Restart Next.js after restoring next.config.ts. Hero.module.css is also snapshotted as a reference, but this change did not modify its existing full-width image setting.

## Behavior
- Bidirectional carousel clones, guarded transitions, transition-end reset and timeout fallback; 4-second autoplay begins after homepage readiness. Manual interaction pauses autoplay; Space resumes. Reduced motion uses immediate changes.
- Loader tracks selected responsive image resources (including hidden carousel images), CSS background artwork, fonts and video playable readiness. Image errors settle so missing artwork cannot deadlock navigation. Percentage counts completed resource tasks, not download bytes. No artificial wait beyond a 250ms completion beat and an 800ms reveal.
- All currently rendered homepage images switch to eager loading during preparation. Images not mounted until interaction and other pages' galleries retain their existing loading behavior. This does not fetch unused sky frames or every gallery image.
- Continue becomes available at 6 seconds; a 25-second safety exit opens the page if requests stall. These exits do not claim 100% completion. Outstanding image requests continue in the browser.
- Homepage animations mount after readiness. Loader blocks background interaction and respects reduced motion; no-JavaScript visitors bypass it.
- Green/gold SVG ink sweep covers client route navigation, then reveals the new route. Route prefetch on hover/focus remains. Timeout releases the curtain if navigation stalls.
- Browser/CDN headers: public media max-age=3600, stale-while-revalidate=86400. Next optimized images minimumCacheTTL=14400. Content-hashed imports version hero photos on replacement. Other same-name assets can remain cached until expiry: use a new filename for immediate publication updates.
- Cache retention depends on the browser and deployment; no service worker/offline cache, no Cloudflare migration and no CMS changes. Preloading shifts download time before entry; it does not reduce total image bytes or guarantee faster CPU animation rendering.

## Validation
Production build and TypeScript passed. Browser checked desktop loader, 72 loaded homepage image elements, three consecutive keyboard forward cycles, reverse navigation and a gallery route change without runtime errors. Additional mobile/production validation recorded in the task response.

Production mobile validation: nine consecutive drag changes crossed the forward boundary twice; no horizontal overflow. Raw assets returned public max-age=3600 with stale-while-revalidate=86400. Hashed optimized hero image returned HTTP 200 with immutable caching. Gallery and return-home navigation passed without runtime errors. Continue bypass and reduced-motion keyboard cycling passed. Desktop/mobile loader and ink transition screenshots were visually reviewed.
