"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Decorative-layer scroll motion for Beyond the Classroom:
 *  - rocket ([data-depth]): shared vertical depth-parallax, same pattern as
 *    Section2/Section3/WhyUs.
 *  - desk strip (#beyond-desk): dedicated tween, drifts LEFT on scroll.
 *  - books (#beyond-books): dedicated tween, drifts RIGHT and zooms in.
 * The desk/books get their own tweens (not the shared depth loop) because
 * their motion isn't just "yPercent by depth" — same "special tween"
 * treatment Section3 gives its plane/top-left branch.
 *
 * Trigger creation is deferred a couple of frames for the same reason
 * documented in components/home/WhyUs/useWhyUsAnimations.ts: creating a
 * ScrollTrigger before the Hero's pin-spacer (built in useHomeAnimations, a
 * sibling mounted earlier in the tree) exists bakes in stale pixel
 * positions that don't self-correct later.
 */
export function useBeyondClassroomParallax() {
  useEffect(() => {
    const section = document.getElementById("beyond-classroom");
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

        const layers = section.querySelectorAll<HTMLElement>("[data-depth]");
        layers.forEach((el) => {
          const depth = parseFloat(el.dataset.depth || "0") || 0;
          const tween = gsap.fromTo(
            el,
            { yPercent: 60 * depth },
            { yPercent: -60 * depth, ease: "none", scrollTrigger: scrollTriggerBase }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        });

        const desk = document.getElementById("beyond-desk");
        if (desk) {
          const tween = gsap.fromTo(
            desk,
            { xPercent: 6 },
            { xPercent: -16, ease: "none", scrollTrigger: scrollTriggerBase }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        const books = document.getElementById("beyond-books");
        if (books) {
          const tween = gsap.fromTo(
            books,
            { xPercent: -6, scale: 1 },
            { xPercent: 10, scale: 1.15, ease: "none", scrollTrigger: scrollTriggerBase }
          );
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
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
