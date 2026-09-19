const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const pillarIcons: Record<string, React.ReactNode> = {
  independence: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-4.2 1.8L9 15l4.2-1.8L15 9Z" strokeLinejoin="round" />
    </svg>
  ),
  curiosity: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20 15.4 15.4M8.5 8a2.5 2.5 0 0 1 3.7 2.2c0 1.7-2.2 1.6-2.2 3.3" strokeWidth="1.1" />
      <circle cx="10.2" cy="15.1" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  criticalThinking: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <path d="M9 3.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 3 3.8 2.5 2.5 0 0 1 0 4.4 2.5 2.5 0 0 1-3 3.8 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-3-3.8 2.5 2.5 0 0 1 0-4.4A2.5 2.5 0 0 1 9 3.5Z" />
      <path d="M11.5 3.5v17" strokeWidth="1" />
    </svg>
  ),
  collaboration: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="12" r="6.5" />
      <circle cx="15" cy="12" r="6.5" />
    </svg>
  ),
};

export function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
