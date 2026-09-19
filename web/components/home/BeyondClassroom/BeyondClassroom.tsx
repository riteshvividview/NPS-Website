import Image from "next/image";
import styles from "./BeyondClassroom.module.css";
import type { BeyondClassroomContent } from "@/content/beyondClassroom";
import { statIcons, ArrowRight } from "./icons";
import Carousel from "./Carousel";
import BeyondClassroomParallaxRunner from "./BeyondClassroomParallaxRunner";

export default function BeyondClassroom({ content }: { content: BeyondClassroomContent }) {
  return (
    <section className={styles.section} id="beyond-classroom">
      <div className={styles.bgPhoto}>
        <Image
          src="/co-curricular-section/backgroundimg.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className={`${styles.deco} ${styles.decoDesk}`} id="beyond-desk" aria-hidden="true">
        <Image src="/co-curricular-section/cc-node.webp" alt="" width={640} height={93} />
      </div>
      <div className={`${styles.deco} ${styles.decoRocket}`} data-depth="0.6" aria-hidden="true">
        <Image src="/co-curricular-section/cc-rocket.webp" alt="" width={180} height={114} />
      </div>
      <div className={`${styles.deco} ${styles.decoBooks}`} id="beyond-books" aria-hidden="true">
        <Image src="/co-curricular-section/cc-books.webp" alt="" width={480} height={253} />
      </div>

      <div className={styles.navRow} data-fx="blur">{content.navRight}</div>

      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
          <h2 className={styles.headline} data-fx="chars" data-fx-delay="0.1">
            {content.headlineLead}
            <br />
            <em>{content.headlineAccent}</em>
          </h2>
          <p className={styles.subcopy} data-fx="blur" data-fx-delay="0.5">{content.subcopy}</p>
          <a className={styles.ctaRow} href={content.ctaHref} data-card-fx="fade" data-fx-delay="0.7">
            <span className={styles.ctaCircle}>
              <ArrowRight />
            </span>
            <span className={styles.ctaLabel}>
              <span>{content.ctaLine1}</span>
              <span>{content.ctaLine2}</span>
            </span>
          </a>
          <span className={styles.noteLeft} data-fx="wipe" data-fx-delay="0.9">{content.noteLeft}</span>
        </div>

        <Carousel
          groups={content.slideGroups}
          noteRightLine1={content.noteRightLine1}
          noteRightLine2={content.noteRightLine2}
        />
      </div>

      <div className={styles.statBar}>
        {content.stats.map((stat) => (
          <div className={styles.statItem} key={stat.label} data-card-fx="fade" data-fx-group="bc-stats" data-fx-start="top 95%" data-fx-delay="0.35">
            <span className={styles.statIcon}>{statIcons[stat.icon]}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.spacer} />
      <BeyondClassroomParallaxRunner />
    </section>
  );
}
