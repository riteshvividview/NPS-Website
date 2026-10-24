"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterFrames } from "@/lib/afterFrames";

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle Apple-style motion for PageHero's imagery:
 *  - scroll parallax — the floating foreground card drifts a little
 *    slower than the page (on top of the CSS idle float in
 *    PageHero.module.css), and a full-bleed background photo, if
 *    present, drifts slightly too.
 *  - cursor parallax — the background photo also drifts a few px toward
 *    the cursor as it moves, on hover-capable/fine-pointer devices only
 *    (desktop; touch screens have no persistent cursor for this to track).
 * Deferred a couple of frames for the same reason the Home page's hooks
 * are: creating a ScrollTrigger before the Hero's own pin-spacer exists
 * elsewhere in the tree can bake in stale positions. This page has no
 * pin, but the defer is cheap insurance and keeps the pattern consistent.
 */
export default function HeroImageRunner() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      { id: "page-hero-image-wrap", yPercent: 10 },
      { id: "page-hero-bg", yPercent: 6 },
    ]
      .map(({ id, yPercent }) => ({ el: document.getElementById(id), yPercent }))
      .filter((t): t is { el: HTMLElement; yPercent: number } => Boolean(t.el));

    const tweens: gsap.core.Tween[] = [];
    const cancelScrollSetup = afterFrames(() => {
      targets.forEach(({ el, yPercent }) => {
        tweens.push(
          gsap.to(el, {
            yPercent,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        );
      });
    });

    // Cursor parallax on the background photo only.
    const bg = document.getElementById("page-hero-bg");
    const hero = bg?.closest("section");
    let onMouseMove: ((e: MouseEvent) => void) | undefined;
    let onMouseLeave: (() => void) | undefined;

    if (bg && hero && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const moveX = gsap.quickTo(bg, "x", { duration: 0.9, ease: "power3.out" });
      const moveY = gsap.quickTo(bg, "y", { duration: 0.9, ease: "power3.out" });
      const RANGE = 18; // max px drift in any direction

      onMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        moveX(px * RANGE * -2);
        moveY(py * RANGE * -2);
      };
      onMouseLeave = () => {
        moveX(0);
        moveY(0);
      };

      hero.addEventListener("mousemove", onMouseMove);
      hero.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      cancelScrollSetup();
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      if (hero && onMouseMove && onMouseLeave) {
        hero.removeEventListener("mousemove", onMouseMove);
        hero.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return null;
}
