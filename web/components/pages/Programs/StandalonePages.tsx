import { FlightScene, EducatorScene } from "./LearningScenes";
import ProgramMotion from "./ProgramMotion";
import ProgramArt from "./ProgramArt";
import { Ending, List, applicationUrl } from "./ProgramPages";
import CareerEnquiry from "./CareerEnquiry";
import IscExplorer from "./IscExplorer";
import TransportExplorer from "./TransportExplorer";
import { NextProgram } from "./LearningTools";
import s from "./Programs.module.css";

export function IscPage() {
  return (
    <main className={`${s.page} ${s.dark}`}>
      <ProgramMotion kind="isc" />
      <section className={s.hero} data-program-stage data-light>
        <div className={s.heroCopy} data-hero-copy>
          <span className={s.eyebrow}>ISC / CLASSES XI & XII</span>
          <h1>
            Your world.
            <br />
            <em>Wider open.</em>
          </h1>
          <p>
            Two formative years. A deeper understanding of your subjects. More
            clarity about the possibilities ahead.
          </p>
          <div className={s.heroFoot}>
            <a className={s.button} href="#pathways">
              Explore your pathways &darr;
            </a>
            <small>THE NEXT CHAPTER AT NIRAJ</small>
          </div>
        </div>
        <ProgramArt kind="orbit" />
      </section>
      <section className={`${s.section} ${s.intro}`}>
        <div>
          <span className={s.eyebrow}>A FOUNDATION FOR WHAT COMES NEXT</span>
          <h2 data-enter>
            Go deeper.
            <br />
            Look further.
          </h2>
        </div>
        <div>
          <p>
            Established in 1986, Niraj Public School offers ICSE and ISC
            education affiliated to CISCE. The senior school combines a
            comprehensive curriculum, practical learning and individual
            attention with a warm, familiar environment.
          </p>
          <p>
            English-medium learning, a broad choice of subjects and a balance of
            theory and application prepare students to pursue further study with
            confidence.
          </p>
        </div>
      </section>
      <section id="pathways" className={`${s.section} ${s.lightSection}`}>
        <span className={s.eyebrow}>THE SUBJECT ATLAS</span>
        <h2>
          Start with curiosity.
          <br />
          Find a direction.
        </h2>
        <IscExplorer />
      </section>
      <section className={`${s.section} ${s.lightSection}`}>
        <span className={s.eyebrow}>ROOM TO SPECIALISE</span>
        <h2 data-enter>Add another perspective.</h2>
        <p>
          Optional subjects open further areas of study and exploration. Discuss
          the available combinations with the senior school team.
        </p>
        <div className={s.activityGrid}>
          {[
            ["Computer Science", "Software, IT and data"],
            ["Home Science", "Nutrition and community science"],
            [
              "Mass Media & Communication",
              "Journalism, advertising and public relations",
            ],
            ["Psychology", "Counselling, human resources and research"],
            ["Business Studies", "Management and entrepreneurship"],
            ["Political Science", "Public affairs, policy and governance"],
          ].map((x) => (
            <div key={x[0]} data-enter>
              <strong>{x[0]}</strong>
              <p>{x[1]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={s.section}>
        <span className={s.eyebrow}>WHY ISC AT NIRAJ?</span>
        <h2 data-enter>
          Ambition needs
          <br />
          the right environment.
        </h2>
        <List
          items={[
            "Comprehensive curriculum and deep subject knowledge",
            "Strong English-language communication",
            "Balanced theoretical and practical learning",
            "Hands-on projects and analytical thinking",
            "Preparation for competitive examinations",
            "Flexible subject choices and global perspective",
            "Academic learning alongside holistic development",
            "Recognised pathways to higher education",
          ]}
        />
      </section>
      <section className={`${s.section} ${s.lightSection}`}>
        <span className={s.eyebrow}>PEOPLE WHO KNOW YOUR POTENTIAL</span>
        <h2>Guidance, close at hand.</h2>
        <div className={s.subjectColumns}>
          <div data-enter>
            <h3>A founding commitment</h3>
            <p>
              Founder Principal Dr. Mrs. B. Jyothi Reddy’s dedication to
              education continues to shape the school’s ethos.
            </p>
          </div>
          <div data-enter>
            <h3>Experienced leadership</h3>
            <p>
              Director B. Jivitesh Reddy and General Secretary Sangeetha
              Raghuram guide the Niraj Educational Society’s vision.
            </p>
          </div>
          <div data-enter>
            <h3>Senior school expertise</h3>
            <p>
              Dr. Mrs. Lakshmi Krishnan, Vice Principal — Senior School, holds
              M.Sc., M.Phil., Ph.D. and B.Ed. qualifications and brings 29 years
              of teaching experience.
            </p>
          </div>
        </div>
        <div className={s.galleryNote} />
        <div className={s.intro}>
          <h2>
            Space to focus.
            <br />
            Support to flourish.
          </h2>
          <div>
            <p>
              Experienced faculty, friendly one-to-one interactions and
              soundproof classrooms with modern infrastructure support focused
              learning. A wide range of subjects helps students choose a
              direction that reflects their interests.
            </p>
            <p>
              Student satisfaction and continuity are central to the
              senior-school experience: familiar support, new challenges and
              room to become more independent.
            </p>
          </div>
        </div>
      </section>
      <FlightScene />
      <Ending
        next="/nps-programs/high-school"
        label="Explore the ICSE foundation"
      />
    </main>
  );
}

const roles = [
  {
    name: "Pre-Primary",
    requirement: "Qualified, experienced educators. PPTC is mandatory.",
    subjects: ["Mother Teacher"],
  },
  {
    name: "Primary · I–V",
    requirement: "B.Ed. is mandatory.",
    subjects: ["English", "Hindi", "Maths", "Social", "Science", "Computers"],
  },
  {
    name: "High School · VI–X",
    requirement: "B.Ed. and ICSE teaching experience are mandatory.",
    subjects: [
      "English",
      "Hindi",
      "Maths",
      "History & Civics",
      "Geography",
      "Home Science",
      "Physics",
      "Biology",
    ],
  },
  {
    name: "Extra-curricular",
    requirement:
      "Bring your expertise in movement, creativity and practical learning.",
    subjects: [
      "Yoga",
      "Art & Craft",
      "Physical Education (PET)",
      "SUPW",
      "Dance",
    ],
  },
];
export function CareersPage() {
  return (
    <main className={s.page}>
      <ProgramMotion kind="careers" />
      <section
        className={`${s.hero} ${s.careerHero}`}
        data-program-stage
        data-light
      >
        <div className={s.heroCopy} data-hero-copy>
          <span className={s.eyebrow}>CAREERS / TEACH AT NIRAJ</span>
          <h1>
            Bring your purpose.
            <br />
            <em>Make a difference.</em>
          </h1>
          <p>
            For educators who see a classroom full of possibilities. Explore
            teaching opportunities at Niraj Public School, Hyderabad.
          </p>
          <div className={s.heroFoot}>
            <a className={`${s.button} ${s.solid}`} href="#opportunities">
              Find your place &darr;
            </a>
          </div>
        </div>
        <ProgramArt kind="career" />
      </section>
      <section className={`${s.section} ${s.intro}`}>
        <div>
          <span className={s.eyebrow}>THE WORK THAT MATTERS</span>
          <h2 data-enter>
            Help a child
            <br />
            see what is possible.
          </h2>
        </div>
        <div>
          <p>
            We welcome qualified, experienced teachers who bring subject
            knowledge, care and enthusiasm to their work. From a child’s first
            classroom to the ICSE years, every educator has a part in shaping
            confidence and curiosity.
          </p>
          <p>
            Browse the teaching areas below, then introduce yourself to our
            team. Please include your qualifications, relevant experience and
            resume.
          </p>
        </div>
      </section>
      <section
        id="opportunities"
        className={s.section}
        style={{ background: "#ebe3d2" }}
      >
        <span className={s.eyebrow}>TEACHING OPPORTUNITIES</span>
        <h2>
          Where do you
          <br />
          make your mark?
        </h2>
        {roles.map((r) => (
          <article className={s.roleCard} key={r.name} data-enter>
            <div>
              <h3>{r.name}</h3>
              <p>{r.requirement}</p>
            </div>
            <ul>
              {r.subjects.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <EducatorScene />
      <section id="enquiry" className={s.section}>
        <span className={s.eyebrow}>YOUR NEXT STEP</span>
        <h2 data-enter>
          A conversation
          <br />
          could be the beginning.
        </h2>
        <CareerEnquiry />
      </section>
      <section
        className={`${s.section} ${s.intro}`}
        style={{ background: "#e3e9df" }}
      >
        <div>
          <span className={s.eyebrow}>CONNECT WITH THE SCHOOL</span>
          <h2>
            We are here
            <br />
            in Ameerpet.
          </h2>
          <div className={s.contact}>
            <a href="tel:+914023413543">+91 40 2341 3543</a>
            <a
              href="https://wa.me/919347407101"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp your resume ↗
            </a>
            <a href="mailto:hrm@nirajpublicschool.com">
              hrm@nirajpublicschool.com
            </a>
            <a href="mailto:career@nirajpublicschool.com">
              career@nirajpublicschool.com
            </a>
          </div>
        </div>
        <div>
          <p>
            Saadat Manzil, 6-3-864, Ameerpet,
            <br />
            Hyderabad 500016, Telangana, India.
          </p>
          <p className={s.caption}>MONDAY TO SATURDAY / 8:00 AM–4:00 PM</p>
          <iframe
            className={s.map}
            title="Niraj Public School location in Ameerpet, Hyderabad"
            src="https://maps.google.com/maps?q=Niraj%20Public%20School%206-3-864%20Ameerpet%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className={s.button}
            href="https://www.google.com/maps/search/?api=1&query=Niraj+Public+School+Ameerpet+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </section>
      <aside className={s.cta}>
        <h2>
          Get to know the people
          <br />
          behind the purpose.
        </h2>
        <NextProgram
          href="/the-people/school-leadership"
          label="School Leadership"
        />
      </aside>
    </main>
  );
}

export function RoutesPage() {
  return (
    <main className={s.page}>
      <ProgramMotion kind="routes" />
      <section
        className={`${s.hero} ${s.routeHero}`}
        data-program-stage
        data-light
      >
        <div className={s.heroCopy} data-hero-copy>
          <span className={s.eyebrow}>SCHOOL TRANSPORT / HYDERABAD</span>
          <h1>
            Closer to home.
            <br />
            <em>On the way to possibility.</em>
          </h1>
          <p>
            Find your neighbourhood, explore the school bus routes and speak
            with our team about your child’s journey.
          </p>
          <div className={s.heroFoot}>
            <a className={`${s.button} ${s.solid}`} href="#route-guide">
              Find your route &darr;
            </a>
            <small>THE NIRAJ SCHOOL RUN</small>
          </div>
        </div>
        <ProgramArt kind="bus" />
      </section>
      <section id="route-guide" className={s.section}>
        <span className={s.eyebrow}>THE ROUTE FINDER</span>
        <h2 data-enter>
          Every journey
          <br />
          starts with a stop.
        </h2>
        <TransportExplorer />
      </section>
      <section className={`${s.section} ${s.band}`}>
        <span className={s.eyebrow}>LET’S PLAN THE SCHOOL RUN</span>
        <h2>
          Found your area?
          <br />
          Let’s talk details.
        </h2>
        <p>
          Contact the school to confirm current route availability, pickup
          points and timings. The stop guide helps you explore coverage; the
          transport team can help with the details of your child’s journey.
        </p>
        <div className={s.heroFoot}>
          <a className={s.button} href="tel:+914023413543">
            Call +91 40 2341 3543 ↗
          </a>
        </div>
      </section>
      <aside className={s.cta}>
        <h2>
          A new school day
          <br />
          starts here.
        </h2>
        <a className={`${s.button} ${s.solid}`} href={applicationUrl}>
          Explore admissions ↗
        </a>
      </aside>
    </main>
  );
}
