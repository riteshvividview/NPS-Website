import PageJourney from "@/components/pages/shared/PageJourney";
import type { Metadata } from "next";
import Hero from "@/components/pages/NesBoardMembers/Hero";
import BoardChart from "@/components/pages/NesBoardMembers/BoardChart";
import InfoBand from "@/components/pages/shared/InfoBand";
import { nesBoardMembersContent } from "@/content/pages/nesBoardMembers";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";
import pageTheme from "@/components/pages/NesBoardMembers/PageTheme.module.css";

export const metadata: Metadata = buildMetadata({
  title: "NES Board Members",
  description: "The Niraj Educational Society's governing board — the people who steward Niraj Public School.",
});

export default function NesBoardMembersPage() {
  const c = nesBoardMembersContent;

  return (
    <main className={pageTheme.page}>
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} stats={c.hero.stats} />
      <BoardChart eyebrow={c.chartEyebrow} headline={c.chartHeadline} intro={c.chartIntro} tiers={c.tiers} />
      <PageJourney current={6} />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
