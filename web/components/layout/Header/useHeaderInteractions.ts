"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Direct port of script.js's header-only behavior, plus the mobile menu:
 * hiding the header on scroll-down / showing it on scroll-up, and
 * toggling the hamburger-triggered mobile nav panel (plain class toggles
 * + CSS transitions, not GSAP — same lighter treatment the rest of the
 * mobile pass uses).
 *
 * The header no longer pushes the hero section down to clear itself —
 * now that it's a floating glass pill (not an opaque static bar), it's
 * designed to sit on top of the hero image and let it show through,
 * the way a floating header conventionally works. An earlier version of
 * this hook pushed #hero down via marginTop; that fought the floating
 * design (a solid cream gap between header and hero) and was removed.
 */
export function useHeaderInteractions() {
  useEffect(() => {
    const siteHeader = document.getElementById("site-header");

    let closeMobileMenu = () => {};
    let closeAllDesktopDropdowns = () => {};

    if (siteHeader) {
      // Past a small threshold the floating pill's glass goes from a
      // light see-through tint to a denser, more opaque surface — the
      // "header colors change on scroll" effect.
      const SCROLL_TINT_THRESHOLD = 10;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          siteHeader.classList.toggle("is-scrolled", window.scrollY > SCROLL_TINT_THRESHOLD);

          if (window.scrollY < siteHeader.offsetHeight) {
            siteHeader.classList.remove("is-hidden");
          } else if (self.direction === 1) {
            siteHeader.classList.add("is-hidden");
            closeMobileMenu();
            closeAllDesktopDropdowns();
          } else {
            siteHeader.classList.remove("is-hidden");
          }
        },
      });
    }

    const cleanupFns: (() => void)[] = [];

    // ---------- Logo micro-tilt ----------
    // Cursor-driven tilt on the crest, same CSS-custom-property technique
    // as the NES Board Members tilt cards: --bx/--by read by a
    // perspective/rotate transform in Header.module.css. Desktop/fine-
    // pointer only — there's no persistent cursor on touch to drive it.
    const brandWrap = document.querySelector<HTMLElement>("[data-brand-tilt]");
    const brandImg = brandWrap?.querySelector<HTMLElement>("img");
    if (
      brandWrap &&
      brandImg &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const onBrandMove = (e: MouseEvent) => {
        const rect = brandWrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        brandImg.style.setProperty("--bx", `${px * 20}deg`);
        brandImg.style.setProperty("--by", `${-py * 20}deg`);
      };
      const onBrandLeave = () => {
        brandImg.style.setProperty("--bx", "0deg");
        brandImg.style.setProperty("--by", "0deg");
      };
      brandWrap.addEventListener("mousemove", onBrandMove);
      brandWrap.addEventListener("mouseleave", onBrandLeave);
      cleanupFns.push(() => {
        brandWrap.removeEventListener("mousemove", onBrandMove);
        brandWrap.removeEventListener("mouseleave", onBrandLeave);
      });
    }

    // ---------- Magnetic nav links ----------
    // Each top-level nav item (link or dropdown trigger) nudges a few px
    // toward the cursor while hovered, dock-icon style — a small, genuinely
    // new touch for this header rather than a static link list. GSAP
    // quickTo gives a cheap, interruptible spring back to rest.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic-link]").forEach((el) => {
        const moveX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          moveX(px * 8);
          moveY(py * 5);
        };
        const onLeave = () => {
          moveX(0);
          moveY(0);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanupFns.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // ---------- Desktop nav dropdowns (e.g. "The Place") ----------
    // Hover-intent with a close delay so moving the cursor from trigger to
    // panel doesn't close it first (plain :hover would, since the panel
    // sits outside the trigger's own hover box) — same pattern the old
    // Academics mega-dropdown used, generalized to any number of items.
    const dropdownCloseFns: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-nav-dropdown]").forEach((wrap) => {
      const trigger = wrap.querySelector<HTMLButtonElement>("button");
      const panel = wrap.querySelector<HTMLElement>("[data-nav-panel]");
      if (!trigger || !panel) return;

      let closeTimer: ReturnType<typeof setTimeout> | null = null;
      let isOpen = false;

      function open() {
        if (closeTimer) clearTimeout(closeTimer);
        if (isOpen) return;
        isOpen = true;
        wrap.classList.add("is-open");
        trigger!.setAttribute("aria-expanded", "true");
      }

      function close() {
        if (closeTimer) clearTimeout(closeTimer);
        if (!isOpen) return;
        isOpen = false;
        wrap.classList.remove("is-open");
        trigger!.setAttribute("aria-expanded", "false");
      }
      dropdownCloseFns.push(close);

      function scheduleClose() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 220);
      }

      const hoverTargets = [wrap, panel];
      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", open);
        el.addEventListener("mouseleave", scheduleClose);
      });

      // ---------- Panel decoration: watching eyes + hover glow ----------
      // Each pupil tracks the cursor independently from its own eye's
      // center, clamped to a small radius so it stays inside the iris —
      // the pair converges on the cursor the way real eyes would.
      // Tracked at the document level (not just while the panel itself is
      // the direct hover target) and gated on `isOpen` + an explicit
      // contains-point check against the panel's own rect, so the eyes
      // react only to a cursor actually inside the dropdown block, and
      // recenter the instant it isn't — regardless of exactly which
      // child element first caught the hover. Skipped under reduced motion.
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const eyeEls = Array.from(panel.querySelectorAll<HTMLElement>("[data-mega-eye]"));
        if (eyeEls.length > 0) {
          const PUPIL_RADIUS = 5.5;

          const eyes = eyeEls.map((eyeEl) => ({
            eyeEl,
            moveX: gsap.quickTo(eyeEl.querySelector<HTMLElement>("[data-mega-eye-pupil]")!, "x", {
              duration: 0.3,
              ease: "power3.out",
            }),
            moveY: gsap.quickTo(eyeEl.querySelector<HTMLElement>("[data-mega-eye-pupil]")!, "y", {
              duration: 0.3,
              ease: "power3.out",
            }),
          }));

          const onDocMove = (e: MouseEvent) => {
            if (!isOpen) return;
            const panelRect = panel.getBoundingClientRect();
            const inside =
              e.clientX >= panelRect.left &&
              e.clientX <= panelRect.right &&
              e.clientY >= panelRect.top &&
              e.clientY <= panelRect.bottom;

            eyes.forEach((eye) => {
              if (!inside) {
                eye.moveX(0);
                eye.moveY(0);
                return;
              }
              const r = eye.eyeEl.getBoundingClientRect();
              const cx = r.left + r.width / 2;
              const cy = r.top + r.height / 2;
              const dx = e.clientX - cx;
              const dy = e.clientY - cy;
              const dist = Math.hypot(dx, dy) || 1;
              const clamped = Math.min(dist, PUPIL_RADIUS * 6) / (PUPIL_RADIUS * 6);
              eye.moveX((dx / dist) * PUPIL_RADIUS * clamped);
              eye.moveY((dy / dist) * PUPIL_RADIUS * clamped);
            });
          };
          document.addEventListener("mousemove", onDocMove);
          cleanupFns.push(() => document.removeEventListener("mousemove", onDocMove));
        }

        const linksWrap = panel.querySelector<HTMLElement>("[data-mega-links]");
        const glow = panel.querySelector<HTMLElement>("[data-mega-glow]");
        if (linksWrap && glow) {
          const glowY = gsap.quickTo(glow, "y", { duration: 0.35, ease: "power3.out" });
          const glowH = gsap.quickTo(glow, "height", { duration: 0.3, ease: "power3.out" });

          // The feature image crossfades to whichever link is hovered —
          // two stacked <img> layers (data-mega-feature-img="0"/"1"),
          // swapping which one is on top each time so the old photo
          // fades out under the new one instead of popping.
          const featureImgs = Array.from(panel.querySelectorAll<HTMLImageElement>("[data-mega-feature-img]"));
          let activeImgIndex = 0;
          const swapFeatureImage = (src: string) => {
            if (featureImgs.length !== 2) return;
            const nextIndex = activeImgIndex === 0 ? 1 : 0;
            const nextImg = featureImgs[nextIndex];
            const curImg = featureImgs[activeImgIndex];
            nextImg.src = src;
            nextImg.style.opacity = "1";
            curImg.style.opacity = "0";
            activeImgIndex = nextIndex;
          };

          const linkEls = Array.from(linksWrap.querySelectorAll<HTMLElement>("[data-mega-link]"));
          const onLinkEnter = (link: HTMLElement) => () => {
            glowY(link.offsetTop);
            glowH(link.offsetHeight);
            gsap.to(glow, { opacity: 1, duration: 0.2 });

            const image = link.getAttribute("data-image");
            if (image) swapFeatureImage(image);
          };
          const linkListeners: { el: HTMLElement; fn: () => void }[] = [];
          linkEls.forEach((link) => {
            const fn = onLinkEnter(link);
            link.addEventListener("mouseenter", fn);
            linkListeners.push({ el: link, fn });
          });
          const onLinksLeave = () => gsap.to(glow, { opacity: 0, duration: 0.25 });
          linksWrap.addEventListener("mouseleave", onLinksLeave);

          cleanupFns.push(() => {
            linkListeners.forEach(({ el, fn }) => el.removeEventListener("mouseenter", fn));
            linksWrap.removeEventListener("mouseleave", onLinksLeave);
          });
        }
      }

      const onTriggerClick = (e: Event) => {
        e.preventDefault();
        isOpen ? close() : open();
      };
      trigger.addEventListener("click", onTriggerClick);
      window.addEventListener("nps:navigating", close);
      cleanupFns.push(() => window.removeEventListener("nps:navigating", close));

      const onDocClick = (e: MouseEvent) => {
        if (isOpen && !wrap.contains(e.target as Node)) close();
      };
      document.addEventListener("click", onDocClick);

      cleanupFns.push(() => {
        hoverTargets.forEach((el) => {
          el.removeEventListener("mouseenter", open);
          el.removeEventListener("mouseleave", scheduleClose);
        });
        trigger.removeEventListener("click", onTriggerClick);
        document.removeEventListener("click", onDocClick);
        if (closeTimer) clearTimeout(closeTimer);
      });
    });

    closeAllDesktopDropdowns = () => dropdownCloseFns.forEach((fn) => fn());

    const onDesktopDropdownEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllDesktopDropdowns();
    };
    document.addEventListener("keydown", onDesktopDropdownEscape);
    cleanupFns.push(() => document.removeEventListener("keydown", onDesktopDropdownEscape));

    // ---------- Mobile nav accordions (same items, inside the panel) ----------
    const accordionCloseFns: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-mobile-accordion]").forEach((group) => {
      const trigger = group.querySelector<HTMLButtonElement>("button");
      if (!trigger) return;
      let isOpen = false;

      function toggle() {
        isOpen = !isOpen;
        group.classList.toggle("is-open", isOpen);
        trigger!.setAttribute("aria-expanded", String(isOpen));
      }
      function collapse() {
        if (!isOpen) return;
        isOpen = false;
        group.classList.remove("is-open");
        trigger!.setAttribute("aria-expanded", "false");
      }
      accordionCloseFns.push(collapse);

      trigger.addEventListener("click", toggle);
      cleanupFns.push(() => trigger.removeEventListener("click", toggle));
    });
    const collapseAllAccordions = () => accordionCloseFns.forEach((fn) => fn());

    const menuTrigger = document.getElementById("mobile-menu-trigger");
    const mobileNav = document.getElementById("mobile-nav");
    const mobileNavScrim = document.getElementById("mobile-nav-scrim");

    if (menuTrigger && mobileNav && mobileNavScrim) {
      let isOpen = false;

      function open() {
        if (isOpen) return;
        isOpen = true;
        siteHeader?.classList.add("is-menu-open");
        menuTrigger!.setAttribute("aria-expanded", "true");
        mobileNav!.removeAttribute("aria-hidden");
        document.body.style.overflow = "hidden";
      }

      function close() {
        if (!isOpen) return;
        isOpen = false;
        siteHeader?.classList.remove("is-menu-open");
        menuTrigger!.setAttribute("aria-expanded", "false");
        mobileNav!.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        collapseAllAccordions();
      }
      closeMobileMenu = close;
      window.addEventListener("nps:navigating", close);
      cleanupFns.push(() => window.removeEventListener("nps:navigating", close));

      const onTriggerClick = () => (isOpen ? close() : open());
      menuTrigger.addEventListener("click", onTriggerClick);

      const onScrimClick = () => close();
      mobileNavScrim.addEventListener("click", onScrimClick);

      const onLinkClick = (e: Event) => {
        if ((e.target as HTMLElement).tagName === "A") close();
      };
      mobileNav.addEventListener("click", onLinkClick);

      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) close();
      };
      document.addEventListener("keydown", onKeydown);

      // Resizing past the mobile breakpoint (e.g. rotating a tablet, or a
      // desktop window just getting wider) while the panel is open would
      // otherwise leave it stuck open under the now-visible desktop nav.
      const onResize = () => {
        if (isOpen && window.innerWidth > 640) close();
      };
      window.addEventListener("resize", onResize);

      cleanupFns.push(() => {
        menuTrigger.removeEventListener("click", onTriggerClick);
        mobileNavScrim.removeEventListener("click", onScrimClick);
        mobileNav.removeEventListener("click", onLinkClick);
        document.removeEventListener("keydown", onKeydown);
        window.removeEventListener("resize", onResize);
        document.body.style.overflow = "";
      });
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);
}
