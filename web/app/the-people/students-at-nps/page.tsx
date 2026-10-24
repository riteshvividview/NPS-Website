import PageJourney from "@/components/pages/shared/PageJourney";
import type { Metadata } from "next";
import Hero from "@/components/pages/StudentsAtNps/Hero";
import ResultsArchive from "@/components/pages/StudentsAtNps/ResultsArchive";
import StudentSpotlights from "@/components/pages/StudentsAtNps/StudentSpotlights";
import InfoBand from "@/components/pages/shared/InfoBand";
import { studentsAtNpsContent } from "@/content/pages/studentsAtNps";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";
import pageTheme from "@/components/pages/StudentsAtNps/PageTheme.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Students at NPS",
  description:
    "Eleven years of ICSE results from Niraj Public School — toppers, pass rates, and the students whose work reached beyond the classroom.",
});

export default function StudentsAtNpsPage() {
  const c = studentsAtNpsContent;

  return (
    <main className={pageTheme.page}>
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} stats={c.hero.stats} />
      <ResultsArchive eyebrow={c.archiveEyebrow} headline={c.archiveHeadline} intro={c.archiveIntro} years={c.years} />
      <StudentSpotlights
        eyebrow={c.spotlightEyebrow}
        headline={c.spotlightHeadline}
        intro={c.spotlightIntro}
        spotlights={c.spotlights}
      />
      <PageJourney current={5} />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
