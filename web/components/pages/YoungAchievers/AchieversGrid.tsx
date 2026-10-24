"use client";

import { useState } from "react";
import AchieverCard from "./AchieverCard";
import styles from "./AchieversGrid.module.css";
import type { Achiever, AchieverCategory, YoungAchieversContent } from "@/content/pages/youngAchievers";

export default function AchieversGrid({
  filters,
  achievers,
}: {
  filters: YoungAchieversContent["filters"];
  achievers: Achiever[];
}) {
  const [active, setActive] = useState<AchieverCategory | "all">("all");
  const visible = active === "all" ? achievers : achievers.filter((a) => a.category === active);

  return (
    <section className={styles.section} id="page-collection">
      <div className={styles.filterRow} role="group" aria-label="Filter by category">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            
            aria-pressed={active === f.key}
            className={`${styles.filterBtn} ${active === f.key ? styles.isActive : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className={styles.resultCount} aria-live="polite">{visible.length} stories of possibility</p>
      <div className={styles.grid}>
        {visible.map((a) => (
          <AchieverCard achiever={a} key={a.name} />
        ))}
      </div>
    </section>
  );
}
