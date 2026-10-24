import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";
import EditorialArtwork, { type ArtworkKind } from "./EditorialArtwork";
import EditorialMotion from "./EditorialMotion";
import styles from "./EditorialHero.module.css";

const notes: Record<ArtworkKind, [string, string]> = {
  campus: ["Room to discover.", "A world of learning, within reach"],
  honours: ["Dedication. Recognised.", "The Niraj honours collection"],
  achievers: ["Small beginnings. Big possibilities.", "Many talents. One Niraj."],
  authors: ["Their words. Their worlds.", "The student-written collection"],
  leadership: ["A shared sense of direction.", "Guiding every stage of learning"],
  students: ["Every effort leaves a mark.", "From the Niraj results archive"],
  board: ["Rooted in purpose.", "The Niraj Educational Society"],
  visitors: ["An encounter. An inspiration.", "Pages from our guest book"],
};

export interface EditorialHeroProps {
  kind: ArtworkKind;
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  headline: string;
  tagline: string;
  stats?: { value: number; suffix?: string; label: string }[];
  facilities?: { title: string; icon: string }[];
}

export default function EditorialHero({ kind, breadcrumb, eyebrow, headline, tagline, stats, facilities }: EditorialHeroProps) {
  return <section className={`${styles.hero} ${styles[kind]}`} data-editorial-hero>
    <div className={styles.container}>
      <Breadcrumb items={breadcrumb} className={styles.breadcrumb} />
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.tagline}>{tagline}</p>
          <a className={styles.explore} href="#page-collection">Explore the collection <span aria-hidden="true">↗</span></a>
        </div>
        <figure className={styles.art} data-editorial-art>
          <span className={styles.edition}>NIRAJ / {kind === "campus" ? "CAMPUS NOTES" : "PEOPLE & POSSIBILITIES"}</span>
          <EditorialArtwork kind={kind} />
          <figcaption><span>{notes[kind][0]}</span><small>{notes[kind][1]}</small></figcaption>
        </figure>
      </div>
      {stats && <div className={styles.stats}>{stats.map(stat => <div className={styles.stat} key={stat.label}><strong>{stat.value}{stat.suffix}</strong><span>{stat.label}</span></div>)}</div>}
      {facilities && <nav className={styles.wayfinding} aria-label="Campus facilities">{facilities.map((facility, index) => <a href={`#facility-${facility.title.toLowerCase()}`} key={facility.title}><span>{String(index + 1).padStart(2, "0")}</span>{facility.title}<span aria-hidden="true">↗</span></a>)}</nav>}
      <div className={styles.rule}><span>LEARN · GROW · BELONG</span><span>SCROLL TO DISCOVER ↓</span></div>
    </div>
    <EditorialMotion />
  </section>;
}
