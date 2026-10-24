"use client";

import { useState } from "react";
import { categoryMeta } from "./categoryMeta";
import styles from "./AchieverCard.module.css";
import type { Achiever } from "@/content/pages/youngAchievers";

const toneClass: Record<string, string> = {
  green: styles.toneGreen,
  gold: styles.toneGold,
  blue: styles.toneBlue,
  peach: styles.tonePeach,
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Tap/click to flip — not hover — so the same interaction works on touch
 *  and desktop alike (this page's distinct effect: a profile card that
 *  flips to reveal the student's full story on its back). */
export default function AchieverCard({ achiever }: { achiever: Achiever }) {
  const [flipped, setFlipped] = useState(false);
  const meta = categoryMeta[achiever.category];
  const tone = toneClass[meta.tone];

  return (
    <button
      data-pointer-depth
      data-category={achiever.category}
      type="button"
      className={`${styles.card} ${flipped ? styles.isFlipped : ""}`}
      onClick={() => setFlipped((f) => !f)}
      aria-expanded={flipped}
      aria-label={`${achiever.name} — tap to ${flipped ? "show summary" : "read full story"}`}
    >
      <div className={styles.inner}>
        <div className={styles.face} aria-hidden={flipped}>
          <span className={`${styles.avatar} ${tone}`}>{initials(achiever.name)}</span>
          <span className={`${styles.categoryBadge} ${tone}`}>
            <i className={meta.icon} aria-hidden="true" />
            {meta.label}
          </span>
          <h3 className={styles.name}>{achiever.name}</h3>
          {achiever.grade && <span className={styles.grade}>{achiever.grade}</span>}
          <p className={styles.teaser}>{achiever.teaser}</p>
          <span className={styles.hint}>
            <i className="fa-solid fa-arrow-rotate-right" aria-hidden="true" /> Tap to read the full story
          </span>
        </div>

        <div className={`${styles.face} ${styles.faceBack}`} aria-hidden={!flipped}>
          <div className={styles.backScroll}>
            <span className={`${styles.categoryBadge} ${tone}`}>
              <i className={meta.icon} aria-hidden="true" />
              {meta.label}
            </span>
            <h3 className={styles.name}>{achiever.name}</h3>
            {achiever.bio.map((p, i) => (
              <p className={styles.bioParagraph} key={i}>
                {p}
              </p>
            ))}
            {achiever.links && (
              <ul className={styles.linkList}>
                {achiever.links.map((link) => (
                  <li key={link.label}>
                    <i className="fa-solid fa-book" aria-hidden="true" /> {link.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span className={styles.hint}>
            <i className="fa-solid fa-arrow-rotate-left" aria-hidden="true" /> Tap to go back
          </span>
        </div>
      </div>
    </button>
  );
}
