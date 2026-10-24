"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OrbitRunner() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-vision-hero]");
    const stage = document.getElementById("vision-orbit-stage");
    const photo = document.querySelector<HTMLElement>("[data-vision-photo]");
    if (!hero || !stage || !photo) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const icons = Array.from(stage.querySelectorAll<HTMLElement>("[data-orbit-icon]"));
    const onCommitmentClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-commitment-index]");
      if (!button) return;
      const row = document.getElementById(`vision-commitment-${button.dataset.commitmentIndex}`);
      row?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    };
    stage.addEventListener("click", onCommitmentClick);

    let pointerRaf = 0;
    let setupRaf = 0;
    let scrollRaf = 0;
    let cancelled = false;
    let scrollTween: gsap.core.Tween | undefined;
    const cleanups: (() => void)[] = [];

    if (!reduceMotion) {
      // Give route layout and any shared scroll setup time to settle first.
      setupRaf = requestAnimationFrame(() => {
        scrollRaf = requestAnimationFrame(() => {
          if (cancelled) return;
          const from = Number.parseFloat(getComputedStyle(photo).backgroundPositionY) || 44;
          scrollTween = gsap.fromTo(
            photo,
            { backgroundPositionY: `${from}%` },
            {
              backgroundPositionY: `${from + 14}%`,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });

      if (canHover) {
        const onPointerMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          const overOrbit = stage.contains(event.target as Node);
          photo.style.setProperty("--pointer-x", `${x * 16}px`);
          photo.style.setProperty("--pointer-y", `${y * 12}px`);
          stage.style.setProperty("--pointer-x", overOrbit ? "0px" : `${x * -8}px`);
          stage.style.setProperty("--pointer-y", overOrbit ? "0px" : `${y * -6}px`);
        };
        const onPointerLeave = () => {
          photo.style.setProperty("--pointer-x", "0px");
          photo.style.setProperty("--pointer-y", "0px");
          stage.style.setProperty("--pointer-x", "0px");
          stage.style.setProperty("--pointer-y", "0px");
        };
        hero.addEventListener("pointermove", onPointerMove);
        hero.addEventListener("pointerleave", onPointerLeave);
        cleanups.push(() => {
          hero.removeEventListener("pointermove", onPointerMove);
          hero.removeEventListener("pointerleave", onPointerLeave);
        });

        if (icons.length > 0) {
          // Separate axis tweens avoid this GSAP version's combined-scale reset issue.
          const scaleX = icons.map((icon) => gsap.quickTo(icon, "scaleX", { duration: 0.35, ease: "power2.out" }));
          const scaleY = icons.map((icon) => gsap.quickTo(icon, "scaleY", { duration: 0.35, ease: "power2.out" }));
          const onMouseMove = (event: MouseEvent) => {
            cancelAnimationFrame(pointerRaf);
            pointerRaf = requestAnimationFrame(() => {
              icons.forEach((icon, i) => {
                const rect = icon.getBoundingClientRect();
                const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
                const factor = 1 + Math.max(0, 1 - distance / 110) * 0.6;
                scaleX[i](factor);
                scaleY[i](factor);
              });
            });
          };
          const onMouseLeave = () => {
            cancelAnimationFrame(pointerRaf);
            scaleX.forEach((scale) => scale(1));
            scaleY.forEach((scale) => scale(1));
          };
          stage.addEventListener("mousemove", onMouseMove);
          stage.addEventListener("mouseleave", onMouseLeave);
          cleanups.push(() => {
            cancelAnimationFrame(pointerRaf);
            stage.removeEventListener("mousemove", onMouseMove);
            stage.removeEventListener("mouseleave", onMouseLeave);
          });
        }
      }
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(pointerRaf);
      cancelAnimationFrame(setupRaf);
      cancelAnimationFrame(scrollRaf);
      stage.removeEventListener("click", onCommitmentClick);
      cleanups.forEach((cleanup) => cleanup());
      scrollTween?.scrollTrigger?.kill();
      scrollTween?.kill();
    };
  }, []);

  return null;
}
