"use client";

import { useEffect, useState } from "react";
import styles from "./PolicyPage.module.css";

export interface PolicySection {
  title: string;
  paragraphs: string[];
}

export interface PolicyPageProps {
  title: string;
  eyebrow: string;
  intro: string;
  sections: PolicySection[];
}

const contact = {
  address: "6-3-864, Saadat Manzil, Ameerpet, Hyderabad, 500016",
  hours: "Monday to Saturday, 8:00 AM to 4:00 PM",
  support:
    "Empowering Minds, Nurturing Futures — Your Gateway to Academic Excellence, Just a Click Away at Our Support Centre.",
};

export default function PolicyPage({ title, eyebrow, intro, sections }: PolicyPageProps) {
  const [active, setActive] = useState("section-0");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const headings = sections.map((_, i) => document.getElementById(`section-${i}`)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      observer.disconnect();
    };
  }, [sections]);

  return (
    <main className={styles.page}>
      <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}><span />{eyebrow}</div>
          <h1>{title}</h1>
          <p className={styles.lead}>{intro}</p>
          <div className={styles.heroMeta}>
            <span className={styles.metaIcon} aria-hidden="true">✳</span>
            <span>Clear guidance for your visit to Niraj Public School online</span>
          </div>
        </div>
        <div className={styles.heroIndex} aria-hidden="true">NPS <b>·</b> {String(sections.length).padStart(2, "0")} SECTIONS</div>
      </header>

      <div className={styles.contentShell}>
        <aside className={styles.sidebar} aria-label="On this page">
          <p className={styles.sidebarLabel}>On this page</p>
          <nav>
            {sections.map((section, i) => {
              const id = `section-${i}`;
              return <a className={active === id ? styles.activeLink : ""} href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}>
                <span>{String(i + 1).padStart(2, "0")}</span>{section.title}
              </a>;
            })}
            <a className={active === "contact" ? styles.activeLink : ""} href="#contact"><span>{String(sections.length + 1).padStart(2, "0")}</span>Contact</a>
          </nav>
          <a className={styles.backTop} href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top <span>↑</span></a>
        </aside>

        <article className={styles.article}>
          <div className={styles.articleIntro}><span>THE DETAILS</span><p>{intro}</p></div>
          {sections.map((section, i) => (
            <section className={styles.policySection} id={`section-${i}`} key={section.title}>
              <div className={styles.sectionNumber}>{String(i + 1).padStart(2, "0")}</div>
              <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph, j) => <p key={j}>{paragraph}</p>)}</div>
            </section>
          ))}
          <section className={`${styles.policySection} ${styles.contactSection}`} id="contact">
            <div className={styles.sectionNumber}>{String(sections.length + 1).padStart(2, "0")}</div>
            <div><h2>Contact and support</h2>
              <p>{contact.support}</p>
              <div className={styles.contactGrid}>
                <div><span>VISIT US</span><p>{contact.address}</p></div>
                <div><span>WORKING HOURS</span><p>{contact.hours}</p></div>
              </div>
            </div>
          </section>
          <div className={styles.closingNote}><span>✳</span><p>Thank you for being part of the Niraj Public School community.</p></div>
        </article>
      </div>
    </main>
  );
}
