"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./LearningScenes.module.css";

/** Original, scalable editorial characters; no stock photographs or student likenesses. */
function Child({
  x = 0,
  y = 0,
  shirt = "#be784f",
  pose = "read",
  scale = 1,
}: {
  x?: number;
  y?: number;
  shirt?: string;
  pose?: "read" | "reach" | "wave";
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M-26 104L-30 166M21 104L34 166"
        stroke="#294c42"
        strokeWidth="23"
        strokeLinecap="round"
      />
      <path
        d="M-40 166H-13M24 166H51"
        stroke="#1c3028"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path d="M-30 25Q0 10 30 25L36 109H-37Z" fill={shirt} />
      <path
        d={
          pose === "reach"
            ? "M-29 35L-65 12L-83 -22M29 35L65 -20"
            : pose === "wave"
              ? "M-29 35L-62 72M28 35L60 12L60 -35"
              : "M-29 35L-47 72L-4 82M29 35L46 68L10 82"
        }
        stroke="#b97e58"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="-9" y="-1" width="18" height="30" rx="8" fill="#b97e58" />
      <ellipse cy="-22" rx="29" ry="34" fill="#c68e66" />
      <path
        d="M-29 -14Q-41 -65 1 -62Q38 -62 29 -15L20 -38Q-8 -28 -19 -44L-25 -13"
        fill="#263b30"
      />
      <path
        d="M-12 -19h2M11 -19h2"
        stroke="#263b30"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M-6 -5Q0 1 8 -5" fill="none" stroke="#7c432f" strokeWidth="2" />
      {pose === "read" && (
        <g>
          <path d="M-40 57L0 68L40 57V98L0 109L-40 98Z" fill="#e7c66c" />
          <path d="M0 68V109" stroke="#987a35" strokeWidth="2" />
          <path
            d="M-30 72L-10 78M10 78L30 72"
            stroke="#fff6d9"
            strokeWidth="3"
          />
        </g>
      )}
    </g>
  );
}

function SceneMotion({ kind }: { kind: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        root
          .querySelectorAll<SVGElement>("[data-grow]")
          .forEach((el, i) =>
            gsap.from(el, {
              scaleY: 0.15,
              transformOrigin: "50% 100%",
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: `top ${85 - i * 7}%`,
                end: "center center",
                scrub: 1,
              },
            }),
          );
        root.querySelectorAll<SVGPathElement>("[data-ink]").forEach((el) => {
          const len = el.getTotalLength();
          gsap.fromTo(
            el,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 75%",
                end: "bottom 85%",
                scrub: 1,
              },
            },
          );
        });
        root
          .querySelectorAll<HTMLElement>("[data-float]")
          .forEach((el, i) =>
            gsap.fromTo(
              el,
              { y: 35, rotate: i % 2 ? -7 : 7 },
              {
                y: -25,
                rotate: i % 2 ? 4 : -4,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            ),
          );
        if (kind === "cca")
          root
            .querySelectorAll<HTMLElement>("[data-curtain]")
            .forEach((el, i) =>
              gsap.to(el, {
                xPercent: i ? 100 : -100,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top 70%",
                  end: "top 5%",
                  scrub: 1,
                },
              }),
            );
        if (kind === "isc")
          gsap.fromTo(
            root.querySelector("[data-plane]"),
            { xPercent: -20, yPercent: 30, rotate: -20 },
            {
              xPercent: 20,
              yPercent: -30,
              rotate: 10,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
      },
      root,
    );
    mm.add(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
      () => {
        if (kind === "high") {
          const track = root.querySelector("[data-project-track]");
          if (track)
            gsap.to(track, {
              x: () =>
                -Math.max(
                  0,
                  (track as HTMLElement).scrollWidth - root.clientWidth + 100,
                ),
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 90px",
                end: "+=110%",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
        }
      },
      root,
    );
    return () => mm.revert();
  }, [kind]);
  return <span hidden ref={ref} />;
}

