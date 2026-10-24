export interface ResultStat {
  label: string;
  value: string;
}

export interface ResultBand {
  range: string;
  count: string;
}

export interface SubjectTopper {
  subject: string;
  entries: string[];
}

export interface ResultTopper {
  name: string;
  detail: string;
}

export interface YearResult {
  key: string;
  yearLabel: string;
  heading: string;
  summary: string;
  stats: ResultStat[];
  bands: ResultBand[];
  toppers: ResultTopper[];
  subjectToppers?: SubjectTopper[];
  date?: string;
}

export interface StudentSpotlight {
  key: string;
  name: string;
  bio?: string[];
  works?: string[];
  comingSoon?: boolean;
}

export interface StudentsAtNpsContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
    stats: { value: number; suffix: string; label: string }[];
  };
  archiveEyebrow: string;
  archiveHeadline: string;
  archiveIntro: string;
  years: YearResult[];
  spotlightEyebrow: string;
  spotlightHeadline: string;
  spotlightIntro: string;
  spotlights: StudentSpotlight[];
}

export const studentsAtNpsContent: StudentsAtNpsContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The People", href: "#" },
    { label: "Students at NPS", href: "/the-people/students-at-nps" },
  ],
  hero: {
    eyebrow: "The People · The Archive",
    headline: "Students at NPS",
    tagline:
      "Every ICSE batch Niraj has sent into the world has carried the same result home: a cent percent pass, year after year. This is their record.",
    stats: [
      { value: 11, suffix: "", label: "Years of ICSE Results" },
      { value: 100, suffix: "%", label: "Pass Rate, Every Year" },
      { value: 30, suffix: "+", label: "Toppers Celebrated" },
    ],
  },
  archiveEyebrow: "The Results Ledger",
  archiveHeadline: "Eleven Years, One Standard",
  archiveIntro:
    "Open any year to see the numbers behind the press release — who topped the school, how the batch scored across the board, and which subjects produced a perfect 100.",
  years: [
    {
      key: "2025-26",
      yearLabel: "2025–26",
      heading: "ICSE 2025–26 Results",
      summary:
        "With immense pride, Niraj Public School celebrates its outstanding performance in the ICSE Examinations 2025–26.",
      stats: [],
      bands: [],
      toppers: [
        { name: "Y. Mokshagna Veeran", detail: "485 / 500" },
        { name: "Dhruv Kumar", detail: "484 / 500" },
        { name: "Gadde Likhith", detail: "483 / 500" },
        { name: "Siddhanth Vaidya", detail: "480 / 500" },
        { name: "Shrestha Subudhi", detail: "477 / 500" },
      ],
    },
    {
      key: "2024-25",
      yearLabel: "2024–25",
      heading: "ICSE 2024–25 Results",
      summary:
        "With immense pride and pleasure, we announce the commendable ICSE result of Niraj Public School (2024–25).",
      stats: [
        { label: "Appeared", value: "85 Students" },
        { label: "Passed", value: "85 Students" },
      ],
      bands: [
        { range: "90% and above", count: "23 Students" },
        { range: "80% – 89%", count: "35 Students" },
        { range: "70% – 79%", count: "15 Students" },
        { range: "60% – 69%", count: "04 Students" },
      ],
      toppers: [
        { name: "Zoya Khanam", detail: "97.4%" },
        { name: "K. Hasvitha Reddy", detail: "97%" },
      ],
    },
    {
      key: "2023-24",
      yearLabel: "2023–24",
      heading: "ICSE 2023–24 Results",
      summary:
        "With immense pride and pleasure, we announce the commendable ICSE result of Niraj Public School (2023–24).",
      stats: [
        { label: "Appeared", value: "77 Students" },
        { label: "Passed", value: "77 Students" },
      ],
      bands: [
        { range: "90% and above", count: "20 Students" },
        { range: "80% – 89%", count: "36 Students" },
        { range: "70% – 79%", count: "17 Students" },
        { range: "60% – 69%", count: "04 Students" },
      ],
      toppers: [
        { name: "Gamineni Aniketh", detail: "97%" },
        { name: "Medha Singh", detail: "96%" },
      ],
    },
    {
      key: "2022-23",
      yearLabel: "2022–23",
      heading: "ICSE 10th Results 2023",
      summary:
        "With immense pride and pleasure, we announce the commendable ICSE result of Niraj Public School (2022–23).",
      stats: [{ label: "Pass Percentage", value: "100%" }],
      bands: [
        { range: "90% and above", count: "25 Students" },
        { range: "80% – 89%", count: "24 Students" },
        { range: "70% – 79%", count: "09 Students" },
        { range: "60% – 69%", count: "05 Students" },
      ],
      toppers: [
        { name: "Kakkera Praneeth", detail: "97.4%" },
        { name: "Sarvagya Singh Sambyal", detail: "97%" },
      ],
    },
    {
      key: "2020-21",
      yearLabel: "2020–21",
      heading: "ICSE 2020–21 Results",
      summary:
        "We have the pleasure of announcing that Niraj Public School has secured cent percent results in the ICSE Board Examination held in 2021.",
      stats: [
        { label: "Appeared", value: "80 Students" },
        { label: "Passed", value: "80 Students" },
        { label: "Distinction", value: "80 Students" },
      ],
      bands: [
        { range: "90% and above", count: "41 Students" },
        { range: "80% – 89%", count: "37 Students" },
        { range: "70% – 79%", count: "02 Students" },
      ],
      toppers: [
        { name: "Yadlapally Shree Dhanvi", detail: "578 / 600 — 96.33%" },
        { name: "Chinna Balareddy Sri Siddharth", detail: "577 / 600 — 96.16%" },
      ],
    },
    {
      key: "2019-20",
      yearLabel: "2019–20",
      heading: "ICSE 2019–20 Results",
      summary:
        "We have the pleasure of announcing that Niraj Public School has secured cent percent results in the ICSE Board Examination held in 2019–20.",
      stats: [
        { label: "Appeared", value: "82 Students" },
        { label: "Passed", value: "82 Students" },
        { label: "Distinction", value: "79 Students" },
        { label: "First Class", value: "03 Students" },
      ],
      bands: [
        { range: "90% and above", count: "34 Students" },
        { range: "80% – 89%", count: "28 Students" },
        { range: "70% – 79%", count: "17 Students" },
        { range: "Above 60%", count: "03 Students" },
      ],
      toppers: [
        { name: "Kandru Hima Surya", detail: "City Topper & School Topper — 98.16%" },
        { name: "Jyothiraditya", detail: "School 2nd Topper — 97.3%" },
      ],
    },
    {
      key: "2019",
      yearLabel: "2019",
      heading: "ICSE 2019 Results",
      summary: "100% results — Niraj Public School, ICSE Class X, 2019.",
      stats: [
        { label: "Appeared", value: "82 Students" },
        { label: "Passed", value: "82 Students" },
        { label: "Distinction", value: "80 Students" },
        { label: "First Class", value: "02 Students" },
      ],
      bands: [],
      toppers: [
        { name: "Manasi Agarwal", detail: "School Topper I — 98.2%" },
        { name: "Tanvi Reddy Kesiredd", detail: "School Topper II — 97.8%" },
      ],
      subjectToppers: [
        { subject: "English", entries: ["Dhruv Thakker — 94%"] },
        { subject: "Hindi", entries: ["Mansi Agarwal — 98%"] },
        { subject: "Telugu", entries: ["Sumedha Sai Lakshmi — 98%", "Sai Lidvitha Leburu — 98%"] },
        { subject: "History / Civics", entries: ["Sai Mukund — 100%"] },
        { subject: "Mathematics", entries: ["1. Sai Mukund — 100%", "2. Paritosh Kumar — 98%"] },
        { subject: "Science", entries: ["Ruthvik Uttarala — 98%"] },
        { subject: "Economics", entries: ["Mansi Agarwal — 96%"] },
        { subject: "Home Science", entries: ["Shampreethi Guttikonda — 100%"] },
        {
          subject: "Computers",
          entries: ["1. Mansi Agarwal — 100%", "2. Aruno Pal Dutta — 100%", "3. Sri Sai Jhanvi Chauhan — 100%"],
        },
        {
          subject: "EVA",
          entries: [
            "1. Srivaishnavi Yaddanapudi — 100%",
            "2. Siddhart Nahata — 100%",
            "3. Sathvika Tummala — 100%",
          ],
        },
      ],
    },
    {
      key: "2017-18",
      yearLabel: "2017–18",
      heading: "ICSE 2017–18 Results",
      summary:
        "We are pleased to announce cent percent results of the Class X ICSE Examinations held during the year 2017–2018.",
      stats: [
        { label: "Appeared", value: "66 Students" },
        { label: "Passed", value: "66 Students" },
        { label: "Distinction", value: "59 Students" },
        { label: "First Class", value: "07 Students" },
      ],
      bands: [
        { range: "90% and above", count: "22 Students" },
        { range: "80% – 90%", count: "24 Students" },
        { range: "70% – 80%", count: "11 Students" },
        { range: "60% – 70%", count: "09 Students" },
      ],
      toppers: [
        { name: "Sai Lidvitha Leburu", detail: "with Sumedha — 98%" },
        { name: "Sai Lakshmi Pandravada", detail: "in Telugu — 98%" },
        { name: "Anshul Akhilesh Madurwar", detail: "98%" },
        { name: "Hashitha Doppalapudi", detail: "96%" },
      ],
    },
    {
      key: "2016-17",
      yearLabel: "2016–17",
      heading: "NPS ICSE Class X Results — 2017",
      summary:
        "We are pleased to announce cent percent results of the Class X ICSE Examinations held during the year 2016–2017.",
      stats: [
        { label: "Appeared", value: "82 Students" },
        { label: "Passed", value: "82 Students" },
        { label: "Distinction", value: "73 Students" },
        { label: "First Class", value: "09 Students" },
      ],
      bands: [
        { range: "90% and above", count: "13 Students" },
        { range: "80% – 90%", count: "37 Students" },
        { range: "70% – 80%", count: "23 Students" },
        { range: "60% – 70%", count: "09 Students" },
      ],
      toppers: [
        { name: "Sri Sarada Vyshnavi Putcha", detail: "School Topper — 95.6% (574/600)" },
        { name: "Bhavana Koka", detail: "94.83% (569/600)" },
        { name: "Deepak Pinjala", detail: "94.66% (568/600)" },
      ],
      subjectToppers: [
        {
          subject: "English",
          entries: [
            "Bhavana Koka — 94%",
            "Nandini Menon — 94%",
            "Sai Prathishta Peeta — 94%",
            "Shubham Gelera — 94%",
          ],
        },
        { subject: "Hindi", entries: ["Prakriti Prashant — 94%"] },
        { subject: "Telugu", entries: ["1. Sri Sarada Vyshnavi Putcha — 93%", "2. Yuvana C J — 93%"] },
        { subject: "History / Civics / Geography", entries: ["Sri Sarada Vyshnavi Putcha — 97%"] },
        { subject: "Mathematics", entries: ["Sonika Goud Yeada — 100%"] },
        { subject: "Science", entries: ["Sri Sarada Vyshnavi Putcha — 97%"] },
        { subject: "Economics", entries: ["Akshay Ganeshan — 89%"] },
        { subject: "Home Science", entries: ["Kasvi Nagaja Nekkanti — 93%"] },
        {
          subject: "Computers",
          entries: [
            "1. Aashay B Shah — 100%",
            "2. Deepak Pinjala — 100%",
            "3. Nishita Mandadi — 100%",
            "4. Sri Sarada Vyshnavi Putcha — 100%",
            "5. Yuvana C J — 100%",
          ],
        },
        { subject: "EVA", entries: ["Sai Krishna Rohit Divvela — 99%"] },
      ],
      date: "29.05.2017",
    },
    {
      key: "2015-16",
      yearLabel: "2015–16",
      heading: "NPS ICSE Class X Results — 2016",
      summary:
        "We are pleased to announce cent percent results of the Class X ICSE Examinations held during the year 2015–2016.",
      stats: [
        { label: "Appeared", value: "72 Students" },
        { label: "Passed", value: "74 Students" },
        { label: "Distinction", value: "67 Students" },
        { label: "First Class", value: "07 Students" },
      ],
      bands: [
        { range: "90% and above", count: "25 Students" },
        { range: "80% – 90%", count: "25 Students" },
        { range: "70% – 80%", count: "17 Students" },
        { range: "60% – 70%", count: "07 Students" },
      ],
      toppers: [
        { name: "Mehant Kammakomati", detail: "School Topper — 96% (576/600)" },
        { name: "Pranjal Sancheti", detail: "School 2nd Topper — 95.5% (573/600)" },
      ],
      subjectToppers: [
        { subject: "English", entries: ["Jahnavi Yanamadala — 95%"] },
        { subject: "Hindi", entries: ["Pranjal Sancheti — 97%"] },
        { subject: "Telugu", entries: ["Mehant Kammakomati — 96%"] },
        { subject: "History / Civics / Geography", entries: ["Pranjal Sancheti — 98%"] },
        { subject: "Mathematics", entries: ["1. Karan Mittal — 98%", "2. Ruchita Mekala — 98%"] },
        { subject: "Science", entries: ["1. Sai Vittal Batula — 95%", "2. Mehant Kammakomati — 95%"] },
        { subject: "Economics", entries: ["1. Grahita Agarwal — 94%", "2. Pranjal Sancheti — 94%"] },
        { subject: "Home Science", entries: ["Jahnavi Yanamadala — 95%"] },
        {
          subject: "Computers",
          entries: [
            "1. Mehant Kammakomati — 100%",
            "2. Ruchita Mekala — 100%",
            "3. Sai Vittal Batula — 100%",
            "4. Srivamsi Yekkala — 100%",
          ],
        },
        { subject: "EVA", entries: ["Shivangi Agarwal — 98%"] },
      ],
      date: "06.05.2016",
    },
    {
      key: "2012-13",
      yearLabel: "2012–13",
      heading: "ICSE 2012–13 Results",
      summary:
        "We are pleased to announce cent percent results for the ICSE Examinations held during the year 2012–2013.",
      stats: [
        { label: "Appeared", value: "79 Students" },
        { label: "Passed", value: "79 Students" },
        { label: "Distinction", value: "76 Students" },
        { label: "First Class", value: "03 Students" },
      ],
      bands: [
        { range: "90% and above", count: "30 Students" },
        { range: "80% – 90%", count: "30 Students" },
        { range: "70% – 80%", count: "29 Students" },
        { range: "60% – 70%", count: "03 Students" },
      ],
      toppers: [],
    },
  ],
  spotlightEyebrow: "Student Voices",
  spotlightHeadline: "Beyond the Results Sheet",
  spotlightIntro:
    "Numbers tell one story. These are the students whose work at NPS reached further — published, authored, and out in the world.",
  spotlights: [
    {
      key: "jnaneshwar-saravanan",
      name: "Jnaneshwar Saravanan",
      bio: [
        "Jnaneshwar bubbles over with enthusiasm and is curious about the different things around him, always carrying a number of questions in his mind.",
        "His story “A Day in a Pizza” appeared in the book “Out of the Cocoon,” published by Out of the Cocoon Publication.",
      ],
      works: ["The League of Superheroes", "The Adventures of Big Daddy"],
    },
    { key: "avinash-gondela", name: "Avinash Gondela", comingSoon: true },
    { key: "ps-s-vyshnavi", name: "P.S. S. Vyshnavi", comingSoon: true },
    { key: "pranitha-sridhar", name: "Pranitha Sridhar", comingSoon: true },
    { key: "ayan-bajpai", name: "Ayan Bajpai", comingSoon: true },
  ],
};
