export interface Leader {
  key: string;
  name: string;
  title: string;
  qualifications?: string;
  bio: string[];
  photo?: string;
}

export interface SchoolLeadershipContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
  };
  listEyebrow: string;
  listHeadline: string;
  listIntro: string;
  leaders: Leader[];
  hodTeaser: {
    headline: string;
    text: string;
  };
}

export const schoolLeadershipContent: SchoolLeadershipContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The People", href: "#" },
    { label: "School Leadership", href: "/the-people/school-leadership" },
  ],
  hero: {
    eyebrow: "The People · Leadership",
    headline: "School Leadership",
    tagline: "The six people steering Niraj Public School — from the Director's office to the pre-primary wing.",
  },
  listEyebrow: "Meet the Team",
  listHeadline: "Explore Our Leadership",
  listIntro: "Select a name to read their profile in full — no accordions to open, just one tap or click.",
  leaders: [
    {
      key: "director",
      name: "Mr. B. Jivitesh Reddy",
      title: "Director, Niraj Educational Society",
      qualifications: "B.E.",
      bio: [
        "The young, dynamic Director of Niraj Public School is a man with vision. Improving the infrastructure, child-centred learning, and making learning a pleasurable experience are all what he firmly believes in.",
        "He is the man who is at the helm of affairs — smart and suave, pleasant-natured, with a disarming smile, he handles all matters with firmness and tact. He has made the classrooms colourful and equipped them with the latest projectors.",
        "A sportsman from his school days onwards, he plays cricket and believes in encouraging team spirit amongst the teachers.",
      ],
    },
    {
      key: "lakshmi-krishnan",
      name: "Dr. (Mrs.) Lakshmi Krishnan",
      title: "Vice Principal — Senior School",
      qualifications: "M.Sc., M.Phil., Ph.D., B.Ed.",
      bio: [
        "Extremely confident, dignified, and perpetually smiling, our Vice Principal (Senior School) and Academic Head for Grades VI–XII has twenty-nine years of experience in the field of education.",
        "She has a deep insight into psychology and provides counselling to mould and shape student behaviour, conducting herself always with poise, dignity and confidence.",
        "With an objective of securing outstanding board results, she looks into every aspect of high-school academics from Grade 6 to Grade 12 — taking a keen interest in co-curricular activities, subject activities and competitions at every level, and motivating students to bring home awards and prizes.",
        "She has guided the Special Education Department and mainstreamed students with learning difficulties into the ICSE curriculum, helping them access every benefit the board provides. She believes firmly in instilling sound values, disciplining mind and body, and encouraging positive thinking.",
      ],
    },
    {
      key: "sunitha-srinivas",
      name: "Mrs. D. Sunitha Srinivas",
      title: "Vice Principal",
      bio: [
        "She comes with over 20 years of rich administrative and academic experience, with an extensive educational background completing an MBA, PGDBM and B.Ed.",
        "Her experience stretches across various positions and levels of school administration. She is dedicated and passionate about improving and perfecting the nuances for the betterment of the students.",
        "She has an ever-positive outlook and is very resourceful in dealing with any situation.",
      ],
    },
    {
      key: "jayalakshmi",
      name: "T. Jayalakshmi",
      title: "Middle School Co-ordinator & Academic Quality Check",
      qualifications: "M.A. (English Literature), M.Sc. (Botany), B.Ed.",
      bio: [
        "An accomplished education professional with over two decades of distinguished experience in teaching and academic administration, recognised for exemplary leadership in curriculum design, academic supervision, and faculty development — consistently upholding high standards of teaching and learning.",
        "Her qualifications reflect a strong interdisciplinary academic foundation, spanning literature and the sciences alongside her training in education.",
        "She possesses profound academic insight with a proven ability to mentor both students and educators effectively — adept at teacher training, student guidance, and curriculum innovation, while fostering a dynamic, learner-centric environment and remaining committed to continuous professional growth and academic excellence.",
      ],
    },
    {
      key: "uma-das",
      name: "Uma Das",
      title: "Primary Co-ordinator",
      qualifications: "M.A., B.Ed., CIDTT",
      bio: [
        "A kind disciplinarian who is very patient and gracious with the tiny tots of the primary block, she observes and harmonises the bond between children and teachers.",
        "She has rich experience as an academician spanning more than 20 years, having worked in several schools affiliated to ICSE, CBSE and Cambridge curricula.",
        "She is responsible for implementing discipline, inculcating moral values, and excelling in academics across the primary wing — a born leader possessing the gift of the gab.",
      ],
    },
    {
      key: "mitchelle-michael",
      name: "Mrs. Mitchelle Michael",
      title: "Pre-Primary Co-ordinator",
      bio: [
        "Mrs. Mitchelle Michael is the in-charge for the Pre-Primary section of Niraj Public School.",
        "An efficient administrator, she is very involved in her work — cheerful and genial, she is a dynamic lady and a true asset to the institution.",
      ],
    },
  ],
  hodTeaser: {
    headline: "The Heads of Departments",
    text: "Individual department-head profiles are on their way — check back soon.",
  },
};
