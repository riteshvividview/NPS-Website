export type SocialKey = "facebook" | "instagram" | "youtube" | "linkedin";

export interface FooterContent {
  brandName: string;
  brandTagline: string;
  description: string;
  socials: { key: SocialKey; href: string }[];
  columns: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  contact: {
    location: string;
    phone: string;
    email: string;
  };
  newsletter: {
    eyebrow: string;
    description: string;
    placeholder: string;
  };
  waveQuoteLine1: string;
  waveQuoteLine2: string;
  photoAlt: string;
  bottomTagWords: string[];
  designedText: string;
  copyrightHolder: string;
}

export const footerContent: FooterContent = {
  brandName: "Niraj Public School",
  brandTagline: "LEARN · GROW · BELONG",
  description:
    "Nurturing curious minds, compassionate hearts and confident leaders for a brighter tomorrow.",
  socials: [
    { key: "facebook", href: "#" },
    { key: "instagram", href: "#" },
    { key: "youtube", href: "#" },
    { key: "linkedin", href: "#" },
  ],
  columns: [
    {
      title: "Explore",
      links: [
        { label: "About", href: "#" },
        { label: "Academics", href: "#" },
        { label: "Student Life", href: "#" },
        { label: "Admissions", href: "#" },
        { label: "Beyond Classroom", href: "#" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Parent Login", href: "#" },
        { label: "Calendar", href: "#" },
        { label: "Careers", href: "#" },
        { label: "News & Events", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ],
  contact: {
    location: "Hyderabad, India",
    phone: "+91 94945 52769",
    email: "info@nirajpublicschool.org",
  },
  newsletter: {
    eyebrow: "Stay in the Loop",
    description: "Get the latest updates, stories and happenings at Niraj.",
    placeholder: "Your email address",
  },
  waveQuoteLine1: "Same Values.",
  waveQuoteLine2: "Brighter Futures.",
  photoAlt: "Niraj Public School campus building",
  bottomTagWords: ["People", "Purpose", "Progress"],
  designedText: "Designed for a Kinder, Brighter Tomorrow",
  copyrightHolder: "Niraj Public School",
};
