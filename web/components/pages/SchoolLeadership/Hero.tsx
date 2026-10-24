import Breadcrumb from "../shared/Breadcrumb";
import SceneMotion from "../shared/SceneMotion";
import type { EditorialHeroProps } from "../shared/EditorialHero";
import styles from "./Hero.module.css";
export default function Hero({
  breadcrumb,
  headline,
  tagline,
}: Omit<EditorialHeroProps, "kind">) {
  return (
    <>
      <section className={styles.hero} data-stage>
        <Breadcrumb items={breadcrumb} className={styles.breadcrumb} />
        <div className={styles.layout}>
          <div>
            <p className={styles.label}>THE PEOPLE / A SHARED PURPOSE</p>
            <h1>{headline}</h1>
            <div className={styles.statement} data-entrance-line>
              Good guidance.
              <br />
              <span>Room to grow.</span>
            </div>
            <p className={styles.intro}>{tagline}</p>
            <a className={styles.meet} href="#page-collection">
              Meet our leadership <span>&darr;</span>
            </a>
          </div>
          <div className={styles.guidance} data-entrance-art>
            <div className={styles.arch}>
              <svg viewBox="0 0 430 450" aria-hidden="true">
                <circle cx="215" cy="165" r="110" fill="#e3d7b4" />
                <path
                  d="M215 360V105M215 270Q90 265 100 165Q220 165 215 270M215 210Q340 200 325 100Q220 105 215 210"
                  fill="#a6b392"
                  stroke="#688257"
                  strokeWidth="3"
                />
                <path
                  d="M70 365L210 385L355 365V405L210 425L70 405Z"
                  fill="#b9a577"
                />
                <path d="M70 365L210 345L355 365L210 385Z" fill="#f8f0d7" />
                <path
                  d="M210 385V425M85 382L195 398M225 398L340 382"
                  stroke="#8d7d59"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>
              <span>LEARNING STARTS WITH POSSIBILITY</span>
            </div>
            <div className={styles.paperNote}>
              <small>THE NIRAJ WAY</small>
              <p>
                See the potential.
                <br />
                Nurture the person.
              </p>
              <i>People. Purpose. Progress.</i>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.reading}>
        <span>WHAT GUIDES US</span>
        <p>
          {"The best direction begins with seeing the possibility in every child."
            .split(" ")
            .map((word, i) => (
              <span data-reading-word key={i}>
                {word}{" "}
              </span>
            ))}
        </p>
        <span>LEADERSHIP AT NIRAJ</span>
      </section>
      <SceneMotion scene="leadership" />
    </>
  );
}
