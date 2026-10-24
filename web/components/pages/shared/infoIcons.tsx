const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/** Used by InfoBand (Admission/Address/Hours/Support) — shared across every
 *  secondary page, since that block repeats verbatim per the content the
 *  user sends for each one. */
export const infoIcons: Record<string, React.ReactNode> = {
  address: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  ),
  hours: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  support: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" strokeLinejoin="round" />
      <path d="M20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" strokeLinejoin="round" />
      <path d="M9 19a3 3 0 0 0 3 2" />
    </svg>
  ),
  admissions: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <path d="M3 5.5c3.2-1.2 6.2-.6 9 1.6v13c-2.8-2.2-5.8-2.8-9-1.6z" />
      <path d="M21 5.5c-3.2-1.2-6.2-.6-9 1.6v13c2.8-2.2 5.8-2.8 9-1.6z" />
    </svg>
  ),
  visit: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  enquiries: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1z" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6V20h-3" />
    </svg>
  ),
};
