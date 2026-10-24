"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./ResultsArchive.module.css";
import type { YearResult } from "@/content/pages/studentsAtNps";

function leadingCount(value: string) {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function ResultsArchive({
  eyebrow,
  headline,
  intro,
  years,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  years: YearResult[];
}) {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const year = years[active];
  const maxBand = Math.max(1, ...year.bands.map((b) => leadingCount(b.count)));

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

      <div className={styles.archive}>
        <div className={styles.rail} role="group" aria-label="Results by year">
          {years.map((y, i) => (
            <button
              key={y.key}
              type="button"
              
              aria-pressed={active === i}
              className={`${styles.railItem} ${active === i ? styles.isActive : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.railIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.railYear}>{y.yearLabel}</span>
            </button>
          ))}
        </div>

        <div className={styles.panel} ref={panelRef}>
          <div className={styles.panelHead}>
            <h3 className={styles.panelHeading}>{year.heading}</h3>
            {year.date && <span className={styles.panelDate}>Dated {year.date}</span>}
          </div>
          <p className={styles.panelSummary}>{year.summary}</p>

          {year.stats.length > 0 && (
            <div className={styles.statChips}>
              {year.stats.map((s) => (
                <div className={styles.statChip} key={s.label}>
                  <span className={styles.statChipValue}>{s.value}</span>
                  <span className={styles.statChipLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {year.bands.length > 0 && (
            <div className={styles.bands}>
              {year.bands.map((b) => (
                <div className={styles.bandRow} key={b.range}>
                  <span className={styles.bandRange}>{b.range}</span>
                  <div className={styles.bandTrack}>
                    <div
                      className={styles.bandFill}
                      style={{ width: `${(leadingCount(b.count) / maxBand) * 100}%` }}
                    />
                  </div>
                  <span className={styles.bandCount}>{b.count}</span>
                </div>
              ))}
            </div>
          )}

          {year.toppers.length > 0 && (
            <div className={styles.toppers}>
              <p className={styles.blockLabel}>School Toppers</p>
              <ol className={styles.topperList}>
                {year.toppers.map((t) => (
                  <li key={t.name}>
                    <span className={styles.topperName}>{t.name}</span>
                    <span className={styles.topperDetail}>{t.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {year.subjectToppers && year.subjectToppers.length > 0 && (
            <div className={styles.subjects}>
              <p className={styles.blockLabel}>Subject Toppers</p>
              <div className={styles.subjectGrid}>
                {year.subjectToppers.map((s) => (
                  <div className={styles.subjectCard} key={s.subject}>
                    <p className={styles.subjectName}>{s.subject}</p>
                    <ul>
                      {s.entries.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
