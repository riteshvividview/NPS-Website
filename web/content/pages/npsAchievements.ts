export interface Achievement {
  studentName: string;
  studentClass: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  prizes: string[];
  photoCount: number;
}

export interface NpsAchievementsContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
    stats: { value: number; suffix: string; label: string }[];
  };
  listEyebrow: string;
  listHeadline: string;
  achievements: Achievement[];
}

export const npsAchievementsContent: NpsAchievementsContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The Place", href: "#" },
    { label: "NPS Achievements", href: "/the-place/nps-achievements" },
  ],
  hero: {
    eyebrow: "The Place · Hall of Fame",
    headline: "NPS Achievements",
    tagline: "Celebrating the students who carried Niraj's colors onto the national stage.",
    stats: [
      { value: 2, suffix: "", label: "Students Honoured" },
      { value: 3, suffix: "", label: "Medals Won" },
      { value: 1, suffix: "", label: "National Tournament" },
    ],
  },
  listEyebrow: "Recent Honours",
  listHeadline: "Our Young Champions",
  achievements: [
    {
      studentName: "Tulip Gupta",
      studentClass: "Grade 6D",
      eventName: "47th Matsubayashi Karate and Kobudo National Tournament",
      eventDate: "28 August 2022",
      eventLocation: "Chennai",
      prizes: ["1st Prize — Nanchaku"],
      photoCount: 3,
    },
    {
      studentName: "Anshika Reddy",
      studentClass: "Grade 6D",
      eventName: "47th Matsubayashi Karate and Kobudo National Tournament",
      eventDate: "28 August 2022",
      eventLocation: "Chennai",
      prizes: ["1st Prize — Kobudo", "2nd Prize — Kata"],
      photoCount: 2,
    },
  ],
};
