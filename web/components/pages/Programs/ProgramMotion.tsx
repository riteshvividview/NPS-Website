"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProgramMotion({ kind }: { kind: string }) {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.closest("main");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        root.querySelectorAll<HTMLElement>("[data-enter]").forEach((el) =>
          gsap.from(el, {
            y: 45,
            opacity: 0,
            duration: 0.85,
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }),
        );
        root.querySelectorAll<HTMLElement>("[data-drift]").forEach((el, i) =>
          gsap.to(el, {
            yPercent: i % 2 ? 20 : -20,
            rotate: i % 2 ? 12 : -12,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }),
        );
        root.querySelectorAll<SVGPathElement>("[data-draw]").forEach((el) => {
          const length = el.getTotalLength();
          gsap.fromTo(
            el,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section"),
                start: "top 70%",
                end: "bottom 60%",
                scrub: 1,
              },
            },
          );
        });
      },
      root,
    );
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const stage = root.querySelector<HTMLElement>("[data-program-stage]");
        const art = stage?.querySelector("[data-main-art]");
        if (stage && art) {
          // Openings scroll naturally; the selected lower sections own the larger scenes.
          const rotations: Record<string, number> = {
            "primary-school": 35,
            "middle-school": -5,
            "cca-department": 18,
            isc: 30,
          };
          if (kind !== "special-section" && kind !== "careers") {
            gsap.to(art, {
              yPercent: kind === "routes" ? 8 : -8,
              rotate: rotations[kind] || 0,
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        }
        root
          .querySelectorAll<HTMLElement>("[data-cover-panel]")
          .forEach((el, i, all) => {
            if (i < all.length - 1)
              gsap.to(el, {
                scale: 0.94,
                rotate: i % 2 ? 2 : -2,
                ease: "none",
                scrollTrigger: {
                  trigger: all[i + 1],
                  // Begin the cover only after the following panel has moved
                  // well into view, leaving the current card readable first.
                  start: "top 68%",
                  end: "top 18%",
                  scrub: true,
                },
              });
          });
      },
      root,
    );
    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const move = (e: PointerEvent) => {
          const el = (e.target as Element).closest<HTMLElement>("[data-light]");
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        root.addEventListener("pointermove", move);
        return () => root.removeEventListener("pointermove", move);
      },
    );
    return () => mm.revert();
  }, [kind]);
  return <span ref={marker} hidden />;
}
