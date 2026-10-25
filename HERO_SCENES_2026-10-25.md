# Careers and Young Authors hero scenes — 25 October 2026

Scope: only the two heroes. Careers uses a midnight-blue studio palette with a warm paper note, pencil, geometric shapes and a scroll-drawn growth sketch. Young Authors has an illustrated story atlas behind the existing interactive book. Decorative layers move and draw with scroll; neither hero is pinned. Reduced motion shows static completed drawings.

Recovery snapshot (ignored): `.local-backups/hero-scenes-2026-10-25/`.

To undo this revision selectively:
- Restore `AuthorsHero.tsx` to `web/components/pages/YoungAuthors/Hero.tsx` and `AuthorsHero.module.css` to its matching stylesheet.
- Restore `StandalonePages.tsx` to `web/components/pages/Programs/StandalonePages.tsx`.
- Remove revision-only `web/components/pages/shared/HeroScene.tsx`, `HeroScene.module.css`, and `web/components/pages/Programs/CareerHero.module.css` if no later code depends on them.
- Preserve any subsequent edits when restoring. Homepage, footer and mobile bookshelf work is separate.

Validation: production build passed; desktop and phone screenshots reviewed. Interaction checks cover book open/close, scroll drawing, reduced motion and horizontal overflow.
