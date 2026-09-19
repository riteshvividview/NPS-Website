"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered here (not just in SmoothScrollProvider) because React fires
// child effects before parent effects — this hook's effect can run before
// SmoothScrollProvider's, so relying on that sibling's registration alone
// left ScrollTrigger unregistered when the pin timeline below was created.
// registerPlugin is idempotent, so calling it in both places is safe.
gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 150;
const FRAME_PATH = (n: number) =>
  `/hero/sky-frames/ezgif-frame-${String(n).padStart(3, "0")}.png`;

/**
 * Direct port of the prototype's script.js: fixed-canvas stage scaling,
 * the cloud frame-sequence scrub, the hero pin, and the Section 2 / Section 3
 * differential parallax. This is the one place in the Home page that is
 * legitimately code, not content — every value it reads (data-depth, element
 * ids) comes from the DOM the presentational components render.
 */
export function useHomeAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function makeStageSizer(stageEl: HTMLElement | null, w: number, h: number) {
      return function sizeStage() {
        if (!stageEl) return;
        const scale = Math.max(window.innerWidth / w, window.innerHeight / h);
        stageEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
      };
    }

    const sizeHeroStage = makeStageSizer(
      document.getElementById("hero-stage"),
      1672,
      941
    );
    const sizeSection2Stage = makeStageSizer(
      document.getElementById("section2-stage"),
      1920,
      1080
    );
    const sizeSection3Stage = makeStageSizer(
      document.getElementById("section3-stage"),
      1672,
      941
    );

    function sizeAllStages() {
      sizeHeroStage();
      sizeSection2Stage();
      sizeSection3Stage();
    }

    sizeAllStages();
    window.addEventListener("resize", sizeAllStages);

    /* ---------- Clouds: 150-frame sequence, scrubbed against scroll ---------- */
    const cloudCanvas = document.getElementById(
      "cloud-canvas"
    ) as HTMLCanvasElement | null;
    const cloudFallback = document.getElementById(
      "cloud-fallback"
    ) as HTMLImageElement | null;
    const ctx = cloudCanvas ? cloudCanvas.getContext("2d") : null;

    const frames: HTMLImageElement[] = [];
    let framesReady = 0;
    let lastDrawnFrame = -1;

    function drawFrame(index: number) {
      const clamped = Math.min(FRAME_COUNT - 1, Math.max(0, index));
      if (clamped === lastDrawnFrame) return;
      const img = frames[clamped];
      if (!img || !img.complete || !img.naturalWidth) return;
      ctx!.clearRect(0, 0, cloudCanvas!.width, cloudCanvas!.height);
      ctx!.drawImage(img, 0, 0, cloudCanvas!.width, cloudCanvas!.height);
      lastDrawnFrame = clamped;
    }

    if (ctx && cloudCanvas) {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.onload = () => {
          framesReady++;
          if (i === 1) drawFrame(0);
        };
        img.onerror = () => {
          if (framesReady === 0 && cloudFallback) {
            cloudCanvas.style.display = "none";
            cloudFallback.style.opacity = "1";
          }
        };
        img.src = FRAME_PATH(i);
        frames.push(img);
      }
    } else if (cloudFallback) {
      cloudFallback.style.opacity = "1";
    }

    const cleanupFns: (() => void)[] = [
      () => window.removeEventListener("resize", sizeAllStages),
    ];

    /* ---------- Hero pinned scroll sequence ---------- */
    const hero = document.getElementById("hero");
    const section2 = document.getElementById("section2");

    if (reduceMotion || !hero || !section2) {
      ScrollTrigger.refresh();
      return () => {
        cleanupFns.forEach((fn) => fn());
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }

    const PIN_END = "+=220%";

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: PIN_END,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (ctx) drawFrame(Math.round(self.progress * (FRAME_COUNT - 1)));
        },
      },
    });

    ScrollTrigger.refresh();

    const pinEndPx = heroTimeline.scrollTrigger!.end;
    const section2NaturalDocY =
      section2.getBoundingClientRect().top + window.scrollY;
    const DEAD_ZONE = Math.max(0, section2NaturalDocY - pinEndPx);
    const OVERLAP_PX = 150;

    if (DEAD_ZONE + OVERLAP_PX > 0) {
      const pinSpacer = hero.parentNode as HTMLElement;
      gsap.set(pinSpacer, { marginBottom: -(DEAD_ZONE + OVERLAP_PX) });
    }

    /* ---------- Section 2: smooth differential parallax ---------- */
    const parallaxLayers = section2.querySelectorAll<HTMLElement>(
      "[data-depth]:not([data-settle])"
    );
    const PARALLAX_AMPLITUDE = 30;

    parallaxLayers.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || "0") || 0;
      gsap.fromTo(
        el,
        { yPercent: PARALLAX_AMPLITUDE * depth },
        {
          yPercent: -PARALLAX_AMPLITUDE * depth,
          ease: "none",
          scrollTrigger: {
            trigger: section2,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    const settleLayers = section2.querySelectorAll<HTMLElement>("[data-settle]");
    const SETTLE_AMPLITUDE = 10;

    settleLayers.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || "0") || 0;
      gsap.fromTo(
        el,
        { yPercent: SETTLE_AMPLITUDE * depth },
        {
          yPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section2,
            start: "top bottom",
            end: "center center",
            scrub: 1.4,
          },
        }
      );
    });

    /* ---------- Section 3: differential parallax + two special tweens ---------- */
    const section3 = document.getElementById("section3");

    if (section3) {
      const s3ParallaxLayers = section3.querySelectorAll<HTMLElement>("[data-depth]");

      s3ParallaxLayers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0") || 0;
        gsap.fromTo(
          el,
          { yPercent: PARALLAX_AMPLITUDE * depth },
          {
            yPercent: -PARALLAX_AMPLITUDE * depth,
            ease: "none",
            scrollTrigger: {
              trigger: section3,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      const s3TopLeft = document.getElementById("s3-top-left");
      if (s3TopLeft) {
        gsap.fromTo(
          s3TopLeft,
          { xPercent: 0, scale: 1 },
          {
            xPercent: -6,
            scale: 1.18,
            ease: "none",
            scrollTrigger: {
              trigger: section3,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      const s3Birds = document.getElementById("s3-birds");
      if (s3Birds) {
        gsap.fromTo(
          s3Birds,
          { xPercent: -3 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: section3,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      const s3Plane = document.getElementById("s3-plane");
      if (s3Plane) {
        gsap.fromTo(
          s3Plane,
          { xPercent: 0, yPercent: 0, scale: 1 },
          {
            xPercent: 8,
            yPercent: -6,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: section3,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }

    ScrollTrigger.refresh();

    return () => {
      cleanupFns.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}
