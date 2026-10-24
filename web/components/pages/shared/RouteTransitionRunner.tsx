"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./RouteTransition.module.css";
const pagePath =
  /^\/(?:$|gallery$|isc$|careers$|routes$|privacy-policy$|terms-and-conditions$|(?:the-place|the-people|nps-programs)\/[a-z-]+$)/;
const emptyInk = "M0 110 Q25 110 50 110 T100 110 V110 H0 Z";
const fullInk = "M0 -20 Q25 -40 50 -20 T100 -20 V110 H0 Z";
export default function RouteTransitionRunner() {
  const router = useRouter(),
    pathname = usePathname();
  const pending = useRef<{ path: string; hash: string } | null>(null);
  const transition = useRef<gsap.core.Timeline | null>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const navigate = (href: string) => {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || !pagePath.test(url.pathname))
        return false;
      if (url.pathname === location.pathname) {
        if (url.search !== location.search) {
          router.push(url.pathname + url.search + url.hash);
          return true;
        }
        return !url.hash;
      }
      if (pending.current) return true;
      pending.current = { path: url.pathname, hash: url.hash };
      transition.current?.kill();
      const go = () => {
        window.dispatchEvent(new Event("nps:navigating"));
        router.push(url.pathname + url.search + url.hash);
      };
      if (matchMedia("(prefers-reduced-motion: reduce)").matches || !curtain.current) go();
      else {
        curtain.current.style.pointerEvents = "auto";
        const paths = curtain.current.querySelectorAll("path");
        gsap.set(paths, { attr: { d: emptyInk } });
        transition.current = gsap.timeline().to(paths, {
          attr: { d: fullInk }, duration: .55, stagger: .08, ease: "power3.inOut",
        }).call(go);
      }
      watchdog.current = setTimeout(() => {
        transition.current?.kill();
        if (curtain.current) { gsap.set(curtain.current.querySelectorAll("path"), {attr:{d:emptyInk}}); curtain.current.style.pointerEvents = "none"; }
        pending.current = null;
      }, 10000);
      return true;
    };
    const click = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (
        !a ||
        a.hasAttribute("download") ||
        (a.target && a.target !== "_self") ||
        a.rel.includes("external")
      )
        return;
      if (navigate(a.href)) e.preventDefault();
    };
    const custom = (e: Event) => {
      const href = (e as CustomEvent<{ href: string }>).detail?.href;
      if (href) navigate(href);
    };
    const seen = new Set<string>();
    const prefetch = (e: Event) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (
        url.origin === location.origin &&
        pagePath.test(url.pathname) &&
        url.pathname !== location.pathname &&
        !seen.has(url.pathname)
      ) {
        seen.add(url.pathname);
        router.prefetch(url.pathname);
      }
    };
    document.addEventListener("click", click, true);
    document.addEventListener("pointerover", prefetch, { passive: true });
    document.addEventListener("focusin", prefetch);
    window.addEventListener("nps:page-transition", custom);
    return () => {
      document.removeEventListener("click", click, true);
      document.removeEventListener("pointerover", prefetch);
      document.removeEventListener("focusin", prefetch);
      window.removeEventListener("nps:page-transition", custom);
      transition.current?.kill();
      if(watchdog.current) clearTimeout(watchdog.current);
    };
  }, [router]);
  useLayoutEffect(() => {
    if (pending.current?.path !== pathname) return;
    const hash = pending.current.hash;
    pending.current = null;
    if (watchdog.current) clearTimeout(watchdog.current);
    transition.current?.kill();
    if (curtain.current) {
      const panel = curtain.current;
      transition.current = gsap.timeline({ onComplete: () => { panel.style.pointerEvents = "none"; } }).to(panel.querySelectorAll("path"), {
        attr: {d: emptyInk}, duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : .65,
        stagger: .07, ease: "power3.inOut",
      });
    }
    const frame = requestAnimationFrame(() => {
      if (hash) {
        try {
          document
            .getElementById(decodeURIComponent(hash.slice(1)))
            ?.scrollIntoView();
        } catch {}
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
        const h = document.querySelector<HTMLElement>("main h1");
        h?.setAttribute("tabindex", "-1");
        h?.focus({ preventScroll: true });
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return <div ref={curtain} className={styles.curtain} aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d={emptyInk} fill="#c9ad70" /><path d={emptyInk} fill="#153b30" /></svg></div>;
}
