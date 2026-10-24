import Breadcrumb, { type BreadcrumbItem } from "@/components/pages/shared/Breadcrumb";
import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import Image from "next/image";
import type { CSSProperties } from "react";
import OrbitRunner from "./OrbitRunner";
import styles from "./Hero.module.css";

export interface NpsVisionHeroProps {
  breadcrumb: BreadcrumbItem[];
  headline: string;
  tagline: string;
  centerIcon: string;
  orbitIcons: string[];
  labels: string[];
  image: string;
}

/**
 * This page's own cursor effect (every secondary page gets a distinct one):
 * the seven commitment icons orbit slowly around a central compass, always
 * upright, and magnify toward the cursor as it passes near them — a small
 * "icon dock" interaction rather than the photo-parallax or 3D-tilt the
 * other two pages use.
 */
export default function Hero({ breadcrumb, headline, tagline, centerIcon, orbitIcons, labels, image }: NpsVisionHeroProps) {
  const count = orbitIcons.length;

  return (
    <section className={styles.hero} data-vision-hero>
      <div className={styles.photo} data-vision-photo style={{ backgroundImage: `url("${image}")` }} aria-hidden="true" />
      <div className={styles.photoFade} aria-hidden="true" />
      <Breadcrumb items={breadcrumb} className={styles.breadcrumb} />

      <div className={styles.orbitStage} id="vision-orbit-stage">
        <div className={styles.halo} />
        <div className={styles.ring}>
          {orbitIcons.map((icon, i) => {
            const angle = (360 / count) * i;
            return (
              <div className={styles.node} style={{ transform: `rotate(${angle}deg) translateX(var(--orbit-radius))`, "--label-angle": `${-angle}deg`, "--icon-angle": `${-angle}deg` } as CSSProperties} key={icon + i}>
                <div className={styles.nodeCounter}>
                  <button className={styles.nodeIcon} data-orbit-icon data-commitment-index={i} type="button" aria-label={`Read about ${labels[i]}`} title={`Read about ${labels[i]}`}>
                    <i className={icon} aria-hidden="true" />
                  </button>
                </div>
                <span className={styles.nodeLabel}>{labels[i]}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.center}>
          <i className={centerIcon} aria-hidden="true" />
        </div>
      </div>

      <RevealOnScroll className={styles.copy}>
        <h1 className={`${styles.headline} js-reveal`}>
          <span>NPS</span>
          <Image
            className={styles.headlineImage}
            src="/NPS%20Vision%20Page/Vision-text-image.png"
            alt="Vision"
            width={1981}
            height={794}
            priority
            sizes="(max-width: 560px) 150px, (max-width: 900px) 190px, 230px"
          />
        </h1>
        <p className={`${styles.tagline} js-reveal`}>{tagline}</p>
      </RevealOnScroll>

      <OrbitRunner />
    </section>
  );
}
