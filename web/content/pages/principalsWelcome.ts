export interface PrincipalsWelcomeContent {
  breadcrumb: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
  };
  letter: {
    intro: string[];
    quote1: { text: string; attribution: string };
    middle: string[];
    quote2: { text: string; attribution: string };
    closing: string[];
    signoff: string;
    signatureName: string;
    signatureTitle: string;
  };
}

export const principalsWelcomeContent: PrincipalsWelcomeContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "The Place", href: "#" },
    { label: "Principal's Welcome", href: "/the-place/principals-welcome" },
  ],
  hero: {
    eyebrow: "The Place · A Message From Leadership",
    headline: "Principal's Welcome",
    tagline: "A word to every young person who will one day call Niraj their own.",
  },
  letter: {
    intro: [
      "Today I wish to address all you youngsters. Did you know that the majority of the population of India comprises young people?",
      "One of the most irredeemable assets of a person's life is his youth. What you do during this most beautiful and turbulent period lasts forever. It leaves its indelible mark on your character.",
      "What one needs as a youngster, is a role model! Sadly, there are very few leaders left whom one can look up to and identify with. You would receive guidance from every corner. But then ultimately it is your decision as to whether you want to pursue success single-mindedly or also build up your character focusing on human values. As George Sheehan says,",
    ],
    quote1: {
      text: "Happiness is different from pleasure. Happiness has something to do with struggling and enduring and accomplishing.",
      attribution: "George Sheehan",
    },
    middle: [
      "It is definitely a struggle to be responsible, disciplined, sympathetic, merciful and caring. At the age you are in, it may even be a far-off dream. But the great potential that you have, when properly guided, can bring in great results.",
      "In this race to achieve everything possible in life, please do not shun the ones who are not able to keep pace, give a helping hand and definitely do not trample them to achieve your ends. Remember what William Blake said,",
    ],
    quote2: {
      text: "No bird soars too high if he soars with his own wings.",
      attribution: "William Blake",
    },
    closing: [
      "Even the success that you achieve would be possible, thanks to the efforts of many noble hearts around you. So, with a sense of gratitude, move towards achieving your goals in life.",
    ],
    signoff: "All the best.",
    signatureName: "Mr. B. Jivitesh Reddy",
    signatureTitle: "Principal, Niraj Public School",
  },
};
