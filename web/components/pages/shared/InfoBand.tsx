import RevealOnScroll from "./RevealOnScroll";
import { infoIcons } from "./infoIcons";
import styles from "./InfoBand.module.css";

export interface InfoBandContent {
  tagline: string;
  cards: {
    key: "address" | "hours" | "support" | "admissions" | "visit" | "enquiries";
    label: string;
    lines: string[];
  }[];
}

/**
 * The "Admission open / Address / Working Hours / Support Centre" block —
 * shared across secondary pages since the user's content for each one
 * repeats it verbatim. Dark gradient band with glass cards, matching the
 * Home page's Why Us treatment.
 */
export default function InfoBand({ content, backgroundImage }: { content: InfoBandContent; backgroundImage?: string }) {
  return (
    <section
      className={`${styles.section} ${backgroundImage ? styles.sectionWithImage : ""}`}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(115deg, rgba(10, 48, 31, 0.9), rgba(14, 42, 60, 0.72)), url("${backgroundImage}")`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      } : undefined}
    >
      <RevealOnScroll className={styles.inner}>
        {content.tagline && <p className={`${styles.tagline} js-reveal`}>{content.tagline}</p>}

        <div className={styles.grid}>
          {content.cards.map((card) => (
            <div
              className={`${styles.card} ${card.key === "admissions" || card.key === "visit" || card.key === "enquiries" ? styles.cardWithArrow : ""} js-reveal`}
              key={card.key}
            >
              <span className={styles.cardIcon}>{infoIcons[card.key]}</span>
              <h3 className={styles.cardLabel}>{card.label}</h3>
              <p className={styles.cardLines}>
                {card.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < card.lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
              {(card.key === "admissions" || card.key === "visit" || card.key === "enquiries") && (
                <span className={styles.cardArrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
