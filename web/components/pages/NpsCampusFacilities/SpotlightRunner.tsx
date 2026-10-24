"use client";

import { useEffect } from "react";

/**
 * This page's cursor effect: a soft light that follows the pointer inside
 * whichever bento card it's over, via two CSS custom properties the
 * card's own background gradient reads (see FacilitiesGrid.module.css).
 * Plain pointermove + CSS variables — no animation library needed for a
 * glow that should track the cursor with zero lag. Desktop/fine-pointer
 * only (touch devices have no persistent hover to spotlight).
 */
export default function SpotlightRunner() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const grid = document.getElementById("facilities-grid");
    if (!grid) return;

    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-spotlight-card]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    grid.addEventListener("pointermove", onMove);
    return () => grid.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
