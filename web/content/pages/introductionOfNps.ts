export interface IntroductionOfNpsContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
    image: string;
    imageAlt: string;
    backgroundImage: string;
    backgroundImageAlt: string;
  };
  story: {
    quote: string;
    paragraphs: string[];
    badgeValue: string;
    badgeLabel: string;
  };
  pillars: {
    eyebrow: string;
    headline: string;
    items: {
      key: "outlook" | "talent" | "safety" | "community";
      title: string;
      description: string;
    }[];
  };
}

export const introductionOfNpsContent: IntroductionOfNpsContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The Place", href: "#" },
    { label: "Introduction of NPS", href: "/the-place/introduction-of-nps" },
  ],
  hero: {
    eyebrow: "The Place · Since 1986",
    headline: "Introduction of NPS",
    tagline: "Niraj speaks in the voice of tomorrow in school education.",
    image: "/Schoolimage.png",
    imageAlt: "The Niraj Public School campus building",
    backgroundImage: "/Introduction to NPS/01-hero/hero-section-bg-img.png",
    backgroundImageAlt: "Golden-hour view of the Niraj Public School campus, framed by green foliage",
  },
  story: {
    quote: "A home away from home for students to feel at ease.",
    paragraphs: [
      "Niraj Public School was established in 1986 with the objective of imparting education of the highest order. Despite being located in the heart of the city, Niraj has the ambience of a county town with a serene atmosphere for studies. Approach to the school is easy and far from time-consuming, and the school is affiliated to the Council for the Indian School Certificate Examination (ICSE), New Delhi.",
      "Today, after more than 40 eventful years, our school has grown across every sphere of education and stands tall among the very best. Niraj matches with any stream or pattern of education in the world, catering to the study needs of students from all over the globe.",
      "At Niraj, our outlook towards education is modern and optimistic. We take the concept of complete education in all earnest — to impress upon the young mind the values for which India stands, to foster latent talents, and to bring out the very best in every student, so they can realize their dreams and grow in every direction.",
      "Safety of our students is of prime importance. We have taken a number of measures to provide a safe, healthy environment, and our campus has been certified by safety personnel accordingly. To sum it up, Niraj makes its students better citizens of tomorrow — ready to make the nation stronger than ever before.",
    ],
    badgeValue: "40+",
    badgeLabel: "Years of Legacy",
  },
  pillars: {
    eyebrow: "What We Stand For",
    headline: "The Niraj Approach",
    items: [
      {
        key: "outlook",
        title: "Modern & Optimistic",
        description:
          "A forward-looking outlook that treats education as complete — not confined to textbooks alone.",
      },
      {
        key: "talent",
        title: "Every Talent, Realized",
        description:
          "We impress upon young minds the values India stands for, and help every child bring out their very best.",
      },
      {
        key: "safety",
        title: "A Certified-Safe Campus",
        description:
          "A number of safety measures, certified by safety personnel, keep every student secure, every day.",
      },
      {
        key: "community",
        title: "A Global Community",
        description:
          "Catering to the study needs of students from all over the world, within a home away from home.",
      },
    ],
  },
};
