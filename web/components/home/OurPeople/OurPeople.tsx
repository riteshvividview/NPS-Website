import Image from "next/image";
import styles from "./OurPeople.module.css";
import type { OurPeopleContent } from "@/content/ourPeople";
import { featureIcons } from "./icons";
import OurPeopleParallaxRunner from "./OurPeopleParallaxRunner";

export default function OurPeople({ content }: { content: OurPeopleContent }) {
  return (
    <section className={styles.section} id="our-people">
      {/* Shared clip-path for every portrait — the exact organic frame
          shape supplied for this section, objectBoundingBox units so it
          scales with each portrait automatically. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="our-people-portrait-clip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0.08,0.03
                C 0.03,0.04 0.02,0.08 0.02,0.15
                L 0.02,0.94
                C 0.02,0.98 0.04,1.00 0.09,1.00
                L 0.96,0.95
                C 0.98,0.95 0.99,0.93 0.99,0.89
                L 0.99,0.15
                C 0.99,0.08 0.95,0.05 0.90,0.04
                C 0.60,0.01 0.30,0.00 0.08,0.03
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.bgPhoto}>
        <Image
          src="/section5/section5-bgimage.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
          sizes="100vw"
        />
      </div>

      <div className={`${styles.deco} ${styles.decoPenbox}`} id="people-penbox" aria-hidden="true">
        <Image src="/section5/s5-penbox.webp" alt="" width={80} height={117} />
      </div>
      <div className={`${styles.deco} ${styles.decoBooks}`} id="people-books" aria-hidden="true">
        <Image src="/section5/s5-books.webp" alt="" width={300} height={162} />
      </div>
      <div className={`${styles.deco} ${styles.decoGlobe}`} id="people-globe" aria-hidden="true">
        <Image src="/section5/s5-globe.webp" alt="" width={120} height={348} />
      </div>

      <div className={styles.navRow} data-fx="blur">{content.navRight}</div>

      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
          <h2 className={styles.headline} data-fx="chars" data-fx-delay="0.1">
            {content.headlineLead}
            <em>{content.headlineAccent}</em>
          </h2>
          <span className={styles.rule} data-fx="wipe" data-fx-delay="0.5" />
          <p className={styles.subcopy} data-fx="blur" data-fx-delay="0.6">{content.subcopy}</p>

          <div className={styles.features}>
            {content.features.map((f) => (
              <div className={styles.featureItem} key={f.label} data-card-fx="rise" data-fx-group="people-features" data-fx-delay="0.8">
                <span className={styles.featureIcon}>{featureIcons[f.icon]}</span>
                <span className={styles.featureLabel}>{f.label}</span>
              </div>
            ))}
          </div>

          <span className={styles.noteLeft} data-fx="wipe" data-fx-delay="1">{content.noteLeft}</span>
        </div>

        <div className={styles.portraitsCol}>
          <span className={styles.scriptNote} data-fx="wipe" data-fx-delay="0.6">{content.scriptNote}</span>
          <div className={styles.quoteBlock}>
            <p className={styles.quoteText} data-fx="blur" data-fx-delay="0.5">
              {content.quoteLine1}
              <span className={styles.quoteMark}>&rdquo;</span>
              <br />
              {content.quoteLine2}
              <br />
              {content.quoteLine3}
            </p>
            <span className={styles.quoteRule} />
          </div>

          <div className={styles.portraitsRow}>
            {content.portraits.map((p) => (
              <div className={styles.portrait} key={p.captionLine1} data-card-fx="rise" data-fx-group="people-portraits" data-fx-delay="0.3">
                <div className={styles.portraitClip} style={{ clipPath: "url(#our-people-portrait-clip)" }}>
                  <Image src={p.image} alt={p.alt} fill sizes="230px" style={{ objectFit: "cover", objectPosition: "center top" }} />
                  <div className={styles.portraitFade} />
                </div>
                <div className={styles.portraitCaption}>
                  <span
                    className={`${styles.portraitCaptionLine1} ${p.underline ? "is-underlined" : ""}`}
                  >
                    {p.captionLine1}
                  </span>
                  <span className={styles.portraitCaptionLine2}>{p.captionLine2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.spacer} />
      <OurPeopleParallaxRunner />
    </section>
  );
}
