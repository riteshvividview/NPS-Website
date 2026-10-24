/** Small original line drawings for the campus field notes. */
export default function FacilityArtwork({ title }: { title: string }) {
  return <svg viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20 139H180" opacity=".3" />
    {title === "Lunch" && <><ellipse cx="100" cy="100" rx="56" ry="18"/><path d="M44 100Q50 139 100 139Q150 139 156 100M60 75Q53 65 64 55T65 35M100 75Q93 65 104 55T105 35M140 75Q133 65 144 55T145 35"/><path d="M65 99Q101 80 135 99" opacity=".4"/></>}
    {title === "Classrooms" && <><rect x="32" y="27" width="136" height="82" rx="3"/><path d="M40 101H160M60 60h42m-42 13h72M61 109l-9 30m86-30 10 30"/><circle cx="139" cy="55" r="13"/><path d="m131 55 6 6 11-12"/></>}
    {title === "Sports" && <><circle cx="99" cy="83" r="53"/><path d="M46 83H152M99 30V136M63 44Q119 83 63 121M135 44Q79 83 135 121"/><path d="m158 34 13-10m-5 30 15-2"/></>}
    {title === "Excursions" && <><path d="m26 44 48-17 52 17 48-17V120l-48 17-52-17-48 17ZM74 27v93m52-76v93"/><path d="M52 88Q81 60 108 86T155 72" strokeDasharray="4 5"/><path d="M132 49c0-18 25-18 25 0 0 10-13 21-13 21s-12-11-12-21Z" fill="#eee9d8"/><circle cx="144" cy="47" r="4"/></>}
    {title === "Library" && <><path d="M29 47Q65 34 100 54Q135 34 171 47V123Q135 110 100 132Q65 110 29 123ZM100 54v78"/><path d="M43 67q22-6 43 6m-43 12q22-6 43 6m-43 12q22-6 43 6m28-42q22-6 43-6m-43 24q22-6 43-6m-43 24q22-6 43-6" opacity=".5"/></>}
    {title === "Labs" && <><path d="M76 27H124M83 27V67L49 120Q43 135 59 138H141Q157 135 151 120L117 67V27"/><path d="M65 101h70"/><circle cx="91" cy="116" r="6"/><circle cx="114" cy="91" r="4"/><circle cx="99" cy="68" r="3"/><path d="M150 37v18m-9-9h18M42 67v12m-6-6h12"/></>}
    {title === "Carpentry" && <><path d="m64 33 26-11 53 52-23 24-22-23-50 56-18-16 52-56Z"/><path d="m130 99 39 39H89Z"/><path d="m132 115 14 14h-28ZM40 147H172"/><path d="m148 35 11-12m-1 31h17"/></>}
  </svg>;
}
