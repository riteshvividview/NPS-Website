const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const featureIcons: Record<string, React.ReactNode> = {
  people: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 9a3 3 0 1 0 0-6M20 20c0-2.5-2-4-4-4.5" />
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" />
    </svg>
  ),
  lightbulb: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z" />
    </svg>
  ),
};

export function QuoteMark() {
  return (
    <svg width="28" height="22" viewBox="0 0 32 24" fill="none">
      <path
        d="M13.3 0C6 2.4 1.6 8 1.6 15.2c0 5.3 3.3 8.8 7.5 8.8 3.6 0 6.2-2.7 6.2-6.1 0-3.2-2.2-5.5-5.2-5.5-.6 0-1.1.1-1.5.2C9.3 8.3 12 4.8 16.5 2.7L13.3 0Zm17 0c-7.3 2.4-11.7 8-11.7 15.2 0 5.3 3.3 8.8 7.5 8.8 3.6 0 6.2-2.7 6.2-6.1 0-3.2-2.2-5.5-5.2-5.5-.6 0-1.1.1-1.5.2C26.3 8.3 29 4.8 33.5 2.7L30.3 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
