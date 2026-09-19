export type FeatureIconKey = "people" | "heart" | "lightbulb";

export interface Portrait {
  image: string;
  alt: string;
  captionLine1: string;
  captionLine2: string;
  underline: boolean;
}

export interface OurPeopleContent {
  navRight: string;
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  subcopy: string;
  features: { icon: FeatureIconKey; label: string }[];
  noteLeft: string;
  scriptNote: string;
  quoteLine1: string;
  quoteLine2: string;
  quoteLine3: string;
  portraits: Portrait[];
}

export const ourPeopleContent: OurPeopleContent = {
  navRight: "People · Purpose · Progress",
  eyebrow: "Our People",
  headlineLead: "Guided by Experience.",
  headlineAccent: "Driven by Purpose.",
  subcopy:
    "Our faculty and leadership bring together experience, compassion and a shared vision for a brighter tomorrow.",
  features: [
    { icon: "people", label: "Experienced Educators" },
    { icon: "heart", label: "Student First Approach" },
    { icon: "lightbulb", label: "Lifelong Mentors" },
  ],
  noteLeft: "People Who Make Possibilities",
  scriptNote: "Values in Action",
  quoteLine1: "Better People",
  quoteLine2: "Build Brighter",
  quoteLine3: "Futures.",
  portraits: [
    {
      image: "/our-people-section/portrait-1.png",
      alt: "School founder / director portrait",
      captionLine1: "Vision",
      captionLine2: "For Generations",
      underline: true,
    },
    {
      image: "/our-people-section/portrait-2.png",
      alt: "Principal portrait",
      captionLine1: "Leadership",
      captionLine2: "With Empathy",
      underline: false,
    },
    {
      image: "/our-people-section/portrait-3.png",
      alt: "Vice principal portrait",
      captionLine1: "Progress",
      captionLine2: "Through Education",
      underline: true,
    },
    {
      image: "/our-people-section/portrait-4.png",
      alt: "Academic coordinator portrait",
      captionLine1: "Commitment",
      captionLine2: "To Brighter Tomorrows",
      underline: false,
    },
  ],
};
