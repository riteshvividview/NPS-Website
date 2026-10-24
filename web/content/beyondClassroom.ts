export type SlideIconKey =
  | "palette"
  | "ball"
  | "music"
  | "flask"
  | "compass"
  | "heart"
  | "map"
  | "flag"
  | "dance";
export type StatIconKey = "trophy" | "people" | "target" | "star";

export interface BeyondClassroomSlide {
  icon: SlideIconKey;
  badgeLine1: string;
  badgeLine2: string;
  image: string;
  alt: string;
}

export interface BeyondClassroomContent {
  navRight: string;
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  subcopy: string;
  ctaLine1: string;
  ctaLine2: string;
  ctaHref: string;
  noteLeft: string;
  noteRightLine1: string;
  noteRightLine2: string;
  slideGroups: BeyondClassroomSlide[][];
  stats: { icon: StatIconKey; label: string }[];
}

export const beyondClassroomContent: BeyondClassroomContent = {
  navRight: "Explore · Experience · Grow",
  eyebrow: "Beyond the Classroom",
  headlineLead: "Explore Your Many",
  headlineAccent: "Sides.",
  subcopy: "Activities that spark confidence, creativity and lifelong skills.",
  ctaLine1: "See",
  ctaLine2: "More",
  ctaHref: "#",
  noteLeft: "Play Learn Grow",
  noteRightLine1: "More Than",
  noteRightLine2: "A Syllabus",
  slideGroups: [
    [
      {
        icon: "palette",
        badgeLine1: "Creative",
        badgeLine2: "Exploration",
        image: "/Home Page/05-beyond-the-classroom/creative-exploration.png",
        alt: "Student pointing at a counting abacus",
      },
      {
        icon: "ball",
        badgeLine1: "Sports",
        badgeLine2: "& Fitness",
        image: "/Home Page/05-beyond-the-classroom/sports-fitness.png",
        alt: "Students playing on the playground slide",
      },
      {
        icon: "music",
        badgeLine1: "Arts",
        badgeLine2: "& Culture",
        image: "/Home Page/05-beyond-the-classroom/arts-culture.png",
        alt: "Students at a cultural event",
      },
    ],
    [
      {
        icon: "flask",
        badgeLine1: "Science &",
        badgeLine2: "Discovery",
        image: "/Home Page/05-beyond-the-classroom/science-discovery.png",
        alt: "Students doing a chemistry experiment",
      },
      {
        icon: "compass",
        badgeLine1: "Outdoor",
        badgeLine2: "Adventures",
        image: "/gallery/Field%20Trips/image2_3.png",
        alt: "Students enjoying an outdoor adventure together",
      },
      {
        icon: "heart",
        badgeLine1: "Community",
        badgeLine2: "Service",
        image: "/gallery/Special%20Assembly/C0030T01.JPG",
        alt: "Students sharing a voter awareness message with their school community",
      },
    ],
    [
      {
        icon: "dance",
        badgeLine1: "Creative",
        badgeLine2: "Arts",
        image: "/gallery/Happy%20Hour/IMG_20250729_095437.jpg",
        alt: "Students presenting a handmade art project together",
      },
      {
        icon: "map",
        badgeLine1: "STEM",
        badgeLine2: "Discovery",
        image: "/gallery/Co-Curricular%20Activities/DSC02073.JPG",
        alt: "Robotics and technology equipment in the school workshop",
      },
      {
        icon: "flag",
        badgeLine1: "Student",
        badgeLine2: "Ideas",
        image: "/gallery/Happy%20Hour/image5.png",
        alt: "Student presenting a clay model project",
      },
    ],
  ],
  stats: [
    { icon: "trophy", label: "Build Confidence" },
    { icon: "people", label: "Make Friends" },
    { icon: "target", label: "Discover New Talents" },
    { icon: "star", label: "Create Lasting Memories" },
  ],
};
