"use client";

import Image from "next/image";
import CollectionTrail from "./CollectionTrail";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryImage, GalleryManifest } from "@/lib/gallery";
import styles from "./GalleryExperience.module.css";

gsap.registerPlugin(ScrollTrigger);
const PAGE_SIZE = 24;

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg className={direction === "left" ? styles.arrowLeft : undefined} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GalleryExperience({ manifest }: { manifest: GalleryManifest }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [broken, setBroken] = useState<Set<string>>(() => new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filterShellRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const images = useMemo(
    () => manifest.images.filter((image) => (category === "All" || image.category === category) && image.category.toLowerCase().includes(search.trim().toLowerCase())),
    [category, manifest.images, search]
  );
  const visibleImages = useMemo(() => images.slice(0, visibleCount), [images, visibleCount]);
  const activeIndex = activeId ? images.findIndex((image) => image.id === activeId) : -1;
  const activeImage = activeIndex >= 0 ? images[activeIndex] : null;
  const viewerOpen = activeId !== null;
  const featured = manifest.images.slice(0, 3);
  const counts = useMemo(() => {
    const result = new Map<string, number>();
    for (const image of manifest.images) result.set(image.category, (result.get(image.category) ?? 0) + 1);
    return result;
  }, [manifest.images]);

  const openImage = useCallback((image: GalleryImage) => setActiveId(image.id), []);
  const stepImage = useCallback((delta: number) => {
    if (!images.length || activeIndex < 0) return;
    const next = (activeIndex + delta + images.length) % images.length;
    setActiveId(images[next].id);
  }, [activeIndex, images]);

  function chooseCategory(next: string) {
    if (next === category) return;
    setCategory(next);
    setSearch("");
    setVisibleCount(PAGE_SIZE);
    setActiveId(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const firstImage = gridRef.current?.querySelector<HTMLElement>("[data-gallery-card]");
        if (!firstImage) return;
        const filtersBottom = filterShellRef.current?.getBoundingClientRect().bottom ?? 0;
        const imageTop = firstImage.getBoundingClientRect().top;
        const targetTop = window.scrollY + imageTop - Math.max(filtersBottom + 20, 130);
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      });
    });
  }

  function markBroken(id: string) {
    setBroken((current) => {
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }

  function handleIntroPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intro = introRef.current;
    if (!intro) return;
    const bounds = intro.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    intro.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    intro.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
    intro.querySelectorAll<HTMLElement>("[data-cursor-depth]").forEach((card) => {
      const depth = Number(card.dataset.cursorDepth || 1);
      card.style.setProperty("--cursor-shift-x", `${-x * depth * 18}px`);
      card.style.setProperty("--cursor-shift-y", `${-y * depth * 18}px`);
    });
  }

  function resetIntroPointer() {
    const intro = introRef.current;
    if (!intro) return;
    intro.style.setProperty("--cursor-x", "50%");
    intro.style.setProperty("--cursor-y", "50%");
    intro.querySelectorAll<HTMLElement>("[data-cursor-depth]").forEach((card) => {
      card.style.setProperty("--cursor-shift-x", "0px");
      card.style.setProperty("--cursor-shift-y", "0px");
    });
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-gallery-card]");
      if (cards?.length) {
        gsap.fromTo(cards, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.025,
          ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
        });
      }
      const heroImages = galleryRef.current?.querySelectorAll<HTMLElement>("[data-gallery-parallax]");
      heroImages?.forEach((element, index) => {
        gsap.fromTo(element, { yPercent: index === 0 ? -3 : 3 }, {
          yPercent: index === 0 ? 3 : -3,
          ease: "none",
          scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });
    }, galleryRef);
    return () => context.revert();
  }, [category, visibleCount, search]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !viewerOpen) return;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [viewerOpen]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") { event.preventDefault(); stepImage(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); stepImage(-1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, stepImage]);

  function handleDialogCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    setActiveId(null);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 48) stepImage(distance < 0 ? 1 : -1);
    setTouchStart(null);
  }

  return (
    <main className={styles.page} ref={galleryRef}>
      <section
        className={styles.intro}
        aria-labelledby="gallery-title"
        ref={introRef}
        onPointerMove={handleIntroPointerMove}
        onPointerLeave={resetIntroPointer}
      >
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}><span /> A school in motion</p>
          <h1 id="gallery-title">Life at <em>Niraj.</em></h1>
          <p className={styles.introText}>The big milestones, the small discoveries, and all the moments in between.</p>
          <a className={styles.discoverLink} href="#gallery-collection">
            <span className={styles.discoverIcon}><Arrow /></span>
            <span>Explore the collection</span>
          </a>
          <div className={styles.collectionCount}>
            <span>{manifest.images.length.toString().padStart(3, "0")}</span> photographs
            <i />
            <span>{manifest.categories.length.toString().padStart(2, "0")}</span> collections
          </div>
        </div>

        <div className={styles.openingMosaic} aria-label="Featured moments from school life">
          {featured.map((image, index) => (
            <button
              className={`${styles.openingPhoto} ${styles[`openingPhoto${index + 1}`]}`}
              style={{ "--image-ratio": image.width > 0 && image.height > 0 ? image.width / image.height : 4 / 3 } as CSSProperties}
              key={image.id}
              onClick={() => openImage(image)}
              aria-label={`View ${image.category} photograph`}
              data-cursor-depth={index === 1 ? "0.7" : index === 2 ? "1.25" : "1"}
            >
              {image.displayable && !broken.has(image.id) ? (
                <Image
                  src={image.src}
                  alt={`Photo from ${image.category}`}
                  fill
                  priority
                  sizes={index === 0 ? "(max-width: 700px) 58vw, 29vw" : "(max-width: 700px) 38vw, 22vw"}
                  onError={() => markBroken(image.id)}
                  data-gallery-parallax
                />
              ) : <span className={styles.unavailable}>Image unavailable</span>}
              <span className={styles.openingShade} />
              <span className={styles.openingLabel}>{image.category}</span>
            </button>
          ))}
          <span className={styles.mosaicIndex} aria-hidden="true">NPS&nbsp; / &nbsp;{new Date().getFullYear()}</span>
        </div>
      </section>

      <CollectionTrail manifest={manifest} onChoose={chooseCategory} />
      <section className={styles.collection} id="gallery-collection" aria-label="Browse the gallery">
        <div className={styles.collectionHeader}>
          <div>
            <p className={styles.eyebrow}><span /> Browse by moment</p>
            <h2>Every day, <em>something begins.</em></h2>
          </div>
          <p className={styles.collectionNote}>Choose a collection to follow a story, or let the moments find you.</p>
        </div>

        <div className={styles.collectionTools}><label>Find a collection<input type="search" value={search} placeholder="Try art, sports or field trips" onChange={e=>{setSearch(e.target.value);setCategory("All");setVisibleCount(PAGE_SIZE)}} /></label><button onClick={()=>{const available=images.filter(image=>image.displayable);if(available.length)openImage(available[Math.floor(Math.random()*available.length)])}} disabled={!images.some(image=>image.displayable)}>Surprise me <span>&#8599;</span></button></div>
        <div className={styles.filterShell} ref={filterShellRef}>
          <div className={styles.filters} role="group" aria-label="Filter gallery by category">
            <button className={`${styles.filter} ${category === "All" ? styles.filterActive : ""}`} onClick={() => chooseCategory("All")} aria-pressed={category === "All"}>
              All <span>{manifest.images.length}</span>
            </button>
            {manifest.categories.map((name) => (
              <button className={`${styles.filter} ${category === name ? styles.filterActive : ""}`} key={name} onClick={() => chooseCategory(name)} aria-pressed={category === name}>
                {name} <span>{counts.get(name) ?? 0}</span>
              </button>
            ))}
          </div>
          <p className={styles.resultCount} aria-live="polite">{images.length} {images.length === 1 ? "moment" : "moments"}</p>
        </div>

        {visibleImages.length ? (
          <div className={styles.photoGrid} ref={gridRef} key={category}>
            {visibleImages.map((image, index) => {
              return (
                <article
                  className={styles.photoItem}
                  key={image.id}
                  data-gallery-card
                  style={{ aspectRatio: image.width > 0 && image.height > 0 ? `${image.width} / ${image.height}` : "4 / 3" }}
                >
                  <button className={styles.photoButton} onClick={() => openImage(image)} aria-label={`View image from ${image.category}`}>
                    {image.displayable && !broken.has(image.id) ? (
                      <Image
                        src={image.src}
                        alt={`Photo from ${image.category}`}
                        fill
                        sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1050px) 44vw, 30vw"
                        loading="lazy"
                        onError={() => markBroken(image.id)}
                      />
                    ) : <span className={styles.unavailable}>Image unavailable</span>}
                    <span className={styles.photoScrim} />
                    <span className={styles.photoMeta}>
                      <span>{image.category}</span>
                      <span className={styles.photoOpen}><Arrow /></span>
                    </span>
                    <span className={styles.photoNumber}>{String(index + 1).padStart(2, "0")}</span>
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <p className={styles.emptyState}>No photographs are available in this collection yet.</p>
        )}

        {visibleCount < images.length && (
          <div className={styles.loadMoreWrap}>
            <button className={styles.loadMore} onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, images.length))}>
              <span>Load more moments</span><span className={styles.loadMoreCount}>{Math.min(visibleCount, images.length)} / {images.length}</span><Arrow />
            </button>
          </div>
        )}
      </section>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label="Photo viewer"
        onCancel={handleDialogCancel}
        onClick={(event) => { if (event.target === event.currentTarget) setActiveId(null); }}
      >
        {activeImage && (
          <div className={styles.viewerInner} onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={handleTouchEnd}>
            <button className={styles.viewerClose} autoFocus onClick={() => setActiveId(null)} aria-label="Close photo viewer">×</button>
            <button className={`${styles.viewerNav} ${styles.viewerPrevious}`} onClick={() => stepImage(-1)} aria-label="Previous photo"><Arrow direction="left" /></button>
            <div className={styles.viewerImage}>
              {activeImage.displayable && !broken.has(activeImage.id) ? (
                <Image src={activeImage.src} alt={`Photo from ${activeImage.category}`} fill sizes="94vw" priority onError={() => markBroken(activeImage.id)} />
              ) : (
                <span className={styles.unavailable}>
                  This image could not be previewed in the browser.
                  <a href={activeImage.original} download={activeImage.name}>Download the original</a>
                </span>
              )}
            </div>
            <button className={`${styles.viewerNav} ${styles.viewerNext}`} onClick={() => stepImage(1)} aria-label="Next photo"><Arrow /></button>
            <div className={styles.viewerCaption}>
              <span>{activeImage.category}</span>
              <span>{String(activeIndex + 1).padStart(3, "0")} <i /> {String(images.length).padStart(3, "0")}</span>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
