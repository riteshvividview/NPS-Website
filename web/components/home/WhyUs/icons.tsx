const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const reasonIcons: Record<string, React.ReactNode> = {
  trophy: (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
      <path d="M12 14v3M9 21h6M9.5 21c0-2 .8-3 2.5-4 1.7 1 2.5 2 2.5 4" />
    </svg>
  ),
  people: (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 9a3 3 0 1 0 0-6M20 20c0-2.5-2-4-4-4.5" />
    </svg>
  ),
  cap: (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3 2 9l10 6 10-6-10-6Z" />
      <path d="M6 12v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5M22 8v6" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3 4 6v6c0 5 3.5 7.7 8 9 4.5-1.3 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 21V10M10 21V6M16 21v-8M22 21H2" strokeLinecap="round" />
    </svg>
  ),
};
