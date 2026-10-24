import {VisionGarden,SchoolStoryMotion} from "@/components/pages/shared/SchoolStories";
import type { Metadata } from "next";
import Hero from "@/components/pages/NpsVision/Hero";
import CommitmentsSection from "@/components/pages/NpsVision/CommitmentsSection";
import InfoBand from "@/components/pages/shared/InfoBand";
import { npsVisionContent } from "@/content/pages/npsVision";
import { infoBandContent } from "@/content/pages/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NPS Vision",
  description:
    "Seven commitments that guide Niraj Public School — eco-friendly quality education, continual improvement, compliance and transparency.",
});

export default function NpsVisionPage() {
  const c = npsVisionContent;
  const orbitIcons = c.commitments.items.map((item) => item.icon);

  return (
    <main>
      <SchoolStoryMotion />
      <Hero
        breadcrumb={c.breadcrumb}
        headline={c.hero.headline}
        tagline={c.hero.tagline}
        centerIcon={c.hero.centerIcon}
        orbitIcons={orbitIcons}
        labels={[
          "Sustainable Learning",
          "Conserving Resources",
          "Culture of Care",
          "Ethical Practices",
          "Community Impact",
          "Holistic Development",
          "Open Communication",
        ]}
        image="/NPS%20Vision%20Page/first-section-side-image.png"
      />
      <CommitmentsSection content={c.commitments} />
      <VisionGarden />
      <InfoBand content={infoBandContent} />
    </main>
  );
}
