"use client";

import { useRef } from "react";
import styles from "./TiltCard.module.css";

/**
 * Per-card 3D hover tilt driven by pointer position, set as CSS custom
 * properties (--rx/--ry) and read by a `perspective`/`rotateX`/`rotateY`
 * transform in TiltCard.module.css. Plain pointermove, no GSAP — this
 * page's own interaction, distinct from the orbit/spotlight/flip patterns
 * used on earlier pages.
 */
export default function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--ry", `${px * 14}deg`);
    el.style.setProperty("--rx", `${-py * 14}deg`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      className={`${styles.tilt} ${className ?? ""}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}
