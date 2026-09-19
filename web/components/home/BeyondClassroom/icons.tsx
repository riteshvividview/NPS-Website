const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const slideIcons: Record<string, React.ReactNode> = {
  palette: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2s-.5-1.5-.5-2 .5-1 1.5-1h1a5 5 0 0 0 5-5 10 10 0 0 0-9-10Z" />
      <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  ball: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5 15.5 10l-1.3 4h-4.4L8.5 10 12 7.5ZM12 3v4.5M12 20.5V16.5M3.5 9.5 8.5 10M20.5 9.5 15.5 10M6 18l2.4-4M18 18l-2.4-4" />
    </svg>
  ),
  music: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </svg>
  ),
  flask: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3" />
      <path d="M7.5 15h9" />
    </svg>
  ),
  compass: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-1.5 5-5 1.5 1.5-5 5-1.5Z" />
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" />
    </svg>
  ),
  map: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="M9 4 3 6.5v14L9 18l6 2.5L21 18V4l-6 2.5L9 4Z" />
      <path d="M9 4v14M15 6.5v14" />
    </svg>
  ),
  flag: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="M5 21V4" />
      <path d="M5 4h13l-3 4.5L18 13H5" />
    </svg>
  ),
  dance: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="4" r="1.8" fill="currentColor" stroke="none" />
      <path d="M12 6.5v6M12 12.5 7 15M12 12.5l5 2M9 22l3-7 3 7" />
    </svg>
  ),
};

export const statIcons: Record<string, React.ReactNode> = {
  trophy: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
      <path d="M12 14v3M9 21h6M9.5 21c0-2 .8-3 2.5-4 1.7 1 2.5 2 2.5 4" />
    </svg>
  ),
  people: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 9a3 3 0 1 0 0-6M20 20c0-2.5-2-4-4-4.5" />
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
      <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3-4.8-4.3 6.4-.6Z" />
    </svg>
  ),
};

export function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

export function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
