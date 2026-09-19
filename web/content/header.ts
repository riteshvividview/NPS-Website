export interface HeaderMegaItem {
  icon: "book" | "layers" | "lightbulb" | "calendar" | "child" | "grad" | "cap" | "shield" | "people" | "award" | "display" | "heart";
  tone: "peach" | "blue" | "gold" | "green";
  title: string;
  subtitle: string;
  href: string;
}

export interface HeaderContent {
  brandName: string;
  brandTagline: string;
  navLinks: { label: string; href: string }[];
  academicsLabel: string;
  megaColumns: { label: string; items: HeaderMegaItem[] }[];
  megaPromo: { image: string; captionLines: string[]; href: string };
  parentLoginLabel: string;
  parentLoginHref: string;
}

export const headerContent: HeaderContent = {
  brandName: "Niraj Public School",
  brandTagline: "LEARN  ·  GROW  ·  BELONG",
  navLinks: [
    { label: "About", href: "#" },
    { label: "Student Life", href: "#" },
    { label: "Admissions", href: "#" },
    { label: "Beyond Classroom", href: "#" },
    { label: "Contact", href: "#" },
  ],
  academicsLabel: "Academics",
  megaColumns: [
    {
      label: "Our Learning",
      items: [
        { icon: "book", tone: "peach", title: "Curriculum Overview", subtitle: "A strong foundation", href: "#" },
        { icon: "layers", tone: "blue", title: "Subjects", subtitle: "Explore what we offer", href: "#" },
        { icon: "lightbulb", tone: "gold", title: "Learning Approach", subtitle: "Beyond textbooks", href: "#" },
        { icon: "calendar", tone: "peach", title: "Academic Calendar", subtitle: "Plan your year", href: "#" },
      ],
    },
    {
      label: "Programs",
      items: [
        { icon: "child", tone: "peach", title: "Primary School", subtitle: "Grades 1 – 5", href: "#" },
        { icon: "grad", tone: "blue", title: "Middle School", subtitle: "Grades 6 – 8", href: "#" },
        { icon: "cap", tone: "green", title: "High School", subtitle: "Grades 9 – 12", href: "#" },
        { icon: "shield", tone: "peach", title: "Co-Scholastic Programs", subtitle: "Arts, Sports, Clubs", href: "#" },
      ],
    },
    {
      label: "At Niraj",
      items: [
        { icon: "people", tone: "green", title: "Our Faculty", subtitle: "Learn from the best", href: "#" },
        { icon: "award", tone: "peach", title: "Academic Excellence", subtitle: "Milestones & Achievements", href: "#" },
        { icon: "display", tone: "blue", title: "Learning Resources", subtitle: "Tools for success", href: "#" },
        { icon: "heart", tone: "peach", title: "Student Support", subtitle: "Guidance at every step", href: "#" },
      ],
    },
  ],
  megaPromo: {
    image: "/hero/children.webp",
    captionLines: ["A Curriculum", "For A Brighter", "Tomorrow"],
    href: "#",
  },
  parentLoginLabel: "Parent Login",
  parentLoginHref: "#",
};
