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

  function sizeAllStages() {
    sizeHeroStage();
    sizeSection2Stage();
  }

  sizeAllStages();
  window.addEventListener('resize', sizeAllStages);

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

  /* ---------- Page-level scroll-progress indicator ----------
     Lives outside every section (see index.html). Active state is set
     directly from the triggers that own each transition, further down.

     Shows only the CURRENT section's number (not a full list) per
     feedback — a single value that fades/shifts when it changes. */

  const SECTION_NUMBERS = { hero: '01', section2: '02', section3: '03' };
  const progressCurrent = document.getElementById('page-progress-current');
  const progressFill = document.getElementById('page-progress-fill');

  function setActiveSection(name) {
    if (!progressCurrent || progressCurrent.textContent === SECTION_NUMBERS[name]) return;
    progressCurrent.classList.add('is-changing');
    progressCurrent.textContent = SECTION_NUMBERS[name];
    // Double rAF: let the browser actually paint the "faded out" state
    // before removing the class, so it transitions back in instead of
    // the add/remove collapsing into a single, invisible frame.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => progressCurrent.classList.remove('is-changing'));
    });
  }

  // Continuous fill, independent of the discrete per-section active state
  // above — tracks the whole document's scroll fraction (0–1) against the
  // gold track line for a smoother, more premium read of overall progress.
  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      if (progressFill) progressFill.style.height = `${self.progress * 100}%`;
    },
  });

  /* ---------- Hero pinned scroll sequence ---------- */

  const hero = document.getElementById('hero');
  const book = document.getElementById('layer-book'); // now book + foreground foliage combined (01.webp)
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

  // CLOUD_END is computed further down, once we can measure the pin's
  // real distance — declared here (not assigned yet) so the onUpdate
  // closure below can reference it; by the time onUpdate actually runs
  // (on scroll), it will already hold its final value.
  let CLOUD_END;

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
        // first CLOUD_END fraction of the pin only — remapped so they
        // actually finish partway through, instead of being scrubbed
        // across the whole pinned distance.
        const cloudProgress = Math.min(1, self.progress / CLOUD_END);
        if (ctx) drawFrame(Math.round(cloudProgress * (FRAME_COUNT - 1)));
      },
      onLeave: () => setActiveSection('section2'),
      onEnterBack: () => setActiveSection('hero'),
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

  // With the dead zone gone, Section 2's natural entrance now lines up
  // exactly with the pin's own end — so CLOUD_END is set purely so the
  // reveal phase (CLOUD_END → 1) spans exactly one viewport-height of
  // real scroll, matching the book's own exit distance below.
  const pinDuration = pinEndPx - pinStartPx;
  CLOUD_END = 1 - window.innerHeight / pinDuration;

  // Book's exit: translate up and off the top of the frame, no scale.
  // #layer-book is a CHILD of #hero-stage, which itself carries
  // `transform: scale(heroStageState.scale)` (the cover-scale that fills
  // the viewport) — CSS transforms compose, so translating a child by N
  // local px actually moves it N × scale SCREEN px. Dividing by the
  // stage's current scale here cancels that out, matching Section 2's
  // natural one-viewport-height entrance exactly.
  const BOOK_EXIT_LOCAL = window.innerHeight / heroStageState.scale;

  heroTimeline.fromTo(
    book,
    { y: 0 },
    { y: -BOOK_EXIT_LOCAL, ease: 'none', duration: 1 - CLOUD_END },
    CLOUD_END
  );

  // Section 2 gets no transform at all — with the dead zone removed at
  // setup, its ordinary, un-transformed scroll position is already
  // exactly what's needed to arrive in step with the book.

  /* ---------- Section 2: smooth differential parallax ----------
     Not pinned, never repositioned — a normal scroll-through section
     where every layer drifts at its own speed as the section passes
     through the viewport, giving the classic layered-depth feel. Depth
     values come from each layer's data-depth attribute (0 = fixed with
     the background, higher = drifts further/faster). Background moves
     least, flying elements move most. Section 2's own box is stable and
     real from the very first frame, so these triggers measure it
     correctly with no manual refresh() needed. */

  const parallaxLayers = section2.querySelectorAll('[data-depth]');
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

  /* ---------- Section 2 → Section 3 (fake placeholder): active-state handoff ---------- */

  const section3 = document.getElementById('section3');
  if (section3) {
    ScrollTrigger.create({
      trigger: section3,
      start: 'top center',
      end: 'bottom top',
      onEnter: () => setActiveSection('section3'),
      onEnterBack: () => setActiveSection('section2'),
    });
  }

  ScrollTrigger.refresh();
});
