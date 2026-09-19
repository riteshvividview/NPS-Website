import Image from "next/image";
import styles from "./Section3.module.css";
import type { HomeContent } from "@/content/home";

export default function Section3({ content }: { content: HomeContent["section3"] }) {
  const imgStyle: React.CSSProperties = { objectFit: "cover", objectPosition: "center" };

  return (
    <section className={styles.section3} id="section3">
      <div className={styles.section3Canvas} id="section3-canvas">
        <div className={styles.section3Stage} id="section3-stage">
          <div className={`${styles.layer} ${styles.s3Bg}`} data-depth="0.04">
            <Image
              src={content.images.bg}
              alt="Children in a treehouse surrounded by signs for Curiosity, Knowledge, Creativity, Collaboration and Kindness"
              fill
              style={imgStyle}
            />
          </div>

          <div className={`${styles.layer} ${styles.s3BottomLeftFar}`} data-depth="0.1">
            <Image src={content.images.bottomLeftFar} alt="" fill style={imgStyle} />
          </div>
          <div className={`${styles.layer} ${styles.s3BottomRight}`} data-depth="0.12">
            <Image src={content.images.bottomRight} alt="" fill style={imgStyle} />
          </div>
          <div className={`${styles.layer} ${styles.s3BottomLeftNear}`} data-depth="0.08">
            <Image src={content.images.bottomLeftNear} alt="" fill style={imgStyle} />
          </div>

          <div className={`${styles.layer} ${styles.s3Birds}`} id="s3-birds">
            <Image src={content.images.birds} alt="" fill style={imgStyle} />
          </div>

          <div className={`${styles.layer} ${styles.s3Plane}`} id="s3-plane">
            <Image src={content.images.plane} alt="" fill style={imgStyle} />
          </div>

          <div className={`${styles.layer} ${styles.s3TopLeft}`} id="s3-top-left">
            <Image src={content.images.topLeft} alt="" fill style={imgStyle} />
          </div>

          <div className={`${styles.layer} ${styles.s3Content}`}>
            <header className={styles.s3Nav}>
              <span className={styles.s3Brand}>
                <svg
                  className={styles.s3BrandMark}
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M24 12 L32 18 L32 30 L24 36 L16 30 L16 18 Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
                {content.brandLabel}
              </span>
              <span className={styles.s3TagRight} data-fx="blur">{content.tagRight}</span>
            </header>

            <div className={styles.s3Copy}>
              <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
              <h2 className={styles.s3Heading} data-fx="words" data-fx-delay="0.1">
                {content.headlineLine1}
                <br />
                <em>{content.headlineAccent}</em>
              </h2>
              <span className={styles.s3Rule} data-fx="wipe" data-fx-delay="0.6" />
              <p className={styles.s3Subcopy} data-fx="blur" data-fx-delay="0.7">{content.subcopy}</p>
            </div>

            <div className={styles.s3ScrollCue}>
              <span>
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
                  <circle cx="8" cy="7" r="2" fill="currentColor" />
                </svg>
              </span>
              {content.scrollCueLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
