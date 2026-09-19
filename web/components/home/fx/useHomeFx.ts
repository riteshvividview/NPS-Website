"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterFrames } from "@/lib/afterFrames";
import { splitText } from "./splitText";

gsap.registerPlugin(ScrollTrigger);

/**
 * Home-page text + card motion, driven entirely by data attributes so
 * sections stay declarative:
 *
 *  Text  — data-fx="chars | words | blur | spacing | wipe | fade-up | count"
 *          (optional data-fx-delay="0.3" seconds, data-fx-start="top 80%")
 *  Cards — data-card-fx="rise | fade | pop | slide-right | slide-left"
 *          elements sharing data-fx-group animate together with a stagger;
 *          data-float adds a slow idle bob after the entrance.
 *  Tilt  — data-tilt adds a pointer-follow 3D tilt.
 *
 * Only static, server-rendered elements should carry these attributes —
 * anything React re-mounts (carousel slides) handles its own animation.
 * Elements are pre-hidden by CSS (globals.css, html.fx) until this runs,
 * then flagged with data-fx-ready.
 */
export function useHomeFx() {
  useEffect(() => {
    const all = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-fx], [data-card-fx]")
      );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      all().forEach((el) => el.setAttribute("data-fx-ready", "1"));
      return;
    }

    const cleanups: (() => void)[] = [];

    const cancel = afterFrames(() => {
      const ctx = gsap.context(() => {
        /* ---------------- Text effects ---------------- */
        document.querySelectorAll<HTMLElement>("[data-fx]").forEach((el) => {
          const mode = el.dataset.fx;
          const delay = parseFloat(el.dataset.fxDelay || "0");
          const scrollTrigger = {
            trigger: el,
            start: el.dataset.fxStart || "top 88%",
            once: true,
          };

          switch (mode) {
            case "chars": {
              const chars = splitText(el, "chars");
              gsap.from(chars, {
                yPercent: 40,
                opacity: 0,
                duration: 0.55,
                delay,
                ease: "power2.out",
                stagger: { amount: 0.4, from: "start" },
                force3D: true,
                clearProps: "transform,opacity",
                scrollTrigger,
              });
              break;
            }
            case "words": {
              const words = splitText(el, "words");
              gsap.from(words, {
                yPercent: 115,
                duration: 1,
                delay,
                ease: "power4.out",
                stagger: 0.07,
                scrollTrigger,
              });
              break;
            }
            case "blur": {
              gsap.from(el, {
                opacity: 0,
                y: 18,
                filter: "blur(14px)",
                duration: 1.2,
                delay,
                ease: "power2.out",
                clearProps: "filter,transform,opacity",
                scrollTrigger,
              });
              break;
            }
            case "spacing": {
              const target = getComputedStyle(el).letterSpacing;
              const to = target === "normal" ? "0px" : target;
              gsap.fromTo(
                el,
                { opacity: 0, letterSpacing: "0.8em" },
                {
                  opacity: 1,
                  letterSpacing: to,
                  duration: 1.4,
                  delay,
                  ease: "power3.out",
                  clearProps: "opacity,letterSpacing",
                  scrollTrigger,
                }
              );
              break;
            }
            case "wipe": {
              gsap.fromTo(
                el,
                { clipPath: "inset(0 100% 0 0)" },
                {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 1.2,
                  delay,
                  ease: "power3.inOut",
                  clearProps: "clipPath",
                  scrollTrigger,
                }
              );
              break;
            }
            case "count": {
              const text = el.textContent ?? "";
              const m = text.match(/^(\D*)([\d,]+)(.*)$/);
              if (!m) break;
              const target = parseInt(m[2].replace(/,/g, ""), 10);
              const obj = { v: 0 };
              const fmt = (n: number) => (m[2].includes(",") ? n.toLocaleString("en-US") : String(n));
              el.textContent = `${m[1]}0${m[3]}`;
              gsap.to(obj, {
                v: target,
                duration: 1.8,
                delay,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${m[1]}${fmt(Math.round(obj.v))}${m[3]}`;
                },
                scrollTrigger,
              });
              break;
            }
            case "fade-up":
            default: {
              gsap.from(el, {
                opacity: 0,
                y: 28,
                duration: 0.95,
                delay,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger,
              });
            }
          }
          el.setAttribute("data-fx-ready", "1");
        });

        /* ---------------- Card effects ---------------- */
        const groups = new Map<string, HTMLElement[]>();
        let uid = 0;
        document.querySelectorAll<HTMLElement>("[data-card-fx]").forEach((el) => {
          const key = el.dataset.fxGroup || `solo-${uid++}`;
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key)!.push(el);
        });

        groups.forEach((els) => {
          const first = els[0];
          const mode = first.dataset.cardFx;
          const delay = parseFloat(first.dataset.fxDelay || "0");
          const scrollTrigger = {
            trigger: first,
            start: first.dataset.fxStart || "top 90%",
            once: true,
          };
          const common = {
            delay,
            stagger: 0.11,
            clearProps: "transform,opacity",
            scrollTrigger,
          };

          let tween: gsap.core.Tween;
          switch (mode) {
            case "pop":
              tween = gsap.from(els, {
                scale: 0.45,
                y: 24,
                opacity: 0,
                duration: 0.85,
                ease: "back.out(1.9)",
                ...common,
              });
              break;
            case "slide-right":
              tween = gsap.from(els, {
                x: 80,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                ...common,
              });
              break;
            case "slide-left":
              tween = gsap.from(els, {
                x: -80,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                ...common,
              });
              break;
            case "fade":
              tween = gsap.from(els, {
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                ...common,
              });
              break;
            case "rise":
            default:
              tween = gsap.from(els, {
                y: 70,
                scale: 0.96,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                ...common,
              });
          }

          els.forEach((el) => el.setAttribute("data-fx-ready", "1"));

          if (els.some((e) => e.hasAttribute("data-float"))) {
            tween.eventCallback("onComplete", () => {
              els.forEach((el, i) => {
                if (!el.hasAttribute("data-float")) return;
                gsap.to(el, {
                  y: i % 2 ? 9 : -9,
                  duration: 2.2 + (i % 3) * 0.5,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              });
            });
          }
        });
      });

      cleanups.push(() => ctx.revert());

      /* ---------------- Pointer tilt ---------------- */
      const canHover = window.matchMedia("(hover: hover)").matches;
      if (canHover) {
        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
          const max = parseFloat(el.dataset.tilt || "7") || 7;
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(el, {
              rotateY: px * max * 2,
              rotateX: -py * max * 2,
              transformPerspective: 800,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          const onLeave = () =>
            gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          });
        });
      }
    });

    return () => {
      cancel();
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
