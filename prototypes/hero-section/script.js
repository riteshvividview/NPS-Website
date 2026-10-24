/* ============================================================
   Niraj Public School — Hero Prototype
   Lenis (smooth scroll) + GSAP ScrollTrigger (pin + scrub timeline)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Stage scaling: the single source of registration ----------
     The stage is a rigid 1672×941 box. We scale it up with the same
     math as CSS object-fit:cover (scale = max(vw/1672, vh/941)) so it
     always fills the viewport with no left/right gaps. Because every
     layer — images AND the real HTML text — lives inside this one
     scaled box, they move and crop together exactly like a single
     flat image would. This replaces per-layer object-fit as the
     registration mechanism; object-fit alone can't guarantee it. */

  // state.scale is kept live (read by the hero exit tween below) — a plain
  // return value would go stale the moment the window resizes.
  function makeStageSizer(stageEl, w, h, state) {
    return function sizeStage() {
      const scale = Math.max(window.innerWidth / w, window.innerHeight / h);
      state.scale = scale;
      stageEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };
  }

  const heroStageState = { scale: 1 };
  const sizeHeroStage = makeStageSizer(document.getElementById('hero-stage'), 1672, 941, heroStageState);
  const sizeSection2Stage = makeStageSizer(document.getElementById('section2-stage'), 1920, 1080, { scale: 1 });
  const section3StageState = { scale: 1 };
  const sizeSection3Stage = makeStageSizer(document.getElementById('section3-stage'), 1672, 941, section3StageState);

  function sizeAllStages() {
    sizeHeroStage();
    sizeSection2Stage();
    sizeSection3Stage();
  }

  sizeAllStages();
  window.addEventListener('resize', sizeAllStages);

  /* ---------- Fixed site header: push the hero down by its height ----------
     .site-header is position:fixed, so it doesn't occupy normal document
     flow — without this, it would simply sit ON TOP of the hero's own top
     content instead of the hero starting below it. Measuring the header's
     real rendered height in JS (rather than hardcoding a px value in CSS)
     keeps this correct even if the header's own height ever changes
     (content wraps, font loads, responsive tweaks, etc). */
  const siteHeader = document.getElementById('site-header');
  const heroSection = document.getElementById('hero');

  // Set (if the dropdown exists) further down, so the scroll-hide handler
  // below can close the mega-dropdown when the header itself scrolls away.
  let dropdownCloseOnHeaderHide = null;

  function offsetHeroForHeader() {
    if (!siteHeader || !heroSection) return;
    heroSection.style.marginTop = `${siteHeader.offsetHeight}px`;
  }

  offsetHeroForHeader();
  window.addEventListener('resize', offsetHeroForHeader);

  /* ---------- Lenis smooth scroll, synced to GSAP's ticker ---------- */

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Lenis measures the document's scrollable height itself (independent
  // of the browser's native scrollbar) and caches it — it only recomputes
  // that on its own 'resize' handling, never in response to GSAP
  // inserting the hero's pin-spacer (which happens after this Lenis
  // instance is constructed and adds real extra height to the page).
  // Hooking Lenis's resize to ScrollTrigger's global 'refresh' event
  // keeps the two in sync on load and on window resize.
  ScrollTrigger.addEventListener('refresh', () => lenis.resize());

  /* ---------- Fixed header: hide on scroll down, show on scroll up ----------
     self.direction (from ScrollTrigger, driven by Lenis via the hookup
     above) is 1 when scrolling down and -1 when scrolling up — the
     standard way to detect this without hand-rolling scroll-delta
     tracking. Always shown near the very top of the page, regardless of
     direction, so it doesn't flicker away on a tiny scroll. */
  if (siteHeader) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (window.scrollY < siteHeader.offsetHeight) {
          siteHeader.classList.remove('is-hidden');
        } else if (self.direction === 1) {
          siteHeader.classList.add('is-hidden');
          if (dropdownCloseOnHeaderHide) dropdownCloseOnHeaderHide();
        } else {
          siteHeader.classList.remove('is-hidden');
        }
      },
    });
  }

  /* ---------- Academics mega-dropdown: GSAP open/close, not CSS :hover ----------
     Plain `.nav-item-dropdown:hover .mega-dropdown { display:grid }` looked
     right but broke in practice: :hover only holds while the cursor is
     directly over the trigger element or one of its DOM descendants at
     every instant. The mega-dropdown is positioned way outside the
     trigger's own visual box (absolute, relative to the whole header), so
     the gap between the "Academics" text and where the panel actually
     starts is real screen space that ISN'T covered by any part of
     .nav-item-dropdown — moving the cursor through it made the dropdown
     vanish before you ever reached it.

     Fixed with the standard pattern for exactly this: track open/close in
     JS instead of relying on continuous CSS hover coverage, with a short
     delay before closing so crossing that gap doesn't kill it, animated
     with GSAP (fade + rise for the panel, a quick stagger for the columns/
     promo card inside it) instead of an instant display toggle. Also
     click-toggleable and closes on an outside click / Escape, for anyone
     without a mouse hovering it.  */
  const dropdownWrap = document.querySelector('.nav-item-dropdown');
  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  const dropdownPanel = document.querySelector('.mega-dropdown');

  if (dropdownWrap && dropdownTrigger && dropdownPanel) {
    const dropdownGroups = dropdownPanel.querySelectorAll('.mega-col, .mega-promo');
    let closeTimer = null;
    let isOpen = false;

    gsap.set(dropdownPanel, { autoAlpha: 0, y: -14 });
    gsap.set(dropdownGroups, { autoAlpha: 0, y: -10 });

    function openDropdown() {
      clearTimeout(closeTimer);
      if (isOpen) return;
      isOpen = true;
      dropdownWrap.classList.add('is-open');
      dropdownTrigger.setAttribute('aria-expanded', 'true');
      gsap.killTweensOf([dropdownPanel, ...dropdownGroups]);
      gsap.to(dropdownPanel, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power3.out' });
      gsap.to(dropdownGroups, {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
        ease: 'power3.out',
        stagger: 0.045,
        delay: 0.04,
      });
    }

    function closeDropdown() {
      clearTimeout(closeTimer);
      if (!isOpen) return;
      isOpen = false;
      dropdownWrap.classList.remove('is-open');
      dropdownTrigger.setAttribute('aria-expanded', 'false');
      gsap.killTweensOf([dropdownPanel, ...dropdownGroups]);
      gsap.to(dropdownGroups, { autoAlpha: 0, y: -8, duration: 0.18, ease: 'power2.in' });
      gsap.to(dropdownPanel, { autoAlpha: 0, y: -14, duration: 0.22, ease: 'power2.in' });
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeDropdown, 260);
    }

    // Hovering EITHER the trigger's wrapper or the panel itself keeps it
    // open — this is what actually fixes the gap problem, since both are
    // listened to independently rather than relying on one continuous
    // hover region.
    [dropdownWrap, dropdownPanel].forEach((el) => {
      el.addEventListener('mouseenter', openDropdown);
      el.addEventListener('mouseleave', scheduleClose);
    });

    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (isOpen) closeDropdown();
      else openDropdown();
    });

    document.addEventListener('click', (e) => {
      if (isOpen && !dropdownWrap.contains(e.target)) closeDropdown();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeDropdown();
    });

    // GSAP hover micro-interaction for the icon chips inside the dropdown
    // (a small pop + gentle rotation) — on top of the CSS hover already on
    // .mega-item, per feedback asking for GSAP specifically on the items
    // inside the dropdown, not just plain CSS transitions.
    dropdownPanel.querySelectorAll('.mega-item-icon').forEach((icon) => {
      const item = icon.closest('.mega-item');
      item.addEventListener('mouseenter', () => {
        gsap.to(icon, { scale: 1.15, rotate: -8, duration: 0.25, ease: 'back.out(2)' });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(icon, { scale: 1, rotate: 0, duration: 0.25, ease: 'power2.out' });
      });
    });

    // Don't leave it open while the header itself is scrolling away.
    dropdownCloseOnHeaderHide = closeDropdown;
  }

  /* ---------- Clouds: 150-frame sequence, drawn to canvas, scrubbed
     directly against scroll progress — not an autoplaying/looping video. ---------- */

  const FRAME_COUNT = 150;
  const FRAME_PATH = (n) =>
    `../../assets/Home%20Page/hero%20section/sky-video-frames/ezgif-frame-${String(n).padStart(3, '0')}.png`;

  const cloudCanvas = document.getElementById('cloud-canvas');
  const cloudFallback = document.getElementById('cloud-fallback');
  const ctx = cloudCanvas ? cloudCanvas.getContext('2d') : null;

  const frames = [];
  let framesReady = 0;
  let lastDrawnFrame = -1;

  function drawFrame(index) {
    const clamped = Math.min(FRAME_COUNT - 1, Math.max(0, index));
    if (clamped === lastDrawnFrame) return;
    const img = frames[clamped];
    if (!img || !img.complete || !img.naturalWidth) return;
    ctx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);
    ctx.drawImage(img, 0, 0, cloudCanvas.width, cloudCanvas.height);
    lastDrawnFrame = clamped;
  }

  if (ctx) {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        framesReady++;
        if (i === 1) drawFrame(0); // paint something as soon as the first frame lands
      };
      img.onerror = () => {
        if (framesReady === 0) {
          cloudCanvas.style.display = 'none';
          cloudFallback.style.opacity = '1';
        }
      };
      img.src = FRAME_PATH(i);
      frames.push(img);
    }
  } else {
    cloudFallback.style.opacity = '1';
  }

  /* ---------- Hero pinned scroll sequence ---------- */

  const hero = document.getElementById('hero');
  const section2 = document.getElementById('section2');

  if (reduceMotion) {
    // Respect reduced-motion: keep the hero static, no pin, no scroll-driven movement.
    return;
  }

  // GSAP's pin wraps the hero in a spacer element that reserves the
  // actual scroll space, and that spacer is oversized relative to
  // PIN_END's own configured (end - start) — it also accounts for the
  // hero's natural, un-pinned height. Rather than guess or compensate for
  // that afterward, we measure it once and remove it from the spacer
  // itself before any scrolling ever happens — no runtime mutation, no
  // reflow during scroll.
  const PIN_END = '+=220%';

  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: PIN_END,
      // scrub:true tracks raw scroll with zero extra lag. A numeric scrub
      // adds GSAP's own independent smoothing on top of Lenis's, and the
      // two compounding was the actual cause of the fast-scroll "gap".
      scrub: true,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Clouds play through their full 150-frame sequence across the
        // entire pin — the book/foliage layer no longer moves, so there's
        // no second phase left to share this scroll distance with.
        if (ctx) drawFrame(Math.round(self.progress * (FRAME_COUNT - 1)));
      },
    },
  });

  // Force GSAP to actually build the pin-spacer now, so the measurement
  // right below reads its real, final size — not a pre-spacer layout.
  ScrollTrigger.refresh();

  const pinStartPx = heroTimeline.scrollTrigger.start;
  const pinEndPx = heroTimeline.scrollTrigger.end;
  // Section 2 has no transform, and the spacer hasn't been adjusted yet at
  // this point, so this reads its true, current document position —
  // converting its viewport-relative top to an absolute document Y by
  // adding the current scroll offset. This already reflects Section 2's
  // own `margin-top` in styles.css — see that rule for the simple,
  // one-line way to tune the small handoff overlap yourself.
  const section2NaturalDocY = section2.getBoundingClientRect().top + window.scrollY;

  // The real, measured extra distance the pin-spacer reserves beyond its
  // own configured (end - start) — whatever GSAP actually adds, exactly.
  const DEAD_ZONE = Math.max(0, section2NaturalDocY - pinEndPx);

  // TUNABLE — the ONE number to touch for how much Section 2 overlaps the
  // book/foliage. This is intentionally SEPARATE from DEAD_ZONE above:
  // DEAD_ZONE is auto-measured and, on its own, only cancels out to
  // exactly flush (zero gap) — it can never create visible overlap no
  // matter its value, because it's defined as "whatever's needed to reach
  // flush." OVERLAP_PX is added ON TOP of that, pulling Section 2
  // genuinely further up than flush, for real, visible overlap. (An
  // earlier attempt tried to get this effect from Section 2's own CSS
  // margin-top instead — that didn't work because DEAD_ZONE is measured
  // FROM Section 2's current position, so it silently cancelled out
  // whatever the margin did, every time.) Raise this for more overlap,
  // lower it (or 0) for less.
  const OVERLAP_PX = 150;

  // The one-time, pre-scroll fix: remove the dead zone AND add the
  // intentional overlap from the spacer itself (the element GSAP actually
  // wraps the hero in while pinned — this is hero.parentNode once the
  // pin/refresh above has run).
  if (DEAD_ZONE + OVERLAP_PX > 0) {
    const pinSpacer = hero.parentNode;
    gsap.set(pinSpacer, { marginBottom: -(DEAD_ZONE + OVERLAP_PX) });
  }

  // The book/foliage layer stays completely static now — no exit tween,
  // no scroll-driven movement of any kind. It just sits there while the
  // clouds play behind it and, separately, Section 2 rises to cover
  // everything via the spacer-margin overlap above.

  /* ---------- Section 2: smooth differential parallax ----------
     Not pinned, never repositioned — a normal scroll-through section
     where every layer drifts at its own speed as the section passes
     through the viewport, giving the classic layered-depth feel. Depth
     values come from each layer's data-depth attribute (0 = fixed with
     the background, higher = drifts further/faster). Background moves
     least, flying elements move most. Section 2's own box is stable and
     real from the very first frame, so these triggers measure it
     correctly with no manual refresh() needed. */

  // Boy and globe get their own separate, gentler treatment below — excluded
  // here so they aren't animated twice.
  const parallaxLayers = section2.querySelectorAll('[data-depth]:not(.s2-boy):not(.s2-globe)');
  const PARALLAX_AMPLITUDE = 30; // yPercent swing per unit of depth — raised from 8 per feedback, was barely visible

  parallaxLayers.forEach((el) => {
    const depth = parseFloat(el.dataset.depth) || 0;
    gsap.fromTo(
      el,
      { yPercent: PARALLAX_AMPLITUDE * depth },
      {
        yPercent: -PARALLAX_AMPLITUDE * depth,
        ease: 'none',
        scrollTrigger: {
          trigger: section2,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // same reasoning as the hero timeline — no extra lag on top of Lenis's own smoothing
        },
      }
    );
  });

  // Boy & globe: a slow, gentle drift that SETTLES early instead of
  // tracking scroll the whole way through Section 2. Two things make this
  // read as "slow motion, settles into place" rather than the constant
  // scrub the other layers use:
  //  1. A much shorter trigger window (top bottom → center center, not
  //     the full top bottom → bottom top) — the motion is done well
  //     before Section 2 finishes scrolling past, so they just sit still
  //     for the rest of it instead of continuing to drift.
  //  2. A small numeric scrub (1.4s of lag) instead of scrub:true. This is
  //     a deliberate exception to the "no numeric scrub" rule used
  //     elsewhere in this file — that rule exists because stacking GSAP's
  //     own lag on top of Lenis's caused a real desync bug, but that was
  //     specifically about two SEPARATE layers needing to land in exact
  //     sync with each other. There's no such pairing here — it's a
  //     one-off decorative settle — so the lag is safe and is exactly
  //     what gives it a heavier, slower-feeling motion.
  const settleLayers = section2.querySelectorAll('.s2-boy, .s2-globe');
  const SETTLE_AMPLITUDE = 10; // smaller swing than PARALLAX_AMPLITUDE — a slight drift, not a big traverse

  settleLayers.forEach((el) => {
    const depth = parseFloat(el.dataset.depth) || 0;
    gsap.fromTo(
      el,
      { yPercent: SETTLE_AMPLITUDE * depth },
      {
        yPercent: 0, // settles at its natural, un-offset position
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section2,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.4,
        },
      }
    );
  });

  /* ---------- Section 3: differential parallax + two special tweens ----------
     Same shared depth-based parallax as Section 2 for the ordinary
     background layers, plus two layers with their own dedicated tweens
     since their motion isn't just "yPercent by depth":
       - the top-left branch moves left AND zooms in (xPercent + scale)
       - the birds move right only, explicitly with no zoom at all */
  const section3 = document.getElementById('section3');

  if (section3) {
    const s3ParallaxLayers = section3.querySelectorAll('[data-depth]');

    s3ParallaxLayers.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0;
      gsap.fromTo(
        el,
        { yPercent: PARALLAX_AMPLITUDE * depth },
        {
          yPercent: -PARALLAX_AMPLITUDE * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: section3,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    const s3TopLeft = document.getElementById('s3-top-left');
    if (s3TopLeft) {
      gsap.fromTo(
        s3TopLeft,
        { xPercent: 0, scale: 1 },
        {
          xPercent: -6,
          scale: 1.18,
          ease: 'none',
          scrollTrigger: {
            trigger: section3,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    const s3Birds = document.getElementById('s3-birds');
    if (s3Birds) {
      gsap.fromTo(
        s3Birds,
        { xPercent: -3 },
        {
          xPercent: 6, // no scale set at all, at either end — explicitly no zoom
          ease: 'none',
          scrollTrigger: {
            trigger: section3,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Paper plane: moves toward the top-right AND zooms in a little.
    // Originally sent it toward the top-left, but that read as flying
    // backward into the throwing hand instead of away from it — flipped
    // xPercent to positive (right) per feedback; yPercent stays negative
    // (continuing upward, same as the original throw arc).
    const s3Plane = document.getElementById('s3-plane');
    if (s3Plane) {
      gsap.fromTo(
        s3Plane,
        { xPercent: 0, yPercent: 0, scale: 1 },
        {
          xPercent: 8,
          yPercent: -6,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: section3,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  }

  ScrollTrigger.refresh();
});
