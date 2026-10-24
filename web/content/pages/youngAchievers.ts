export type AchieverCategory = "literary" | "sports" | "music" | "academics";

export interface Achiever {
  name: string;
  grade?: string;
  category: AchieverCategory;
  teaser: string;
  bio: string[];
  links?: { label: string; href: string }[];
}

export interface YoungAchieversContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
  };
  filters: { key: AchieverCategory | "all"; label: string }[];
  achievers: Achiever[];
}

export const youngAchieversContent: YoungAchieversContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The Place", href: "#" },
    { label: "Young Achievers", href: "/the-place/young-achievers" },
  ],
  hero: {
    eyebrow: "The Place · Young Achievers",
    headline: "Young Achievers",
    tagline: "Writers, sportspeople, musicians and scholars — eleven students who made Niraj proud this year.",
  },
  filters: [
    { key: "all", label: "All" },
    { key: "literary", label: "Literary" },
    { key: "sports", label: "Sports" },
    { key: "music", label: "Music" },
    { key: "academics", label: "Academics" },
  ],
  achievers: [
    {
      name: "Jnaneshwar Saravanan",
      category: "literary",
      teaser: "Bubbles over with enthusiasm about knowing different things — his story “A Day in a Pizza” made it into print.",
      bio: [
        "Jnaneshwar Saravanan bubbles over with enthusiasm and is curious about knowing different things around him — his mind is full of questions.",
        "His story “A Day in a Pizza” has appeared in the book “Out of the Cocoon”, published by Out of the Cocoon Publication. He also has two e-books to his credit.",
      ],
      links: [
        { label: "The League of Superheroes", href: "#" },
        { label: "The Adventures of Big Daddy", href: "#" },
      ],
    },
    {
      name: "Avinash Gondela",
      category: "literary",
      teaser: "A calm, well-organised thinker whose story “The Secret of the Blue Blood” is now in print.",
      bio: [
        "Avinash Gondela has a good organisation of thoughts. He is a calm, peace-loving child who loves reading books and sharing his ideas, and enjoys writing short stories.",
        "His story “The Secret of the Blue Blood” has appeared in the book “Out of the Cocoon”, published by Out of the Cocoon Publication.",
      ],
    },
    {
      name: "P.S. S. Vyshnavi",
      category: "literary",
      teaser: "A bright, precise writer — her story “The Three Friends” is published in “Out of the Cocoon”.",
      bio: [
        "P.S. S. Vyshnavi is a very bright and intelligent child. She completes her work on time and perfectly.",
        "Her story “The Three Friends” has appeared in the book “Out of the Cocoon”, published by Out of the Cocoon Publication.",
      ],
    },
    {
      name: "Pranitha Sridhar",
      category: "literary",
      teaser: "Respectful and disciplined — her story “Santa Claus: Truth or Tale” is published in “Out of the Cocoon”.",
      bio: [
        "Pranitha Sridhar is a very well-behaved and disciplined child, with great respect for her parents and teachers.",
        "Her story “Santa Claus: Truth or Tale” has appeared in the book “Out of the Cocoon”, published by Out of the Cocoon Publication.",
      ],
    },
    {
      name: "Ayan Bajpai",
      category: "literary",
      teaser: "Full of innovative ideas and a love for role play — his story “The Wooden Pots” is now in print.",
      bio: [
        "Ayan Bajpai has many innovative ideas and loves doing role plays and activities.",
        "His story “The Wooden Pots” has appeared in the book “Out of the Cocoon”, published by Out of the Cocoon Publication.",
      ],
    },
    {
      name: "Lahari M Girish",
      grade: "Grade 8",
      category: "sports",
      teaser: "Niraj's rising kickboxing champion — gold for India at the World Kickboxing Championship in Cairo.",
      bio: [
        "Lahari M Girish, a student of Class 8, is the rising champion of kickboxing in the horizon of Niraj Public School. She participated in the “World Kickboxing Championship” held in Cairo and won a gold medal for India in the Junior Category.",
        "Lahari, her parents and her coach were felicitated by our Principal, Mr. B. Jivitesh Reddy. We are sure she will scale even greater heights in the future.",
      ],
    },
    {
      name: "Jiya Saxena",
      category: "sports",
      teaser: "Niraj's rising karate star — gold at the National Level Karate Open Championship.",
      bio: [
        "It is our immense pride to announce that our little Jiya Saxena is the rising karate star of Niraj Public School.",
        "She has won a gold medal at the National Level Karate Open Championship, a silver medal in Kumite fights, and a bronze in Kata style. We are sure she will scale even greater heights and bring more laurels to her parents and to the country.",
      ],
    },
    {
      name: "Manthan Shah",
      grade: "Grade 9C",
      category: "sports",
      teaser: "Took on Hussain Sagar Lake in the Laser 4.7 category, racing for the Yachting Association of India.",
      bio: [
        "Sailing is an adventurous sport — the explosive fun of directing a small boat and mastering the art of overcoming perilous weather.",
        "Our student Manthan Shah of Class 9C participated in the under-18 category competition organised by the Yachting Association of India. The competition took place at Hussain Sagar Lake, and Manthan successfully completed the race in the Laser 4.7 category. We wish him all the best — the sky is the limit for him.",
      ],
    },
    {
      name: "Jinesh Patel",
      grade: "Grade 4",
      category: "literary",
      teaser: "Won 1st prize all over India in the Great Indian Writers Challenge, judged alongside Ruskin Bond.",
      bio: [
        "Kudos to Jinesh Patel of Class 4, the budding writer in the horizon of Niraj Public School, for bagging the 1st prize all over India in the Great Indian Writers Challenge, conducted by “Parent Of” with the eminent writer Ruskin Bond.",
        "He won the award for his story titled “The Tiger in the Tunnel” under the 8–9 age category. The online award function was held on 23 November, 2021. We wish him all the best for his future endeavours.",
      ],
    },
    {
      name: "Sai Deeksha",
      grade: "Grade 4",
      category: "music",
      teaser: "Won a Certificate of Distinction from Trinity College London for playing the electronic keyboard.",
      bio: [
        "Trinity College London Press conducted digital exams for candidates who wished to record their songs and other technical work at a place of their choice. Participants submitted video recordings via Trinity's online platform for assessment by their expert examiners.",
        "Congratulations to our student Sai Deeksha of Grade 4, who participated and won the Certificate of Distinction for playing the electronic keyboard.",
      ],
    },
    {
      name: "Paruchuri Sai Shashank",
      grade: "Grade 7",
      category: "academics",
      teaser: "Ranked 13th worldwide at the International Science Olympiad, among 1.2 lakh students from 70 countries.",
      bio: [
        "Paruchuri Sai Shashank of Class 7 participated in the ILSO Olympiad and ranked 13th worldwide. A total of 1,20,000 students from 70 countries participated in this great event.",
        "We are very proud of his achievement, and we are sure he will win more prizes and bring more laurels for his parents and for his country.",
      ],
    },
  ],
};
