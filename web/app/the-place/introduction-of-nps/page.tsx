import type { Metadata } from "next";
import Hero from "@/components/pages/IntroductionOfNps/Hero";
import {CampusMap,SchoolStoryMotion} from "@/components/pages/shared/SchoolStories";
import StorySection from "@/components/pages/IntroductionOfNps/StorySection";
import PillarsSection from "@/components/pages/IntroductionOfNps/PillarsSection";
import InfoBand from "@/components/pages/shared/InfoBand";
import { introductionOfNpsContent } from "@/content/pages/introductionOfNps";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Introduction of NPS",
  description:
    "Niraj Public School was established in 1986 with the objective of imparting education of the highest order — discover our story, approach and campus.",
});

export default function IntroductionOfNpsPage() {
  const c = introductionOfNpsContent;

  return (
    <main>
      <SchoolStoryMotion />
      <Hero content={c} />
      <StorySection content={c.story} />
      <PillarsSection content={c.pillars} />
      <CampusMap />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
