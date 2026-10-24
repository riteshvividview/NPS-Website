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
    images: {
      sky: "/Home Page/01-hero/sky.png",
      trees: "/Home Page/01-hero/trees.webp",
      school: "/Home Page/01-hero/school.webp",
      children: "/Home Page/01-hero/children.webp",
      book: "/Home Page/01-hero/book.webp",
      cloudFallback: "/Home Page/01-hero/cloud-fallback.png",
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
    tagCornerLine1: "Same Values",
    tagCornerLine2: "A Brighter Tomorrow",
    images: {
      bg: "/Home Page/02-a-world-of-possibilities/bg.png",
      globe: "/Home Page/02-a-world-of-possibilities/globe.webp",
      boy: "/Home Page/02-a-world-of-possibilities/boy.webp",
      fly: [
        "/Home Page/02-a-world-of-possibilities/fly-1.webp",
        "/Home Page/02-a-world-of-possibilities/fly-2.webp",
        "/Home Page/02-a-world-of-possibilities/fly-3.webp",
        "/Home Page/02-a-world-of-possibilities/fly-4.webp",
        "/Home Page/02-a-world-of-possibilities/fly-5.webp",
        "/Home Page/02-a-world-of-possibilities/fly-6.webp",
        "/Home Page/02-a-world-of-possibilities/fly-7.webp",
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
    images: {
      bg: "/Home Page/03-roots-for-a-brighter-tomorrow/bg.png",
      bottomLeftFar: "/Home Page/03-roots-for-a-brighter-tomorrow/bottom-left-far.webp",
      bottomRight: "/Home Page/03-roots-for-a-brighter-tomorrow/bottom-right.webp",
      bottomLeftNear: "/Home Page/03-roots-for-a-brighter-tomorrow/bottom-left-near.webp",
      birds: "/Home Page/03-roots-for-a-brighter-tomorrow/birds.webp",
      plane: "/Home Page/03-roots-for-a-brighter-tomorrow/plane.webp",
      topLeft: "/Home Page/03-roots-for-a-brighter-tomorrow/top-left.webp",
    },
  },
};
