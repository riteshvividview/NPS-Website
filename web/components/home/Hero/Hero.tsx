import Image from "next/image";
import styles from "./Hero.module.css";
import type { HomeContent } from "@/content/home";

export default function Hero({ content }: { content: HomeContent["hero"] }) {
  const imgStyle: React.CSSProperties = { objectFit: "cover", objectPosition: "center" };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroCanvas} id="hero-canvas">
        <div className={styles.heroStage} id="hero-stage">
          <div className={`${styles.layer} ${styles.layerSky}`}>
            <Image src={content.images.sky} alt="" fill style={imgStyle} priority />
          </div>

          <div className={`${styles.layer} ${styles.layerClouds}`} id="layer-clouds">
            <canvas
              className={styles.cloudCanvas}
              id="cloud-canvas"
              width={1672}
              height={941}
            />
            <img
              className={styles.cloudFallback}
              id="cloud-fallback"
              src={content.images.cloudFallback}
              alt=""
            />
          </div>

          <div className={`${styles.layer} ${styles.layerTrees}`}>
            <Image src={content.images.trees} alt="" fill style={imgStyle} />
          </div>

          <div className={`${styles.layer} ${styles.layerSchool}`}>
            <Image
              src={content.images.school}
              alt="Niraj Public School campus building"
              fill
              style={imgStyle}
            />
          </div>

          <div className={`${styles.layer} ${styles.layerChildren}`}>
            <Image
              src={content.images.children}
              alt="Students looking up, full of hope"
              fill
              style={imgStyle}
            />
          </div>

          <div className={`${styles.layer} ${styles.layerContent}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
              <h1 className={styles.headline} data-fx="chars" data-fx-delay="0.15">
                {content.headlineLine1}
                <br />
                {content.headlineLine2}
                <br />
                <em>{content.headlineAccent}</em>
              </h1>
              <p className={styles.subcopy} data-fx="blur" data-fx-delay="0.55">{content.subcopy}</p>
              <div className={styles.ctaRow}>
                <a className={styles.btnPrimary} href={content.ctaPrimary.href} data-card-fx="fade" data-fx-group="hero-cta" data-fx-delay="0.8">
                  {content.ctaPrimary.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a className={styles.btnWatch} href={content.ctaSecondary.href} data-card-fx="fade" data-fx-group="hero-cta">
                  <span className={styles.playDot}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {content.ctaSecondary.label}
                </a>
              </div>
              <div className={styles.statsRow}>
                {content.stats.map((stat) => (
                  <div className={styles.stat} key={stat.label} data-card-fx="fade" data-fx-group="hero-stats" data-fx-delay="1">
                    <span className={styles.statValue} data-fx="count" data-fx-delay="1.1">{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.scriptAccent} aria-hidden="true">
              <span className={styles.scriptText} data-fx="blur" data-fx-delay="1.2">
                {content.scriptAccentLine1}
                <br />
                {content.scriptAccentLine2}
              </span>
              <svg className={styles.birds} viewBox="0 0 80 30" fill="none" aria-hidden="true">
                <path
                  d="M4 14 Q9 6 14 14 Q19 6 24 14"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M40 6 Q45 -2 50 6 Q55 -2 60 6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className={styles.scrollCue}>
              <span className={styles.scrollCueIcon}>
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="14"
                    height="22"
                    rx="7"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle className={styles.scrollDot} cx="8" cy="7" r="2" fill="currentColor" />
                </svg>
              </span>
              {content.scrollCueLabel}
            </div>
          </div>

          <div className={`${styles.layer} ${styles.layerBook}`}>
            <Image src={content.images.book} alt="" fill style={imgStyle} />
          </div>
        </div>
      </div>
    </section>
  );
}
