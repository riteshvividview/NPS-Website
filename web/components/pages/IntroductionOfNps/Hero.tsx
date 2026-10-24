import Image from "next/image";
import Breadcrumb from "../shared/Breadcrumb";
import type { IntroductionOfNpsContent } from "@/content/pages/introductionOfNps";
import styles from "../shared/SchoolStories.module.css";
import art from "./Opening.module.css";
export default function Hero({
  content,
}: {
  content: IntroductionOfNpsContent;
}) {
  return (
    <section className={`${styles.introHero} ${art.opening}`} data-school-opening>
      <div
        className={styles.leafBackdrop}
        style={{ backgroundImage: `url("${content.hero.backgroundImage}")` }}
        aria-hidden="true"
      />
      <Breadcrumb items={content.breadcrumb} />
      <div className={styles.introHeading}>
        <p className={styles.kicker}>INTRODUCTION OF NPS / EST. 1986</p>
        <h1>
          A school.
          <br />A community.
          <br />
          <em>A place to become.</em>
        </h1>
        <p>{content.hero.tagline}</p>
        <a href="#niraj-story" className={styles.roundLink}>
          Step into our story <span>↓</span>
        </a>
      </div>
      <svg className={art.sketch} viewBox="0 0 600 180" fill="none" aria-hidden="true">
        <path data-flight-trail d="M12 155C90 95 95 170 175 122S260 95 275 60C285 25 235 30 248 70S365 110 460 38" stroke="currentColor" strokeWidth="2" />
        <g data-paper-plane data-story-parallax>
          <path d="M430 38L530 12L481 80L472 48Z" fill="#e7c99f" stroke="currentColor" strokeWidth="2" />
          <path d="M430 38L472 48L530 12M472 48L481 80" stroke="currentColor" strokeWidth="2" />
        </g>
        <path data-story-ink d="M28 55Q65 37 98 55V111Q65 93 28 111ZM98 55Q133 37 170 55V111Q133 93 98 111M98 55V111M45 66L80 66M45 80L75 80M118 66L152 66M118 80L148 80" stroke="currentColor" strokeWidth="2" />
        <path data-story-ink d="M350 28V52M338 40H362M390 125V145M380 135H400" stroke="#b48847" strokeWidth="2" />
      </svg>
      <figure className={styles.campusPhoto} data-entrance-art>
        <Image
          src={content.hero.image}
          alt={content.hero.imageAlt}
          fill
          priority
          sizes="(max-width: 800px) 90vw, 52vw"
        />
        <figcaption>
          <span>AMEERPET / HYDERABAD</span>
          <strong>A home away from home.</strong>
        </figcaption>
        <span className={styles.photoCorner}>
          LEARN
          <br />
          GROW
          <br />
          BELONG
        </span>
      </figure>
      <div className={styles.established}>
        <span>ROOTED IN VALUES</span>
        <b>1986</b>
        <span>GROWING WITH EVERY GENERATION</span>
      </div>
    </section>
  );
}
