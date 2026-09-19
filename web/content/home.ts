// Phase 1: hardcoded content, typed so Phase 2 can swap this module for a
// Sanity fetch without touching any component. Keep this the single source
// of truth for every piece of editable text/image on the Home page.

export interface HomeContent {
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineAccent: string;
    subcopy: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    stats: { value: string; label: string }[];
    scriptAccentLine1: string;
    scriptAccentLine2: string;
    scrollCueLabel: string;
    images: {
      sky: string;
      trees: string;
      school: string;
      children: string;
      book: string;
      cloudFallback: string;
    };
  };
  section2: {
    brandLabel: string;
    tagRight: string;
    eyebrow: string;
    headlineLine1: string;
    headlineAccent: string;
    values: { key: string; icon: string; label: string }[];
    scrollCueLabel: string;
    tagCornerLine1: string;
    tagCornerLine2: string;
    images: {
      bg: string;
      globe: string;
      boy: string;
      fly: string[];
    };
  };
  section3: {
    brandLabel: string;
    tagRight: string;
    eyebrow: string;
    headlineLine1: string;
    headlineAccent: string;
    subcopy: string;
    scrollCueLabel: string;
    images: {
      bg: string;
      bottomLeftFar: string;
      bottomRight: string;
      bottomLeftNear: string;
      birds: string;
      plane: string;
      topLeft: string;
    };
  };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Empowering Young Minds",
    headlineLine1: "A Kinder,",
    headlineLine2: "Brighter",
    headlineAccent: "Tomorrow",
    subcopy:
      "At Niraj Public School, we nurture curious minds, compassionate hearts and confident leaders for a brighter tomorrow.",
    ctaPrimary: { label: "Explore Our School", href: "#" },
    ctaSecondary: { label: "Watch Our Story", href: "#" },
    stats: [
      { value: "40+", label: "Years of Legacy" },
      { value: "2000+", label: "Happy Students" },
      { value: "100+", label: "Dedicated Educators" },
    ],
    scriptAccentLine1: "A Brighter",
    scriptAccentLine2: "Tomorrow",
    scrollCueLabel: "Scroll to Explore",
    images: {
      sky: "/hero/sky.png",
      trees: "/hero/trees.webp",
      school: "/hero/school.webp",
      children: "/hero/children.webp",
      book: "/hero/book.webp",
      cloudFallback: "/hero/cloud-fallback.png",
    },
  },
  section2: {
    brandLabel: "Niraj Public School",
    tagRight: "A Brighter Tomorrow —",
    eyebrow: "More Than Learning",
    headlineLine1: "A World",
    headlineAccent: "of Possibilities",
    values: [
      { key: "curiosity", icon: "lightbulb", label: "Curiosity" },
      { key: "discovery", icon: "globe", label: "Discovery" },
      { key: "creativity", icon: "palette", label: "Creativity" },
      { key: "collaboration", icon: "people", label: "Collaboration" },
    ],
    scrollCueLabel: "Scroll to Explore",
    tagCornerLine1: "Same Values",
    tagCornerLine2: "A Brighter Tomorrow",
    images: {
      bg: "/section2/bg.png",
      globe: "/section2/globe.webp",
      boy: "/section2/boy.webp",
      fly: [
        "/section2/fly-1.webp",
        "/section2/fly-2.webp",
        "/section2/fly-3.webp",
        "/section2/fly-4.webp",
        "/section2/fly-5.webp",
        "/section2/fly-6.webp",
        "/section2/fly-7.webp",
      ],
    },
  },
  section3: {
    brandLabel: "Niraj Public School",
    tagRight: "Nurturing Tomorrow —",
    eyebrow: "Our Core Principles",
    headlineLine1: "Roots for a",
    headlineAccent: "Brighter Tomorrow",
    subcopy: "Values that shape curious minds and compassionate futures.",
    scrollCueLabel: "Scroll to Explore",
    images: {
      bg: "/section3/bg.png",
      bottomLeftFar: "/section3/bottom-left-far.webp",
      bottomRight: "/section3/bottom-right.webp",
      bottomLeftNear: "/section3/bottom-left-near.webp",
      birds: "/section3/birds.webp",
      plane: "/section3/plane.webp",
      topLeft: "/section3/top-left.webp",
    },
  },
};
