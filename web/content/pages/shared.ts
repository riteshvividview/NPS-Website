import type { InfoBandContent } from "@/components/pages/shared/InfoBand";

/** The Admission/Address/Hours/Support block the user's content repeats
 *  verbatim at the bottom of every secondary page so far. */
export const infoBandContent: InfoBandContent = {
  tagline: "Admission Open for 2026–27",
  cards: [
    {
      key: "address",
      label: "Address",
      lines: ["6-3-864, Saadat Manzil,", "Ameerpet, Hyderabad, 500016"],
    },
    {
      key: "hours",
      label: "Working Hours",
      lines: ["Monday to Saturday", "8:00 AM – 4:00 PM"],
    },
    {
      key: "support",
      label: "Support Centre",
      lines: ["Empowering minds, nurturing futures —", "a click away, always."],
    },
  ],
};
