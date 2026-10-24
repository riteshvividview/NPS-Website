import styles from "./EditorialHero.module.css";

export type ArtworkKind = "campus" | "honours" | "achievers" | "authors" | "leadership" | "students" | "board" | "visitors";

/** Original vector artwork: symbolic illustrations, never substitute student portraits. */
export default function EditorialArtwork({ kind }: { kind: ArtworkKind }) {
  return (
    <svg className={styles.illustration} viewBox="0 0 560 460" fill="none" aria-hidden="true">
      <circle cx="280" cy="224" r="185" fill="currentColor" opacity=".055" />
      <circle cx="280" cy="224" r="208" stroke="currentColor" opacity=".15" strokeDasharray="2 9" />
      <path d="M38 390H522M280 22V42M280 409V429M61 224H81M479 224H499" stroke="currentColor" opacity=".35" />
      {kind === "campus" && <g stroke="currentColor" strokeWidth="2">
        <path d="M86 339 270 416 482 309 302 242Z" fill="#e3d9bf" stroke="none" />
        <path d="M123 196 268 130 430 202 282 275Z" fill="#fffaf0" />
        <path d="M123 196V315L282 385V275Z" fill="#d4dfcc" />
        <path d="M282 275 430 202V314L282 385Z" fill="#aec6b2" />
        <path d="M155 199 270 149 398 204 282 258Z" fill="#f7f3ea" />
        {[0,1,2,3].map(i => <g key={i}><path d={`M${144+i*32} ${227+i*14}v28l17 8v-28Z`} fill="#47765b"/><path d={`M${144+i*32} ${275+i*14}v22l17 8v-22Z`} fill="#47765b"/></g>)}
        {[0,1,2].map(i => <path key={i} d={`M${310+i*34} ${277-i*17}v28l18-9v-28Z`} fill="#47765b"/>)}
        <path d="M278 129V75L329 87 278 101" fill="#c9a227" />
        <path d="M333 360v-40l32-16v40" fill="#244b37" />
        <path d="M94 321v-73M457 333v-86" /><ellipse cx="94" cy="237" rx="27" ry="40" fill="#6e936c"/><ellipse cx="457" cy="234" rx="30" ry="45" fill="#6e936c"/>
        <path d="M193 97 209 91 226 97M360 125 374 119 388 125" />
      </g>}
      {kind === "honours" && <g stroke="currentColor" strokeWidth="2">
        <path d="M186 360H374V389H186Z" fill="#d6c9a9"/><path d="M211 335H349V361H211Z" fill="#eee2c8"/>
        <path d="M263 238H297V320H263Z" fill="#c9a227"/><path d="M234 320H326V337H234Z" fill="#dfbf5b"/>
        <path d="M195 128H365V168Q365 248 280 265Q195 248 195 168Z" fill="#ddbd5a"/>
        <path d="M195 145H155V175Q155 222 224 222M365 145H405V175Q405 222 336 222" strokeWidth="13"/>
        <path d="M280 160 291 184 318 187 298 206 303 232 280 220 257 232 262 206 242 187 269 184Z" fill="#fff8dc" stroke="none"/>
        <path d="m154 99 11-19m230 19-11-19M280 66v25M111 265l21-7m315 7-21-7" stroke="#c9a227" strokeWidth="4"/>
        <path d="m144 309-25 32m292-32 25 32" strokeDasharray="4 6"/>
      </g>}
      {kind === "achievers" && <g stroke="currentColor" strokeWidth="2">
        <path d="m144 239 136-131 143 125-143 119Z" strokeDasharray="6 7"/>
        <circle cx="280" cy="229" r="89" fill="#f3e5b5"/><circle cx="280" cy="229" r="74"/>
        <path d="m280 178 15 32 35 5-25 25 6 35-31-17-31 17 6-35-25-25 35-5Z" fill="#c9a227" stroke="none"/>
        <path d="m235 306-19 72 49-23 16 23 11-66M294 314l19 64 17-28 34 12-34-69" fill="#2f6b46"/>
        <circle cx="144" cy="239" r="29" fill="#e5edf0"/><path d="m132 239 9 9 17-20"/>
        <circle cx="280" cy="102" r="29" fill="#f8e3d2"/><path d="M271 113V92l20-4v21m-20 0-9 3m29-7-9 3"/>
        <circle cx="423" cy="233" r="29" fill="#d4dfcc"/><path d="m411 244 25-25m-25 0 25 25"/>
      </g>}
      {(kind === "authors" || kind === "visitors") && <g stroke="currentColor" strokeWidth="2">
        <path d="M108 162 274 193 445 143V328L279 387 108 348Z" fill="#294d3b"/>
        <path d="M119 146Q193 129 279 178Q354 122 432 129V312Q354 307 279 364Q201 321 119 330Z" fill="#fffbef"/>
        <path d="M279 178V364"/><path d="M129 156Q206 150 267 187M292 186Q362 140 422 141" opacity=".4"/>
        {[0,1,2,3,4].map(i=><g key={i} opacity=".35"><path d={`M146 ${202+i*21}q57-2 103 25`}/><path d={`M310 ${204+i*21}q47-32 94-30`}/></g>)}
        <path d="M278 179 301 165V268L289 261 278 277Z" fill="#c9a227" stroke="none"/>
        {kind === "authors" ? <><path d="M362 99Q389 22 466 62Q445 132 362 153Z" fill="#aec6b2"/><path d="m332 188 114-112m-61 67 32-3m-15-20 5-24"/></> : <><circle cx="400" cy="104" r="53" fill="#e8dbc0"/><circle cx="400" cy="104" r="43" strokeDasharray="3 4"/><path d="m382 104 12 12 25-27" strokeWidth="4"/></>}
        <path d="m153 94 9 18 20 3-14 14 3 20-18-9-18 9 4-20-15-14 20-3Z" fill="#c9a227" stroke="none"/>
      </g>}
      {kind === "leadership" && <g stroke="currentColor" strokeWidth="2">
        <circle cx="280" cy="228" r="151" fill="#e4eaeb"/><circle cx="280" cy="228" r="130"/><circle cx="280" cy="228" r="114" strokeDasharray="1 11"/>
        <path d="m280 89 8 16h-16ZM280 367l-8-16h16ZM141 228l16-8v16ZM419 228l-16 8v-16Z" fill="#c9a227" stroke="none"/>
        <g transform="rotate(28 280 228)"><path d="m280 120 30 108-30 108-30-108Z" fill="#fffaf0"/><path d="m280 120 30 108-30 1Z" fill="#2f6fa3"/><path d="m280 336-30-108 30 1Z" fill="#c9a227"/></g>
        <circle cx="280" cy="228" r="12" fill="#f7f3ea"/><path d="M109 361Q281 433 451 361" strokeDasharray="5 7"/>
        <path d="M107 361v-29m0 29 28-4M453 361v-29m0 29-28-4"/>
      </g>}
      {kind === "students" && <g stroke="currentColor" strokeWidth="2">
        <path d="M133 117 395 90 423 351 160 379Z" fill="#dfd3b6"/><path d="M149 101H412V356H149Z" fill="#fffaf0"/>
        <path d="M179 142H380M179 164H302M179 316H380" opacity=".35"/>
        <path d="M194 289V247H226V289M249 289V217H281V289M304 289V180H336V289" fill="#acc4af"/>
        <path d="m190 229 73-43 76-37" stroke="#a57923" strokeDasharray="4 5"/>
        <circle cx="393" cy="316" r="52" fill="#f3e5b5"/><circle cx="393" cy="316" r="40" strokeDasharray="3 4"/><path d="m374 316 13 13 27-30" strokeWidth="4"/>
        <path d="m107 179-26 111 12 18 18-12 25-110Z" fill="#8a2a2a"/><path d="m81 290 12 18 18-12" fill="#c9a227"/>
      </g>}
      {kind === "board" && <g stroke="currentColor" strokeWidth="2">
        <path d="M280 370V129M280 215l-100-52M280 244l100-52M280 294l-123-49M280 332l130-54" strokeWidth="5"/>
        <path d="M280 151Q227 111 280 58Q333 111 280 151Z" fill="#c9a227"/>
        <path d="M185 166Q112 180 117 103Q187 98 185 166Z" fill="#afbba4"/>
        <path d="M371 199Q370 123 446 137Q440 207 371 199Z" fill="#b6aec9"/>
        <path d="M161 250Q84 258 92 184Q164 180 161 250Z" fill="#b6aec9"/>
        <path d="M401 283Q398 213 468 219Q471 287 401 283Z" fill="#afbba4"/>
        <path d="M227 385Q280 355 333 385M207 397H353"/>
        <circle cx="280" cy="215" r="9" fill="#fffaf0"/><circle cx="280" cy="294" r="9" fill="#fffaf0"/>
      </g>}
      <g fill="currentColor" opacity=".45"><circle cx="102" cy="126" r="3"/><circle cx="466" cy="170" r="3"/><circle cx="371" cy="52" r="3"/></g>
    </svg>
  );
}
