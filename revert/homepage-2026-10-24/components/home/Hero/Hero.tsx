"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import type { HomeContent } from "@/content/home";

export default function Hero({ content }: { content: HomeContent["hero"] }) {
  const [slide, setSlide] = useState(0);
  const slides = ["", "/Home Page/01-hero/slider2.png", "/Home Page/01-hero/slider3.jpg", "/Home Page/01-hero/slider4.jpg"];
  useEffect(() => { const id = window.setInterval(() => setSlide(v => (v + 1) % slides.length), 6500); return () => clearInterval(id); }, []);
  const imgStyle: React.CSSProperties = { objectFit: "cover", objectPosition: "center" };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroCanvas} id="hero-canvas">
        <div className={styles.heroStage} id="hero-stage">
          {/* Groups the photo layers alone (not the text/book layers) so
              mobile CSS can give the photo its own fixed-height band at the
              top of the section, independent of the text block that flows
              below it — see the max-width:640px rules in Hero.module.css.
              On desktop this wrapper is inset:0 same as its children always
              were, so nothing changes there. */}
          <div className={styles.imageZone}>
            <div className={`${styles.layer} ${styles.layerSky}`}>
              <Image src={content.images.sky} alt="" fill style={imgStyle} priority />
            </div>

            <div className={`${styles.layer} ${styles.layerClouds}`} id="layer-clouds">
              <video className={styles.cloudCanvas} autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/home-sky.mp4" type="video/mp4" /></video>
              <img
                className={styles.cloudFallback}
                id="cloud-fallback"
                src={content.images.cloudFallback}
                alt=""
              />
            </div>

            <div className={`${styles.layer} ${styles.layerTrees}`}>
              <Image src={content.images.trees} alt="" fill style={imgStyle} />
            </div>

            <div className={`${styles.layer} ${styles.layerSchool}`}>
              <Image
                src={content.images.school}
                alt="Niraj Public School campus building"
                fill
                style={imgStyle}
              />
            </div>

            <div className={`${styles.layer} ${styles.layerChildren}`}>
              <Image
                src={content.images.children}
                alt="Students looking up, full of hope"
                fill
                style={imgStyle}
              />
            </div>

            {/* Lives in the same proportional crop as the layers above it
                (same inset:0 of imageZone, same object-fit:cover) rather
                than its own separately-cropped box — it's drawn on the
                same 1672x941 canvas as them, so this is what keeps it
                lined up with where the children's photo actually ends
                instead of leaving a gap of bare sky between the two. */}
            <div className={`${styles.layer} ${styles.layerBook}`}>
              <Image src={content.images.book} alt="" fill style={imgStyle} />
            </div>
          </div>
          {slides.slice(1).map((src, i) => <div key={src} className={`${styles.slideImage} ${slide === i + 1 ? styles.slideActive : ""}`} aria-hidden="true" style={{ backgroundImage: `url("${src}")` }} />)}
          <div className={styles.slideControls} aria-label="Hero slides">{slides.map((_, i) => <button key={i} aria-label={`Show slide ${i + 1}`} aria-current={slide === i ? "true" : undefined} onClick={() => setSlide(i)} />)}</div>

          <div className={`${styles.layer} ${styles.layerContent}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-fx="spacing">{content.eyebrow}</p>
              <h1 className={styles.headline} data-fx="chars" data-fx-delay="0.15">
                {content.headlineLine1}
                <br />
                {content.headlineLine2}
                <br />
                <em>{content.headlineAccent}</em>
              </h1>
              <p className={styles.subcopy} data-fx="blur" data-fx-delay="0.55">{content.subcopy}</p>
              <div className={styles.ctaRow}>
                <a className={styles.btnPrimary} href={content.ctaPrimary.href} data-card-fx="fade" data-fx-group="hero-cta" data-fx-delay="0.8">
                  {content.ctaPrimary.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a className={styles.btnWatch} href={content.ctaSecondary.href} data-card-fx="fade" data-fx-group="hero-cta">
                  <span className={styles.playDot}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {content.ctaSecondary.label}
                </a>
              </div>
              <div className={styles.statsRow}>
                {content.stats.map((stat) => (
                  <div className={styles.stat} key={stat.label} data-card-fx="fade" data-fx-group="hero-stats" data-fx-delay="1">
                    <span className={styles.statValue} data-fx="count" data-fx-delay="1.1">{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.scriptAccent} aria-hidden="true">
              <span className={styles.scriptText} data-fx="blur" data-fx-delay="1.2">
                {content.scriptAccentLine1}
                <br />
                {content.scriptAccentLine2}
              </span>
              <svg className={styles.birds} viewBox="0 0 80 30" fill="none" aria-hidden="true">
                <path
                  d="M4 14 Q9 6 14 14 Q19 6 24 14"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M40 6 Q45 -2 50 6 Q55 -2 60 6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
