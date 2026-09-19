"use client";

import { useState } from "react";
import styles from "./WhyUs.module.css";
import type { WhyUsReason } from "@/content/whyUs";
import { reasonIcons } from "./icons";

const toneClass: Record<string, string> = {
  trophy: styles.toneTrophy,
  people: styles.tonePeople,
  cap: styles.toneCap,
  shield: styles.toneShield,
  chart: styles.toneChart,
};

export default function ReasonAccordion({ reasons }: { reasons: WhyUsReason[] }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className={styles.list}>
      {reasons.map((reason, i) => {
        const isOpen = i === openIndex;
        return (
          <div
            className={`${styles.row} ${isOpen ? "is-open" : ""}`}
            key={reason.index}
            data-card-fx="slide-right"
            data-fx-group="why-rows"
          >
            <button
              className={styles.rowButton}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span className={styles.rowIndex}>{reason.index}</span>
              <span className={`${styles.rowIcon} ${toneClass[reason.icon]}`}>
                {reasonIcons[reason.icon]}
              </span>
              <span className={styles.rowTitle}>{reason.title}</span>
              <span className={styles.rowToggle} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <div className={styles.rowPanel}>
              <div className={styles.rowPanelInner}>
                <p className={styles.rowDescription}>{reason.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
