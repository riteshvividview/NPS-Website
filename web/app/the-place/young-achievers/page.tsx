import PageJourney from "@/components/pages/shared/PageJourney";
import type { Metadata } from "next";
import Hero from "@/components/pages/YoungAchievers/Hero";
import AchieversGrid from "@/components/pages/YoungAchievers/AchieversGrid";
import InfoBand from "@/components/pages/shared/InfoBand";
import { youngAchieversContent } from "@/content/pages/youngAchievers";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Young Achievers",
  description:
    "Writers, sportspeople, musicians and scholars — the Niraj Public School students making the school proud this year.",
});

export default function YoungAchieversPage() {
  const c = youngAchieversContent;

  return (
    <main>
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} />
      <AchieversGrid filters={c.filters} achievers={c.achievers} />
      <PageJourney current={2} />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
