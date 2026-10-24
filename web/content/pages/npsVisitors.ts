export type VisitorCategory = "Dignitary" | "Government & Civic" | "Sports" | "Arts & Culture" | "Education" | "Spiritual";

export interface Visitor {
  key: string;
  date: string;
  name: string;
  place?: string;
  category: VisitorCategory;
}

export interface VisitorEra {
  key: string;
  label: string;
  visitors: Visitor[];
}

export interface CategoryMeta {
  key: VisitorCategory;
  icon: string;
}

export interface NpsVisitorsContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
    stats: { value: number; suffix: string; label: string }[];
  };
  timelineEyebrow: string;
  timelineHeadline: string;
  timelineIntro: string;
  categories: CategoryMeta[];
  eras: VisitorEra[];
}

export const categoryMeta: CategoryMeta[] = [
  { key: "Dignitary", icon: "fa-user-tie" },
  { key: "Government & Civic", icon: "fa-landmark" },
  { key: "Sports", icon: "fa-trophy" },
  { key: "Arts & Culture", icon: "fa-masks-theater" },
  { key: "Education", icon: "fa-graduation-cap" },
  { key: "Spiritual", icon: "fa-om" },
];

export const npsVisitorsContent: NpsVisitorsContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The People", href: "#" },
    { label: "NPS Visitors", href: "/the-people/nps-visitors" },
  ],
  hero: {
    eyebrow: "The People · The Guest Book",
    headline: "NPS Visitors",
    tagline:
      "Twenty years of guests who walked through Niraj's gates — cricketers, actors, civil servants, and educators who left their names in our book.",
    stats: [
      { value: 32, suffix: "", label: "Guest Book Entries" },
      { value: 20, suffix: "+", label: "Years Recorded" },
      { value: 6, suffix: "", label: "Walks of Life" },
    ],
  },
  timelineEyebrow: "The Guest Book",
  timelineHeadline: "Two Decades of Visitors",
  timelineIntro:
    "Filter by who they were, or scroll the full timeline — every name entered in the Niraj Public School guest book since 1995.",
  categories: categoryMeta,
  eras: [
    {
      key: "1995-2000",
      label: "1995 – 2000",
      visitors: [
        { key: "v1", date: "14/8/1995", name: "Mr. B. Ramendar Reddy, B.S.", place: "USA", category: "Dignitary" },
        {
          key: "v2",
          date: "2/8/1995",
          name: "Mr. David M. Smith — Illinois",
          place: "USA",
          category: "Arts & Culture",
        },
        { key: "v3", date: "11/11/1995", name: "Amala Akkineni (Indian Actress)", category: "Arts & Culture" },
        {
          key: "v4",
          date: "11/11/1995",
          name: "Mr. Zaher Russels, MD of Russels Spoken English Classes",
          category: "Education",
        },
        {
          key: "v5",
          date: "10/6/1999",
          name: "Mr. K. Vidyadhar Rao, Govt. of A.P. Minister (Agriculture, Sugar)",
          category: "Government & Civic",
        },
        { key: "v6", date: "26/6/1999", name: "Mr. NRK Murthy, Advisor", category: "Dignitary" },
        {
          key: "v7",
          date: "26/6/1999",
          name: "Mr. J. V. Mukhed Kar, Dy. G.M. Engg., Hyderabad Metro Water Works",
          category: "Government & Civic",
        },
        { key: "v8", date: "27/11/1999", name: "Collector Shri Bhansarlal, I.A.S.", category: "Government & Civic" },
        { key: "v9", date: "23/3/2000", name: "Ms. Diya Mirza, India Asia Pacific", category: "Arts & Culture" },
      ],
    },
    {
      key: "2001-2005",
      label: "2001 – 2005",
      visitors: [
        {
          key: "v10",
          date: "11/8/2001",
          name: "Mr. Mohd. Azharuddin — Indian Cricket Captain, Niraj Cricket Academy",
          category: "Sports",
        },
        { key: "v11", date: "23/4/2005", name: "Mr. Bishen Singh Bedi, Cricketer", category: "Sports" },
        { key: "v12", date: "23/4/2005", name: "Ms. Mithali Raj, Cricketer", category: "Sports" },
        { key: "v13", date: "23/4/2005", name: "Mr. Ajit Wadikar, Cricketer", category: "Sports" },
        { key: "v14", date: "23/4/2005", name: "Mr. Cletan Chauhan, Cricketer", category: "Sports" },
        {
          key: "v15",
          date: "23/4/2005",
          name: "Mr. C. V. Anand — IPS, DIG, CID, AP",
          category: "Government & Civic",
        },
        {
          key: "v16",
          date: "25/8/2005",
          name: "Mr. K. Chandrasekhar Rao, AP GENCO",
          category: "Government & Civic",
        },
        {
          key: "v17",
          date: "22/11/2003",
          name: "Mr. C. V. Anand, Dy. Commissioner of Police",
          category: "Government & Civic",
        },
        { key: "v18", date: "22/11/2003", name: "Mr. Iqbal Ali — well-known Environmentalist", category: "Dignitary" },
      ],
    },
    {
      key: "2005-2010",
      label: "2005 – 2010",
      visitors: [
        {
          key: "v19",
          date: "2005–2006",
          name: "Mr. G. Kamala Vardhan Rao — IAS, Managing Director & Vice Chairman of SAAP",
          category: "Government & Civic",
        },
        {
          key: "v20",
          date: "2006–2007",
          name: "Mrs. Sarala Nair, Principal & Director of Studies, Mukkaram Jha Schools",
          category: "Education",
        },
        { key: "v21", date: "2006–2007", name: "Swami Anupamananda — Rama Krishna Mutt", category: "Spiritual" },
        {
          key: "v22",
          date: "2006–2007",
          name: "Mr. Manohar M., Assembly Library Committee",
          category: "Government & Civic",
        },
        {
          key: "v23",
          date: "2008–2009",
          name: "Mr. N. Rangachary — Advisor to Govt. of A.P.",
          category: "Government & Civic",
        },
        { key: "v24", date: "2009–2010", name: "Mr. Viraf Dalal", category: "Dignitary" },
      ],
    },
    {
      key: "2012-2015",
      label: "2012 – 2015",
      visitors: [
        {
          key: "v25",
          date: "2012",
          name: "Our Principal Mr. Jivitesh Reddy visited IOWA University",
          category: "Education",
        },
        {
          key: "v26",
          date: "2012",
          name: "Ballet Performance, Dept. of Dance, IOWA University",
          place: "USA",
          category: "Arts & Culture",
        },
        {
          key: "v27",
          date: "2012",
          name: "The Director of Atomic Minerals, Directorate for Exploration & Research, Parihar",
          category: "Government & Civic",
        },
        {
          key: "v28",
          date: "2013",
          name: "Derek O'Brien — Vodafone India Quizmath, with Mr. Ramender Reddy",
          category: "Education",
        },
        {
          key: "v29",
          date: "2013",
          name: "Albert Pikes — Inter-School Basketball Championship",
          category: "Sports",
        },
        { key: "v30", date: "2013", name: "Dr. Raj Gopal of IOWA", category: "Education" },
        {
          key: "v31",
          date: "2014–2015",
          name: "Ms. K. Jyothi Sri — HM & NASR Primary School",
          category: "Education",
        },
        {
          key: "v32",
          date: "2014–2015",
          name: "Mr. Megha Sen, Principal of St. Martin's School",
          category: "Education",
        },
      ],
    },
  ],
};
