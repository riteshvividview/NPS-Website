export interface MethodologyPillar {
  key: "independence" | "curiosity" | "criticalThinking" | "collaboration";
  index: string;
  title: string;
  description: string;
  image: string;
}

export interface TeachingMethodologyContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  cta: { label: string; href: string };
  pillars: MethodologyPillar[];
}

export const teachingMethodologyContent: TeachingMethodologyContent = {
  eyebrow: "Our Methodology",
  headlineLine1: "Teaching that grows",
  headlineLine2: "with every child.",
  description:
    "Four principles run through every lesson we teach — not as a checklist, but as a habit of mind we build one day at a time.",
  cta: { label: "Explore Our Approach", href: "#" },
  pillars: [
    {
      key: "independence",
      index: "01",
      title: "Independence",
      description: "Confident learners who trust their own thinking.",
      image: "/gallery/Happy%20Hour/IMG20250411091152.jpg",
    },
    {
      key: "curiosity",
      index: "02",
      title: "Curiosity",
      description: "Questions that lead somewhere, always encouraged.",
      image: "/gallery/Pre-Primary%20Class%20Activities/IMG20260326130526.jpg",
    },
    {
      key: "criticalThinking",
      index: "03",
      title: "Critical Thinking",
      description: "Reasoning through problems, not just answers.",
      image: "/gallery/Pre-Primary%20Class%20Activities/20250411_104855.jpg",
    },
    {
      key: "collaboration",
      index: "04",
      title: "Collaboration",
      description: "Stronger ideas, built together.",
      image: "/gallery/Happy%20Hour/WhatsApp%20Image%202026-01-23%20at%2015.34.37%20(1).jpeg",
    },
  ],
};
