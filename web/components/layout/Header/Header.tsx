import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { headerContent } from "@/content/header";
import { SearchIcon, ArrowRightSmall, MenuIcon, CloseIcon, ChevronDown, ArrowRight, megaIcons } from "./icons";

function MenuDrawing({ variant = 0 }: { variant?: number }) {
  return <svg className={styles.menuDrawing} viewBox="0 0 220 100" fill="none" aria-hidden="true">
    {variant === 0 ? <path className={styles.drawTrail} pathLength="1" d="M12 82H78V55L49 31L20 55V82M34 82V63H50V82M13 55L49 23L85 55" stroke="currentColor" strokeWidth="1.3"/> : variant === 1 ? <path className={styles.drawTrail} pathLength="1" d="M16 63Q16 39 37 39Q57 39 57 63M26 23a10 10 0 1 0 20 0a10 10 0 1 0 -20 0M57 63Q76 85 105 65M66 29L73 36L88 20" stroke="currentColor" strokeWidth="1.3"/> : <path className={styles.drawTrail} pathLength="1" d="M15 81H35V65H55V47H75V26H94M67 16L78 9L89 16M78 9V34M16 43L33 26L50 43L33 60Z" stroke="currentColor" strokeWidth="1.3"/>}
    {variant === 0 ? <g stroke="currentColor" strokeWidth="1.5"><path d="M108 78V43L142 22L176 43V78M99 78H187M126 78V57H143V78M153 48H162V58H153ZM120 43H129"/><path d="M183 74V39M183 56Q163 49 172 34Q188 39 183 56M183 47Q199 44 199 29Q181 29 183 47"/></g> : variant === 1 ? <g stroke="currentColor" strokeWidth="1.5"><path d="M115 80Q114 54 134 54Q153 54 153 80M153 80Q153 48 174 48Q194 48 194 80"/><circle cx="134" cy="40" r="10"/><circle cx="174" cy="33" r="11"/><path d="M139 17Q132 6 123 14Q117 24 139 31Q160 16 151 11Q145 8 139 17Z"/></g> : <g stroke="currentColor" strokeWidth="1.5"><path d="M110 37Q132 27 153 39Q174 27 199 37V77Q174 68 153 80Q132 68 110 77ZM153 39V80M120 46Q132 42 143 47M120 55Q132 51 143 56M165 46Q178 42 188 47"/><path d="M172 24L178 10L184 24M178 10V28"/></g>}
    <path d="M75 15V27M69 21H81M204 56V66M199 61H209" stroke="currentColor" strokeWidth="1.5"/><circle cx="94" cy="49" r="3" fill="currentColor"/>
  </svg>;
}

// A small pair of eyes tucked behind the feature card, genuinely
// "watching" the cursor — each pupil tracks the mouse independently (see
// useHeaderInteractions.ts), so they converge on it the way real eyes
// would, and blink every so often on their own. Meant to be noticed and
// smiled at, not just decorative motion.
function MegaEyes() {
  return (
    <div className={styles.megaEyes} data-mega-eyes aria-hidden="true">
      <span className={styles.megaEye} data-mega-eye>
        <span className={styles.megaEyePupil} data-mega-eye-pupil />
      </span>
      <span className={styles.megaEye} data-mega-eye>
        <span className={styles.megaEyePupil} data-mega-eye-pupil />
      </span>
    </div>
  );
}

