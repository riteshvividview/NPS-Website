import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import TiltCard from "./TiltCard";
import styles from "./BoardChart.module.css";
import type { BoardTier } from "@/content/pages/nesBoardMembers";

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Dr\.)\s*/gi, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function BoardChart({
  eyebrow,
  headline,
  intro,
  tiers,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  tiers: BoardTier[];
}) {
  return (
    <section className={styles.section} id="page-collection">
      <RevealOnScroll className={styles.intro}>
        <p className={`${styles.eyebrow} js-reveal`}>{eyebrow}</p>
        <h2 className={`${styles.headline} js-reveal`}>{headline}</h2>
        <p className={`${styles.introText} js-reveal`}>{intro}</p>
      </RevealOnScroll>

      <div className={styles.chart}>
        {tiers.map((tier, tierIndex) => (
          <div data-board-tier id={"board-" + tier.key} className={styles.tier} key={tier.key}>
            {tierIndex > 0 && <span className={styles.connector} aria-hidden="true" />}
            <p className={styles.tierLabel}>{tier.tierLabel}</p>
            <div className={styles.tierRow} data-count={tier.members.length}>
              {tier.members.map((m) => (
                <TiltCard className={styles.cardWrap} key={m.key}>
                  <div className={styles.card}>
                    <span className={styles.cardIcon}>
                      <i className={`fa-solid ${m.icon}`} />
                    </span>
                    <span className={styles.cardAvatar}>{initials(m.name)}</span>
                    <span className={styles.cardName}>{m.name}</span>
                    <span className={styles.cardDesignation}>{m.designation}</span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
