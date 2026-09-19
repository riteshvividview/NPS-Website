export interface LifeAtNirajGroup {
  hero: { image: string; alt: string; captionLine1: string; captionLine2: string };
  top1: { image: string; alt: string };
  top2: { image: string; alt: string };
  top3: { image: string; alt: string };
  video: {
    thumbnail: string;
    alt: string;
    titleLine1: string;
    titleLine2: string;
    tag: string;
    duration: string;
  };
  bottom: { image: string; alt: string };
}

export interface LifeAtNirajContent {
  navRight: string;
  eyebrow: string;
  heading: string;
  filters: string[];
  ctaLine1: string;
  ctaLine2: string;
  ctaHref: string;
  sideTagLines: string[];
  groups: LifeAtNirajGroup[];
}

export const lifeAtNirajContent: LifeAtNirajContent = {
  navRight: "Learn · Grow · Belong",
  eyebrow: "Moments That Matter",
  heading: "Life at Niraj",
  filters: ["All", "Events", "Activities", "Achievements", "In Focus"],
  ctaLine1: "Explore",
  ctaLine2: "More",
  ctaHref: "#",
  sideTagLines: ["Small", "Steps", "Big", "Stories"],
  groups: [
    {
      hero: {
        image: "/life-at-niraj/g1-hero.jpg",
        alt: "Students posing together as friends",
        captionLine1: "Friendships",
        captionLine2: "for Life",
      },
      top1: { image: "/life-at-niraj/g1-top1.jpg", alt: "Students in a classroom" },
      top2: { image: "/life-at-niraj/g1-top2.jpg", alt: "Students in the library" },
      top3: { image: "/life-at-niraj/g1-top3.jpg", alt: "Student holding a number 10 sign" },
      video: {
        thumbnail: "/life-at-niraj/g1-video.jpg",
        alt: "Students at the robotics club",
        titleLine1: "Exploring",
        titleLine2: "New Possibilities",
        tag: "Robotics Club",
        duration: "02:15",
      },
      bottom: { image: "/life-at-niraj/g1-bottom.jpg", alt: "Students boarding the school bus" },
    },
    {
      hero: {
        image: "/life-at-niraj/g2-hero.jpg",
        alt: "Students celebrating together",
        captionLine1: "Celebrating",
        captionLine2: "Together",
      },
      top1: { image: "/life-at-niraj/g2-top1.jpg", alt: "Students at a school event" },
      top2: { image: "/life-at-niraj/g2-top2.jpg", alt: "Students doing an activity" },
      top3: { image: "/life-at-niraj/g2-top3.jpg", alt: "Student with an award" },
      video: {
        thumbnail: "/life-at-niraj/g2-video.jpg",
        alt: "Students at the art club",
        titleLine1: "Colors of",
        titleLine2: "Imagination",
        tag: "Art Club",
        duration: "01:48",
      },
      bottom: { image: "/life-at-niraj/g2-bottom.jpg", alt: "Students at a sports day" },
    },
    {
      hero: {
        image: "/life-at-niraj/g3-hero.jpg",
        alt: "Students learning together",
        captionLine1: "Curious Minds",
        captionLine2: "At Work",
      },
      top1: { image: "/life-at-niraj/g3-top1.jpg", alt: "Students in a science lab" },
      top2: { image: "/life-at-niraj/g3-top2.jpg", alt: "Students on a field trip" },
      top3: { image: "/life-at-niraj/g3-top3.jpg", alt: "Student presenting a project" },
      video: {
        thumbnail: "/life-at-niraj/g3-video.jpg",
        alt: "Students at the music club",
        titleLine1: "Finding Their",
        titleLine2: "Rhythm",
        tag: "Music Club",
        duration: "02:36",
      },
      bottom: { image: "/life-at-niraj/g3-bottom.jpg", alt: "Students at a cultural event" },
    },
    {
      hero: {
        image: "/life-at-niraj/g4-hero.jpg",
        alt: "Students receiving an award on stage",
        captionLine1: "Proud",
        captionLine2: "Moments",
      },
      top1: { image: "/life-at-niraj/g4-top1.jpg", alt: "Students holding a trophy" },
      top2: { image: "/life-at-niraj/g4-top2.jpg", alt: "Students at a prize ceremony" },
      top3: { image: "/life-at-niraj/g4-top3.jpg", alt: "Student with a medal" },
      video: {
        thumbnail: "/life-at-niraj/g4-video.jpg",
        alt: "Students at the debate finals",
        titleLine1: "Winning",
        titleLine2: "Words",
        tag: "Debate Club",
        duration: "03:02",
      },
      bottom: { image: "/life-at-niraj/g4-bottom.jpg", alt: "Students celebrating a win" },
    },
    {
      hero: {
        image: "/life-at-niraj/g5-hero.jpg",
        alt: "Students in a spotlight moment",
        captionLine1: "In the",
        captionLine2: "Spotlight",
      },
      top1: { image: "/life-at-niraj/g5-top1.jpg", alt: "Student performing on stage" },
      top2: { image: "/life-at-niraj/g5-top2.jpg", alt: "Students at assembly" },
      top3: { image: "/life-at-niraj/g5-top3.jpg", alt: "Student portrait" },
      video: {
        thumbnail: "/life-at-niraj/g5-video.jpg",
        alt: "Students at the annual day",
        titleLine1: "Center",
        titleLine2: "Stage",
        tag: "Annual Day",
        duration: "02:54",
      },
      bottom: { image: "/life-at-niraj/g5-bottom.jpg", alt: "Students taking a bow" },
    },
  ],
};
