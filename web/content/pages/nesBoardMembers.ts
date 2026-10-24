export interface BoardMember {
  key: string;
  name: string;
  designation: string;
  icon: string;
}

export interface BoardTier {
  key: string;
  tierLabel: string;
  members: BoardMember[];
}

export interface NesBoardMembersContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
    stats: { value: number; suffix: string; label: string }[];
  };
  chartEyebrow: string;
  chartHeadline: string;
  chartIntro: string;
  tiers: BoardTier[];
}

export const nesBoardMembersContent: NesBoardMembersContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The People", href: "#" },
    { label: "NES Board Members", href: "/the-people/nes-board-members" },
  ],
  hero: {
    eyebrow: "The People · Governance",
    headline: "NES Board Members",
    tagline:
      "The Niraj Educational Society's governing board — the people who steward Niraj Public School's direction, standards, and future.",
    stats: [
      { value: 8, suffix: "", label: "Board Members" },
      { value: 1, suffix: "", label: "Chairman" },
      { value: 39, suffix: "+", label: "Years of Governance" },
    ],
  },
  chartEyebrow: "The Governing Board",
  chartHeadline: "How the Board is Structured",
  chartIntro:
    "From chairmanship down to general membership, the board that oversees the Niraj Educational Society and Niraj Public School.",
  tiers: [
    {
      key: "chairman",
      tierLabel: "President / Chairman",
      members: [{ key: "b-jyothi-reddy", name: "B. Jyothi Reddy", designation: "President / Chairman", icon: "fa-chess-king" }],
    },
    {
      key: "life-members",
      tierLabel: "Life Members",
      members: [
        { key: "b-jivitesh-reddy", name: "B. Jivitesh Reddy", designation: "Life Member", icon: "fa-gem" },
        { key: "b-gavish-reddy", name: "B. Gavish Reddy", designation: "Life Member", icon: "fa-gem" },
      ],
    },
    {
      key: "secretary",
      tierLabel: "General Secretary",
      members: [
        { key: "sangeeta-raghuram", name: "Sangeeta Raghuram", designation: "General Secretary", icon: "fa-feather-pointed" },
      ],
    },
    {
      key: "members",
      tierLabel: "Members",
      members: [
        { key: "rj-debara", name: "R. J. Debara", designation: "Member", icon: "fa-user" },
        { key: "sam-bhagat", name: "Sam Bhagat", designation: "Member", icon: "fa-user" },
        { key: "sujatha-kumar", name: "Sujatha Kumar", designation: "Member", icon: "fa-user" },
        { key: "saritha-kumar", name: "Saritha Kumar", designation: "Member", icon: "fa-user" },
      ],
    },
  ],
};
