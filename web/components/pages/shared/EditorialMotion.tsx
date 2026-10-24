"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EditorialMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-editorial-hero]");
    const art = hero?.querySelector<HTMLElement>("[data-editorial-art]");
    if (!hero || !art) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(art, { opacity: 0, y: 24, duration: 1, ease: "power3.out" });
      gsap.to(art, { y: -28, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 } });
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const move = (event: PointerEvent) => {
        const box = art.getBoundingClientRect();
        gsap.to(art, { rotateY: ((event.clientX - box.left) / box.width - .5) * 7, rotateX: -((event.clientY - box.top) / box.height - .5) * 7, duration: .6, overwrite: "auto" });
      };
      const reset = () => gsap.to(art, { rotateX: 0, rotateY: 0, duration: .6 });
      art.addEventListener("pointermove", move);
      art.addEventListener("pointerleave", reset);
      return () => { art.removeEventListener("pointermove", move); art.removeEventListener("pointerleave", reset); };
    });
    return () => media.revert();
  }, []);
  return null;
}
