"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
const pagePath =
  /^\/(?:$|gallery$|isc$|careers$|routes$|privacy-policy$|terms-and-conditions$|(?:the-place|the-people|nps-programs)\/[a-z-]+$)/;
/** Client navigation only. Page entrances animate the content, never a covering screen. */
export default function RouteTransitionRunner() {
  const router = useRouter(),
    pathname = usePathname();
  const pending = useRef<{ path: string; hash: string } | null>(null);
  const transition = useRef<gsap.core.Tween | null>(null);
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
      pending.current = { path: url.pathname, hash: url.hash };
      transition.current?.revert();
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const main = document.querySelector("main");
        if (main) transition.current = gsap.to(main, {
          opacity: 0.65, duration: 0.2, ease: "power2.out",
        });
      }
      window.dispatchEvent(new Event("nps:navigating"));
      router.push(url.pathname + url.search + url.hash);
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
      transition.current?.revert();
    };
  }, [router]);
  useLayoutEffect(() => {
    if (pending.current?.path !== pathname) return;
    const hash = pending.current.hash;
    pending.current = null;
    transition.current?.revert();
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const main = document.querySelector("main");
      if (main) transition.current = gsap.fromTo(main, { opacity: 0.35 }, {
        opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "opacity",
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
  return null;
}
