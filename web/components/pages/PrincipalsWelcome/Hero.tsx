import Breadcrumb, { type BreadcrumbItem } from "@/components/pages/shared/Breadcrumb";
import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import QuoteTiltRunner from "./QuoteTiltRunner";
import HeroPinRunner from "./HeroPinRunner";
import styles from "./Hero.module.css";

export interface PrincipalsWelcomeHeroProps {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  headline: string;
  tagline: string;
}

/**
 * This page's hero is deliberately typographic — no photo — to read
 * differently from the Introduction page's image-led hero. The giant
 * quotation mark behind the headline is the page's own cursor effect
 * (see QuoteTiltRunner).
 */
export default function Hero({ breadcrumb, eyebrow, headline, tagline }: PrincipalsWelcomeHeroProps) {
  return (
    <section className={styles.stage}>
      <div className={styles.hero} id="principals-welcome-hero">
      <div className={styles.glow} aria-hidden="true" />
        <div className={styles.campusArt} data-campus-art aria-hidden="true" />
        <div className={styles.copyGroup} data-hero-copy>
        <Breadcrumb items={breadcrumb} className={styles.breadcrumb} />

      <RevealOnScroll className={styles.layout}>
        <span className={styles.quoteMark} id="pw-quote-mark" aria-hidden="true">
          “
        </span>
        <p className={`${styles.eyebrow} js-reveal`}>{eyebrow}</p>
        <h1 className={`${styles.headline} js-reveal`}>{headline}</h1>
        <p className={`${styles.tagline} js-reveal`}>{tagline}</p>
        </RevealOnScroll>
        </div>

      <QuoteTiltRunner />
      <HeroPinRunner />
      </div>
    </section>
  );
}
