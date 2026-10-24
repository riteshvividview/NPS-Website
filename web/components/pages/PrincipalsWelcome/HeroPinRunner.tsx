"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function HeroPinRunner() {
  useEffect(() => {
    const hero = document.getElementById("principals-welcome-hero");
    if (!hero) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(hero.querySelector("[data-campus-art]"), {
          y: 25,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=55%",
            scrub: 1,
            pin: hero,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });
      },
      hero,
    );
    return () => mm.revert();
  }, []);
  return null;
}
