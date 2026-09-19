"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Decorative-layer scroll motion for Our People — each element gets its
 * own dedicated tween rather than one shared subtle depth loop:
 *  - pen box: drifts up and rocks slightly.
 *  - books: drifts up-left with a small rotation, like being nudged.
 *  - globe: slides straight out to the right (no zoom, no rotation) as
 *    the section scrolls through — sits above everything else (z-index
 *    in CSS) since it's meant to visibly fly out over the rest of the
 *    section.
 *
 * Trigger creation is deferred a couple of frames for the same reason
 * documented in components/home/WhyUs/useWhyUsAnimations.ts: creating a
 * ScrollTrigger before the Hero's pin-spacer (built in useHomeAnimations,
 * a sibling mounted earlier in the tree) exists bakes in stale pixel
 * positions that don't self-correct later.
 */
export function useOurPeopleParallax() {
  useEffect(() => {
    const section = document.getElementById("our-people");
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cancelled = false;
    const triggers: ScrollTrigger[] = [];
    let raf2 = 0;

    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;

        const scrollTriggerBase = {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        };

        const penbox = document.getElementById("people-penbox");
        if (penbox) {
          const t = gsap.fromTo(
            penbox,
            { yPercent: 40, rotate: -6 },
            { yPercent: -55, rotate: 6, ease: "none", scrollTrigger: scrollTriggerBase }
          );
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        }

        const books = document.getElementById("people-books");
        if (books) {
          const t = gsap.fromTo(
            books,
            { yPercent: 35, xPercent: -8, rotate: -3 },
            { yPercent: -50, xPercent: 6, rotate: 2, ease: "none", scrollTrigger: scrollTriggerBase }
          );
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        }

        const globe = document.getElementById("people-globe");
        if (globe) {
          // Deliberately NOT scrollTriggerBase — that range (top bottom to
          // bottom top) covers the section's entire enter-to-exit scroll
          // distance, and this section is short, so by the time it's
          // actually visible/centered on screen a large chunk of that
          // range was already consumed — the globe had already zoomed
          // and flown off before anyone could see it start. Starting at
          // "center center" (the section settled into a normal viewing
          // position) instead means it stays put while being looked at,
          // then flies out only once the user keeps scrolling past it.
          //
          // scrub: 1 (not true) — a numeric scrub adds GSAP's own lag on
          // top of Lenis's, so the globe eases toward the scroll-driven
          // target instead of snapping exactly to it on every tick, which
          // reads as a smooth glide instead of a sudden jump on fast
          // scrolls. Same "settle" technique already used for the boy/
          // globe-style decorative layers in Section2
          // (components/home/useHomeAnimations.ts) — safe here since this
          // globe isn't synced to any other element.
          const t = gsap.fromTo(
            globe,
            { xPercent: 0 },
            {
              xPercent: 220,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "center center",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        }
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
