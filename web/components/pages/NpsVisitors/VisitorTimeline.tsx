"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import styles from "./VisitorTimeline.module.css";
import type { CategoryMeta, VisitorCategory, VisitorEra } from "@/content/pages/npsVisitors";

function iconFor(categories: CategoryMeta[], category: VisitorCategory) {
  return categories.find((c) => c.key === category)?.icon ?? "fa-user";
}

export default function VisitorTimeline({
  eyebrow,
  headline,
  intro,
  categories,
  eras,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  categories: CategoryMeta[];
  eras: VisitorEra[];
}) {
  const root = useRef<HTMLElement>(null);
  const [currentEra, setCurrentEra] = useState(eras[0]?.key ?? "");
  const [active, setActive] = useState<VisitorCategory | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const track = el.querySelector('[data-timeline-track]');
      gsap.fromTo(el.querySelector('[data-timeline-progress]'), {scaleY:0}, {scaleY:1,ease:'none',scrollTrigger:{trigger:track,start:'top 55%',end:'bottom 65%',scrub:true}});
      el.querySelectorAll('[data-visitor-entry]').forEach(entry => gsap.from(entry,{y:30,opacity:0,duration:.65,ease:'power3.out',scrollTrigger:{trigger:entry,start:'top 95%',once:true}}));
    }, el);
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) setCurrentEra(entry.target.getAttribute('data-era') ?? ''); }); }, {rootMargin:'-15% 0px -65% 0px',threshold:0});
    el.querySelectorAll('[data-era]').forEach(era => observer.observe(era));
    return () => { observer.disconnect(); mm.revert(); };
  }, [active, eras]);

  const filteredEras = eras
    .map((era) => ({
      ...era,
      visitors: active ? era.visitors.filter((v) => v.category === active) : era.visitors,
    }))
    .filter((era) => era.visitors.length > 0);



  return (
    <section ref={root} className={styles.section} id="page-collection">
      <RevealOnScroll className={styles.intro}>
        <p className={`${styles.eyebrow} js-reveal`}>{eyebrow}</p>
        <h2 className={`${styles.headline} js-reveal`}>{headline}</h2>
        <p className={`${styles.introText} js-reveal`}>{intro}</p>
      </RevealOnScroll>

      <div className={styles.filters} role="group" aria-label="Filter visitors by category">
        <button
          type="button"
          className={`${styles.chip} ${active === null ? styles.isActive : ""}`}
          aria-pressed={active === null}
          onClick={() => setActive(null)}
        >
          All Visitors
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`${styles.chip} ${active === c.key ? styles.isActive : ""}`}
            aria-pressed={active === c.key}
            onClick={() => setActive(c.key)}
          >
            <i className={`fa-solid ${c.icon}`} />
            {c.key}
          </button>
        ))}
      </div>

      <nav className={styles.eraNav} aria-label="Jump to a visitor era">{filteredEras.map(era => <a href={'#era-' + era.key} key={era.key} aria-current={currentEra === era.key ? 'location' : undefined}>{era.label}</a>)}</nav>
      <p className={styles.resultCount} aria-live="polite">{filteredEras.reduce((n, era) => n + era.visitors.length, 0)} entries in the guest book</p>
      <div className={styles.timeline} data-timeline-track>
        <span className={styles.spine} aria-hidden="true" /><span className={styles.progress} data-timeline-progress aria-hidden="true" />
        {filteredEras.map((era, eraIndex) => (
          <div className={styles.era} id={"era-" + era.key} data-era={era.key} key={era.key}>
            <div className={styles.eraLabel}>
              <span className={styles.eraDot} />
              {era.label}
            </div>
            {era.visitors.map((v, visitorIndex) => {
              const index = filteredEras.slice(0, eraIndex).reduce((count, item) => count + item.visitors.length, 0) + visitorIndex;
              const side = index % 2 === 0 ? styles.left : styles.right;
              return (
                <div data-visitor-entry className={`${styles.entry} ${side}`} key={v.key}>
                  <span className={styles.entryDot} />
                  <div className={styles.entryCard}>
                    <span className={styles.entryIcon}>
                      <i className={`fa-solid ${iconFor(categories, v.category)}`} />
                    </span>
                    <div className={styles.entryBody}>
                      <p className={styles.entryName}>{v.name}</p>
                      <div className={styles.entryMeta}>
                        <span className={styles.entryDate}>{v.date}</span>
                        {v.place && <span className={styles.entryPlace}>{v.place}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
