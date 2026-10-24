"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Choreography only. Each page supplies its own scene and layout. */
export default function SceneMotion({ scene }: { scene: "honours" | "achievers" | "authors" | "leadership" | "students" | "board" | "visitors" }) {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const main = marker.current?.closest("main");
    const stage = main?.querySelector<HTMLElement>("[data-stage]");
    if (!main || !stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      main.querySelectorAll<HTMLElement>("[data-scene-reveal]").forEach((el) => {
        gsap.from(el, { y: 50, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 93%", once: true } });
      });
      if (scene === "achievers") {
        stage.querySelectorAll<HTMLElement>("[data-ribbon]").forEach((el, i) => gsap.to(el, { xPercent: i % 2 ? 12 : -12, ease: "none", scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub: 1 } }));
        gsap.to(stage.querySelector("[data-medal]"), { rotate: 35, y: -100, ease: "none", scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub: 1 } });
      }
      if (scene === "leadership") {
        const art = stage.querySelector("[data-entrance-art]");
        if (art) gsap.to(art, { yPercent: -8, ease: "none", scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub: 1 } });
        main.querySelectorAll("[data-reading-word]").forEach((word, i) => gsap.fromTo(word, { opacity: .2 }, { opacity: 1, scrollTrigger: { trigger: word.parentElement, start: `top ${85 - i * 2}%`, end: `top ${65 - i * 2}%`, scrub: true } }));
      }
      if (scene === "board") {
        stage.querySelectorAll<SVGPathElement>("[data-tree] path").forEach((path, i) => {
          const length = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.5, delay: i * .08, ease: "power2.out", scrollTrigger: { trigger: stage, start: "top 75%", once: true } });
        });
        main.querySelectorAll<HTMLElement>("[data-board-tier]").forEach((tier) => gsap.from(tier, { y: 60, duration: 1, ease: "power3.out", scrollTrigger: { trigger: tier, start: "top 90%", once: true } }));
      }
    }, main);
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      if (["honours", "authors", "students", "visitors"].includes(scene)) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top top", end: scene === "authors" ? "+=100%" : "+=80%", pin: true, scrub: 1, invalidateOnRefresh: true } });
        if (scene === "honours") {
          tl.to(stage.querySelector("[data-trophy]"), { rotateY: 28, rotateZ: 9, scale: 1.3, y: -35, duration: 1 }, 0)
            .to(stage.querySelector("[data-award-left]"), { xPercent: -25, opacity: .2, duration: 1 }, 0)
            .to(stage.querySelector("[data-award-right]"), { xPercent: 25, opacity: .2, duration: 1 }, 0)
            .from(stage.querySelector("[data-award-stats]"), { y: 70, opacity: 0, duration: .45 }, .55);
          main.querySelectorAll<HTMLElement>("[data-honour]").forEach((card, i) => gsap.from(card, { xPercent: i % 2 ? 8 : -8, opacity: .2, scrollTrigger: { trigger: card, start: "top 90%", end: "top 40%", scrub: 1 } }));
        }
        if (scene === "authors") {
          tl.to(stage.querySelector("[data-book-cover]"), { rotateY: -150, duration: .8, ease: "power1.inOut" }, 0)
            .to(stage.querySelector("[data-open-book]"), { rotate: 0, xPercent: 16, scale: 1.08, duration: 1 }, 0)
            .to(stage.querySelector("[data-author-copy]"), { y: -60, opacity: .15, duration: 1 }, 0);
          main.querySelectorAll<HTMLElement>("[data-shelf]").forEach(shelf => gsap.from(shelf.querySelectorAll("button"), { y: 70, rotate: -8, stagger: .055, duration: .8, ease: "power3.out", scrollTrigger: { trigger: shelf, start: "top 88%", once: true } }));
        }
        if (scene === "students") {
          tl.to(stage.querySelector("[data-result-number]"), { scale: 1.65, yPercent: -10, opacity: .08, duration: 1 }, 0)
            .from(stage.querySelector("[data-result-note]"), { y: 140, opacity: 0, rotate: -8, duration: .7 }, .3);
        }
        if (scene === "visitors") {
          stage.querySelectorAll<HTMLElement>("[data-ticket]").forEach((ticket, i) => tl.to(ticket, { x: (i % 2 ? -1 : 1) * 120, y: i % 2 ? -100 : 110, rotate: i % 2 ? -15 : 15, duration: 1 }, 0));
          tl.to(stage.querySelector("[data-guest-title]"), { scale: 1.18, y: -30, duration: 1 }, 0);
        }
      }
    }, main);
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      let hovered: HTMLElement | null = null;
      const resetDepth = () => {
        if (hovered) gsap.to(hovered, { rotateX: 0, rotateY: 0, duration: .7 });
        hovered = null;
      };
      const depth = (event: PointerEvent) => {
        const el = (event.target as Element).closest<HTMLElement>('[data-pointer-depth]');
        if (!el || !main.contains(el)) { resetDepth(); return; }
        if (hovered !== el) resetDepth();
        hovered = el;
        const r = el.getBoundingClientRect();
        gsap.to(el, { rotateX: -((event.clientY-r.top)/r.height-.5)*12, rotateY: ((event.clientX-r.left)/r.width-.5)*12, duration: .7, overwrite: 'auto', transformPerspective:900 });
      };
      main.addEventListener('pointermove', depth);
      main.addEventListener('pointerleave', resetDepth);
      const light = (e: PointerEvent) => { const r = stage.getBoundingClientRect(); stage.style.setProperty("--cursor-x", `${e.clientX - r.left}px`); stage.style.setProperty("--cursor-y", `${e.clientY - r.top}px`); };
      stage.addEventListener("pointermove", light);
      return () => { main.removeEventListener("pointermove", depth); main.removeEventListener("pointerleave", resetDepth); main.querySelectorAll("[data-pointer-depth]").forEach(el => gsap.killTweensOf(el)); stage.removeEventListener("pointermove", light); };
    }, main);
    return () => mm.revert();
  }, [scene]);
  return <span ref={marker} hidden />;
}