export function GardenScene() {
  const [selected, setSelected] = useState(0);
  const notes = [
    ["Notice", "Look closely. A leaf has a shape, a texture and a story."],
    [
      "Imagine",
      "What might live in a garden you invent? There is no single right answer.",
    ],
    [
      "Create",
      "Draw it, build it or tell its story. Thinking becomes something you can share.",
    ],
  ];
  return (
    <section
      className={`${s.scene} ${s.garden}`}
      aria-label="A garden of little discoveries"
    >
      <SceneMotion kind="garden" />
      <div className={s.heading}>
        <small>SMALL HANDS / BIG DISCOVERIES</small>
        <h2>
          A little wonder.
          <br />A whole world growing.
        </h2>
      </div>
      <div className={s.gardenSpread}>
        <svg viewBox="0 0 900 480" aria-hidden="true">
          <path
            d="M30 430Q450 380 870 430"
            fill="none"
            stroke="#809568"
            strokeWidth="2"
          />
          <path
            d="M110 402V165L390 35L650 165V410M110 165H650M390 35V410M250 100V410M530 100V410"
            fill="none"
            stroke="#9ba98d"
            strokeWidth="3"
          />
          {[190, 360, 565].map((x, i) => (
            <g key={x} data-grow>
              <path
                d={`M${x} 405v-${140 + i * 30}`}
                stroke="#356448"
                strokeWidth="7"
              />
              <path
                d={`M${x} 360q-100 -5 -70 -90q80 10 70 90M${x} 320q100 -5 70 -80q-80 10 -70 80`}
                fill={i % 2 ? "#93a66c" : "#668a64"}
              />
              <circle
                cx={x}
                cy={250 - i * 30}
                r="32"
                fill={i % 2 ? "#ddad62" : "#c88261"}
              />
            </g>
          ))}
          <Child x={730} y={240} shirt="#dfb658" pose="reach" />
          <Child x={85} y={290} shirt="#8eaaae" scale={0.75} />
          <g data-float>
            <path
              d="M740 90q45 -50 80 -10q-20 30 -80 10q40 35 65 10"
              fill="#e0ad73"
            />
            <path d="M745 80l-15 -10" stroke="#7e6747" strokeWidth="2" />
          </g>
        </svg>
        <div className={s.note}>
          <small>TRY A NEW WAY OF SEEING</small>
          <div className={s.tabs}>
            {notes.map((n, i) => (
              <button
                key={n[0]}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {n[0]}
              </button>
            ))}
          </div>
          <p aria-live="polite">{notes[selected][1]}</p>
          <span className={s.handwritten}>Every discovery counts.</span>
        </div>
      </div>
    </section>
  );
}

