import Breadcrumb from '../shared/Breadcrumb';
import EditorialArtwork from '../shared/EditorialArtwork';
import SceneMotion from '../shared/SceneMotion';
import type {EditorialHeroProps} from '../shared/EditorialHero';
import styles from './Hero.module.css';
export default function Hero({breadcrumb,headline,tagline,stats=[]}:Omit<EditorialHeroProps,'kind'>){return <><section className={styles.hero} data-stage><Breadcrumb items={breadcrumb} className={styles.breadcrumb}/><p className={styles.eyebrow}>NPS ACHIEVEMENTS / THE HONOURS COLLECTION</p><h1 className={styles.title} aria-label={headline}><span data-award-left>Earned.</span><span data-award-right>Celebrated.</span></h1><div className={styles.trophy} data-trophy><EditorialArtwork kind="honours"/></div><p className={styles.tagline}>{tagline}</p><div className={styles.stats} data-award-stats>{stats.map(s=><div key={s.label}><strong>{s.value}{s.suffix}</strong><span>{s.label}</span></div>)}</div><a className={styles.scroll} href="#page-collection">MEET OUR CHAMPIONS <span>&darr;</span></a><div className={styles.ring} aria-hidden="true"/></section><SceneMotion scene="honours"/></>}
