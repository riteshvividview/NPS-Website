import styles from "./Programs.module.css";

export default function ProgramArt({ kind }: { kind: string }) {
  return (
    <div className={styles.art} data-main-art aria-hidden="true">
      {kind === "garden" && (
        <>
          <div className={styles.sun}>
            a little
            <br />
            wonder
          </div>
          <svg viewBox="0 0 500 520">
            <path
              d="M250 470V180M250 350Q100 350 100 230Q245 210 250 350M250 290Q390 280 400 170Q260 170 250 290"
              fill="#76936b"
              stroke="#214b36"
              strokeWidth="5"
            />
            <g fill="#dda16f">
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <ellipse
                  key={a}
                  cx="250"
                  cy="115"
                  rx="40"
                  ry="72"
                  transform={`rotate(${a} 250 180)`}
                />
              ))}
            </g>
            <circle cx="250" cy="180" r="44" fill="#e8c75c" />
            <path
              d="M100 470Q250 430 420 470"
              fill="none"
              stroke="#214b36"
              strokeWidth="5"
            />
          </svg>
          <span className={styles.artNote}>Curiosity grows here.</span>
        </>
      )}
      {kind === "wheel" && (
        <>
          <div className={styles.wheel}>
            {["ASK", "MAKE", "PLAY", "NOTICE", "SHARE", "GROW"].map((t, i) => (
              <span
                key={t}
                style={{ transform: `rotate(${i * 60}deg) translateY(-160px)` }}
              >
                {t}
              </span>
            ))}
            <b>
              What
              <br />
              if?
            </b>
          </div>
          <span className={styles.artNote}>
            Small questions. Big discoveries.
          </span>
        </>
      )}
      {kind === "lab" && (
        <div className={styles.notebook}>
          <small>FIELD NOTES / VI & VII</small>
          <svg viewBox="0 0 420 340">
            <g fill="none" stroke="#b9d4c6" strokeWidth="2">
              <ellipse cx="210" cy="165" rx="155" ry="60" />
              <ellipse
                cx="210"
                cy="165"
                rx="155"
                ry="60"
                transform="rotate(60 210 165)"
              />
              <ellipse
                cx="210"
                cy="165"
                rx="155"
                ry="60"
                transform="rotate(120 210 165)"
              />
            </g>
            <circle cx="210" cy="165" r="25" fill="#edb94f" />
            <circle cx="365" cy="165" r="12" fill="#edb94f" />
            <circle cx="132" cy="31" r="12" fill="#ea9677" />
            <circle cx="132" cy="299" r="12" fill="#a4c6dd" />
          </svg>
          <strong>
            Question.
            <br />
            Test. Discover.
          </strong>
          <span>OBSERVATION NO. 001</span>
        </div>
      )}
      {kind === "steps" && (
        <div className={styles.staircase}>
          {["KNOWLEDGE", "APPLICATION", "INDEPENDENCE", "POSSIBILITY"].map(
            (t, i) => (
              <div key={t} style={{ marginLeft: `${i * 9}%` }}>
                <small>0{i + 1}</small>
                {t}
              </div>
            ),
          )}
        </div>
      )}
      {kind === "belong" && (
        <>
          <svg viewBox="0 0 500 500">
            <path
              data-draw
              d="M90 370C-10 190 90 70 220 180S440 480 450 240S200 20 145 240S380 480 410 340"
              fill="none"
              stroke="#b46b4e"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <circle cx="90" cy="370" r="29" fill="#dcb47e" />
            <circle cx="410" cy="340" r="29" fill="#5f8066" />
          </svg>
          <span className={styles.artNote}>
            Different paths. Shared possibilities.
          </span>
        </>
      )}
      {kind === "stage" && (
        <div className={styles.vinyl}>
          <span>
            THE NIRAJ
            <br />
            EXPERIENCE
          </span>
          <strong>
            Find your
            <br />
            <em>rhythm.</em>
          </strong>
          <i>ART / SPORT / VOICE / PURPOSE</i>
        </div>
      )}
      {kind === "orbit" && (
        <div className={styles.orbits}>
          <i />
          <i />
          <i />
          <strong>
            XI
            <br />
            <span>&</span> XII
          </strong>
          <b>YOUR NEXT CHAPTER</b>
        </div>
      )}
      {kind === "career" && (
        <div className={styles.careerNote}>
          <small>A NOTE TO OUR NEXT EDUCATOR</small>
          <strong>
            You could be
            <br />
            the reason
            <br />a child says,
            <br />
            <em>“I can.”</em>
          </strong>
          <span>NIRAJ PUBLIC SCHOOL / HYDERABAD</span>
        </div>
      )}
      {kind === "bus" && (
        <svg viewBox="0 0 560 480">
          <path
            data-draw
            d="M20 400C190 400 30 80 260 80S370 400 540 380"
            fill="none"
            stroke="#c9a227"
            strokeWidth="8"
            strokeDasharray="12 10"
          />
          <g transform="translate(140 155) rotate(-8 140 80)">
            <rect width="280" height="155" rx="22" fill="#edbd50" />
            <path d="M20 25H260V85H20Z" fill="#193e35" />
            <path
              d="M75 25V85M130 25V85M185 25V85"
              stroke="#edbd50"
              strokeWidth="8"
            />
            <circle cx="55" cy="155" r="25" fill="#1c2b22" />
            <circle cx="225" cy="155" r="25" fill="#1c2b22" />
            <text x="25" y="126" fill="#1c2b22" fontSize="19">
              NIRAJ PUBLIC SCHOOL
            </text>
          </g>
        </svg>
      )}
    </div>
  );
}
