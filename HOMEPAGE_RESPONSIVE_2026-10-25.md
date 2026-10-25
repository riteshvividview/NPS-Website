# Homepage responsive revision

This revision starts from commit `248e515` on 25 October 2026. It changes only the homepage experience and the homepage-specific tablet header styling. The original desktop compositions remain in place. New portrait artwork lives in `web/public/Home Page/08-responsive/`.

## Rollback

The pre-change source snapshot is ignored by Git at `.local-backups/home-responsive-2026-10-24/`. Its `web/components/` directory is a copy of **the contents** of `web/components/home/`; restore those files into `web/components/home/`. Restore the header stylesheet from `header/Header.module.css` into `web/components/layout/Header/Header.module.css`. Then remove the revision-only `web/components/home/ResponsiveArtwork.tsx` and `web/public/Home Page/08-responsive/`. `web/app-page.tsx` and `web/home-content.ts` in the snapshot are reference copies; those live files did not change in this revision.

If the snapshot is unavailable, restore the same tracked homepage and header files from `248e515`, then remove the revision-only component and media folder. Restore selectively if later homepage work should survive.

## Scope

- Portrait compositions for the four hero slides and the two illustrated sections at phone and tablet sizes; the desktop art and source image files remain. The admissions slide shows its existing message and button below the full poster on phones so its image-and-copy layout fills the same height as the other slides.
- Phone slides 2 and 3 center their existing copy within the shared slide height; slide 3 also shows its existing label and description.
- Normal flowing layouts on smaller screens, two-column cards, and a compact two-card Beyond the Classroom carousel.
- The second section's heading overlays the portrait illustration on phones and tablets; its separate green heading band was removed. The values remain in a two-column row below the art.
- Whole-element text reveals, earlier triggers, quick transitions, and skipped desktop parallax at smaller widths.
- Visible homepage media prioritized by the existing loader; hidden desktop video and layers are skipped on smaller screens.

The new media are Magnific outputs generated for this revision. The source reference artwork is unchanged.

On 25 October, the dark fade baked into the phone artwork for slides 3 and 4 was removed. The clear replacements are `friendship-mobile-clear.webp` and `computer-mobile-clear.webp`; the prior phone files are preserved in the ignored `.local-backups/hero-mobile-fades-2026-10-25/` directory. Restore those files and revert the `ResponsiveArtwork.tsx` source selection to undo just this adjustment.

The phone artwork for slide 2 now uses `admissions-mobile-no-grass.webp`, converted from Magnific creation `1lWBbZbr4r`. The previous `admissions-mobile.webp` remains in the media folder for a quick rollback; change the `ResponsiveArtwork.tsx` source selection back to that filename to restore it.

The mobile methodology illustration card and reading boy placement are isolated to the final `@media (max-width: 640px)` block in `TeachingMethodology.module.css`. Remove that block to restore the previous mobile placement without affecting desktop styling.

The "People Who Make Possibilities" handwritten note is larger and split after its final space on phones. Revert the `noteLeft` markup in `OurPeople.tsx` and its final mobile rules in `OurPeople.module.css` to restore the earlier one-line note.

The phone-only spacing pass for Our People and its handoff into Life At Niraj is contained in the final `@media (max-width: 640px)` blocks of `OurPeople.module.css` and `LifeAtNiraj.module.css`. Those overrides can be removed independently to restore the previous spacing.
