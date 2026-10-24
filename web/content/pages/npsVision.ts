export interface NpsVisionContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    headline: string;
    tagline: string;
    centerIcon: string;
  };
  commitments: {
    eyebrow: string;
    headline: string;
    intro: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

export const npsVisionContent: NpsVisionContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The Place", href: "#" },
    { label: "NPS Vision", href: "/the-place/nps-vision" },
  ],
  hero: {
    headline: "NPS Vision",
    tagline: "Seven commitments that guide everything we do, every day.",
    centerIcon: "fa-solid fa-compass",
  },
  commitments: {
    eyebrow: "To Achieve Our Vision",
    headline: "Niraj Public School Is Committed To",
    intro:
      "A quality policy that shapes how we teach, how we run our campus, and how we hold ourselves accountable — reviewed every year, and open to anyone who asks.",
    items: [
      {
        icon: "fa-solid fa-leaf",
        title: "Eco-Friendly, Quality Education",
        description:
          "Providing quality education in an eco-friendly environment, to the satisfaction of our students and their parents.",
      },
      {
        icon: "fa-solid fa-recycle",
        title: "Conserving Natural Resources",
        description:
          "Preventing pollution across every activity we conduct and every service we render, by conserving natural resources.",
      },
      {
        icon: "fa-solid fa-people-group",
        title: "A Culture of Competence",
        description:
          "Inculcating work culture and competence among our employees, ensuring continual improvement through regular training.",
      },
      {
        icon: "fa-solid fa-scale-balanced",
        title: "Full Compliance",
        description: "Complying with every legal and other requirement that applies to us, without exception.",
      },
      {
        icon: "fa-solid fa-bullseye",
        title: "Measured Progress",
        description: "Setting clear quality objectives with targets, and reviewing them at periodic intervals.",
      },
      {
        icon: "fa-solid fa-calendar-check",
        title: "Annual Review",
        description: "Reviewing our quality policy at least once a year, to keep it continually suitable.",
      },
      {
        icon: "fa-solid fa-bullhorn",
        title: "Open & Transparent",
        description:
          "Communicated to everyone working for or on behalf of the school, and made available to the public on demand.",
      },
    ],
  },
};
