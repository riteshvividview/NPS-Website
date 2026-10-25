# Header redesign — 25 October 2026

The shared header now uses an ivory floating bar, illustrated desktop dropdowns, photo previews and the existing cursor-tracking eyes. Mobile/tablet navigation uses a deep-green panel with a sweep reveal, staggered links, numbered sections and expanding submenus. All pages share the 1100px breakpoint.

Existing link destinations and eye tracking are preserved. Added submenu inert states, focus cycling while the mobile menu is open, Escape handling, nested-link close handling, scroll-trigger cleanup and reduced-motion styles.

## Selective rollback

Pre-change snapshots are ignored under `.local-backups/header-premium-2026-10-25/`:
- `Header.tsx`
- `Header.module.css`
- `useHeaderInteractions.ts`

Restore them to `web/components/layout/Header/`, preserving later edits if present. This snapshot includes the earlier homepage mobile-header fixes. Do not revert unrelated homepage, footer, bookshelf or hero work.

## Verification

Desktop and mobile screenshots checked at 1440, 1150, 1024, 768, 390 and 320px. No document overflow. Mobile accordion and Escape close behavior checked. Production build passes.

Follow-up: added separate floating Parent Login and Digital Library shortcuts, using MyClassboard and the library destination linked by the existing official school site. Updated `web/content/header.ts` (Parent Login was previously `#`). Each dropdown now draws a distinct subject instead of a repeated trail. Mobile navigation uses `data-lenis-prevent`, native pan-y scrolling and non-shrinking rows. Verified actual wheel and emulated touch gestures at 358x608 reach the menu bottom while the page stays stationary. To revert this follow-up with the header snapshot, also remove `digitalLibraryHref` from the content type/object; retain the corrected Parent Login destination.
