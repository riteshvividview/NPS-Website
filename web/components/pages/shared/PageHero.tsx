import Image from "next/image";
import styles from "./PageHero.module.css";
import HeroImageRunner from "./HeroImageRunner";
import RevealOnScroll from "./RevealOnScroll";
import Breadcrumb from "./Breadcrumb";

export interface PageHeroProps {
  breadcrumb: { label: string; href: string }[];
  eyebrow: string;
  headline: string;
  tagline: string;
  /** Floating foreground card, next to the copy. */
  image?: string;
  imageAlt?: string;
  /** Full-bleed banner photo behind everything, with a scrim for contrast
   *  — layers underneath the copy/floating card, doesn't replace them. */
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

/**
 * Reusable top-of-page hero for every secondary ("The Place" etc.) page —
 * breadcrumb, eyebrow, headline, tagline, an optional floating foreground
 * card next to the copy, and an optional full-bleed background photo
 * behind all of it. Deliberately not the Home page's fixed-canvas "stage"
 * pattern (see the mobile-first project note) — a normal responsive
 * layout that degrades without any special-case mobile rework.
 *
 * Uses its own lightweight RevealOnScroll/.js-reveal (not the Home page's
 * data-fx system) — that system only animates once HomeFxRunner mounts,
 * which only happens on "/", so reusing it here would leave this page's
 * text invisible until its 6s safety timeout.
 */
export default function PageHero({
  breadcrumb,
  eyebrow,
  headline,
  tagline,
  image,
  imageAlt,
  backgroundImage,
  backgroundImageAlt,
}: PageHeroProps) {
  const hasBg = Boolean(backgroundImage);

  return (
    <section className={`${styles.hero} ${hasBg ? styles.heroWithBg : ""}`}>
      {hasBg ? (
        <div className={styles.bgImageWrap} id="page-hero-bg">
          <Image
            src={backgroundImage!}
            alt={backgroundImageAlt ?? ""}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="100vw"
          />
          <div className={styles.bgScrim} aria-hidden="true" />
        </div>
      ) : (
        <div className={styles.glow} aria-hidden="true" />
      )}

      <Breadcrumb items={breadcrumb} className={styles.heroBreadcrumb} />

      <RevealOnScroll className={styles.layout}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} js-reveal`}>{eyebrow}</p>
          <h1 className={`${styles.headline} js-reveal`}>{headline}</h1>
          <p className={`${styles.tagline} js-reveal`}>{tagline}</p>
        </div>

        {image && (
          <div className={`${styles.imageWrap} js-reveal`} id="page-hero-image-wrap">
            <div className={styles.imageClip}>
              <Image src={image} alt={imageAlt ?? ""} fill style={{ objectFit: "cover" }} priority sizes="(max-width: 900px) 92vw, 46vw" />
            </div>
          </div>
        )}
      </RevealOnScroll>

      <HeroImageRunner />
    </section>
  );
}
