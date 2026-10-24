"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HomeLoader.module.css";

export default function HomeLoader() {
  const [progress, setProgress] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const release = useRef<() => void>(() => {});

  useEffect(() => {
    let visited = document.documentElement.dataset.homeVisited === "true";
    try { visited ||= localStorage.getItem("nps:home-visited") === "true"; } catch {}
    if (visited) {
      document.documentElement.dataset.homeVisited = "true";
      setGone(true);
      const frame = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLImageElement>("main img, header img, footer img").forEach(img => { img.loading = "eager"; });
        window.dispatchEvent(new Event("nps:home-ready"));
        ScrollTrigger.refresh();
      });
      return () => cancelAnimationFrame(frame);
    }
    let cancelled = false, finished = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];
    const main = document.querySelector("main");
    const oldOverflow = document.documentElement.style.overflow;
    const blocked = Array.from(document.querySelectorAll<HTMLElement>("main, header, footer"));
    const previousInert = blocked.map(el => el.inert);
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.homeLoading = "true";
    blocked.forEach(el => { el.inert = true; });
    const unlock = () => {
      document.documentElement.style.overflow = oldOverflow;
      delete document.documentElement.dataset.homeLoading;
      blocked.forEach((el, i) => { el.inert = previousInert[i]; });
    };
    const finish = (complete: boolean) => {
      if (cancelled || finished) return;
      finished = true;
      if (complete) setProgress(100);
      timers.push(setTimeout(() => {
        setLeaving(true);
        timers.push(setTimeout(() => {
          if (cancelled) return;
          unlock(); setGone(true);
          document.documentElement.dataset.homeVisited = "true";
          try { localStorage.setItem("nps:home-visited", "true"); } catch {}
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event("nps:home-ready"));
        }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 800));
      }, complete ? 250 : 0));
    };
    release.current = () => finish(false);
    timers.push(setTimeout(() => setCanContinue(true), 6000));
    // A stalled connection must never trap a visitor behind the loader.
    timers.push(setTimeout(() => finish(false), 25000));

    const waitImage = (img: HTMLImageElement) => new Promise<void>(resolve => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
        // Decode the selected responsive resource, not a second full-size copy.
        img.decode().catch(() => {}).finally(resolve);
      };
      img.addEventListener("load", done); img.addEventListener("error", done);
      cleanups.push(() => { img.removeEventListener("load", done); img.removeEventListener("error", done); });
      img.loading = "eager";
      if (img.closest("#hero")) img.fetchPriority = "high";
      if (img.complete) done();
    });
    const frame = requestAnimationFrame(() => {
      const tasks: Promise<unknown>[] = [];
      document.querySelectorAll<HTMLImageElement>("main img, header img, footer img").forEach(img => tasks.push(waitImage(img)));
      // Include CSS artwork as well as responsive <img> elements.
      const backgrounds = new Set<string>();
      main?.querySelectorAll<HTMLElement>("*").forEach(el => {
        for (const match of getComputedStyle(el).backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)) backgrounds.add(match[1]);
      });
      backgrounds.forEach(src => { const img = new window.Image(); img.src = src; tasks.push(waitImage(img)); });
      tasks.push(document.fonts.ready);
      document.querySelectorAll<HTMLVideoElement>("#hero video").forEach(video => {
        tasks.push(new Promise<void>(resolve => {
          if (video.readyState >= 3 || video.error) { resolve(); return; }
          const done = () => { video.removeEventListener("canplay", done); video.removeEventListener("error", done); resolve(); };
          video.addEventListener("canplay", done); video.addEventListener("error", done);
          cleanups.push(() => { video.removeEventListener("canplay", done); video.removeEventListener("error", done); });
        }));
      });
      let completed = 0;
      tasks.forEach(task => task.finally(() => {
        completed++;
        if (!cancelled && !finished) setProgress(Math.max(1, Math.min(99, Math.round(completed / tasks.length * 100))));
      }));
      Promise.allSettled(tasks).then(() => finish(true));
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); timers.forEach(clearTimeout); cleanups.forEach(fn => fn()); unlock(); };
  }, []);

  if (gone) return null;
  const quotes = ["A little curiosity opens a world of possibility.", "Every great story begins with a question.", "Room to learn. Space to grow. A place to belong."];
  return <div data-home-loader data-lenis-prevent className={`${styles.screen} ${leaving ? styles.leaving : ""}`} aria-label="Preparing the homepage" aria-busy={!leaving}>
    <div className={styles.grain} />
    <div className={styles.brand}><img src="/nps-logo-icon.png" width="48" height="48" alt="Niraj Public School" /><span>NIRAJ PUBLIC SCHOOL<small>LEARN · GROW · BELONG</small></span></div>
    <svg className={styles.art} viewBox="0 0 440 300" fill="none" aria-hidden="true">
      <circle cx="220" cy="150" r="111" stroke="currentColor" strokeDasharray="2 12" />
      <g className={styles.orbit}><circle cx="220" cy="39" r="7" fill="#d9b46c" /><path d="M330 166h20m-10-10v20" stroke="#d9b46c" strokeWidth="2" /></g>
      <path className={styles.line} d="M58 226C98 271 209 243 193 204C180 174 136 193 159 220C186 250 289 180 311 103" stroke="#d9b46c" strokeWidth="2" strokeLinecap="round" />
      <g className={styles.plane}><path d="M163 122L309 72L255 184L228 142L194 162L201 132Z" fill="#e9e6d3" stroke="#d9b46c" strokeWidth="2" /><path d="M163 122L309 72L228 142Z" fill="#c8d4b4" /><path d="M201 132L309 72L228 142M194 162L207 137" stroke="#315446" strokeWidth="2" /></g>
    </svg>
    <div className={styles.copy}><p>A WORLD OF POSSIBILITY</p><h1>Loading your<br /><em>experience.</em></h1><div className={styles.quote}>{quotes[Math.min(2, Math.floor(progress / 34))]}</div></div>
    <div className={styles.bottom}><div className={styles.readout}><span>PREPARING YOUR VISIT</span><strong>{progress}<small>%</small></strong></div><div className={styles.rail} role="progressbar" aria-label="Homepage media loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ transform: `scaleX(${progress / 100})` }} /></div><div className={styles.foot}><span>Images first. Moments next.</span>{canContinue && <button onClick={() => release.current()}>Continue to the website ↗</button>}</div></div>
  </div>;
}
