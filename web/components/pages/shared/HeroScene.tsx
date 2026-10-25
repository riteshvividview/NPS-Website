"use client";

import { useEffect, useRef } from "react";
import s from "./HeroScene.module.css";

/** Decorative layers only: never transforms the text or the interactive book. */
export default function HeroScene({ kind }: { kind: "authors" | "careers" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const progress = Math.max(0, Math.min(1, -r.top / r.height));
      el.style.setProperty("--travel", `${media.matches ? 0 : progress * -65}px`);
      el.style.setProperty("--draw", `${media.matches ? 0 : Math.max(0, 0.72 - progress * 1.8)}`);
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, []);
  return <div ref={ref} className={`${s.scene} ${s[kind]}`} aria-hidden="true">
    <div className={s.grain}/>
    <svg className={s.art} viewBox="0 0 700 640" fill="none">
      {kind === "authors" ? <>
        <circle cx="365" cy="285" r="237" fill="#cbd9dd" fillOpacity=".55"/>
        <circle cx="490" cy="145" r="49" fill="#e6b96f" fillOpacity=".65"/>
        <g className={s.drift} stroke="#69878a" strokeWidth="1.3">
          <path d="M70 218Q110 180 150 218M92 218Q132 180 172 218M485 330Q545 275 600 330"/>
          <path d="M100 445L165 312L225 445M140 362L165 378L184 351M430 460L520 335L620 460"/>
          <path d="M70 475Q210 420 330 475T665 475M40 497Q210 450 350 497T680 497"/>
        </g>
        <g stroke="#a67a49" strokeWidth="1.5">
          <path className={s.draw} pathLength="1" d="M50 370C-5 130 655 17 630 260S180 590 100 515Q50 470 160 430"/>
          <path d="M580 190L630 170L610 210L602 191Z" fill="#f7edda"/>
          <path d="M602 191L630 170M602 191L598 207L610 210"/>
        </g>
        <g fill="#d5a968"><path d="M95 285L100 300L115 305L100 310L95 325L90 310L75 305L90 300Z"/><path d="M550 80L554 91L565 95L554 99L550 110L546 99L535 95L546 91Z"/></g>
        <g stroke="#69878a"><path d="M265 65V83M256 74H274M600 390V408M591 399H609"/><circle cx="175" cy="110" r="4"/><circle cx="625" cy="280" r="5"/></g>
      </> : <>
        <circle cx="350" cy="300" r="245" fill="#33545f" fillOpacity=".38"/>
        <circle cx="350" cy="300" r="265" stroke="#c6d9d7" strokeOpacity=".2" strokeDasharray="2 12"/>
        <g className={s.drift}>
          <path d="M65 420L120 330L175 420Z" fill="#ca8870"/>
          <circle cx="590" cy="200" r="38" fill="#dcb874"/>
          <path d="M510 490L560 445L605 495L555 540Z" fill="#819e9e"/>
          <path d="M110 130L155 85L180 110L135 155Z" fill="#e5c78e"/>
          <path d="M110 130L105 160L135 155Z" fill="#f7edda"/>
          <path d="M105 160L108 147L117 157Z" fill="#243e49"/>
        </g>
        <g stroke="#dcb874" strokeWidth="2" strokeLinecap="round">
          <path className={s.draw} pathLength="1" d="M55 305C-20 80 570 5 625 245S400 620 240 545Q120 490 185 450"/>
          <path d="M550 85V111M537 98H563M70 470V492M59 481H81"/>
          <path className={s.draw} pathLength="1" d="M565 410V295M565 355Q505 355 510 310Q557 310 565 355M565 330Q610 330 615 280Q565 280 565 330"/>
        </g>
        <path d="M80 550Q320 580 610 550" stroke="#dbe8e3" strokeOpacity=".35"/>
      </>}
    </svg>
  </div>;
}