export default function Header() {
  const c = headerContent;

  return (
    <><header className={styles.siteHeader} id="site-header">
      <div className={styles.siteHeaderInner}>
        <Link className={styles.brand} href="/" data-brand-tilt>
          <span className={styles.brandRing} aria-hidden="true" />
          <Image className={styles.brandMark} src="/nps-logo-icon.png" alt="" width={44} height={44} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{c.brandName}</span>
            <span className={styles.brandTagline}>{c.brandTagline}</span>
          </span>
        </Link>

        <nav className={styles.siteNav} data-magnetic-nav aria-label="Main navigation">
          {c.navLinks.map((link, index) =>
            link.children ? (
              <div className={styles.navItemDropdown} data-nav-dropdown key={link.label}>
                <button className={styles.navDropdownTrigger} aria-expanded="false" aria-controls={`desktop-nav-${index}`} data-magnetic-link>
                  {link.label}
                  <ChevronDown />
                </button>
                <div className={styles.navDropdownPanel} data-nav-panel id={`desktop-nav-${index}`} data-menu-theme={index}>
                  <div className={styles.panelHeading}><span>DISCOVER NIRAJ / 0{index + 1}</span><strong>{link.label}</strong><MenuDrawing variant={index}/></div>
                  <MegaEyes />
                  <div className={styles.megaLinks} data-mega-links>
                    <span className={styles.megaLinkGlow} data-mega-glow aria-hidden="true" />
                    {link.children.map((child) => (
                      <Link
                        href={child.href}
                        key={child.label}
                        className={styles.megaLink}
                        data-mega-link
                        data-image={child.image}
                      >
                        <span className={styles.megaLinkIcon}>{megaIcons[child.icon]}</span>
                        <span>{child.label}</span><span className={styles.linkArrow} aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                  {link.feature && (
                    <Link href={link.feature.ctaHref} className={styles.megaFeature}>
                      <span className={styles.megaFeatureVisual} data-mega-feature-visual>
                        <img
                          src={link.children[0].image}
                          alt=""
                          className={styles.megaFeatureImg}
                          data-mega-feature-img="0"
                          style={{ opacity: 1 }}
                        />
                        <img
                          src={link.children[0].image}
                          alt=""
                          className={styles.megaFeatureImg}
                          data-mega-feature-img="1"
                          style={{ opacity: 0 }}
                        />
                      </span>
                      <span className={styles.megaFeatureTitle}>{link.feature.title}</span>
                      <span className={styles.megaFeatureText}>{link.feature.description}</span>
                      <span className={styles.megaFeatureCta}>
                        {link.feature.ctaLabel}
                        <ArrowRight />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <Link href={link.href} key={link.label} data-magnetic-link>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className={styles.siteHeaderActions}>
          <button className={styles.iconBtn} aria-label="Search">
            <SearchIcon />
          </button>
          <Link className={styles.pillBtn} href={c.parentLoginHref}>
            {c.parentLoginLabel}
            <ArrowRightSmall />
          </Link>
          <button
            className={styles.menuBtn}
            id="mobile-menu-trigger"
            aria-label="Menu"
            aria-expanded="false"
            aria-controls="mobile-nav"
          >
            <span className={styles.menuBtnIcon}>
              <MenuIcon />
            </span>
            <span className={styles.menuBtnIconClose}>
              <CloseIcon />
            </span>
          </button>
        </div>
      </div>

      <nav className={styles.mobileNav} id="mobile-nav" data-lenis-prevent aria-hidden="true" inert aria-label="Mobile navigation">
        <div className={styles.mobileIntro}><span>A WORLD OF POSSIBILITY</span><strong>Explore <em>Niraj.</em></strong><MenuDrawing variant={2}/></div>
        {c.navLinks.map((link, index) =>
          link.children ? (
            <div className={styles.mobileNavGroup} data-mobile-accordion key={link.label}>
              <button className={styles.mobileNavGroupTrigger} aria-expanded="false" aria-controls={`mobile-group-${index}`}>
                <span className={styles.menuNumber}>0{index + 1}</span><span>{link.label}</span>
                <ChevronDown />
              </button>
              <div className={styles.mobileNavSubPanel} id={`mobile-group-${index}`} inert>
                {link.children.map((child) => (
                  <Link href={child.href} key={child.label} className={styles.mobileSubLink}>
                    <span className={styles.mobileSubLinkIcon}>{megaIcons[child.icon]}</span>
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link href={link.href} key={link.label}>
              <span className={styles.menuNumber}>0{index + 1}</span><span>{link.label}</span><span className={styles.mobileArrow} aria-hidden="true">↗</span>
            </Link>
          )
        )}
        <Link className={styles.mobileNavPill} href={c.parentLoginHref}>
          {c.parentLoginLabel}
          <ArrowRightSmall />
        </Link>
      </nav>
      <div className={styles.mobileNavScrim} id="mobile-nav-scrim" />
    </header>
    <nav className={styles.floatingShortcuts} aria-label="School portals">
      <a href={c.digitalLibraryHref} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 5q5-2 9 1q4-3 9-1v14q-5-2-9 1q-4-3-9-1ZM12 6v14M6 9h3M15 9h3M6 12h3M15 12h3"/></svg><span>Digital Library</span><ArrowRightSmall/></a>
    </nav></>
  );
}