export function StoryScene() {
  const [page, setPage] = useState(0);
  const pages = [["01", "A story begins with noticing.", "Find a shape in the world around you. Could it become a character?", "NOTICE"], ["02", "One idea. Many subjects.", "Count its sides, describe its colour, imagine its home. Numbers, language and creativity belong together.", "CONNECT"], ["03", "Your voice makes it yours.", "Tell someone your story. Ask what they noticed. Learning grows when we share it.", "SHARE"]];
  const spreadRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const art=artRef.current; if(!art)return;
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    art.querySelectorAll<SVGGElement>("[data-scene]").forEach((el,i)=>{gsap.killTweensOf(el);el.style.visibility=i===page?"visible":"hidden";el.style.opacity=i===page?"1":"0";gsap.set(el,{clearProps:"transform"});});
    if(reduce)return;
    const active=art.querySelector<SVGGElement>(`[data-scene="${page}"]`);
    if(active)gsap.fromTo(active,{opacity:0,y:10},{opacity:1,y:0,duration:.55,ease:"power2.out",clearProps:"transform,opacity"});
  },[page]);
  useEffect(() => {
    const spread = spreadRef.current;
    if (!spread || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (event: PointerEvent) => { const box = spread.getBoundingClientRect(); const x = (event.clientX-box.left)/box.width-.5, y=(event.clientY-box.top)/box.height-.5; spread.querySelectorAll<SVGElement>("[data-cursor-float]").forEach((el,i)=>gsap.to(el,{x:x*(i+1)*7,y:y*(i+1)*6,duration:.8,ease:"power2.out",overwrite:true})); };
    const reset=()=>spread.querySelectorAll<SVGElement>("[data-cursor-float]").forEach(el=>gsap.to(el,{x:0,y:0,duration:.8,ease:"power2.out"}));
    spread.addEventListener("pointermove",move); spread.addEventListener("pointerleave",reset);
    return()=>{spread.removeEventListener("pointermove",move);spread.removeEventListener("pointerleave",reset);};
  }, []);
  return <section className={`${s.scene} ${s.story}`}><SceneMotion kind="story"/><div className={s.heading}><small>THE LEARNING SCRAPBOOK</small><h2>Ordinary moments.<br/>Extraordinary connections.</h2></div><div className={s.openBook} ref={spreadRef}><div className={s.bookIllustration}><div className={s.storyArtwork} ref={artRef}><svg className={s.storySvg} viewBox="0 0 430 380" aria-hidden="true"><circle cx="220" cy="170" r="145" fill="#dbe2cc"/><path d="M55 310H375" stroke="#8c9d7a" strokeWidth="2"/>
  <g data-scene="0" style={{visibility:"visible"}}><g data-piece><Child x={205} y={155} scale={.9} pose="reach" shirt="#dfb658"/></g><g data-piece><path d="M260 100C290 80 315 105 300 125C286 143 267 132 278 118" fill="none" stroke="#b48847" strokeWidth="3"/><path d="M278 113L291 105L300 120L285 128Z" fill="#8eaa7a"/></g><g data-piece><circle cx="290" cy="100" r="30" fill="none" stroke="#91a9b0" strokeWidth="4"/><path d="M311 122L332 143" stroke="#91a9b0" strokeWidth="7" strokeLinecap="round"/></g></g>
  <g data-scene="1" style={{visibility:"hidden"}}><g data-piece><Child x={145} y={150} scale={.85} pose="reach" shirt="#8eaaae"/></g><g data-piece><Child x={285} y={150} scale={.85} pose="wave" shirt="#dfb658"/></g><g data-piece><path d="M190 220Q215 194 240 220" fill="none" stroke="#b48847" strokeWidth="4" strokeDasharray="5 7"/><path d="M190 80L220 55L250 80L220 105Z" fill="#fff8e8" stroke="#b48847" strokeWidth="3"/><circle cx="220" cy="80" r="7" fill="#d3b65d"/></g></g>
  <g data-scene="2" style={{visibility:"hidden"}}><g data-piece><Child x={135} y={165} scale={.78} pose="read" shirt="#8eaaae"/></g><g data-piece><Child x={300} y={165} scale={.78} pose="wave" shirt="#dfb658"/></g><g data-piece><path d="M178 143L220 155L262 143V205L220 218L178 205Z" fill="#e7c66c" stroke="#a8823f" strokeWidth="2"/><path d="M220 155V218M190 155L210 161M230 161L250 155" stroke="#fff6d9" strokeWidth="3"/></g><g data-piece><path d="M145 105Q166 83 187 105V130H145ZM187 105Q208 83 229 105V130H187Z" fill="#fff8e8" stroke="#b48847" strokeWidth="3"/><path d="M158 111H176M198 111H216" stroke="#8eaaae" strokeWidth="3"/></g></g>
  <g data-cursor-float><path d="M55 80L85 30L115 80Z" fill="#c58b62" data-cursor-float/><rect x="325" y="90" width="48" height="48" rx="7" fill="#91a9b0" data-cursor-float/><circle cx="80" cy="230" r="23" fill="#d3b65d" data-cursor-float/></g></svg></div><span>{["Curiosity starts with a closer look.","Ideas take shape when we connect them.","A story shared brings us closer."][page]}</span></div><div className={s.bookPage} key={page}><small>FIELD NOTE / {pages[page][0]}</small><h3>{pages[page][1]}</h3><p>{pages[page][2]}</p><span className={s.pageWord}>{pages[page][3]}</span></div></div><div className={s.bookControls}><span>Turn a page</span>{pages.map((p,i)=><button key={p[0]} aria-label={`Read field note ${i+1}`} aria-pressed={page===i} onClick={()=>setPage(i)}>{p[0]}</button>)}</div></section>;
}

