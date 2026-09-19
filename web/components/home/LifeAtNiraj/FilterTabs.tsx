"use client";

import styles from "./LifeAtNiraj.module.css";

export default function FilterTabs({
  filters,
  activeIndex,
  onSelect,
}: {
  filters: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className={styles.filterTabs}>
      {filters.map((filter, i) => (
        <button
          key={filter}
          className={`${styles.filterTab} ${i === activeIndex ? "is-active" : ""}`}
          onClick={() => onSelect(i)}
          data-card-fx="pop"
          data-fx-group="life-filters"
          data-fx-delay="0.4"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
