export default function AuthorInk({kind = "quill", className}: {kind?: "quill" | "spark" | "trail"; className?: string}) {
  return <svg className={className} viewBox="0 0 360 220" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {kind === "quill" ? <>
      <g data-story-parallax><path data-story-ink d="M142 166C152 88 214 34 298 26C292 105 228 154 163 149L142 166ZM142 166L276 43M174 132L172 97M196 111L234 108M218 87L219 61M242 65L269 65"/><path data-story-ink d="M128 168H166L178 202H114L128 168ZM134 161H160V168H134Z"/></g>
      <path data-story-ink d="M33 190C49 160 89 163 84 181C80 199 49 202 51 184C55 166 96 188 112 176" stroke="#b68a4b"/>
      <path data-story-ink d="M74 72V91M65 81H84M318 128V140M312 134H324" stroke="#b68a4b"/>
    </> : kind === "spark" ? <>
      <g data-story-parallax><path data-story-ink d="M116 158C116 129 96 122 96 91C96 48 128 23 164 23C201 23 231 51 231 91C231 119 210 132 210 158ZM123 173H203M131 186H196M145 198H183M147 157V108L131 91L150 82L164 98L179 82L196 91L180 108V157"/><path data-story-ink d="M163 2V11M64 33L78 48M45 92H65M252 34L239 48M264 92H285" stroke="#b68a4b"/></g>
      <path data-story-ink d="M245 161Q274 125 316 138L309 189Q278 177 245 197ZM245 161Q217 132 188 139M245 161V197M260 159Q283 149 301 155M260 171Q282 161 298 167" stroke="#b68a4b"/>
    </> : <>
      <path data-story-ink d="M17 165C66 198 115 191 118 157C119 119 61 128 83 158C112 197 214 141 270 64" stroke="#b68a4b"/>
      <g data-story-parallax><path data-story-ink d="M217 67L320 27L281 120L263 84L240 100L243 76ZM243 76L320 27L263 84"/></g>
      <path data-story-ink d="M170 48L174 60L187 64L174 68L170 81L166 68L153 64L166 60Z"/>
    </>}
  </svg>;
}