export function BalanceScene() {
  const [weight, setWeight] = useState(1);
  const balanced = weight === 3;
  return (
    <section className={`${s.scene} ${s.balance}`}>
      <SceneMotion kind="balance" />
      <div className={s.labHeader}>
        <div>
          <small>EXPERIMENT 02 / THE BALANCE LAB</small>
          <h2>
            Understanding
            <br />
            has a tipping point.
          </h2>
        </div>
        <p>
          Make a prediction. Change one thing. Notice what happens. Try
          balancing equal arms with equal weights.
        </p>
      </div>
      <div className={s.experiment}>
        <div className={s.balanceArt}>
          <svg
            viewBox="0 0 660 380"
            role="img"
            aria-label={`Balance experiment: left side 3 blocks, right side ${weight} blocks. ${balanced ? "Balanced" : "Not balanced"}.`}
          >
            <path d="M280 330L330 160L380 330Z" fill="#c1a778" />
            <path
              d="M225 335H435"
              stroke="#244c42"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <g
              className={s.beam}
              style={{ transform: `rotate(${(weight - 3) * 5}deg)` }}
            >
              <path
                d="M100 150H560"
                stroke="#244c42"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M115 150V240M545 150V240"
                stroke="#244c42"
                strokeWidth="2"
              />
              <path
                d="M50 240H180M480 240H610"
                stroke="#244c42"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={70 + i * 31}
                  y="206"
                  width="29"
                  height="29"
                  rx="4"
                  fill="#b97c59"
                />
              ))}
              {Array.from({ length: weight }, (_, i) => (
                <rect
                  key={i}
                  x={487 + (i % 4) * 30}
                  y={206 - Math.floor(i / 4) * 31}
                  width="27"
                  height="27"
                  rx="4"
                  fill="#5d8d86"
                />
              ))}
            </g>
            <circle cx="330" cy="150" r="12" fill="#d4b257" />
            <text x="72" y="300" fill="#284b3d" fontSize="17">
              3 equal blocks
            </text>
            <text x="490" y="300" fill="#284b3d" fontSize="17">
              {weight} equal blocks
            </text>
          </svg>
        </div>
        <div className={s.labControls}>
          <small>YOUR TURN</small>
          <label htmlFor="balance-weight">
            Blocks on the right: <b>{weight}</b>
          </label>
          <input
            id="balance-weight"
            type="range"
            min="1"
            max="5"
            step="1"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <p aria-live="polite">
            {balanced
              ? "In balance! Equal weights at equal distances produce equal turning effects."
              : "Not quite level. Both arms are the same length. What needs to match?"}
          </p>
          <small>A SIMPLIFIED MODEL / EXPLORE, THEN EXPLAIN</small>
        </div>
      </div>
    </section>
  );
}

