"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterFrames } from "@/lib/afterFrames";
import styles from "./ReadingProgressBar.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Thin fixed bar under the header that fills as the reader scrolls through
 * a long-form page (e.g. the Principal's letter) — a small, premium
 * "you are here" cue rather than a full nav element. Tracks scroll across
 * the whole document; harmless to drop onto any page.
 */
export default function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bar.style.transform = "scaleX(1)";
      return;
    }

    let tween: gsap.core.Tween | undefined;
    const cancel = afterFrames(() => {
      tween = gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: true,
        },
      });
    });

    return () => {
      cancel();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} ref={barRef} />
    </div>
  );
}
