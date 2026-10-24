"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Plays a single stamp-like impact when the letter section comes into view. */
export default function StampEntrance() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-principals-letter]");
    const stamp = section?.querySelector<HTMLElement>("[data-principal-stamp]");
    if (!section || !stamp || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(stamp, { autoAlpha: 0, scale: 1.35, y: -24, rotation: -10, transformOrigin: "80% 20%" });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 58%",
      once: true,
      onEnter: () => {
        gsap.to(stamp, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          delay: 0.28,
          duration: 0.78,
          ease: "elastic.out(1, 0.48)",
          overwrite: true,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(stamp);
    };
  }, []);

  return null;
}
