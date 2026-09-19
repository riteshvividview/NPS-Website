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
        image: "/beyond-classroom/creative-exploration.png",
        alt: "Student pointing at a counting abacus",
      },
      {
        icon: "ball",
        badgeLine1: "Sports",
        badgeLine2: "& Fitness",
        image: "/beyond-classroom/sports-fitness.png",
        alt: "Students playing on the playground slide",
      },
      {
        icon: "music",
        badgeLine1: "Arts",
        badgeLine2: "& Culture",
        image: "/beyond-classroom/arts-culture.png",
        alt: "Students at a cultural event",
      },
    ],
    [
      {
        icon: "flask",
        badgeLine1: "Science &",
        badgeLine2: "Discovery",
        image: "/beyond-classroom/science-discovery.png",
        alt: "Students doing a chemistry experiment",
      },
      {
        icon: "compass",
        badgeLine1: "Outdoor",
        badgeLine2: "Adventures",
        image: "/beyond-classroom/slide-5.jpg",
        alt: "Students on an outdoor adventure",
      },
      {
        icon: "heart",
        badgeLine1: "Community",
        badgeLine2: "Service",
        image: "/beyond-classroom/slide-6.jpg",
        alt: "Students taking part in community service",
      },
    ],
    [
      {
        icon: "dance",
        badgeLine1: "Music &",
        badgeLine2: "Dance",
        image: "/beyond-classroom/slide-7.jpg",
        alt: "Students in a music and dance class",
      },
      {
        icon: "map",
        badgeLine1: "Field",
        badgeLine2: "Trips",
        image: "/beyond-classroom/slide-8.jpg",
        alt: "Students on a field trip",
      },
      {
        icon: "flag",
        badgeLine1: "Leadership",
        badgeLine2: "Camp",
        image: "/beyond-classroom/slide-9.jpg",
        alt: "Students at a leadership camp",
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