export function ProjectScene() {
  return (
    <section className={`${s.scene} ${s.projects}`}>
      <SceneMotion kind="high" />
      <div className={s.heading}>
        <small>THE APPLICATION STUDIO</small>
        <h2>
          Take an idea
          <br />
          beyond the textbook.
        </h2>
        <p className={s.scrollHint}>
          Scroll through the thinking process &rarr;
        </p>
      </div>
      <div className={s.projectTrack} data-project-track>
        {[
          [
            "01",
            "Observe",
            "Start with a question worth asking.",
            "Look for a pattern, a problem or something you want to understand.",
          ],
          [
            "02",
            "Prototype",
            "Make your thinking visible.",
            "A model, a programme or a laboratory investigation can put an idea to the test.",
          ],
          [
            "03",
            "Reflect",
            "Let the evidence change your mind.",
            "Explain what happened, improve your approach and share what you learned.",
          ],
        ].map((x, i) => (
          <article key={x[0]} className={s.projectCard}>
            <small>WORK IN PROGRESS / {x[0]}</small>
            <svg viewBox="0 0 390 230" aria-hidden="true">
              {i === 0 ? (
                <>
                  <circle
                    cx="170"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#dabd75"
                    strokeWidth="3"
                  />
                  <path
                    d="M216 147L285 210"
                    stroke="#dabd75"
                    strokeWidth="17"
                    strokeLinecap="round"
                  />
                  <path
                    data-ink
                    d="M120 110L150 80L180 120L215 60"
                    fill="none"
                    stroke="#94b8a7"
                    strokeWidth="4"
                  />
                </>
              ) : i === 1 ? (
                <>
                  <path
                    d="M90 160L190 210L300 150V65L195 20L90 75Z M90 75L190 125L300 65M190 125V210M195 20V100"
                    stroke="#dabd75"
                    fill="none"
                    strokeWidth="2"
                  />
                  <circle cx="190" cy="125" r="12" fill="#b2c7a8" />
                </>
              ) : (
                <>
                  <Child x={190} y={75} shirt="#8da9a3" scale={0.8} />
                  <path
                    data-ink
                    d="M40 75Q70 25 105 65M285 100L310 125L350 65"
                    stroke="#dabd75"
                    fill="none"
                    strokeWidth="4"
                  />
                </>
              )}
            </svg>
            <h3>{x[1]}</h3>
            <strong>{x[2]}</strong>
            <p>{x[3]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BelongingScene() {
  const [active, setActive] = useState(0);
  const words = [
    [
      "Confidence",
      "Small steps deserve to be noticed. Individual attention gives children room to try, participate and grow.",
    ],
    [
      "Connection",
      "Dance, games, music and school celebrations create shared experiences and friendships.",
    ],
    [
      "Care",
      "Educators and families work together through guidance, assessment and ongoing conversations.",
    ],
  ];
  return (
    <section className={`${s.scene} ${s.belonging}`}>
      <SceneMotion kind="belonging" />
      <div className={s.communityArt}>
        <svg viewBox="0 0 650 480" aria-hidden="true">
          <path
            data-ink
            d="M100 350C-15 110 180 15 325 140C490 -10 690 180 550 350C410 475 235 475 100 350Z"
            fill="none"
            stroke="#b99470"
            strokeWidth="3"
          />
          <g data-float>
            <Child x={170} y={230} shirt="#9cad93" pose="wave" scale={0.85} />
          </g>
          <Child x={330} y={205} shirt="#d4b263" pose="reach" />
          <g data-float>
            <Child x={495} y={230} shirt="#b97f68" scale={0.85} />
          </g>
          <path d="M100 415H560" stroke="#b99470" strokeWidth="2" />
        </svg>
        <span className={s.handwritten}>There is room for you here.</span>
      </div>
      <div className={s.communityCopy}>
        <small>MORE THAN LEARNING TOGETHER</small>
        <h2>
          Growing a sense
          <br />
          of belonging.
        </h2>
        <div className={s.petals}>
          {words.map((w, i) => (
            <button
              key={w[0]}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {w[0]}
            </button>
          ))}
        </div>
        <p aria-live="polite">{words[active][1]}</p>
      </div>
    </section>
  );
}

export function StageScene() {
  const [mode, setMode] = useState(0);
  const names = ["Music", "Movement", "Expression"];
  return (
    <section className={`${s.scene} ${s.performance}`}>
      <SceneMotion kind="cca" />
      <div className={s.heading}>
        <small>THE MOMENT THE CURTAIN OPENS</small>
        <h2>
          A little courage.
          <br />A stage of your own.
        </h2>
      </div>
      <div className={s.theatre} data-mode={mode}>
        <div className={s.spotlight} />
        <svg viewBox="0 0 900 440" aria-hidden="true">
          <ellipse
            cx="450"
            cy="375"
            rx="290"
            ry="35"
            fill="#e8cf8b"
            opacity=".2"
          />
          <Child
            x={300}
            y={200}
            shirt="#b77c64"
            pose={mode === 1 ? "reach" : "wave"}
          />
          <Child
            x={470}
            y={185}
            shirt="#dfbc69"
            pose={mode === 2 ? "read" : "reach"}
          />
          <Child x={640} y={210} shirt="#8daea5" pose="wave" scale={0.9} />
          {mode === 0 ? (
            <g fill="#e4c77f" data-float>
              <text x="160" y="130" fontSize="65">
                â™ª
              </text>
              <text x="710" y="180" fontSize="55">
                â™«
              </text>
              <text x="530" y="80" fontSize="50">
                â™ª
              </text>
            </g>
          ) : mode === 1 ? (
            <g fill="none" stroke="#e4c77f" strokeWidth="3">
              <path d="M130 220Q60 110 190 70M730 250Q840 140 720 60" />
              <path d="M170 80L190 70L180 95" />
            </g>
          ) : (
            <g fill="#e4c77f">
              <path d="M140 90h140v60h-90l-25 22v-22h-25Z" />
              <path d="M660 60h130v60h-30v22l-30-22h-70Z" />
            </g>
          )}
        </svg>
        <div className={`${s.curtain} ${s.curtainLeft}`} data-curtain />
        <div className={`${s.curtain} ${s.curtainRight}`} data-curtain />
      </div>
      <div className={s.stageControls}>
        <span>Set the scene</span>
        {names.map((n, i) => (
          <button key={n} aria-pressed={mode === i} onClick={() => setMode(i)}>
            {n}
          </button>
        ))}
      </div>
      <p className={s.stageCaption} aria-live="polite">
        {
          [
            "Listening, practising and finding harmony together.",
            "Confidence grows when we give it room to move.",
            "Every voice has a story worth sharing.",
          ][mode]
        }
      </p>
    </section>
  );
}

export function FlightScene() {
  return (
    <section className={`${s.scene} ${s.flight}`}>
      <SceneMotion kind="isc" />
      <div className={s.heading}>
        <small>BEYOND THE EXAMINATION</small>
        <h2>
          Your next chapter
          <br />
          is still unwritten.
        </h2>
      </div>
      <div className={s.flightMap}>
        <svg viewBox="0 0 1000 360" aria-hidden="true">
          <path
            data-ink
            d="M70 270C220 30 360 340 470 180S690 20 920 120"
            stroke="#c9a65c"
            strokeWidth="3"
            fill="none"
          />
          <g data-plane transform="translate(470 125)">
            <path d="M0 30L150 -30L85 90L60 50Z" fill="#e9ddbb" />
            <path
              d="M0 30L60 50L150 -30M60 50L58 82L85 90"
              fill="none"
              stroke="#9e8a5c"
              strokeWidth="2"
            />
          </g>
          <circle cx="70" cy="270" r="8" fill="#b5c5ad" />
          <circle cx="920" cy="120" r="8" fill="#c9a65c" />
        </svg>
        <div className={s.flightNotes}>
          {[
            [
              "Know yourself",
              "Notice the subjects and questions that hold your attention.",
            ],
            [
              "Explore possibilities",
              "Connect subject choices with further-study pathways.",
            ],
            [
              "Talk it through",
              "Bring your questions to the senior-school team.",
            ],
          ].map((x, i) => (
            <article key={x[0]} data-float>
              <small>0{i + 1} / NEXT STEPS</small>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducatorScene() {
  const [word, setWord] = useState(0);
  const words = ["curiosity", "confidence", "possibility"];
  return (
    <section className={`${s.scene} ${s.educator}`}>
      <SceneMotion kind="careers" />
      <div className={s.chalkboard}>
        <small>A CLASSROOM CHANGES WITH YOU</small>
        <h2>
          Today, we are
          <br />
          making room for
          <br />
          <em key={word}>{words[word]}.</em>
        </h2>
        <svg viewBox="0 0 500 120" aria-hidden="true">
          <path
            data-ink
            d="M20 80Q190 20 450 60M320 20L450 60L350 100"
            stroke="#e6cf8a"
            strokeWidth="3"
            fill="none"
          />
        </svg>
        <div className={s.chalkTray}>
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className={s.educatorDesk}>
        <svg viewBox="0 0 390 360" aria-hidden="true">
          <path d="M20 315H365" stroke="#b99c70" strokeWidth="3" />
          <Child x={105} y={165} scale={0.85} shirt="#94a99b" />
          <Child x={280} y={140} shirt="#c28a69" pose="wave" />
          <path d="M40 255H340V275H40Z" fill="#bd9f72" />
          <path d="M65 275V345M315 275V345" stroke="#826b4b" strokeWidth="10" />
        </svg>
        <div>
          <small>WHAT WILL YOU HELP A CHILD DISCOVER?</small>
          <div className={s.tabs}>
            {words.map((x, i) => (
              <button
                key={x}
                aria-pressed={word === i}
                onClick={() => setWord(i)}
              >
                {x}
              </button>
            ))}
          </div>
          <p>
            Subject expertise matters. So does the encouragement that helps a
            learner try again.
          </p>
        </div>
      </div>
    </section>
  );
}



