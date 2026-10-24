"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./LeaderExplorer.module.css";
import type { Leader } from "@/content/pages/schoolLeadership";

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Dr\.|\(Mrs\.\))\s*/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function LeaderExplorer({
  eyebrow,
  headline,
  intro,
  leaders,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  leaders: Leader[];
}) {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const leader = leaders[active];

  // GSAP crossfade whenever the selected leader changes — this page's own
  // effect (every secondary page gets one): no accordions to open, the
  // detail panel just dissolves into the next profile. Skips on first
  // mount so the opening view doesn't fade in from nothing.
  const mounted = useRef(false);
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" });
    return () => { tween.kill(); };
  }, [active]);

  return (
    <section className={styles.section} id="page-collection">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.introText}>{intro}</p>
      </div>

      <div className={styles.explorer}>
        <div className={styles.nav} role="group" aria-label="Leadership team">
          {leaders.map((l, i) => (
            <button
              key={l.key}
              type="button"
              
              aria-pressed={active === i}
              className={`${styles.navItem} ${active === i ? styles.isActive : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.navAvatar}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.navText}>
                <span className={styles.navName}>{l.name}</span>
                <span className={styles.navTitle}>{l.title}</span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.panel} ref={panelRef}>
          <p className={styles.profileIndex}>THE LEADERSHIP COLLECTION / {String(active + 1).padStart(2, "0")}</p>
          <span className={styles.panelAvatar}>{initials(leader.name)}</span>
          <h3 className={styles.panelName}>{leader.name}</h3>
          <p className={styles.panelTitle}>{leader.title}</p>
          {leader.qualifications && <p className={styles.panelQuals}>{leader.qualifications}</p>}
          <div className={styles.panelBio}>
            {leader.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
