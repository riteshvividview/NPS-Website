"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryManifest } from "@/lib/gallery";
import s from "./CollectionTrail.module.css";
export default function CollectionTrail({
  manifest,
  onChoose,
}: {
  manifest: GalleryManifest;
  onChoose: (category: string) => void;
}) {
  const root = useRef<HTMLElement>(null),
    rail = useRef<HTMLDivElement>(null);
  const cards = manifest.categories
    .map((category) => ({
      category,
      image: manifest.images.find(
        (x) => x.category === category && x.displayable,
      ),
      count: manifest.images.filter((x) => x.category === category).length,
    }))
    .filter((x) => x.image);
  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 800px) and (prefers-reduced-motion: no-preference)",
      () => {
        root.current
          ?.querySelectorAll<HTMLElement>("[data-trail-card]")
          .forEach((el, i) =>
            gsap.fromTo(
              el,
              { rotate: i % 2 ? -4 : 4, y: 35 },
              {
                rotate: i % 2 ? 2 : -2,
                y: -10,
                ease: "none",
                scrollTrigger: {
                  trigger: root.current,
                  start: "top bottom",
                  end: "bottom center",
                  scrub: 1,
                },
              },
            ),
          );
      },
      root,
    );
    return () => mm.revert();
  }, []);
  function scroll(direction: number) {
    rail.current?.scrollBy({
      left: direction * 340,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section
      className={s.trail}
      ref={root}
      aria-label="Explore photo collections"
    >
      <div className={s.heading}>
        <div>
          <small>THE CONTACT SHEET</small>
          <h2>Follow a little curiosity.</h2>
          <p>Pick a collection. See where the day takes you.</p>
        </div>
        <div className={s.arrows}>
          <button onClick={() => scroll(-1)} aria-label="Previous collections">
            ←
          </button>
          <button onClick={() => scroll(1)} aria-label="Next collections">
            →
          </button>
        </div>
      </div>
      <div className={s.rail} ref={rail}>
        {cards.map(({ category, image, count }, i) => (
          <button
            className={s.card}
            data-trail-card
            key={category}
            onClick={() => {
              onChoose(category);
              document
                .getElementById("gallery-collection")
                ?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                });
            }}
          >
            <span className={s.frame}>
              <Image
                src={image!.src}
                alt={`${category} collection`}
                fill
                sizes="(max-width: 600px) 240px, 290px"
              />
              <i>{String(i + 1).padStart(2, "0")}</i>
            </span>
            <strong>{category}</strong>
            <span>
              {count} moments <b>↗</b>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
