import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import Image from "next/image";
import styles from "./CommitmentsSection.module.css";
import type { NpsVisionContent } from "@/content/pages/npsVision";

export default function CommitmentsSection({ content }: { content: NpsVisionContent["commitments"] }) {
  const titleLead = content.headline.replace(/\s*Committed To$/, "");
  const titleEmphasis = content.headline.match(/Committed To$/)?.[0] ?? "Committed To";

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 className={styles.headline}>
          <span>{titleLead}</span>
          <em>{titleEmphasis}</em>
        </h2>
        <p className={styles.introText}>{content.intro}</p>
      </div>

      <RevealOnScroll className={styles.timeline}>
        {content.items.map((item, i) => (
          <article
            className={`${styles.row} ${i === content.items.length - 1 ? styles.featuredRow : i % 2 === 0 ? styles.leftRow : styles.rightRow} ${i === 0 ? styles.girlCardMobile : i === 1 ? styles.girlCardDesktop : ""} js-reveal`}
            id={`vision-commitment-${i}`}
            key={item.title}
          >
            <span className={styles.markerIcon}>
              <i className={item.icon} aria-hidden="true" />
            </span>
            <div className={styles.rowBody}>
              <h3 className={styles.rowTitle}>{item.title}</h3>
              <p className={styles.rowDescription}>{item.description}</p>
            </div>
            {i === 0 && (
              <Image
                className={`${styles.cardGirl} ${styles.cardGirlMobile}`}
                src="/NPS%20Vision%20Page/card-top-girl-image.png"
                alt=""
                width={220}
                height={215}
                sizes="(max-width: 420px) 122px, 135px"
                aria-hidden="true"
              />
            )}
            {i === 1 && (
              <Image
                className={`${styles.cardGirl} ${styles.cardGirlDesktop}`}
                src="/NPS%20Vision%20Page/card-top-girl-image.png"
                alt=""
                width={220}
                height={215}
                sizes="190px"
                aria-hidden="true"
              />
            )}
            <span className={styles.markerNumber} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </article>
        ))}
      </RevealOnScroll>
    </section>
  );
}
