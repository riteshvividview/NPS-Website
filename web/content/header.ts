export interface HeaderSubLink {
  label: string;
  href: string;
  /** Key into `megaIcons` (components/layout/Header/icons.tsx). */
  icon: string;
  /** Shown, full-bleed (cover-fit), in the panel's feature visual while
   *  this link is hovered. Always a real framed photo — never one of the
   *  site's isolated parallax-layer cutouts (mostly transparent canvas,
   *  subject off-center), which crop badly into a fixed box. */
  image: string;
}

export interface HeaderFeature {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HeaderNavLink {
  label: string;
  href: string;
  children?: HeaderSubLink[];
  feature?: HeaderFeature;
}

export interface HeaderContent {
  brandName: string;
  brandTagline: string;
  navLinks: HeaderNavLink[];
  parentLoginLabel: string;
  parentLoginHref: string;
  digitalLibraryHref: string;
}

export const headerContent: HeaderContent = {
  brandName: "Niraj Public School",
  brandTagline: "LEARN  ·  GROW  ·  BELONG",
  // Placeholder hrefs until each page is built — see project notes.
  navLinks: [
    {
      label: "The Place",
      href: "#",
      feature: {
        title: "A Campus Built to Inspire",
        description:
          "Step inside the classrooms, labs and grounds where every NPS day happens.",
        ctaLabel: "Take the tour",
        ctaHref: "/the-place/introduction-of-nps",
      },
      children: [
        {
          label: "Introduction of NPS",
          href: "/the-place/introduction-of-nps",
          icon: "layers",
          image: "/header-images/the-place-introduction.jpg",
        },
        {
          label: "Principal's Welcome",
          href: "/the-place/principals-welcome",
          icon: "heart",
          image: "/header-images/classroom.jpg",
        },
        {
          label: "NPS Vision",
          href: "/the-place/nps-vision",
          icon: "lightbulb",
          image: "/header-images/the-place-vision.jpg",
        },
        {
          label: "NPS Campus Facilities",
          href: "/the-place/nps-campus-facilities",
          icon: "building",
          image: "/header-images/the-place-campus.jpg",
        },
        {
          label: "NPS Achievements",
          href: "/the-place/nps-achievements",
          icon: "award",
          image: "/header-images/the-place-achievements.jpg",
        },
        {
          label: "Young Achievers",
          href: "/the-place/young-achievers",
          icon: "shield",
          image: "/header-images/the-place-young-achievers.jpg",
        },
        {
          label: "Young Authors",
          href: "/the-place/young-authors",
          icon: "book",
          image: "/header-images/the-place-young-authors.jpg",
        },
      ],
    },
    {
      label: "The People",
      href: "#",
      feature: {
        title: "The People Behind Niraj",
        description:
          "Meet the leadership, the students, and everyone who has walked through our gates.",
        ctaLabel: "Meet them",
        ctaHref: "/the-people/school-leadership",
      },
      children: [
        {
          label: "School Leadership",
          href: "/the-people/school-leadership",
          icon: "people",
          image: "/header-images/the-people-leadership.png",
        },
        {
          label: "Students at NPS",
          href: "/the-people/students-at-nps",
          icon: "grad",
          image: "/header-images/the-people-students.jpg",
        },
        {
          label: "NES Board Members",
          href: "/the-people/nes-board-members",
          icon: "briefcase",
          image: "/header-images/the-people-board.png",
        },
        {
          label: "NPS Visitors",
          href: "/the-people/nps-visitors",
          icon: "compass",
          image: "/header-images/the-people-visitors.png",
        },
      ],
    },
    {
      label: "NPS Programs",
      href: "/nps-programs/pre-primary-school",
      feature: {
        title: "Every stage. New possibilities.",
        description: "Find the learning journey that grows with your child.",
        ctaLabel: "Explore our programmes",
        ctaHref: "/nps-programs/pre-primary-school",
      },
      children: [
        {
          label: "Pre-Primary School",
          href: "/nps-programs/pre-primary-school",
          icon: "heart",
          image: "/header-images/classroom.jpg",
        },
        {
          label: "Primary School",
          href: "/nps-programs/primary-school",
          icon: "lightbulb",
          image: "/header-images/the-place-campus.jpg",
        },
        {
          label: "Middle School",
          href: "/nps-programs/middle-school",
          icon: "layers",
          image: "/header-images/the-place-vision.jpg",
        },
        {
          label: "High School",
          href: "/nps-programs/high-school",
          icon: "grad",
          image: "/header-images/the-people-students.jpg",
        },
        {
          label: "Special Section",
          href: "/nps-programs/special-section",
          icon: "people",
          image: "/header-images/the-place-introduction.jpg",
        },
        {
          label: "CCA Department",
          href: "/nps-programs/cca-department",
          icon: "award",
          image: "/header-images/the-place-young-achievers.jpg",
        },
      ],
    },
    { label: "ISC", href: "/isc" },
    {
      label: "Admissions",
      href: "https://niraj.myclassboard.com/ApplicationForm_Custom/09F71BA1-820B-4595-8D20-E0AAF4A95CAA/1/",
    },
    { label: "Careers", href: "/careers" },
    { label: "Routes", href: "/routes" },
    { label: "Gallery", href: "/gallery" },
  ],
  parentLoginLabel: "Parent Login",
  parentLoginHref: "https://niraj.myclassboard.com/",
  digitalLibraryHref: "https://crewgame4.wixsite.com/digitallibrary",
};
