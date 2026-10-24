"use client";

import { useEffect } from "react";

/** Keep content visible by default; entrance motion never owns its visibility. */
export function useFooterReveal() {
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        const photo = element.classList.contains("js-photo-zoom");
        animations.push(element.animate(
          photo ? [{ transform: "scale(1.06)" }, { transform: "scale(1)" }]
            : [{ transform: "translateY(18px)", opacity: .65 }, { transform: "translateY(0)", opacity: 1 }],
          { duration: photo ? 1200 : 650, easing: "cubic-bezier(.2,.65,.3,1)" }
        ));
      });
    }, { threshold: 0.05 });
    footer.querySelectorAll(".js-footer-reveal, .js-wave-quote, .js-photo-zoom").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, []);
}
