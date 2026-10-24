"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./SchoolStories.module.css";

export function SchoolStoryMotion() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest("main");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        root
          .querySelectorAll<SVGPathElement>("[data-story-ink]")
          .forEach((path) => {
            const l = path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDasharray: l, strokeDashoffset: l },
              {
                strokeDashoffset: 0,
                scrollTrigger: {
                  trigger: path.closest("section"),
                  start: "top 80%",
                  end: "center center",
                  scrub: 1,
                },
              },
            );
          });
        root.querySelectorAll<SVGPathElement>("[data-flight-trail]").forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: path.closest("section"),
              start: "top 90%",
              end: "bottom 35%",
              scrub: 0.8,
            },
          });
        });
        root
          .querySelectorAll<HTMLElement | SVGGElement>("[data-story-parallax]")
          .forEach((el, i) =>
            gsap.fromTo(
              el,
              { y: 25, rotate: i % 2 ? -3 : 3 },
              {
                y: -25,
                rotate: i % 2 ? 3 : -3,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
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
  return <span hidden ref={ref} />;
}

export function CampusMap() {
  const [active, setActive] = useState(0);
  const places = [
    [
      "A place to learn",
      "Classrooms, laboratories and a library make room for questions, exploration and discovery.",
    ],
    [
      "A place to connect",
      "Shared spaces, assemblies and school activities bring the community together.",
    ],
    [
      "A place to grow",
      "Sports, creative expression and everyday challenges help students discover their strengths.",
    ],
  ];
  return (
    <section className={`${s.feature} ${s.campusMap}`}>
      <div>
        <p className={s.kicker}>A SMALL MAP OF BIG POSSIBILITIES</p>
        <h2>
          Find your place
          <br />
          at Niraj.
        </h2>
        <p>
          More than a building. A collection of spaces where school life
          happens.
        </p>
        <div className={s.mapChoices}>
          {places.map((p, i) => (
            <button
              key={p[0]}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {p[0]}
            </button>
          ))}
        </div>
        <p className={s.mapAnswer} aria-live="polite">
          {places[active][1]}
        </p>
      </div>
      <div className={s.mapDrawing} data-story-parallax>
        <svg viewBox="0 0 650 510" aria-hidden="true">
          <path d="M30 370L320 490L625 340L330 220Z" fill="#d0d9bd" />
          <path
            d="M100 250L310 340L540 240V365L310 460L100 370Z"
            fill="#e6d8b1"
          />
          <path d="M100 250L310 160L540 240L310 340Z" fill="#f3e9cd" />
          <path
            d="M310 340V460M100 280L310 370L540 270"
            stroke="#b6a77e"
            strokeWidth="3"
          />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path
                d={`M${125 + i * 45} ${285 + i * 19}v34l25 10v-34Z`}
                fill="#557768"
              />
              <path
                d={`M${345 + i * 45} ${354 - i * 18}v34l25 -10v-34Z`}
                fill="#3c5c4e"
              />
            </g>
          ))}
          <path d="M280 420V380L312 394V440" fill="#315e43" />
          <g fill="#739267">
            <ellipse cx="90" cy="215" rx="55" ry="72" />
            <ellipse cx="560" cy="195" rx="47" ry="66" />
          </g>
          <path d="M90 220V350M560 200V320" stroke="#745f3f" strokeWidth="9" />
          <path
            data-story-ink
            d="M305 460L350 480L600 360"
            stroke="#bc9949"
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx={[310, 475, 180][active]}
            cy={[220, 320, 355][active]}
            r="25"
            fill="#c49a40"
            stroke="#f8f0d6"
            strokeWidth="6"
          />
          <text
            x={[310, 475, 180][active]}
            y={[226, 326, 361][active]}
            textAnchor="middle"
            fill="#173e2b"
            fontSize="18"
          >
            {active + 1}
          </text>
        </svg>
        <small>AN ILLUSTRATED CAMPUS / NOT A FLOOR PLAN</small>
      </div>
    </section>
  );
}

