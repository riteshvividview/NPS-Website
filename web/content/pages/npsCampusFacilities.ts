export interface NpsCampusFacilitiesContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
  };
  facilities: {
    eyebrow: string;
    headline: string;
    items: {
      icon: string;
      tone: "green" | "gold" | "blue" | "peach";
      title: string;
      description: string;
      size: "large" | "normal";
    }[];
  };
}

export const npsCampusFacilitiesContent: NpsCampusFacilitiesContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The Place", href: "#" },
    { label: "NPS Campus Facilities", href: "/the-place/nps-campus-facilities" },
  ],
  hero: {
    eyebrow: "The Place · Life on Campus",
    headline: "NPS Campus Facilities",
    tagline: "Seven everyday spaces where our students learn, play, build and grow.",
  },
  facilities: {
    eyebrow: "Around Campus",
    headline: "Every Corner, Built for Learning",
    items: [
      {
        icon: "fa-solid fa-bowl-food",
        tone: "gold",
        title: "Lunch",
        description:
          "Niraj is conscious about the health of its students. We take care to provide a nutritious, wholesome vegetarian meal prepared under hygienic conditions, along with a steady supply of clean drinking water.",
        size: "large",
      },
      {
        icon: "fa-solid fa-chalkboard-user",
        tone: "blue",
        title: "Classrooms",
        description:
          "Our spacious classrooms are designed to support our students' cognitive and psychomotor skills, with Smart Boards in every room to help students understand concepts better.",
        size: "normal",
      },
      {
        icon: "fa-solid fa-basketball",
        tone: "peach",
        title: "Sports",
        description:
          "Excellent sports facilities with professional coaching in cricket, basketball, yoga and chess.",
        size: "normal",
      },
      {
        icon: "fa-solid fa-map-location-dot",
        tone: "green",
        title: "Excursions",
        description:
          "Picnics and field trips to different cities form part of our curriculum, reinforcing every student's interest in learning beyond the classroom.",
        size: "normal",
      },
      {
        icon: "fa-solid fa-book-open",
        tone: "blue",
        title: "Library",
        description:
          "A reading habit is inculcated through various activities in library classes. Our library holds more than 10,000 books — a wide range of encyclopedias, reference books, CDs and DVDs that help children foster their knowledge and love of learning.",
        size: "large",
      },
      {
        icon: "fa-solid fa-flask",
        tone: "gold",
        title: "Labs",
        description:
          "Well-equipped physics, chemistry, biology, robotics, computer and home-science labs enhance the interest of our future scientists, engineers and doctors — making learning joyful and practical.",
        size: "normal",
      },
      {
        icon: "fa-solid fa-hammer",
        tone: "peach",
        title: "Carpentry",
        description:
          "Our carpentry facility gives students hands-on experience in woodworking, helping them develop creativity, practical skills and confidence through guided projects.",
        size: "normal",
      },
    ],
  },
};
