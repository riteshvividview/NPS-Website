"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./BeyondClassroom.module.css";
import type { BeyondClassroomSlide } from "@/content/beyondClassroom";
import { slideIcons, ArrowLeft, ArrowRight } from "./icons";
import { generateOrganicPath } from "@/lib/organicClipPath";

const SLOT_CLASS = [styles.cardLeft, styles.cardCenter, styles.cardRight];
const SLOT_COUNT = 3;
// Deterministic seeds so server and client render the same shapes on first
// paint (avoids a hydration mismatch) — replaced with genuinely random ones
// right after mount, so the shapes differ on every page load.
const DEFAULT_SEEDS = [101, 202, 303];

export default function Carousel({
  groups,
  noteRightLine1,
  noteRightLine2,
}: {
  groups: BeyondClassroomSlide[][];
  noteRightLine1: string;
  noteRightLine2: string;
}) {
  const [index, setIndex] = useState(0);
  const [clipPaths, setClipPaths] = useState<string[]>(() =>
    DEFAULT_SEEDS.map((seed) => generateOrganicPath(seed))
  );
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClipPaths(
      Array.from({ length: SLOT_COUNT }, () => generateOrganicPath(Math.random() * 1e6))
    );
  }, []);

  function go(next: number) {
    setIndex(((next % groups.length) + groups.length) % groups.length);
    // Fresh shapes every time the slide changes, not just on page load.
    setClipPaths(
      Array.from({ length: SLOT_COUNT }, () => generateOrganicPath(Math.random() * 1e6))
    );
  }

  useEffect(() => {
    const cards = wrapRef.current?.querySelectorAll<HTMLElement>(".js-carousel-card");
    if (!cards || cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.07 }
    );
  }, [index]);

  const activeGroup = groups[index];

  return (
    <>
      {/* Each card slot gets its own randomly-generated clip-path (see
          lib/organicClipPath.ts) so no two cards share the same distorted
          silhouette — regenerated on every page load via the effect above. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          {clipPaths.map((d, i) => (
            <clipPath id={`beyond-card-clip-${i}`} clipPathUnits="objectBoundingBox" key={i}>
              <path d={d} />
            </clipPath>
          ))}
        </defs>
      </svg>

      <div className={styles.carouselWrap} ref={wrapRef}>
        {activeGroup.map((slide, slot) => (
          <div
            className={`${styles.card} js-carousel-card ${SLOT_CLASS[slot] ?? ""}`}
            key={`${index}-${slide.badgeLine1}-${slide.badgeLine2}`}
          >
            <div
              className={styles.cardClip}
              style={{ clipPath: `url(#beyond-card-clip-${slot})` }}
            >
              <Image src={slide.image} alt={slide.alt} fill sizes="300px" />
            </div>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>{slideIcons[slide.icon]}</span>
              <span className={styles.badgeText}>
                <span>{slide.badgeLine1}</span>
                <span>{slide.badgeLine2}</span>
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className={styles.rightCol}>
        <span className={styles.noteRight}>
          {noteRightLine1}
          <br />
          {noteRightLine2}
        </span>
        <button className={styles.navBtn} onClick={() => go(index - 1)} aria-label="Previous">
          <ArrowLeft />
        </button>
        <span className={styles.dots}>
          {groups.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? "is-active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </span>
        <button
          className={`${styles.navBtn} ${styles.navBtnNext}`}
          onClick={() => go(index + 1)}
          aria-label="Next"
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
}
