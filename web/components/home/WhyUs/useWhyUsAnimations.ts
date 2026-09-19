"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * This section is a normal flowing layout (not a fixed-aspect stage like
 * Hero/Section2/Section3 — its height changes with the accordion, which
 * doesn't suit a rigid pixel canvas). The decorative layers (.deco in
 * WhyUs.tsx) each carry a data-depth attribute, so this hook parallaxes
 * them automatically — same depth-based pattern as Section2/Section3 (see
 * components/home/useHomeAnimations.ts) — except the rocket
 * (#why-us-rocket), which gets its own dedicated exit tween instead: it
 * flies off-screen to the top-right as the section scrolls through, the
 * same "special tween, not the shared loop" treatment Section3 gives its
 * plane/top-left branch.
 *
 * Trigger creation is deferred a frame (see below) — this section's
 * effect fires before the Hero's own effect (useHomeAnimations, a sibling
 * mounted later in the tree) builds its pin-spacer, which adds ~2200px to
 * the document. Creating ScrollTrigger instances immediately here bakes in
 * pixel positions measured against that shorter, pre-pin document — and
 * neither a later ScrollTrigger.refresh() call nor a synthetic resize
 * event actually corrects an already-created trigger's cached start/end in
 * practice (confirmed by direct testing). Waiting a frame before creating
 * them in the first place sidesteps the problem entirely.
 */
export function useWhyUsAnimations() {
  useEffect(() => {
    const section = document.getElementById("why-us");
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const triggers: ScrollTrigger[] = [];
    let cancelled = false;
    let raf2 = 0;

    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;

        const rocket = document.getElementById("why-us-rocket");
        if (rocket) {
          const tween = gsap.fromTo(
            rocket,
            { xPercent: 0, yPercent: 0, rotate: 0 },
            {
              xPercent: 70,
              yPercent: -140,
              rotate: 12,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        const parallaxLayers = section.querySelectorAll<HTMLElement>(
          "[data-depth]:not(#why-us-rocket)"
        );

        parallaxLayers.forEach((el) => {
          const depth = parseFloat(el.dataset.depth || "0") || 0;
          const tween = gsap.fromTo(
            el,
            { yPercent: 14 * depth },
            {
              yPercent: -14 * depth,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        });
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      triggers.forEach((st) => st.kill());
    };
  }, []);
}
