import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import styles from "./StudentSpotlights.module.css";
import type { StudentSpotlight } from "@/content/pages/studentsAtNps";

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Dr\.|P\.S\.|S\.)\s*/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function StudentSpotlights({
  eyebrow,
  headline,
  intro,
  spotlights,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  spotlights: StudentSpotlight[];
}) {
  const featured = spotlights.find((s) => !s.comingSoon);
  const rest = spotlights.filter((s) => s.comingSoon);

  return (
    <section className={styles.section}>
      <RevealOnScroll className={styles.intro}>
        <p className={`${styles.eyebrow} js-reveal`}>{eyebrow}</p>
        <h2 className={`${styles.headline} js-reveal`}>{headline}</h2>
        <p className={`${styles.introText} js-reveal`}>{intro}</p>
      </RevealOnScroll>

      <RevealOnScroll className={styles.grid}>
        {featured && (
          <div className={`${styles.featured} js-reveal`}>
            <span className={styles.featuredAvatar}>{initials(featured.name)}</span>
            <div className={styles.featuredBody}>
              <h3 className={styles.featuredName}>{featured.name}</h3>
              {featured.bio?.map((p, i) => (
                <p key={i} className={styles.featuredBio}>
                  {p}
                </p>
              ))}
              {featured.works && featured.works.length > 0 && (
                <div className={styles.works}>
                  <span className={styles.worksLabel}>Published Work</span>
                  <ul>
                    {featured.works.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {rest.map((s) => (
          <div className={`${styles.card} js-reveal`} key={s.key}>
            <span className={styles.cardAvatar}>{initials(s.name)}</span>
            <span className={styles.cardName}>{s.name}</span>
            <span className={styles.cardTag}>Profile coming soon</span>
          </div>
        ))}
      </RevealOnScroll>
    </section>
  );
}
