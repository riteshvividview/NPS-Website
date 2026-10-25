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
    { key: "facebook", href: "https://www.facebook.com/Nirajps" },
    { key: "instagram", href: "https://www.instagram.com/nirajpublicschool_/" },
    { key: "youtube", href: "https://www.youtube.com/channel/UCC1G6ZDPeiprJ7izLSEca3Q/featured" },
    { key: "linkedin", href: "https://www.linkedin.com/company/niraj-public-school/" },
  ],
  columns: [
    {
      title: "Explore",
      links: [
        { label: "About NPS", href: "/the-place/introduction-of-nps" },
        { label: "NPS Programs", href: "/nps-programs/pre-primary-school" },
        { label: "Student Life", href: "/the-people/students-at-nps" },
        { label: "Admissions", href: "https://niraj.myclassboard.com/ApplicationForm_Custom/09F71BA1-820B-4595-8D20-E0AAF4A95CAA/1/" },
        { label: "CCA Department", href: "/nps-programs/cca-department" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Parent Login", href: "https://niraj.myclassboard.com/" },
        { label: "Gallery", href: "/gallery" },
        { label: "Careers", href: "/careers" },
        { label: "NPS Achievements", href: "/the-place/nps-achievements" },
        { label: "Campus Facilities", href: "/the-place/nps-campus-facilities" },
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
