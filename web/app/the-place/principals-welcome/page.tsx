import {LetterReflection,SchoolStoryMotion} from "@/components/pages/shared/SchoolStories";
import type { Metadata } from "next";
import Hero from "@/components/pages/PrincipalsWelcome/Hero";
import LetterSection from "@/components/pages/PrincipalsWelcome/LetterSection";
import InfoBand, { type InfoBandContent } from "@/components/pages/shared/InfoBand";
import ReadingProgressBar from "@/components/pages/shared/ReadingProgressBar";
import { principalsWelcomeContent } from "@/content/pages/principalsWelcome";
import { buildMetadata } from "@/lib/seo";

const admissionsBandContent: InfoBandContent = {
  tagline: "",
  cards: [
    {
      key: "admissions",
      label: "Admissions",
      lines: ["Co-Ed | CBSE, Hyderabad", "Classes: Nursery to Grade 10 (2026–27)"],
    },
    {
      key: "visit",
      label: "Visit Our Campus",
      lines: ["6-3-864, Saadat Manzil,", "Ameerpet, Hyderabad, 500016"],
    },
    {
      key: "enquiries",
      label: "Speak to Our Team",
      lines: ["Enquiries on admissions, transfers", "& general queries."],
    },
  ],
};

export const metadata: Metadata = buildMetadata({
  title: "Principal's Welcome",
  description:
    "A message from our Principal, Mr. B. Jivitesh Reddy, to every young person who will one day call Niraj their own.",
});

export default function PrincipalsWelcomePage() {
  const c = principalsWelcomeContent;

  return (
    <main>
      <SchoolStoryMotion />
      <ReadingProgressBar />
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} />
      <LetterSection content={c.letter} />
      <LetterReflection />
      <InfoBand content={admissionsBandContent} backgroundImage="/Principals-welcome/Admission-Open-for-2026%E2%80%9327-section-bg.png" />
    </main>
  );
}
