import PageJourney from "@/components/pages/shared/PageJourney";
import type { Metadata } from "next";
import Hero from "@/components/pages/NpsVisitors/Hero";
import VisitorTimeline from "@/components/pages/NpsVisitors/VisitorTimeline";
import ScrollBgRunner from "@/components/pages/NpsVisitors/ScrollBgRunner";
import InfoBand from "@/components/pages/shared/InfoBand";
import { npsVisitorsContent } from "@/content/pages/npsVisitors";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";
import pageTheme from "@/components/pages/NpsVisitors/PageTheme.module.css";

export const metadata: Metadata = buildMetadata({
  title: "NPS Visitors",
  description:
    "Twenty years of distinguished guests in the Niraj Public School guest book — cricketers, actors, civil servants, and educators.",
});

export default function NpsVisitorsPage() {
  const c = npsVisitorsContent;

  return (
    <main className={pageTheme.page} id="nps-visitors-main">
      <ScrollBgRunner />
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} stats={c.hero.stats} />
      <VisitorTimeline
        eyebrow={c.timelineEyebrow}
        headline={c.timelineHeadline}
        intro={c.timelineIntro}
        categories={c.categories}
        eras={c.eras}
      />
      <PageJourney current={7} />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
