"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!pluginsRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginsRegistered = true;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    return () => {
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
