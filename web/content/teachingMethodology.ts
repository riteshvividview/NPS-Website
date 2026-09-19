export interface MethodologyPillar {
  key: "independence" | "curiosity" | "criticalThinking" | "collaboration";
  index: string;
  title: string;
  description: string;
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
    },
    {
      key: "curiosity",
      index: "02",
      title: "Curiosity",
      description: "Questions that lead somewhere, always encouraged.",
    },
    {
      key: "criticalThinking",
      index: "03",
      title: "Critical Thinking",
      description: "Reasoning through problems, not just answers.",
    },
    {
      key: "collaboration",
      index: "04",
      title: "Collaboration",
      description: "Stronger ideas, built together.",
    },
  ],
};
