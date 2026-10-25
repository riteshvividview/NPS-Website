# Young Authors mobile bookshelf preview

On 25 October 2026, the mobile and small tablet bookshelf interaction changed at widths up to 899px. Tapping a book now lifts its spine in place and opens a fixed preview containing the same book cover and student portrait. Other spines retain their positions. Above 899px, the existing inline desktop book opening remains in place.

The pre-change `Bookshelf.tsx` and `Bookshelf.module.css` are saved in the ignored `.local-backups/young-authors-mobile-preview-2026-10-25/` directory. To undo only this interaction, restore those two files and remove `web/components/pages/YoungAuthors/MobileBookPreview.tsx`. Preserve any later unrelated edits when restoring. The broader Young Authors revision has its own older backup at `.local-backups/young-authors-2026-10-24/`.
