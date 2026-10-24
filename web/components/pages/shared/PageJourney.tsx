"use client";

import Link from "next/link";
import styles from "./PageJourney.module.css";

const pages = [
  ["/the-place/nps-campus-facilities", "Campus Facilities", "A campus full of possibilities"],
  ["/the-place/nps-achievements", "NPS Achievements", "Dedication, recognised"],
  ["/the-place/young-achievers", "Young Achievers", "More than one way to shine"],
  ["/the-place/young-authors", "Young Authors", "Their words. Entire worlds."],
  ["/the-people/school-leadership", "School Leadership", "The people behind the purpose"],
  ["/the-people/students-at-nps", "Students at NPS", "Every result has a story"],
  ["/the-people/nes-board-members", "NES Board Members", "Rooted in a shared purpose"],
  ["/the-people/nps-visitors", "NPS Visitors", "Some visits stay with us"],
];

export default function PageJourney({ current }: { current: number }) {
  const next = pages[(current + 1) % pages.length];
  return <aside className={styles.journey} aria-label="Continue exploring Niraj">
    <p>THERE IS MORE TO NIRAJ</p>
    <Link href={next[0]} onNavigate={(event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("nps:page-transition", { detail: { href: next[0] } }));
    }}>
      <span><small>{next[2]}</small><strong>{next[1]}</strong></span><i aria-hidden="true">↗</i>
    </Link>
  </aside>;
}
