import {WritingDesk,SchoolStoryMotion} from "@/components/pages/shared/SchoolStories";
import PageJourney from "@/components/pages/shared/PageJourney";
import StorySpark from "@/components/pages/YoungAuthors/StorySpark";
import type { Metadata } from "next";
import Hero from "@/components/pages/YoungAuthors/Hero";
import Bookshelf from "@/components/pages/YoungAuthors/Bookshelf";
import InfoBand from "@/components/pages/shared/InfoBand";
import { youngAuthorsContent } from "@/content/pages/youngAuthors";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Young Authors",
  description: "Every book on this shelf was written, start to finish, by a Niraj Public School student.",
});

export default function YoungAuthorsPage() {
  const c = youngAuthorsContent;

  return (
    <main>
      <SchoolStoryMotion />
      <Hero breadcrumb={c.breadcrumb} eyebrow={c.hero.eyebrow} headline={c.hero.headline} tagline={c.hero.tagline} stats={c.hero.stats} />
      <Bookshelf listEyebrow={c.listEyebrow} listHeadline={c.listHeadline} listIntro={c.listIntro} shelves={c.shelves} />
      <StorySpark />
      <PageJourney current={3} />
      <WritingDesk />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
