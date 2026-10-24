import EditorialArtwork from "../shared/EditorialArtwork";
import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import styles from "./AchievementsList.module.css";
import type { Achievement } from "@/content/pages/npsAchievements";

export default function AchievementsList({
  eyebrow,
  headline,
  achievements,
}: {
  eyebrow: string;
  headline: string;
  achievements: Achievement[];
}) {
  return (
    <section className={styles.section} id="page-collection">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>
      </div>

      <RevealOnScroll className={styles.list}>
        {achievements.map((a) => (
          <article data-honour className={styles.card} key={a.studentName}>
            <div className={styles.photoStack} aria-hidden="true">
              <EditorialArtwork kind="achievers" />
            </div>

            <div className={styles.body}>
              <div className={styles.studentRow}>
                <h3 className={styles.studentName}>{a.studentName}</h3>
                <span className={styles.studentClass}>{a.studentClass}</span>
              </div>

              <p className={styles.eventName}>{a.eventName}</p>
              <p className={styles.eventMeta}>
                <i className="fa-regular fa-calendar" aria-hidden="true" /> {a.eventDate}
                <span className={styles.metaSep}>Â·</span>
                <i className="fa-solid fa-location-dot" aria-hidden="true" /> {a.eventLocation}
              </p>

              <div className={styles.prizes}>
                {a.prizes.map((prize) => (
                  <span className={styles.prizeBadge} key={prize}>
                    <i className="fa-solid fa-medal" aria-hidden="true" />
                    {prize}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </RevealOnScroll>
    </section>
  );
}

