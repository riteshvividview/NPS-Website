import PageJourney from "@/components/pages/shared/PageJourney";
import type { Metadata } from "next";
import Hero from "@/components/pages/NpsAchievements/Hero";
import AchievementsList from "@/components/pages/NpsAchievements/AchievementsList";
import InfoBand from "@/components/pages/shared/InfoBand";
import { npsAchievementsContent } from "@/content/pages/npsAchievements";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NPS Achievements",
  description: "Celebrating the Niraj Public School students who carried the school's colors onto the national stage.",
});

export default function NpsAchievementsPage() {
  const c = npsAchievementsContent;

  return (
    <main>
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} stats={c.hero.stats} />
      <AchievementsList eyebrow={c.listEyebrow} headline={c.listHeadline} achievements={c.achievements} />
      <PageJourney current={1} />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
