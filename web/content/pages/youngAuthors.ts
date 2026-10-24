export interface YoungAuthorBook {
  studentName: string;
  studentClass: string;
  bookTitle: string;
}

export interface YoungAuthorsShelf {
  key: string;
  label: string;
  level: "High School" | "Middle School";
  year: string;
  books: YoungAuthorBook[];
}

export interface YoungAuthorsContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
    stats: { value: number; label: string }[];
  };
  listEyebrow: string;
  listHeadline: string;
  listIntro: string;
  shelves: YoungAuthorsShelf[];
}

export const youngAuthorsContent: YoungAuthorsContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The Place", href: "#" },
    { label: "Young Authors", href: "/the-place/young-authors" },
  ],
  hero: {
    eyebrow: "The Place · Young Authors",
    headline: "Young Authors",
    tagline: "Every book on this shelf was written, start to finish, by a Niraj student.",
    stats: [
      { value: 29, label: "Books Published" },
      { value: 24, label: "Young Authors" },
    ],
  },
  listEyebrow: "The Shelf",
  listHeadline: "Pick a Book to Open It",
  listIntro: "Tap any spine to see who wrote it, their class, and the title in full.",
  shelves: [
    {
      key: "hs-2024-25",
      label: "High School · 2024–25",
      level: "High School",
      year: "2024–25",
      books: [
        { studentName: "Ajith Vankadari", studentClass: "Class 6", bookTitle: "The Final Alarm – 1" },
        { studentName: "Shashank Varma", studentClass: "Class 6", bookTitle: "Mythological Creatures" },
        { studentName: "Shaik Rida Fathima", studentClass: "Class 6", bookTitle: "The Magical Portal" },
        { studentName: "Srivats", studentClass: "Class 7", bookTitle: "Dr Elara Voss" },
        { studentName: "Pranaya Konduru", studentClass: "Class 7", bookTitle: "Tales of Timeless Wanderers" },
        { studentName: "Pranaya Konduru", studentClass: "Class 7", bookTitle: "Lucy's Renaissance" },
        {
          studentName: "Dhavaleswarapu Sri Anantha Lokesh",
          studentClass: "Class 8C",
          bookTitle: "The Haunted Exhibition",
        },
      ],
    },
    {
      key: "ms-2025-26-a",
      label: "Middle School · 2025–26",
      level: "Middle School",
      year: "2025–26",
      books: [
        { studentName: "M. Sourabhi Krishna", studentClass: "Class 6", bookTitle: "Ivy's Trip to India" },
        { studentName: "Hyma Satwika K.", studentClass: "Class 6", bookTitle: "A Trip to Coorg" },
        { studentName: "Sai Ratna Samanyu Jampala", studentClass: "Class 6", bookTitle: "The Robot and the 3 Stones" },
        { studentName: "Dhatri Sri Sai Aluru", studentClass: "Class 6", bookTitle: "The Hotel" },
        { studentName: "Khwahish Binnen", studentClass: "Class 7", bookTitle: "Mira's Magical Day" },
        { studentName: "Virtee", studentClass: "Class 7", bookTitle: "The Climate Change" },
        { studentName: "Sathvik", studentClass: "Class 7", bookTitle: "The Untold Story of Raj — Part 3" },
        { studentName: "Shashank", studentClass: "Class 7", bookTitle: "The Untold Mystery of India — 1" },
      ],
    },
    {
      key: "hs-2025-26",
      label: "High School · 2025–26",
      level: "High School",
      year: "2025–26",
      books: [
        { studentName: "Chathrika Kandrakota", studentClass: "Class 8", bookTitle: "The Paw Print Academy" },
        { studentName: "Chathrika Kandrakota", studentClass: "Class 8", bookTitle: "The Curse of Dracula" },
        { studentName: "Diahna Tated", studentClass: "Class 8", bookTitle: "Whispers in the Banyan House" },
        { studentName: "P. Sai Kriti Tanishka", studentClass: "Class 9", bookTitle: "A Mythical Adventure" },
        { studentName: "P. Sai Kriti Tanishka", studentClass: "Class 9", bookTitle: "Ways of Universe Played on Us" },
        { studentName: "P. Sai Kriti Tanishka", studentClass: "Class 9", bookTitle: "Word of Honour" },
        { studentName: "P. Sai Kriti Tanishka", studentClass: "Class 9", bookTitle: "Chromatic Awakening" },
      ],
    },
    {
      key: "ms-2025-26-b",
      label: "Middle School · 2025–26",
      level: "Middle School",
      year: "2025–26",
      books: [
        { studentName: "Aaryan K.", studentClass: "Class 6", bookTitle: "The Basketball" },
        { studentName: "Nipendra Bhagat", studentClass: "Class 6", bookTitle: "The Bad Panther" },
        { studentName: "Nirvi Jain", studentClass: "Class 6", bookTitle: "The Magical Wand — Part 1" },
        { studentName: "Parthvi Patel", studentClass: "Class 6", bookTitle: "The Nature's Beauty" },
        { studentName: "Pasala Geethika", studentClass: "Class 6", bookTitle: "Unwritten History" },
        { studentName: "Prathamesh Srivastava", studentClass: "Class 6", bookTitle: "The Space Adventures of Tim" },
        { studentName: "B. Reyaansh Tarak", studentClass: "Class 6", bookTitle: "The Minecraft Police World" },
      ],
    },
  ],
};
