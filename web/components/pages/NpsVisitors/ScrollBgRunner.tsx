"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterFrames } from "@/lib/afterFrames";

gsap.registerPlugin(ScrollTrigger);

// Keep in sync with --surface / --surface-alt in PageTheme.module.css.
// GSAP tweens backgroundColor on the DOM node directly, so it needs the
// resolved hex values rather than the CSS custom properties.
const SURFACE = "#f3f8f7";
const SURFACE_ALT = "#eef1f8";

/**
 * The scroll-triggered color shift the user asked for — applied to the
 * whole page (<main id="nps-visitors-main">), not a child section, so it
 * reads as one continuous background rather than a boxed-in block.
 * Crossfades from the hero's "mint" tone to a second light, cool tone as
 * the Guest Book timeline scrolls into view, scrubbed to scroll position.
 */
export default function ScrollBgRunner() {
  useEffect(() => {
    const main = document.getElementById("nps-visitors-main");
    const trigger = document.getElementById("page-collection");
    if (!main || !trigger) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      main.style.backgroundColor = SURFACE_ALT;
      return;
    }

    let tween: gsap.core.Tween | undefined;
    const cancelSetup = afterFrames(() => {
      tween = gsap.fromTo(
        main,
        { backgroundColor: SURFACE },
        {
          backgroundColor: SURFACE_ALT,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      cancelSetup();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return null;
}
