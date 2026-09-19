import Image from "next/image";
import styles from "./Section2.module.css";
import type { HomeContent } from "@/content/home";

const valuePositionClass: Record<string, string> = {
  curiosity: styles.valueCuriosity,
  discovery: styles.valueDiscovery,
  creativity: styles.valueCreativity,
  collaboration: styles.valueCollaboration,
};

const valueIcons: Record<string, React.ReactNode> = {
  lightbulb: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  globe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  ),
  palette: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2s-.5-1.5-.5-2 .5-1 1.5-1h1a5 5 0 0 0 5-5 10 10 0 0 0-9-10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
      <circle cx="11" cy="7" r="1.2" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" />
    </svg>
  ),
  people: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 20c0-3 3-5 6-5s6 2 6 5M16 9a3 3 0 1 0 0-6M20 20c0-2.5-2-4-4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function Section2({ content }: { content: HomeContent["section2"] }) {
  const imgStyle: React.CSSProperties = { objectFit: "cover", objectPosition: "center" };
  const flyDepths = [0.34, 0.26, 0.3, 0.2, 0.38, 0.32, 0.36];

  return (
    <section className={styles.section2} id="section2">
      <div className={styles.section2Canvas} id="section2-canvas">
        <div className={styles.section2Stage} id="section2-stage">
          <div className={`${styles.layer} ${styles.s2Bg}`} data-depth="0.04">
            <Image
              src={content.images.bg}
              alt="Students exploring, learning and building together on an open book in a green landscape"
              fill
              style={imgStyle}
            />
          </div>

          <div
            className={`${styles.layer} ${styles.s2Globe}`}
            data-depth="-0.22"
            data-settle="true"
          >
            <Image src={content.images.globe} alt="" fill style={imgStyle} />
          </div>

          <div
            className={`${styles.layer} ${styles.s2Boy}`}
            data-depth="-0.16"
            data-settle="true"
          >
            <Image src={content.images.boy} alt="" fill style={imgStyle} />
          </div>

          {content.images.fly.map((src, i) => (
            <div
              className={`${styles.layer} ${styles.s2Fly}`}
              data-depth={flyDepths[i]}
              key={src}
            >
              <Image src={src} alt="" fill style={imgStyle} />
            </div>
          ))}

          <div className={`${styles.layer} ${styles.s2Content}`}>
            <header className={styles.s2Nav}>
              <a className={styles.s2Brand} href="#">
                <svg
                  className={styles.s2BrandMark}
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="23" stroke="#bfe3cf" strokeWidth="1.5" />
                  <path
                    d="M24 12 L32 18 L32 30 L24 36 L16 30 L16 18 Z"
                    stroke="#e8d28a"
                    strokeWidth="1.3"
                  />
                </svg>
                <span>{content.brandLabel}</span>
              </a>
              <span className={styles.s2TagRight} data-fx="blur">{content.tagRight}</span>
            </header>

            <div className={styles.s2Headline}>
              <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
              <h2 data-fx="chars" data-fx-delay="0.1">
                {content.headlineLine1}
                <br />
                <em>{content.headlineAccent}</em>
              </h2>
              <span className={styles.s2Rule} data-fx="wipe" data-fx-delay="0.5" />
            </div>

            <ul className={styles.s2Values}>
              {content.values.map((value) => (
                <li
                  className={`${styles.s2Value} ${valuePositionClass[value.key] ?? ""}`}
                  key={value.key}
                  data-card-fx="pop"
                  data-fx-group="s2-values"
                  data-float
                >
                  <span className={styles.s2ValueIcon}>{valueIcons[value.icon]}</span>
                  <span>{value.label}</span>
                </li>
              ))}
            </ul>

            <div className={styles.s2ScrollCue}>
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

            <div className={styles.s2TagCorner} data-fx="fade-up" data-fx-delay="0.4">
              {content.tagCornerLine1}
              <br />
              {content.tagCornerLine2}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
