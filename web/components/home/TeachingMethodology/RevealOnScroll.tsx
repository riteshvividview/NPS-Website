"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight one-time fade/rise-in reveal for the pillar cards. Deliberately
 * plain IntersectionObserver + CSS transition rather than GSAP ScrollTrigger
 * — this section isn't pinned or scrubbed like Hero/Section2/Section3, so it
 * doesn't need that machinery.
 */
export default function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".js-reveal-card").forEach((card) => {
            card.classList.add("is-revealed");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
