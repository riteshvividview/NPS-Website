import styles from "./TeachingMethodology.module.css";
import type { TeachingMethodologyContent } from "@/content/teachingMethodology";
import { pillarIcons, ArrowRight } from "./icons";
import RevealOnScroll from "./RevealOnScroll";

const toneClass: Record<string, string> = {
  independence: styles.toneIndependence,
  curiosity: styles.toneCuriosity,
  criticalThinking: styles.toneCriticalThinking,
  collaboration: styles.toneCollaboration,
};

export default function TeachingMethodology({
  content,
}: {
  content: TeachingMethodologyContent;
}) {
  return (
    <section className={styles.section} id="methodology">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
          <h2 className={styles.headline} data-fx="words" data-fx-delay="0.1">
            {content.headlineLine1}
            <br />
            {content.headlineLine2}
          </h2>
          <p className={styles.description} data-fx="blur" data-fx-delay="0.4">{content.description}</p>
          <a className={styles.cta} href={content.cta.href} data-card-fx="fade" data-fx-delay="0.6">
            {content.cta.label}
            <ArrowRight />
          </a>
        </div>

        <RevealOnScroll>
          <div className={styles.grid}>
            {content.pillars.map((pillar) => (
              <div className={`${styles.card} js-reveal-card`} key={pillar.key}>
                <div className={`${styles.artWrap} ${toneClass[pillar.key]}`} data-tilt="7">
                  <span className={styles.art}>{pillarIcons[pillar.key]}</span>
                  <span className={styles.badge}>{pillar.index}</span>
                </div>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
