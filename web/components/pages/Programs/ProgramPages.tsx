import {
  GardenScene,
  StoryScene,
  BalanceScene,
  ProjectScene,
  BelongingScene,
  StageScene,
} from "./LearningScenes";
import type { ReactNode } from "react";
import ProgramMotion from "./ProgramMotion";
import ProgramArt from "./ProgramArt";
import {
  ActivityMixer,
  DiscoveryWheel,
  LabChallenge,
  NextProgram,
  SubjectPlanner,
  WonderSeed,
} from "./LearningTools";
import s from "./Programs.module.css";

export const programNames: Record<string, string> = {
  "pre-primary-school": "Pre-Primary School",
  "primary-school": "Primary School",
  "middle-school": "Middle School",
  "high-school": "High School",
  "special-section": "Special Section",
  "cca-department": "CCA Department",
};
export const applicationUrl =
  "https://niraj.myclassboard.com/ApplicationForm_Custom/09F71BA1-820B-4595-8D20-E0AAF4A95CAA/1/";

function Hero({
  name,
  title,
  description,
  art,
  className = "",
  foot = "LEARN · GROW · BELONG",
}: {
  name: string;
  title: ReactNode;
  description: string;
  art: string;
  className?: string;
  foot?: string;
}) {
  return (
    <section className={`${s.hero} ${className}`} data-program-stage data-light>
      <div className={s.heroCopy} data-hero-copy>
        <span className={s.eyebrow}>NPS PROGRAMS / {name}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className={s.heroFoot}>
          <a className={s.button} href="#discover">
            Explore the programme &darr;
          </a>
          <small>{foot}</small>
        </div>
      </div>
      <ProgramArt kind={art} />
    </section>
  );
}
export function List({ items }: { items: string[] }) {
  return (
    <ul className={s.lineList}>
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}
function Activities({
  items,
  title = "Learning, in all its forms.",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <section className={s.section}>
      <span className={s.eyebrow}>BEYOND THE LESSON</span>
      <h2 data-enter>{title}</h2>
      <div className={s.activityGrid}>
        {items.map((x, i) => (
          <div key={x} data-enter>
            <small>EXPERIENCE / {String(i + 1).padStart(2, "0")}</small>
            <strong>{x}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Ending({ next, label }: { next: string; label: string }) {
  return (
    <aside className={s.cta}>
      <div>
        <small>YOUR CHILD’S NEXT CHAPTER</small>
        <h2>
          A place to learn.
          <br />A place to belong.
        </h2>
        <div className={s.heroFoot}>
          <a className={`${s.button} ${s.solid}`} href={applicationUrl}>
            Explore admissions ↗
          </a>
        </div>
      </div>
      <NextProgram href={next} label={label} />
    </aside>
  );
}

function PrePrimary() {
  return (
    <>
      <Hero
        name="PRE-PRIMARY SCHOOL"
        title={
          <>
            Little wonders.
            <br />
            <em>Limitless beginnings.</em>
          </>
        }
        description="A first school experience filled with play, discovery and the joy of making sense of the world."
        art="garden"
        foot="THE FOUNDATIONAL YEARS"
      />
      <section id="discover" className={`${s.section} ${s.intro}`}>
        <div data-enter>
          <span className={s.eyebrow}>ROOTED IN CURIOSITY</span>
          <h2>
            The child is
            <br />
            the curriculum.
          </h2>
        </div>
        <div data-enter>
          <p>
            Through our partnership with Nature Nurture Eduserv Pvt. Ltd.,
            learning begins with each child’s experiences, interests and
            potential. The integrated thematic approach connects what children
            already know with new ideas across literacy, numeracy and social
            development.
          </p>
          <p>
            Aligned with NEP 2020 and the NCF 2022 foundational framework, it
            brings together hands-on exploration, play and meaningful
            relationships. Nature Nurture supports learning from nursery through
            Grade III.
          </p>
        </div>
      </section>
      <div>
        <section className={`${s.section} ${s.cover}`} data-cover-panel>
          <span className={s.bigIndex}>01</span>
          <span className={s.eyebrow}>NOTICE</span>
          <h2>
            A world to
            <br />
            wonder about.
          </h2>
          <p>
            Children learn through all their senses. Stories, movement, real
            objects and everyday experiences open pathways into language,
            numbers, ecology and life skills.
          </p>
          <WonderSeed />
        </section>
        <section className={`${s.section} ${s.cover}`} data-cover-panel>
          <span className={s.bigIndex}>02</span>
          <span className={s.eyebrow}>EXPLORE</span>
          <h2>
            Hands busy.
            <br />
            Minds growing.
          </h2>
          <p>
            Learning by doing, a multi-sensory approach and multiple
            intelligences make room for different ways of understanding. Guided
            activities connect communication, relationships and respect for
            living things with age-appropriate technology and real-life
            learning.
          </p>
          <List
            items={[
              "Learning by doing",
              "Multiple intelligences",
              "Multi-sensory exploration",
              "Scaffolding at each child’s pace",
              "Life skills and ecological awareness",
              "Foundations of financial literacy and entrepreneurship",
            ]}
          />
        </section>
        <section className={`${s.section} ${s.cover}`} data-cover-panel>
          <span className={s.bigIndex}>03</span>
          <span className={s.eyebrow}>GROW TOGETHER</span>
          <h2>
            A circle of care
            <br />
            around every child.
          </h2>
          <p>
            Reflective teaching, educator training and research-informed
            practice keep the experience purposeful. Parents are part of the
            learning journey, with guidance that connects school and home.
          </p>
          <List
            items={[
              "Continuous educator training",
              "Effective learning and transaction tools",
              "Best pedagogic practices",
              "Clear procedural guidelines",
              "Research and development",
              "New-age parenting support",
            ]}
          />
        </section>
      </div>
      <GardenScene />
      <Activities
        items={[
          "Art & craft",
          "Field trips",
          "Little scientist",
          "Class activities",
          "Numeracy",
          "Cognitive thinking",
          "Games",
          "Fine & gross motor skills",
          "Khelmahotsav",
        ]}
      />
      <Ending next="/nps-programs/primary-school" label="Primary School" />
    </>
  );
}

function Primary() {
  return (
    <>
      <Hero
        name="PRIMARY SCHOOL"
        title={
          <>
            A question today.
            <br />
            <em>A discovery tomorrow.</em>
          </>
        }
        description="Growing readers, thinkers and collaborators through learning that connects the classroom to everyday life."
        art="wheel"
        className={s.primaryHero}
        foot="PRIMARY YEARS"
      />
      <section id="discover" className={`${s.section} ${s.intro}`}>
        <div>
          <span className={s.eyebrow}>CONNECTED LEARNING</span>
          <h2 data-enter>
            There is more than
            <br />
            one way to learn.
          </h2>
        </div>
        <div>
          <p>
            Our Nature Nurture integrated curriculum places the child at the
            centre. Thematic, interdisciplinary learning helps children connect
            ideas across subjects instead of seeing each lesson in isolation.
          </p>
          <p>
            Experiential activities develop critical thinking, problem-solving
            and decision-making. Communication, collaboration and adaptability
            grow alongside academic understanding.
          </p>
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <span className={s.eyebrow}>INDIVIDUALITY, ENCOURAGED</span>
        <p className={s.quote} data-enter>
          Every child brings a different way of seeing. We give that perspective
          room to grow.
        </p>
      </section>
      <section className={s.section}>
        <span className={s.eyebrow}>THE DISCOVERY CYCLE</span>
        <h2>
          Ask. Make. Share.
          <br />
          Then ask again.
        </h2>
        <DiscoveryWheel />
        <div className={s.subjectColumns}>
          <div data-enter>
            <h3>Strong foundations</h3>
            <p>
              Multiple intelligences, learning by doing and multi-sensory
              experiences help children build understanding with confidence.
            </p>
          </div>
          <div data-enter>
            <h3>Thoughtful support</h3>
            <p>
              Scaffolding, reflective teaching, research-based pedagogy and
              continuous educator development keep learning responsive.
            </p>
          </div>
          <div data-enter>
            <h3>Beyond academics</h3>
            <p>
              Values, character and social-emotional wellbeing matter.
              Technology and real-world connections make learning relevant.
            </p>
          </div>
        </div>
      </section>
      <section
        className={`${s.section} ${s.intro}`}
        style={{ background: "#e5ddc9" }}
      >
        <h2 data-enter>
          School and home.
          <br />
          On the same team.
        </h2>
        <div>
          <p>
            A strong home-school partnership gives children continuity and
            encouragement. New-age parenting support and effective learning
            tools help families take an active part in growth.
          </p>
        </div>
      </section>
      <StoryScene />
      <Activities
        items={[
          "Happy Hour",
          "Activities & events",
          "General assembly",
          "Field trips",
        ]}
        title="A school day with room for discovery."
      />
      <Ending next="/nps-programs/middle-school" label="Middle School" />
    </>
  );
}

function Middle() {
  return (
    <>
      <Hero
        name="MIDDLE SCHOOL"
        title={
          <>
            Less memorising.
            <br />
            <em>More “let’s find out.”</em>
          </>
        }
        description="Grades VI and VII mark a new kind of independence: deeper questions, specialist subjects and the confidence to investigate."
        art="lab"
        className={s.middleHero}
        foot="GRADES VI & VII"
      />
      <section id="discover" className={`${s.section} ${s.intro}`}>
        <div>
          <span className={s.eyebrow}>THE BRIDGE TO INDEPENDENCE</span>
          <h2 data-enter>
            Think it through.
            <br />
            Try it out.
          </h2>
        </div>
        <div>
          <p>
            Subject-specialist teachers guide students beyond recall towards
            concepts and application. Discussions, projects and presentations
            make space to ask questions, test ideas and explain reasoning.
          </p>
          <p>
            Digital resources, laboratories and the library support independent
            work. Students practise time management and take greater
            responsibility for their learning.
          </p>
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <span className={s.eyebrow}>THE LEARNING TOOLKIT</span>
        <h2>
          More subjects.
          <br />
          More connections.
        </h2>
        <List
          items={[
            "English",
            "Hindi / regional language",
            "Mathematics: numbers, algebra, geometry & data",
            "Physics, Chemistry & Biology",
            "History & Civics",
            "Geography",
            "Computer Science",
            "SUPW & Carpentry",
            "Robotics",
            "Physical Education",
          ]}
        />
      </section>
      <section className={s.section}>
        <span className={s.eyebrow}>THE LAB NOTEBOOK</span>
        <h2 data-enter>
          A good question
          <br />
          deserves an experiment.
        </h2>
        <LabChallenge />
      </section>
      <section
        className={`${s.section} ${s.intro}`}
        style={{ background: "#e8dfcb" }}
      >
        <div>
          <span className={s.eyebrow}>ASSESSMENT WITH PURPOSE</span>
          <h2>
            Progress you
            <br />
            can understand.
          </h2>
        </div>
        <div>
          <div className={s.subjectColumns}>
            <div>
              <h3>2 × 50</h3>
              <p>Two monthly assessments, 50 marks each.</p>
            </div>
            <div>
              <h3>2 × 100</h3>
              <p>Two term examinations, 100 marks each.</p>
            </div>
            <div>
              <h3>50%</h3>
              <p>
                Students are encouraged to achieve at least 50% in every
                subject.
              </p>
            </div>
          </div>
        </div>
      </section>
      <BalanceScene />
      <Activities
        items={[
          "Carpentry",
          "General assembly",
          "Happy Hour",
          "Laboratories",
          "Robo Quest",
          "Class activities",
          "Field trips",
        ]}
      />
      <Ending next="/nps-programs/high-school" label="High School" />
    </>
  );
}

function High() {
  return (
    <>
      <Hero
        name="HIGH SCHOOL"
        title={
          <>
            Build the thinking.
            <br />
            <em>Shape the future.</em>
          </>
        }
        description="An ICSE education that brings academic depth, practical understanding and personal responsibility into the same frame."
        art="steps"
        foot="THE ICSE YEARS"
      />
      <section id="discover" className={`${s.section} ${s.intro}`}>
        <div>
          <span className={s.eyebrow}>KNOWLEDGE INTO ACTION</span>
          <h2 data-enter>
            The next step
            <br />
            is yours to shape.
          </h2>
        </div>
        <div>
          <p>
            High School at Niraj balances rigorous academics with values, yoga,
            leadership and life skills. Activity-based education supports
            intellectual, emotional, social and moral growth.
          </p>
          <p>
            Experiential learning, projects, collaborative tasks, research
            assignments and laboratory work encourage students to understand
            why, not only what.
          </p>
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <span className={s.eyebrow}>THE CLASSROOM, EXPANDED</span>
        <h2 data-enter>
          See it. Simulate it.
          <br />
          Understand it.
        </h2>
        <p>
          Smart Boards, multimedia projectors and audio-visual resources support
          presentations, simulations and virtual demonstrations. Computer
          laboratories, robotics and AI connect classroom ideas with emerging
          applications.
        </p>
        <List
          items={[
            "Science & mathematics laboratories",
            "Computer labs, robotics & AI",
            "Library & audio-visual resources",
            "Auditorium, music, dance & art",
            "Sports and yoga facilities",
            "Cafeteria, medical support, transport & CCTV",
          ]}
        />
      </section>
      <section className={s.section}>
        <span className={s.eyebrow}>A FOUNDATION WITH CHOICES</span>
        <h2>Find your combination.</h2>
        <SubjectPlanner />
      </section>
      <section
        className={`${s.section} ${s.intro}`}
        style={{ background: "#e8dfcb" }}
      >
        <div>
          <span className={s.eyebrow}>WHY ICSE?</span>
          <h2 data-enter>
            Depth today.
            <br />
            Possibility tomorrow.
          </h2>
        </div>
        <div>
          <p>
            The CISCE curriculum combines a strong English-language foundation
            with conceptual understanding, practical work and project-based
            learning. Analytical thinking, creativity and research sit alongside
            academics, arts, sport and life skills.
          </p>
          <p>
            Flexible subject choices and a globally recognised qualification
            support further study and preparation for competitive examinations.
            CISCE was established in 1958 with the assistance of the Inter-State
            Board for Anglo-Indian Education and is recognised under the Delhi
            Education Act, 1973.
          </p>
        </div>
      </section>
      <ProjectScene />
      <Activities
        title="Confidence has many stages."
        items={[
          "Debates & public speaking",
          "Creative writing & poetry",
          "Spell Bee & quizzes",
          "Science exhibitions",
          "Theatre, music & dance",
          "Sports, yoga & chess",
          "CISCE literary & cultural events",
          "Environment & community outreach",
          "Leadership & life skills",
        ]}
      />
      <section className={`${s.section} ${s.intro}`}>
        <h2>
          Learning that
          <br />
          kept going.
        </h2>
        <div>
          <p>
            During the COVID period, online classes, digital resources,
            assessments and regular engagement helped sustain learning. The
            school received recognition from The Times of India among the Best
            Schools for Online Education.
          </p>
          <p className={s.mission}>
            Our purpose remains the same: confident, compassionate, innovative
            and responsible learners who keep growing throughout life.
          </p>
        </div>
      </section>
      <Ending next="/isc" label="ISC · Classes XI & XII" />
    </>
  );
}

function Special() {
  return (
    <>
      <Hero
        name="SPECIAL SECTION"
        title={
          <>
            A place for
            <br />
            <em>every possibility.</em>
          </>
        }
        description="Individual attention. Shared experiences. A school community where different learning journeys belong together."
        art="belong"
        className={s.specialHero}
        foot="INTEGRATION SINCE 1988"
      />
      <section id="discover" className={`${s.section} ${s.intro}`}>
        <div>
          <span className={s.eyebrow}>BELONGING COMES FIRST</span>
          <h2 data-enter>
            Different journeys.
            <br />
            One community.
          </h2>
        </div>
        <div>
          <p>
            Niraj’s integrated section began in 1988 to support social
            integration for children with special needs. Under the guidance of
            founder Principal Dr. Mrs. B. Jyothi Reddy and Mr. B. Jivitesh
            Reddy, the section creates opportunities to learn and participate
            within the wider school community.
          </p>
          <p>
            Qualified special educators, a vocational instructor and activity
            teachers work together to support individual skills, confidence and
            self-esteem.
          </p>
          <p>
            The section brings 30 students into shared school experiences with
            the 1,300 students of the mainstream community, supporting equal
            opportunities, rights and access to services.
          </p>
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <span className={s.eyebrow}>SEEING THE POSSIBILITY</span>
        <p className={s.quote} data-enter>
          Equal opportunities.
          <br />
          Individual attention.
          <br />A shared sense of belonging.
        </p>
      </section>
      <section className={s.section}>
        <span className={s.eyebrow}>A THOUGHTFUL PATHWAY</span>
        <h2>
          Support shaped
          <br />
          around the child.
        </h2>
        <div className={s.timeline}>
          {[
            [
              "Listen & understand",
              "Admission begins with a formal assessment to understand the child’s strengths and support needs.",
            ],
            [
              "Plan individually",
              "Programmes are planned around motor, cognitive, speech and learning skills, with individual programmes and therapies.",
            ],
            [
              "Learn & participate",
              "Basic skills are developed across learning areas alongside vocational and extracurricular experiences.",
            ],
            [
              "Review together",
              "Periodic evaluation, continuous monitoring and guidance and counselling for parents keep support connected.",
            ],
          ].map((x, i) => (
            <article key={x[0]} data-enter>
              <b>0{i + 1}</b>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </article>
          ))}
        </div>
      </section>
      <BelongingScene />
      <Activities
        title="Shared moments matter."
        items={[
          "Dance & music",
          "Yoga & games",
          "School assembly",
          "Field trips & picnics",
          "Festival celebrations",
          "School functions",
        ]}
      />
      <section
        className={`${s.section} ${s.intro}`}
        style={{ background: "#ede4d7" }}
      >
        <h2 data-enter>
          Let’s begin with
          <br />a conversation.
        </h2>
        <div>
          <p>
            Every child’s needs are different. Speak with the school about the
            assessment process, individual learning support and participation in
            school life.
          </p>
          <div className={s.heroFoot}>
            <a className={s.button} href="tel:+914023413543">
              Call the school ↗
            </a>
          </div>
        </div>
      </section>
      <Ending next="/nps-programs/cca-department" label="CCA Department" />
    </>
  );
}

function Cca() {
  return (
    <>
      <Hero
        name="CCA DEPARTMENT"
        title={
          <>
            Not on the sidelines.
            <br />
            <em>In your element.</em>
          </>
        }
        description="A voice, a team, a stage, a cause. Co-curricular learning gives every student new ways to take part."
        art="stage"
        className={s.ccaHero}
        foot="EXPRESSION MEETS PURPOSE"
      />
      <div className={s.ribbon}>
        <span data-drift>
          VOICE + MOVEMENT + IMAGINATION + TEAMWORK + PURPOSE + VOICE + MOVEMENT
        </span>
      </div>
      <section id="discover" className={`${s.section} ${s.intro}`}>
        <div>
          <span className={s.eyebrow}>THE WHOLE CHILD</span>
          <h2 data-enter>
            What moves you
            <br />
            helps you grow.
          </h2>
        </div>
        <div>
          <p>
            Co-curricular activities are woven into school life, supporting
            holistic education in the spirit of NEP. Students practise
            discipline, democratic values and confidence through participation.
          </p>
          <p>
            Working together, performing, competing and serving the community
            create lessons that extend well beyond a classroom.
          </p>
        </div>
      </section>
      <section className={s.section}>
        <ActivityMixer />
      </section>
      <StageScene />
      <section className={`${s.section} ${s.band}`}>
        <span className={s.eyebrow}>EVERYDAY PRACTICE, LASTING VALUES</span>
        <h2>A rhythm to school life.</h2>
        <List
          items={[
            "Morning assembly: thoughts, resolutions and reflection",
            "Special assemblies: cooperation and organisation",
            "Group work: sports, role play, quizzes and teamwork",
            "Prayer and meditation: reflection and self-discipline",
            "Field trips: inquiry beyond the classroom",
            "Festivals and special days: heritage and unity",
            "Discussions and debates: confident, critical thinking",
            "Competitions and CISCE sports: sportsmanship",
            "Olympiads: Maths, Science, English and Computers",
            "Seminars, workshops, MUN and alumni engagement",
          ]}
        />
      </section>
      <section className={s.section}>
        <span className={s.eyebrow}>MOMENTS THAT TRAVEL BEYOND CAMPUS</span>
        <h2 data-enter>
          From practice
          <br />
          to a bigger stage.
        </h2>
        <div className={s.timeline}>
          {[
            [
              "A place in the choir",
              "The school choir performed at Raj Bhavan on Christmas Eve.",
            ],
            [
              "Art with an impact",
              "A student bench-painting creation was auctioned internationally for ₹60,000.",
            ],
            [
              "A sporting spirit",
              "Students have competed at national and international levels in basketball, yachting, kickboxing and karate.",
            ],
            [
              "Culture, celebrated",
              "Recognised with a first-place ranking among illustrious ICSE schools for cultural programmes.",
            ],
          ].map((x, i) => (
            <article key={x[0]} data-enter>
              <b>0{i + 1}</b>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </article>
          ))}
        </div>
      </section>
      <Ending
        next="/the-place/young-achievers"
        label="Meet our Young Achievers"
      />
    </>
  );
}

export default function ProgramPage({ slug }: { slug: string }) {
  const pages: Record<string, ReactNode> = {
    "pre-primary-school": <PrePrimary />,
    "primary-school": <Primary />,
    "middle-school": <Middle />,
    "high-school": <High />,
    "special-section": <Special />,
    "cca-department": <Cca />,
  };
  return (
    <main className={s.page}>
      <ProgramMotion kind={slug} />
      {pages[slug]}
    </main>
  );
}