export function VisionGarden() {
  const [selected, setSelected] = useState(0);
  const actions = [
    [
      "Care for our world",
      "Refill a bottle. Switch off an unused light. Small acts of care are a place to begin.",
    ],
    [
      "Grow together",
      "Ask a question, share an idea and listen to another point of view.",
    ],
    [
      "Keep improving",
      "Notice one thing you learned today, and one thing you want to try tomorrow.",
    ],
  ];
  return (
    <section className={`${s.feature} ${s.visionGarden}`}>
      <div className={s.growthDrawing}>
        <svg viewBox="0 0 600 500" aria-hidden="true">
          <circle cx="300" cy="250" r="215" fill="#e2e6d0" />
          <path
            data-story-ink
            d="M300 440V110M300 345Q120 330 150 190Q295 200 300 345M300 260Q470 250 450 120Q315 125 300 260"
            stroke="#557b50"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M300 440V110M300 345Q120 330 150 190Q295 200 300 345M300 260Q470 250 450 120Q315 125 300 260"
            stroke="#557b50"
            strokeWidth="2"
            fill="#8fa87744"
          />
          <g fill="#c59c4c">
            <circle cx="300" cy="100" r="22" />
            <circle cx="155" cy="185" r="13" />
            <circle cx="450" cy="115" r="15" />
          </g>
          <path
            d="M180 440Q300 405 430 440"
            stroke="#83916e"
            strokeWidth="3"
            fill="none"
          />
        </svg>
        <span>Great values grow through small actions.</span>
      </div>
      <div>
        <p className={s.kicker}>PUTTING OUR VISION INTO PRACTICE</p>
        <h2>
          What could you
          <br />
          grow today?
        </h2>
        <p>
          Our commitments become meaningful through the choices we make
          together.
        </p>
        <div className={s.mapChoices}>
          {actions.map((a, i) => (
            <button
              key={a[0]}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {a[0]}
            </button>
          ))}
        </div>
        <p className={s.mapAnswer} aria-live="polite">
          {actions[selected][1]}
        </p>
      </div>
    </section>
  );
}

export function LetterReflection() {
  const [opened, setOpened] = useState(false);
  return (
    <section className={`${s.feature} ${s.letterReflection}`}>
      <div>
        <p className={s.kicker}>A THOUGHT TO TAKE WITH YOU</p>
        <h2>
          Education begins
          <br />
          with possibility.
        </h2>
        <p>
          A welcome is more than a message. It is an invitation to ask
          questions, discover your strengths and make a difference.
        </p>
        <button
          className={s.roundLink}
          onClick={() => setOpened(!opened)}
          aria-expanded={opened}
        >
          {opened ? "Fold the note" : "Open a little encouragement"}
          <span>↗</span>
        </button>
      </div>
      <div className={s.envelope} data-open={opened}>
        <div className={s.notePaper}>
          <small>A NOTE FOR EVERY LEARNER</small>
          <h3>
            You do not need
            <br />
            all the answers
            <br />
            to begin.
          </h3>
          <p>
            Bring your curiosity.
            <br />
            We will grow from there.
          </p>
        </div>
        <div className={s.envelopePocket} aria-hidden="true" />
        <div className={s.envelopeFlap} aria-hidden="true" />
        <span className={s.envelopeSeal} aria-hidden="true">
          N
        </span>
      </div>
    </section>
  );
}

export function WritingDesk() {
  const [draft, setDraft] = useState("");
  return (
    <section className={`${s.feature} ${s.writingDesk}`}>
      <div>
        <p className={s.kicker}>THE WRITER’S DESK</p>
        <h2>
          Before a whole book,
          <br />
          there was one line.
        </h2>
        <p>
          Give your imagination a little space. Try the beginning of a story,
          just for yourself.
        </p>
        <svg
          className={s.inkIllustration}
          viewBox="0 0 450 200"
          aria-hidden="true"
        >
          <path
            data-story-ink
            d="M20 140Q90 20 170 100T330 100"
            stroke="#aa8642"
            strokeWidth="3"
            fill="none"
          />
          <path d="M250 110L390 20L370 65L265 130Z" fill="#728c69" />
          <path d="M250 110L245 145L265 130" fill="#d7be80" />
          <path d="M280 110L375 40" stroke="#e1d7b3" strokeWidth="2" />
        </svg>
      </div>
      <div className={s.draftPaper}>
        <label htmlFor="first-line">Chapter one</label>
        <textarea
          id="first-line"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={400}
          placeholder="The morning began with something nobody expected…"
        />
        <div>
          <span>{draft.length} / 400</span>
          <button onClick={() => setDraft("")} disabled={!draft}>
            Clear draft
          </button>
        </div>
        <small>
          Just a practice space. This draft is not saved or submitted.
        </small>
      </div>
    </section>
  );
}
