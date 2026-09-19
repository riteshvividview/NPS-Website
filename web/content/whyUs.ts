export type ReasonIconKey = "trophy" | "people" | "cap" | "shield" | "chart";

export interface WhyUsReason {
  index: string;
  icon: ReasonIconKey;
  title: string;
  description: string;
}

export interface WhyUsContent {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  statValue: string;
  statLabel: string;
  tagline: string;
  reasons: WhyUsReason[];
}

export const whyUsContent: WhyUsContent = {
  eyebrow: "About Us — Why Us?",
  headlineLead: "Trusted by families for over four",
  headlineAccent: "decades.",
  statValue: "40+",
  statLabel: "Years of Trusted Excellence",
  tagline: "LEARN / GROW / BELONG",
  reasons: [
    {
      index: "01",
      icon: "trophy",
      title: "Four Decades of Legacy",
      description: "A strong foundation built on trust, values and impact.",
    },
    {
      index: "02",
      icon: "people",
      title: "Every Child, Truly Known",
      description: "Personal attention, genuine care and real understanding.",
    },
    {
      index: "03",
      icon: "cap",
      title: "Beyond the Classroom",
      description: "Opportunities that shape life, not just academics.",
    },
    {
      index: "04",
      icon: "shield",
      title: "A Community, Not Just a School",
      description: "A place where families, teachers and students grow together.",
    },
    {
      index: "05",
      icon: "chart",
      title: "Outcomes That Speak",
      description: "Confident individuals creating a brighter tomorrow.",
    },
  ],
};
