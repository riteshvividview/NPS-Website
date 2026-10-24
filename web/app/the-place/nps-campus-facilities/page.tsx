import PageJourney from "@/components/pages/shared/PageJourney";
import type { Metadata } from "next";
import Hero from "@/components/pages/NpsCampusFacilities/Hero";
import FacilitiesGrid from "@/components/pages/NpsCampusFacilities/FacilitiesGrid";
import InfoBand from "@/components/pages/shared/InfoBand";
import { npsCampusFacilitiesContent } from "@/content/pages/npsCampusFacilities";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NPS Campus Facilities",
  description:
    "Seven everyday spaces where Niraj Public School students learn, play, build and grow — lunch, classrooms, sports, excursions, library, labs and carpentry.",
});

export default function NpsCampusFacilitiesPage() {
  const c = npsCampusFacilitiesContent;

  return (
    <main>
      <Hero
        breadcrumb={c.breadcrumb}
        eyebrow={c.hero.eyebrow}
        headline={c.hero.headline}
        tagline={c.hero.tagline}
        facilities={c.facilities.items}
      />
      <FacilitiesGrid content={c.facilities} />
      <PageJourney current={0} />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
