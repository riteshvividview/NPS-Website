"use client";

import { useEffect, useRef } from "react";

/**
 * Generic one-time fade/rise-in reveal, scoped to its own children via a
 * ref rather than a global class name (same IntersectionObserver + CSS
 * transition pattern as components/home/TeachingMethodology/RevealOnScroll,
 * generalized for reuse across secondary pages). Children that should
 * animate need the "js-reveal" class; see RevealOnScroll.module.css in the
 * section that uses this for the actual from/to styles.
 */
export default function RevealOnScroll({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll(".js-reveal").forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".js-reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  );
}
