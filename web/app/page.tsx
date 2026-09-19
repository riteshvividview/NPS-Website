import type { Metadata } from "next";
import Hero from "@/components/home/Hero/Hero";
import Section2 from "@/components/home/Section2/Section2";
import Section3 from "@/components/home/Section3/Section3";
import TeachingMethodology from "@/components/home/TeachingMethodology/TeachingMethodology";
import WhyUs from "@/components/home/WhyUs/WhyUs";
import BeyondClassroom from "@/components/home/BeyondClassroom/BeyondClassroom";
import OurPeople from "@/components/home/OurPeople/OurPeople";
import LifeAtNiraj from "@/components/home/LifeAtNiraj/LifeAtNiraj";
import HomeAnimationsRunner from "@/components/home/HomeAnimationsRunner";
import HomeFxRunner from "@/components/home/fx/HomeFxRunner";
import { homeContent } from "@/content/home";
import { teachingMethodologyContent } from "@/content/teachingMethodology";
import { whyUsContent } from "@/content/whyUs";
import { beyondClassroomContent } from "@/content/beyondClassroom";
import { ourPeopleContent } from "@/content/ourPeople";
import { lifeAtNirajContent } from "@/content/lifeAtNiraj";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description:
    "A kinder, brighter tomorrow — Niraj Public School nurtures curious minds, compassionate hearts and confident leaders.",
});

export default function Home() {
  return (
    <>
      <main>
        <Hero content={homeContent.hero} />
        <Section2 content={homeContent.section2} />
        <TeachingMethodology content={teachingMethodologyContent} />
        <Section3 content={homeContent.section3} />
        <WhyUs content={whyUsContent} />
        <BeyondClassroom content={beyondClassroomContent} />
        <OurPeople content={ourPeopleContent} />
        <LifeAtNiraj content={lifeAtNirajContent} />
      </main>
      <HomeAnimationsRunner />
      <HomeFxRunner />
    </>
  );
}
