"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * This page's distinctive cursor effect (every secondary page gets its
 * own, per the project's premium-page direction) — the giant decorative
 * quotation mark behind the headline tilts in light 3D as the cursor
 * moves across the hero, like it's a physical card catching the light.
 * Desktop/fine-pointer only; respects reduced motion.
 */
export default function QuoteTiltRunner() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const mark = document.getElementById("pw-quote-mark");
    const hero = mark?.closest("section");
    if (!mark || !hero) return;

    gsap.set(mark, { transformPerspective: 700, transformStyle: "preserve-3d" });
    const rotateX = gsap.quickTo(mark, "rotationX", { duration: 0.8, ease: "power3.out" });
    const rotateY = gsap.quickTo(mark, "rotationY", { duration: 0.8, ease: "power3.out" });
    const MAX_DEG = 14;

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX(py * -MAX_DEG);
      rotateY(px * MAX_DEG);
    };
    const onMouseLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);
    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return null;
}
