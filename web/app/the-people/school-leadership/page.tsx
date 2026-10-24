import PageJourney from "@/components/pages/shared/PageJourney";
import type { Metadata } from "next";
import Hero from "@/components/pages/SchoolLeadership/Hero";
import LeaderExplorer from "@/components/pages/SchoolLeadership/LeaderExplorer";
import HodTeaser from "@/components/pages/SchoolLeadership/HodTeaser";
import InfoBand from "@/components/pages/shared/InfoBand";
import { schoolLeadershipContent } from "@/content/pages/schoolLeadership";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";
import pageTheme from "@/components/pages/SchoolLeadership/PageTheme.module.css";

export const metadata: Metadata = buildMetadata({
  title: "School Leadership",
  description:
    "Meet the six people steering Niraj Public School — from the Director's office to the pre-primary wing.",
});

export default function SchoolLeadershipPage() {
  const c = schoolLeadershipContent;

  return (
    <main className={pageTheme.page}>
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} />
      <LeaderExplorer eyebrow={c.listEyebrow} headline={c.listHeadline} intro={c.listIntro} leaders={c.leaders} />
      <HodTeaser headline={c.hodTeaser.headline} text={c.hodTeaser.text} />
      <PageJourney current={4} />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
