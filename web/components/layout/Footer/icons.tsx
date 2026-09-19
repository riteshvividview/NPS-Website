const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2H8v3.5h2V22h3.5v-7.5H16l.5-3.5h-3V9c0-.5.3-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8 11.5v6M12 17.5v-3.7c0-1.4 1-2.3 2.3-2.3 1.2 0 1.7.9 1.7 2.3v3.7" />
    </svg>
  ),
};

export const contactIcons: Record<string, React.ReactNode> = {
  location: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  phone: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
};

export function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LeafMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 20c8 0 16-6 16-16C10 4 4 12 4 20Z" />
      <path d="M4 20c4-4 8-8 16-16" />
    </svg>
  );
}
