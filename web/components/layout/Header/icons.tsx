// Small inline stroke icons for the Academics mega-menu — decorative,
// code-owned, not editable content (same treatment as every other
// decorative icon in this build).

const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none" } as const;
const stroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const megaIcons: Record<string, React.ReactNode> = {
  book: (
    <svg {...common}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" {...stroke} />
      <path d="M4 18a2.5 2.5 0 0 1 2.5-2.5H20" {...stroke} />
    </svg>
  ),
  layers: (
    <svg {...common}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" {...stroke} />
      <path d="m3 13 9 5 9-5" {...stroke} />
    </svg>
  ),
  lightbulb: (
    <svg {...common}>
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z" {...stroke} />
    </svg>
  ),
  calendar: (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="16" rx="2" {...stroke} />
      <path d="M3 10h18M8 3v4M16 3v4" {...stroke} />
    </svg>
  ),
  child: (
    <svg {...common}>
      <circle cx="12" cy="6" r="2.5" {...stroke} />
      <path d="M12 9v6M8 12l4-1 4 1M9 21l3-6 3 6" {...stroke} />
    </svg>
  ),
  grad: (
    <svg {...common}>
      <path d="m2 8 10-5 10 5-10 5-10-5Z" {...stroke} />
      <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 8v6" {...stroke} />
    </svg>
  ),
  cap: (
    <svg {...common}>
      <path d="M12 3 2 9l10 6 10-6-10-6Z" {...stroke} />
      <path d="M6 12v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5" {...stroke} />
    </svg>
  ),
  shield: (
    <svg {...common}>
      <path d="M12 3 4 6v6c0 5 3.5 7.7 8 9 4.5-1.3 8-4 8-9V6l-8-3Z" {...stroke} />
    </svg>
  ),
  people: (
    <svg {...common}>
      <circle cx="9" cy="8" r="3" {...stroke} />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 9a3 3 0 1 0 0-6M20 20c0-2.5-2-4-4-4.5" {...stroke} />
    </svg>
  ),
  award: (
    <svg {...common}>
      <circle cx="12" cy="8" r="5" {...stroke} />
      <path d="m8.5 12.5-1.5 8 5-2.5 5 2.5-1.5-8" {...stroke} />
    </svg>
  ),
  display: (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" {...stroke} />
      <path d="M8 21h8M12 16v5" {...stroke} />
    </svg>
  ),
  heart: (
    <svg {...common}>
      <path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" {...stroke} />
    </svg>
  ),
};

export function ChevronDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="m6 9 6 6 6-6" {...stroke} />
    </svg>
  );
}

export function ChevronRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="m9 6 6 6-6 6" {...stroke} />
    </svg>
  );
}

export function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" {...stroke} />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21 16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightSmall() {
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
