"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./Programs.module.css";

const discoveries = [
  [
    "Ask",
    "Start with a question",
    "Why do shadows move? A familiar observation can become a conversation, a drawing, a measurement and a story.",
  ],
  [
    "Make",
    "Think with your hands",
    "Build, sort, draw and experiment. Learning by doing helps children connect a new idea to something they can see and touch.",
  ],
  [
    "Share",
    "Discover together",
    "Explain an idea to a friend, listen to a different approach and solve something together. Communication is part of learning.",
  ],
  [
    "Reflect",
    "Notice your own growth",
    "What worked? What would you try next? Reflective teaching and carefully paced support help children become independent learners.",
  ],
];
export function DiscoveryWheel() {
  const [active, setActive] = useState(0);
  return (
    <div className={s.tool}>
      <small>A LITTLE WINDOW INTO OUR APPROACH</small>
      <h3>One question can open many doors.</h3>
      <div className={s.choices}>
        {discoveries.map((d, i) => (
          <button
            key={d[0]}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            {d[0]} ↗
          </button>
        ))}
      </div>
      <div className={s.answer} aria-live="polite">
        <strong>{discoveries[active][1]}</strong>
        <p>{discoveries[active][2]}</p>
      </div>
    </div>
  );
}
export function WonderSeed() {
  const [grown, setGrown] = useState(false);
  return (
    <div className={s.tool}>
      <div className={s.seed} data-grown={grown}>
        <span aria-hidden="true">{grown ? "✺" : "❋"}</span>
        <div>
          <small>TRY A LITTLE WONDER</small>
          <h3>
            {grown
              ? "A question is a beginning."
              : "What could a tiny seed become?"}
          </h3>
          <button
            className={s.button}
            onClick={() => setGrown(!grown)}
            aria-expanded={grown}
          >
            {grown ? "Plant another thought" : "Let it grow"} ↗
          </button>
        </div>
      </div>
      <p className={s.feedback} aria-live="polite">
        {grown
          ? "Try this together: find a leaf, notice its shape and count its lines. Can you draw a new plant from your imagination?"
          : "A simple invitation to notice, imagine and make. That is where learning begins."}
      </p>
    </div>
  );
}
export function LabChallenge() {
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <div className={s.tool}>
      <small>THE CURIOSITY LAB / A 20-SECOND CHALLENGE</small>
      <h3>A robot moves 2, 4, 8, 16 steps. What comes next?</h3>
      <p>Look for the rule, then test your prediction.</p>
      <div className={s.choices}>
        {[24, 32, 64].map((n) => (
          <button
            key={n}
            aria-pressed={answer === n}
            onClick={() => setAnswer(n)}
          >
            {n} steps
          </button>
        ))}
      </div>
      <div className={s.answer} aria-live="polite">
        <strong>
          {answer === null
            ? "Your hypothesis?"
            : answer === 32
              ? "Exactly. Each move doubles."
              : "Try another hypothesis."}
        </strong>
        <p>
          {answer === null
            ? "In this pattern, the same operation connects every pair of numbers."
            : answer === 32
              ? "2 × 2 = 4, then 8, 16 and 32. Finding a pattern, testing it and explaining it connects mathematics with computational thinking."
              : "Compare 2 with 4, and 4 with 8. What operation works both times?"}
        </p>
      </div>
    </div>
  );
}
export function SubjectPlanner() {
  const [group2, setGroup2] = useState("Science");
  const [group3, setGroup3] = useState("Robotics and AI");
  return (
    <div className={s.tool}>
      <small>EXPLORE THE ICSE SUBJECT STRUCTURE</small>
      <h3>Build a picture of your learning.</h3>
      <p>
        English, History, Civics &amp; Geography and a second language (Hindi or
        Telugu) form Group I. Mathematics is compulsory in Group II.
      </p>
      <h4>Group II · choose an option alongside Mathematics</h4>
      <div className={s.choices}>
        {["Science", "Economics"].map((x) => (
          <button
            key={x}
            aria-pressed={group2 === x}
            onClick={() => setGroup2(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <h4>Group III · choose one</h4>
      <div className={s.choices}>
        {["Home Science", "Environmental Applications", "Robotics and AI"].map(
          (x) => (
            <button
              key={x}
              aria-pressed={group3 === x}
              onClick={() => setGroup3(x)}
            >
              {x}
            </button>
          ),
        )}
      </div>
      <div className={s.answer} aria-live="polite">
        <strong>Your subject sketch</strong>
        <p>
          Group I core + Mathematics +{" "}
          {group2 === "Science" ? "Physics, Chemistry & Biology" : group2} +{" "}
          {group3}.
        </p>
        <p className={s.caption}>
          An exploration tool. Confirm subject selection with the school.
        </p>
      </div>
    </div>
  );
}
const activities = [
  [
    "Voice",
    "Stand up. Speak out.",
    "Debates, elocution, declamation, extempore, group discussions, MUN and public speaking nurture confidence and clear thinking.",
  ],
  [
    "Expression",
    "Make something only you can.",
    "Music, choir, dance, theatre, art and craft give ideas a place to become visible, audible and shared.",
  ],
  [
    "Movement",
    "Learn the spirit of the game.",
    "Sports, yoga, games and CISCE competitions build discipline, teamwork and sportsmanship. After-school basketball coaching extends practice beyond the timetable.",
  ],
  [
    "Purpose",
    "Take learning into the world.",
    "Field trips, community awareness, medical camps, workshops and festival celebrations connect curiosity with responsibility.",
  ],
];
export function ActivityMixer() {
  const [active, setActive] = useState(0);
  return (
    <div className={s.tool}>
      <small>CHOOSE YOUR CHANNEL</small>
      <h3>Where will you find your rhythm?</h3>
      <div className={s.choices}>
        {activities.map((x, i) => (
          <button
            key={x[0]}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            {x[0]}
          </button>
        ))}
      </div>
      <div className={s.answer} aria-live="polite">
        <strong>{activities[active][1]}</strong>
        <p>{activities[active][2]}</p>
      </div>
    </div>
  );
}

export function NextProgram({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className={s.nextLink}
      href={href}
      onNavigate={(e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent("nps:page-transition", { detail: { href } }),
        );
      }}
    >
      <small>KEEP EXPLORING</small>
      <strong>{label} ↗</strong>
    </Link>
  );
}
