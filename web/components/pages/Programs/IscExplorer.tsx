"use client";
import { useState } from "react";
import s from "./Programs.module.css";
const pathways = [
  {
    name: "Engineering & physical sciences",
    subjects: "Mathematics · Physics · Chemistry",
    detail: "A foundation for engineering, physical sciences and research.",
  },
  {
    name: "Medicine & life sciences",
    subjects: "Biology · Physics · Chemistry",
    detail:
      "Explore further study in medicine, life sciences, biotechnology and pharmacy.",
  },
  {
    name: "Finance & accountancy",
    subjects: "Commerce · Economics · Accounts",
    detail: "Build foundations for finance, accounting and business.",
  },
  {
    name: "Business & entrepreneurship",
    subjects: "Business Studies · Economics · Commerce",
    detail:
      "Connect enterprise with business management, finance and economics.",
  },
  {
    name: "Economics & analytics",
    subjects: "Mathematics · Economics · Commerce",
    detail: "Explore pathways in actuarial studies, economics and finance.",
  },
  {
    name: "Public life & strategy",
    subjects: "Business Studies · Commerce · Political Science",
    detail: "Consider public administration, policy and corporate strategy.",
  },
];
export default function IscExplorer() {
  const [active, setActive] = useState(0);
  return (
    <div className={s.tool}>
      <small>START WITH AN INTEREST</small>
      <h3>Where could your subjects take you?</h3>
      <div className={s.choices}>
        {pathways.map((p, i) => (
          <button
            key={p.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className={s.answer} aria-live="polite">
        <small>ENGLISH IS COMPULSORY</small>
        <strong>{pathways[active].subjects}</strong>
        <p>{pathways[active].detail}</p>
        <p className={s.caption}>
          Illustrative study pathways, not admission guarantees. Confirm
          available combinations and higher-education eligibility with the
          school.
        </p>
      </div>
    </div>
  );
}
