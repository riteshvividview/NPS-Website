"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./LifeAtNiraj.module.css";
import type { LifeAtNirajContent } from "@/content/lifeAtNiraj";
import { PlayIcon, ArrowLeft, ArrowRight } from "./icons";
import FilterTabs from "./FilterTabs";

export default function LifeAtNirajBody({ content }: { content: LifeAtNirajContent }) {
  // One shared index drives both the filter tabs and the arrow buttons —
  // the arrows step through the same categories the tabs select, so
  // "Next" from "All" lands on "Events", then "Activities", and so on.
  const [index, setIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  function go(next: number) {
    setIndex(((next % content.filters.length) + content.filters.length) % content.filters.length);
  }

  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll<HTMLElement>(".js-mosaic-tile");
    if (!tiles || tiles.length === 0) return;
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 }
    );
  }, [index]);

  const g = content.groups[index];

  return (
    <>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
          <h2 className={styles.heading} data-fx="chars" data-fx-delay="0.1">{content.heading}</h2>
          <span className={styles.headingRule} data-fx="wipe" data-fx-delay="0.5" />
        </div>

        <div className={styles.filterRow}>
          <FilterTabs filters={content.filters} activeIndex={index} onSelect={go} />
          <a className={styles.ctaRow} href={content.ctaHref} data-card-fx="fade" data-fx-delay="0.8">
            <span className={styles.ctaCircle}>
              <ArrowRight />
            </span>
            <span className={styles.ctaLabel}>
              <span>{content.ctaLine1}</span>
              <span>{content.ctaLine2}</span>
            </span>
          </a>
        </div>
      </div>

      <div className={styles.grid} ref={gridRef}>
        <div className={`${styles.tile} ${styles.tileHero} js-mosaic-tile`}>
          <Image src={g.hero.image} alt={g.hero.alt} fill sizes="(max-width: 1150px) 100vw, 30vw" style={{ objectFit: "cover" }} />
          <div className={styles.heroFade} />
          <div className={styles.heroCaption}>
            <span className={styles.heroCaptionText}>{g.hero.captionLine1}</span>
            <span className={styles.heroCaptionText}>{g.hero.captionLine2}</span>
            <span className={styles.heroCaptionRule} />
          </div>
        </div>

        <div className={`${styles.tile} ${styles.tileTop1} js-mosaic-tile`}>
          <Image src={g.top1.image} alt={g.top1.alt} fill sizes="(max-width: 1150px) 50vw, 20vw" style={{ objectFit: "cover" }} />
        </div>

        <div className={`${styles.tile} ${styles.tileTop2} js-mosaic-tile`}>
          <Image src={g.top2.image} alt={g.top2.alt} fill sizes="(max-width: 1150px) 50vw, 18vw" style={{ objectFit: "cover" }} />
        </div>

        <div className={`${styles.tile} ${styles.tileTop3} js-mosaic-tile`}>
          <Image src={g.top3.image} alt={g.top3.alt} fill sizes="(max-width: 1150px) 50vw, 12vw" style={{ objectFit: "cover" }} />
        </div>

        <a className={`${styles.tile} ${styles.tileVideo} js-mosaic-tile`} href="#" aria-label={g.video.titleLine1 + " " + g.video.titleLine2}>
          <Image src={g.video.thumbnail} alt={g.video.alt} fill sizes="(max-width: 1150px) 100vw, 24vw" style={{ objectFit: "cover" }} />
          <div className={styles.videoFade} />
          <span className={styles.playBtn}>
            <PlayIcon />
          </span>
          <div className={styles.videoCaption}>
            <span className={styles.videoCaptionTitle}>
              {g.video.titleLine1}
              <br />
              {g.video.titleLine2}
            </span>
            <span className={styles.videoCaptionTag}>{g.video.tag}</span>
          </div>
          <span className={styles.videoDuration}>{g.video.duration}</span>
        </a>

        <div className={`${styles.tile} ${styles.tileBottom} js-mosaic-tile`}>
          <Image src={g.bottom.image} alt={g.bottom.alt} fill sizes="(max-width: 1150px) 50vw, 12vw" style={{ objectFit: "cover" }} />
        </div>

        <div className={`${styles.sidebar} js-mosaic-tile`}>
          <span className={styles.sideTag}>
            {content.sideTagLines.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
            <span className={styles.sideTagRule} />
          </span>
          <div className={styles.navBtns}>
            <button className={styles.navBtn} onClick={() => go(index - 1)} aria-label="Previous">
              <ArrowLeft />
            </button>
            <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={() => go(index + 1)} aria-label="Next">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
