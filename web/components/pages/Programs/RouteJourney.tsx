"use client";

import { useEffect, useRef, useState } from "react";
import s from "./LearningScenes.module.css";
import page from "./Programs.module.css";

export default function RouteJourney({
  stops,
  term,
}: {
  stops: string[];
  term: string;
}) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!list.current || !frame.current) return;
      const target = Math.max(
        frame.current.getBoundingClientRect().bottom + 50,
        innerHeight * 0.55,
      );
      let closest = 0,
        distance = Infinity;
      Array.from(list.current.children).forEach((el, i) => {
        const d = Math.abs(el.getBoundingClientRect().top - target);
        if (d < distance) {
          distance = d;
          closest = i;
        }
      });
      setActive((old) => (old === closest ? old : closest));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const points = stops.map((_, i) => ({
    x: 35 + i * (630 / Math.max(1, stops.length - 1)),
    y: 100 + Math.sin((i / Math.max(1, stops.length - 1)) * Math.PI * 2) * 40,
  }));
  const point = points[active] || points[0];
  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  function visit(index: number) {
    const node = list.current?.children[index] as HTMLElement | undefined;
    if (!node || !frame.current) return;
    const offset = Math.max(
      frame.current.getBoundingClientRect().height + 150,
      innerHeight * 0.55,
    );
    const top = window.scrollY + node.getBoundingClientRect().top - offset;
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setActive(index);
  }
  return (
    <>
      <div className={s.journey} ref={frame}>
        <div className={s.journeyHeader}>
          <div>
            <small>
              FOLLOW THE JOURNEY / {String(active + 1).padStart(2, "0")} OF{" "}
              {stops.length}
            </small>
            <strong>{stops[active]}</strong>
          </div>
          <div className={s.journeyControls}>
            <button
              type="button"
              aria-label="Previous stop"
              disabled={active === 0}
              onClick={() => visit(active - 1)}
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Next stop"
              disabled={active === stops.length - 1}
              onClick={() => visit(active + 1)}
            >
              &rarr;
            </button>
          </div>
        </div>
        <svg
          viewBox="0 0 700 200"
          role="img"
          aria-label={`Schematic journey, stop ${active + 1} of ${stops.length}: ${stops[active]}`}
        >
          <polyline
            points={line}
            fill="none"
            stroke="#b8c5b0"
            strokeWidth="19"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points={line}
            fill="none"
            stroke="#f7f3ea"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={i === active ? 10 : 6}
                fill={i <= active ? "#b38730" : "#f7f3ea"}
                stroke="#6e855d"
                strokeWidth="2"
              />
              <text
                x={p.x}
                y={p.y + 28}
                textAnchor="middle"
                fontSize="10"
                fill="#344c33"
              >
                {i + 1}
              </text>
            </g>
          ))}
          <g
            className={s.bus}
            style={{
              transform: `translate(${point.x - 25}px,${point.y - 43}px)`,
            }}
          >
            <rect
              width="50"
              height="30"
              rx="7"
              fill="#d7a943"
              stroke="#846225"
            />
            <path d="M5 5h32v12H5Z" fill="#244e41" />
            <path d="M15 5v12M26 5v12" stroke="#d7a943" strokeWidth="2" />
            <circle cx="11" cy="30" r="5" fill="#244133" />
            <circle cx="40" cy="30" r="5" fill="#244133" />
          </g>
        </svg>
        <p className={s.journeyNote}>
          Scroll through the stops or use the arrows. Schematic, not geographic
          distance.
        </p>
      </div>
      <ol className={page.stopList} ref={list}>
        {stops.map((stop, i) => (
          <li
            key={`${stop}-${i}`}
            data-match={!!term && stop.toLowerCase().includes(term)}
            data-active-stop={i === active}
            aria-current={i === active ? "step" : undefined}
          >
            <div>
              <span>STOP {String(i + 1).padStart(2, "0")}</span>
              {stop}
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop + ", Hyderabad, India")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Search ${stop} on Google Maps (opens a new tab)`}
            >
              Map ↗
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}
