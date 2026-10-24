"use client";
import { useState, type FormEvent } from "react";
import s from "./Programs.module.css";

export default function CareerEnquiry() {
  const [channel, setChannel] = useState("whatsapp");
  const [prepared, setPrepared] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Career enquiry - Niraj Public School\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nArea of interest: ${data.get("role")}\nQualifications: ${data.get("qualification")}\nExperience: ${data.get("experience")}\n\n${data.get("message") || "I would like to enquire about teaching opportunities."}\n\nI will attach my resume before sending.`;
    const url =
      channel === "whatsapp"
        ? `https://wa.me/919347407101?text=${encodeURIComponent(message)}`
        : `mailto:hrm@nirajpublicschool.com,career@nirajpublicschool.com?subject=${encodeURIComponent("Career enquiry - " + data.get("name"))}&body=${encodeURIComponent(message)}`;
    setPrepared(url);
  }
  return (
    <div className={s.tool}>
      <span className={s.eyebrow}>START A CONVERSATION</span>
      <h3>Tell us what you bring.</h3>
      <p>
        Your details stay in this page until you open WhatsApp or your email
        app. Review the message, attach your resume and send it to our team.
      </p>
      <form
        className={s.form}
        onSubmit={submit}
        onChange={() => setPrepared("")}
        style={{ marginTop: 30 }}
      >
        <label>
          Full name
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            minLength={8}
            maxLength={25}
          />
        </label>
        <label>
          Area of interest
          <select name="role" required defaultValue="">
            <option value="" disabled>
              Select an area
            </option>
            <option>Pre-Primary</option>
            <option>Primary (I–V)</option>
            <option>High School (VI–X)</option>
            <option>Extra-curricular</option>
          </select>
        </label>
        <label>
          Qualifications
          <input
            name="qualification"
            placeholder="e.g. B.Ed, subject specialisation"
            required
            maxLength={200}
          />
        </label>
        <label>
          Teaching experience
          <input
            name="experience"
            placeholder="e.g. 3 years, ICSE English"
            required
            maxLength={150}
          />
        </label>
        <label className={s.wide}>
          A short introduction
          <textarea
            name="message"
            maxLength={1200}
            placeholder="Your subject, interests and what you would like us to know."
          />
        </label>
        <label className={s.wide}>
          How would you like to send your enquiry?
          <select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </label>
        <div className={`${s.formActions} ${s.wide}`}>
          <button className={`${s.button} ${s.solid}`} type="submit">
            Prepare my enquiry ↗
          </button>
        </div>
      </form>
      {prepared && (
        <div className={s.answer} style={{ marginTop: 25 }} role="status">
          <strong>Your draft is ready.</strong>
          <p>
            Nothing has been sent yet. Continue to{" "}
            {channel === "whatsapp" ? "WhatsApp" : "your email app"}, attach
            your resume and send when ready.
          </p>
          <a
            className={s.button}
            href={prepared}
            target={channel === "whatsapp" ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{ marginTop: 20 }}
          >
            Open {channel === "whatsapp" ? "WhatsApp" : "email draft"} ↗
          </a>
        </div>
      )}
    </div>
  );
}
