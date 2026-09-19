import Image from "next/image";
import styles from "./Footer.module.css";
import { footerContent } from "@/content/footer";
import { socialIcons, contactIcons, LeafMark } from "./icons";
import FooterRevealRunner from "./FooterRevealRunner";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const c = footerContent;

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.top}>
        <div className={`${styles.brandCol} js-footer-reveal ${styles.opacityReveal}`}>
          <a className={styles.brandRow} href="/">
            <Image className={styles.crest} src="/nps-logo-icon.png" alt="" width={46} height={46} />
            <span className={styles.brandText}>
              <span className={styles.brandName}>{c.brandName}</span>
              <span className={styles.brandTagline}>{c.brandTagline}</span>
            </span>
          </a>
          <p className={styles.description}>{c.description}</p>
          <div className={styles.socialRow}>
            {c.socials.map((s) => (
              <a className={styles.socialBtn} href={s.href} key={s.key} aria-label={s.key}>
                {socialIcons[s.key]}
              </a>
            ))}
          </div>
        </div>

        {c.columns.map((col) => (
          <div className={`js-footer-reveal ${styles.opacityReveal}`} key={col.title}>
            <p className={styles.colTitle}>{col.title}</p>
            <ul className={styles.linkList}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={`js-footer-reveal ${styles.opacityReveal}`}>
          <p className={styles.colTitle}>Get in Touch</p>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactIcon}>{contactIcons.location}</span>
              {c.contact.location}
            </li>
            <li>
              <span className={styles.contactIcon}>{contactIcons.phone}</span>
              {c.contact.phone}
            </li>
            <li>
              <span className={styles.contactIcon}>{contactIcons.mail}</span>
              {c.contact.email}
            </li>
          </ul>
        </div>

        <div className={`js-footer-reveal ${styles.opacityReveal}`}>
          <p className={styles.colTitle}>{c.newsletter.eyebrow}</p>
          <p className={styles.newsletterDescription}>{c.newsletter.description}</p>
          <NewsletterForm placeholder={c.newsletter.placeholder} />
        </div>
      </div>

      <div className={styles.photoBand} id="footer-photo-band">
        <div className={`${styles.photoPlaceholder} js-photo-zoom`}>
          <Image
            src="/Schoolimage.png"
            alt={c.photoAlt}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
          />
        </div>

        <svg
          className={styles.waveSvg}
          viewBox="0 0 1600 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className={styles.wavePanel}
            d="M0,150 C300,20 420,320 650,260 C900,190 950,420 1150,420 L0,420 Z"
          />
        </svg>

        <div className={`${styles.waveQuote} js-wave-quote`}>
          <span className={styles.waveQuoteLine}>{c.waveQuoteLine1}</span>
          <span className={styles.waveQuoteLine}>{c.waveQuoteLine2}</span>
          <span className={styles.waveRule} />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>
          © {new Date().getFullYear()} {c.copyrightHolder}. All rights reserved.
        </span>
        <span className={styles.bottomTag}>{c.bottomTagWords.join(" · ")}</span>
        <span className={styles.bottomRight}>
          {c.designedText}
          <LeafMark />
        </span>
      </div>

      <FooterRevealRunner />
    </footer>
  );
}
