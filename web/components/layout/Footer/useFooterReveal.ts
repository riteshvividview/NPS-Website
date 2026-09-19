"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer entrance: columns fade/rise in with a stagger, the wave quote
 * follows shortly after, and the photo band gets a gentle zoom-out (scale
 * 1.12 -> 1) as it scrolls into view — all one-time reveals via
 * ScrollTrigger, not scrubbed/pinned.
 *
 * Trigger creation is deferred a frame for the same reason documented in
 * components/home/WhyUs/useWhyUsAnimations.ts: an effect that creates a
 * ScrollTrigger before the Hero's pin-spacer (built in useHomeAnimations)
 * exists bakes in stale pixel positions that don't self-correct later.
 * The footer's effect happens to fire after Home's in practice (it's the
 * last sibling in the layout), but deferring here too is cheap insurance
 * against that ordering assumption changing.
 */
export function useFooterReveal() {
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cancelled = false;
    const triggers: ScrollTrigger[] = [];
    let raf2 = 0;

    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;

        const revealEls = footer.querySelectorAll<HTMLElement>(".js-footer-reveal");
        const tween1 = gsap.to(revealEls, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
          },
        });
        if (tween1.scrollTrigger) triggers.push(tween1.scrollTrigger);

        const waveQuote = footer.querySelector<HTMLElement>(".js-wave-quote");
        if (waveQuote) {
          const tween2 = gsap.to(waveQuote, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#footer-photo-band",
              start: "top 75%",
            },
          });
          if (tween2.scrollTrigger) triggers.push(tween2.scrollTrigger);
        }

        const photo = footer.querySelector<HTMLElement>(
          "#footer-photo-band .js-photo-zoom"
        );
        if (photo) {
          gsap.set(photo, { scale: 1.12 });
          const tween3 = gsap.to(photo, {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#footer-photo-band",
              start: "top 90%",
            },
          });
          if (tween3.scrollTrigger) triggers.push(tween3.scrollTrigger);
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
