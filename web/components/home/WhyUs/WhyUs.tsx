import Image from "next/image";
import styles from "./WhyUs.module.css";
import type { WhyUsContent } from "@/content/whyUs";
import ReasonAccordion from "./ReasonAccordion";
import WhyUsAnimationsRunner from "./WhyUsAnimationsRunner";

export default function WhyUs({ content }: { content: WhyUsContent }) {
  return (
    <div className={styles.outerWrap}>
      {/* Sibling of .section, not a child — .section has overflow:hidden
          for the trophy/pages edge-bleed, but the rocket needs to fly UP
          past the section's own top edge into Section 3 above it, so it
          can't be clipped by that same overflow:hidden box. */}
      <div className={`${styles.deco} ${styles.decoRocket}`} id="why-us-rocket" aria-hidden="true">
        <Image src="/aboutus-section/rocket.webp" alt="" width={96} height={71} />
      </div>

      <section className={styles.section} id="why-us">
        <div className={`${styles.deco} ${styles.decoTrophy}`} data-depth="0.25" aria-hidden="true">
          <Image src="/aboutus-section/trophy.webp" alt="" width={294} height={274} />
        </div>
        <div className={`${styles.deco} ${styles.decoPages}`} data-depth="0.35" aria-hidden="true">
          <Image src="/aboutus-section/pages.webp" alt="" width={797} height={318} />
        </div>

        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
            <h2 className={styles.headline} data-fx="words" data-fx-delay="0.1">
              {content.headlineLead} <em>{content.headlineAccent}</em>
            </h2>
            <div className={styles.statBlock}>
              <span className={styles.statValue} data-fx="count" data-fx-delay="0.3">{content.statValue}</span>
              <span className={styles.statLabel} data-fx="fade-up" data-fx-delay="0.5">{content.statLabel}</span>
            </div>
            <span className={styles.tagline} data-fx="wipe" data-fx-delay="0.7">{content.tagline}</span>
          </div>

          <ReasonAccordion reasons={content.reasons} />
        </div>
        <WhyUsAnimationsRunner />
      </section>
    </div>
  );
}
