const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const pillarIcons: Record<string, React.ReactNode> = {
  outlook: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v3M12 18.5v3M3.8 5.8l2.1 2.1M18.1 16.1l2.1 2.1M2.5 12h3M18.5 12h3M3.8 18.2l2.1-2.1M18.1 7.9l2.1-2.1" />
    </svg>
  ),
  talent: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 4.5 14.3 9.4 19.7 10.2 15.8 13.9 16.8 19.3 12 16.7 7.2 19.3 8.2 13.9 4.3 10.2 9.7 9.4Z" strokeLinejoin="round" />
    </svg>
  ),
  safety: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3 20 6v6c0 4.6-3.2 7.9-8 9-4.8-1.1-8-4.4-8-9V6Z" strokeLinejoin="round" />
      <path d="m8.8 12.2 2.1 2.1 4.3-4.6" />
    </svg>
  ),
  community: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5a13 13 0 0 1 0 17M12 3.5a13 13 0 0 0 0 17" strokeWidth="1.1" />
    </svg>
  ),
};
