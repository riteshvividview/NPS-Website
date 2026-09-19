"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Direct port of script.js's header-only behavior: pushing the hero down by
 * the header's real rendered height, hiding the header on scroll-down /
 * showing it on scroll-up, and the Academics mega-dropdown's GSAP open/close
 * (not CSS :hover — see the original comment this was ported from: the
 * dropdown panel sits outside the trigger's own hover box, so plain :hover
 * closes it before the cursor ever reaches the panel).
 */
export function useHeaderInteractions() {
  useEffect(() => {
    const siteHeader = document.getElementById("site-header");
    const heroSection = document.getElementById("hero");

    function offsetHeroForHeader() {
      if (!siteHeader || !heroSection) return;
      heroSection.style.marginTop = `${siteHeader.offsetHeight}px`;
    }

    offsetHeroForHeader();
    window.addEventListener("resize", offsetHeroForHeader);

    let closeDropdown = () => {};

    if (siteHeader) {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (window.scrollY < siteHeader.offsetHeight) {
            siteHeader.classList.remove("is-hidden");
          } else if (self.direction === 1) {
            siteHeader.classList.add("is-hidden");
            closeDropdown();
          } else {
            siteHeader.classList.remove("is-hidden");
          }
        },
      });
    }

    const dropdownWrap = document.getElementById("academics-dropdown");
    const dropdownTrigger = dropdownWrap?.querySelector<HTMLButtonElement>(
      "button"
    );
    const dropdownPanel = dropdownWrap?.querySelector<HTMLElement>(
      "[data-mega-panel]"
    );

    const cleanupFns: (() => void)[] = [
      () => window.removeEventListener("resize", offsetHeroForHeader),
    ];

    if (dropdownWrap && dropdownTrigger && dropdownPanel) {
      const wrap = dropdownWrap;
      const trigger = dropdownTrigger;
      const panel = dropdownPanel;
      const dropdownGroups = panel.querySelectorAll<HTMLElement>(
        "[data-mega-group]"
      );
      let closeTimer: ReturnType<typeof setTimeout> | null = null;
      let isOpen = false;

      gsap.set(panel, { autoAlpha: 0, y: -14 });
      gsap.set(dropdownGroups, { autoAlpha: 0, y: -10 });

      function openDropdown() {
        if (closeTimer) clearTimeout(closeTimer);
        if (isOpen) return;
        isOpen = true;
        wrap.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        gsap.killTweensOf([panel, ...Array.from(dropdownGroups)]);
        gsap.to(panel, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" });
        gsap.to(dropdownGroups, {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          ease: "power3.out",
          stagger: 0.045,
          delay: 0.04,
        });
      }

      function close() {
        if (closeTimer) clearTimeout(closeTimer);
        if (!isOpen) return;
        isOpen = false;
        wrap.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        gsap.killTweensOf([panel, ...Array.from(dropdownGroups)]);
        gsap.to(dropdownGroups, { autoAlpha: 0, y: -8, duration: 0.18, ease: "power2.in" });
        gsap.to(panel, { autoAlpha: 0, y: -14, duration: 0.22, ease: "power2.in" });
      }
      closeDropdown = close;

      function scheduleClose() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 260);
      }

      const hoverTargets = [wrap, panel];
      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", openDropdown);
        el.addEventListener("mouseleave", scheduleClose);
      });

      const onTriggerClick = (e: Event) => {
        e.preventDefault();
        if (isOpen) close();
        else openDropdown();
      };
      trigger.addEventListener("click", onTriggerClick);

      const onDocClick = (e: MouseEvent) => {
        if (isOpen && !wrap.contains(e.target as Node)) close();
      };
      document.addEventListener("click", onDocClick);

      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) close();
      };
      document.addEventListener("keydown", onKeydown);

      const iconHoverCleanups: (() => void)[] = [];
      panel
        .querySelectorAll<HTMLElement>("[data-mega-icon]")
        .forEach((icon) => {
          const item = icon.closest("a");
          if (!item) return;
          const onEnter = () =>
            gsap.to(icon, { scale: 1.15, rotate: -8, duration: 0.25, ease: "back.out(2)" });
          const onLeave = () =>
            gsap.to(icon, { scale: 1, rotate: 0, duration: 0.25, ease: "power2.out" });
          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);
          iconHoverCleanups.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
          });
        });

      cleanupFns.push(() => {
        hoverTargets.forEach((el) => {
          el.removeEventListener("mouseenter", openDropdown);
          el.removeEventListener("mouseleave", scheduleClose);
        });
        trigger.removeEventListener("click", onTriggerClick);
        document.removeEventListener("click", onDocClick);
        document.removeEventListener("keydown", onKeydown);
        iconHoverCleanups.forEach((fn) => fn());
      });
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);
}
