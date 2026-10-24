import Breadcrumb from '../shared/Breadcrumb';
import EditorialArtwork from '../shared/EditorialArtwork';
import SceneMotion from '../shared/SceneMotion';
import type {EditorialHeroProps} from '../shared/EditorialHero';
import styles from './Hero.module.css';
export default function Hero({breadcrumb,headline,tagline}:Omit<EditorialHeroProps,'kind'>){return <><section className={styles.hero} data-stage><Breadcrumb items={breadcrumb} className={styles.breadcrumb}/><div className={styles.kicker}><span>YOUNG ACHIEVERS</span><span>MANY TALENTS. ONE NIRAJ.</span></div><h1 className={styles.title} aria-label={headline}>There is more<br/>than one way<br/>to <em>shine.</em></h1><div className={styles.medal} data-medal><div data-pointer-depth><EditorialArtwork kind="achievers"/></div></div><p className={styles.tagline}>{tagline}</p><a className={styles.link} href="#page-collection">Find your inspiration <span>&darr;</span></a><div className={styles.ribbons} aria-hidden="true"><div data-ribbon>WRITERS / THINKERS / MAKERS / WRITERS / THINKERS / MAKERS /</div><div data-ribbon>ATHLETES / MUSICIANS / DREAMERS / ATHLETES / MUSICIANS /</div></div></section><SceneMotion scene="achievers"/></>}
