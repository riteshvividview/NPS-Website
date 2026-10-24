import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { headerContent } from "@/content/header";
import { SearchIcon, ArrowRightSmall, MenuIcon, CloseIcon, ChevronDown, ArrowRight, megaIcons } from "./icons";

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
    <header className={styles.siteHeader} id="site-header">
      <div className={styles.siteHeaderInner}>
        <Link className={styles.brand} href="/" data-brand-tilt>
          <span className={styles.brandRing} aria-hidden="true" />
          <Image className={styles.brandMark} src="/nps-logo-icon.png" alt="" width={44} height={44} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{c.brandName}</span>
            <span className={styles.brandTagline}>{c.brandTagline}</span>
          </span>
        </Link>

        <nav className={styles.siteNav} data-magnetic-nav>
          {c.navLinks.map((link) =>
            link.children ? (
              <div className={styles.navItemDropdown} data-nav-dropdown key={link.label}>
                <button className={styles.navDropdownTrigger} aria-expanded="false" data-magnetic-link>
                  {link.label}
                  <ChevronDown />
                </button>
                <div className={styles.navDropdownPanel} data-nav-panel>
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
                        {child.label}
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

      <nav className={styles.mobileNav} id="mobile-nav" aria-hidden="true">
        {c.navLinks.map((link) =>
          link.children ? (
            <div className={styles.mobileNavGroup} data-mobile-accordion key={link.label}>
              <button className={styles.mobileNavGroupTrigger} aria-expanded="false">
                {link.label}
                <ChevronDown />
              </button>
              <div className={styles.mobileNavSubPanel}>
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
              {link.label}
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
  );
}
