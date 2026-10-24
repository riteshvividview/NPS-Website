"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
export default function PageEntranceRunner() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector("main h1")?.closest("section");
    if (!hero) return;
    const context = gsap.context(() => {
      const text = Array.from(
        hero.querySelectorAll<HTMLElement>("h1,h2,p,[data-entrance-line]"),
      )
        .filter(
          (el) =>
            !el.closest('[aria-hidden="true"]') &&
            !el.parentElement?.closest("h1,h2,p"),
        )
        .slice(0, 14);
      gsap.fromTo(
        text,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.055,
          ease: "power3.out",
          delay: 0.12,
          clearProps: "opacity,transform",
        },
      );
      gsap.fromTo(
        hero.querySelectorAll("[data-entrance-art],[data-main-art],[data-open-book],[data-trophy],[data-medal],[data-tree],[data-ticket],[data-vision-photo],#vision-orbit-stage,[data-campus-art],img,a,button"),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.07,
          delay: 0.2,
          clearProps: "opacity",
        },
      );
    }, hero);
    return () => context.revert();
  }, [pathname]);
  return null;
}
