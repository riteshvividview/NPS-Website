import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import styles from "./StorySection.module.css";
import type { IntroductionOfNpsContent } from "@/content/pages/introductionOfNps";

export default function StorySection({ content }: { content: IntroductionOfNpsContent["story"] }) {
  return (
    <section className={styles.section} id="niraj-story">
      <RevealOnScroll className={styles.layout}>
        <blockquote className={`${styles.quote} js-reveal`}>“{content.quote}”</blockquote>

        <div className={styles.body}>
          {content.paragraphs.map((p, i) => (
            <p className={`${styles.paragraph} js-reveal`} key={i}>
              {p}
            </p>
          ))}
        </div>

        <div className={`${styles.badge} js-reveal`}>
          <span className={styles.badgeValue}>{content.badgeValue}</span>
          <span className={styles.badgeLabel}>{content.badgeLabel}</span>
        </div>
      </RevealOnScroll>
    </section>
  );
}
