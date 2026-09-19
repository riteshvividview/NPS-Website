import Image from "next/image";
import styles from "./Header.module.css";
import { headerContent } from "@/content/header";
import {
  megaIcons,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  SearchIcon,
  ArrowRightSmall,
} from "./icons";

const toneClass: Record<string, string> = {
  peach: styles.tonePeach,
  blue: styles.toneBlue,
  gold: styles.toneGold,
  green: styles.toneGreen,
};

export default function Header() {
  const c = headerContent;

  return (
    <header className={styles.siteHeader} id="site-header">
      <a className={styles.brand} href="/">
        <Image className={styles.brandMark} src="/nps-logo-icon.png" alt="" width={44} height={44} />
        <span className={styles.brandText}>
          <span className={styles.brandName}>{c.brandName}</span>
          <span className={styles.brandTagline}>{c.brandTagline}</span>
        </span>
      </a>

      <nav className={styles.siteNav}>
        <a href={c.navLinks[0].href}>{c.navLinks[0].label}</a>

        <div className={styles.navItemDropdown} id="academics-dropdown">
          <button className={styles.navDropdownTrigger} aria-expanded="false">
            {c.academicsLabel}
            <ChevronDown />
          </button>

          <div className={styles.megaDropdown} data-mega-panel>
            {c.megaColumns.map((col) => (
              <div key={col.label} data-mega-group>
                <p className={styles.megaColLabel}>{col.label}</p>
                {col.items.map((item) => (
                  <a className={styles.megaItem} href={item.href} key={item.title}>
                    <span
                      className={`${styles.megaItemIcon} ${toneClass[item.tone]}`}
                      data-mega-icon
                    >
                      {megaIcons[item.icon]}
                    </span>
                    <span className={styles.megaItemText}>
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </span>
                    <span className={styles.megaItemChev}>
                      <ChevronRight />
                    </span>
                  </a>
                ))}
              </div>
            ))}

            <a className={styles.megaPromo} href={c.megaPromo.href} data-mega-group>
              <Image
                src={c.megaPromo.image}
                alt=""
                fill
                style={{ objectFit: "cover", position: "absolute", inset: 0 }}
              />
              <span className={styles.megaPromoCaption}>
                {c.megaPromo.captionLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < c.megaPromo.captionLines.length - 1 && <br />}
                  </span>
                ))}
                <span className={styles.megaPromoArrow}>
                  <ArrowRight />
                </span>
              </span>
            </a>
          </div>
        </div>

        {c.navLinks.slice(1).map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.siteHeaderActions}>
        <button className={styles.iconBtn} aria-label="Search">
          <SearchIcon />
        </button>
        <a className={styles.pillBtn} href={c.parentLoginHref}>
          {c.parentLoginLabel}
          <ArrowRightSmall />
        </a>
      </div>
    </header>
  );
}
