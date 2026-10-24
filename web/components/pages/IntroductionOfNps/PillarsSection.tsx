import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import { pillarIcons } from "./icons";
import styles from "./PillarsSection.module.css";
import type { IntroductionOfNpsContent } from "@/content/pages/introductionOfNps";

export default function PillarsSection({ content }: { content: IntroductionOfNpsContent["pillars"] }) {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 className={styles.headline}>{content.headline}</h2>
      </div>

      <RevealOnScroll className={styles.grid}>
        {content.items.map((item) => (
          <div className={`${styles.card} js-reveal`} key={item.key}>
            <span className={styles.cardIcon}>{pillarIcons[item.key]}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
          </div>
        ))}
      </RevealOnScroll>
    </section>
  );
}
