import RevealOnScroll from "@/components/pages/shared/RevealOnScroll";
import Image from "next/image";
import styles from "./LetterSection.module.css";
import StampEntrance from "./StampEntrance";
import type { PrincipalsWelcomeContent } from "@/content/pages/principalsWelcome";

export default function LetterSection({ content }: { content: PrincipalsWelcomeContent["letter"] }) {
  const [firstIntro, ...restIntro] = content.intro;

  return (
    <section className={styles.section} data-principals-letter>
      <Image
        className={styles.stamp}
        src="/Principals-welcome/Focused%20Green%20Wax%20Seal%20Emblem.png"
        alt=""
        width={1304}
        height={1206}
        aria-hidden="true"
        data-principal-stamp
      />
      <StampEntrance />
      <RevealOnScroll className={styles.layout}>
        <p className={`${styles.paragraph} ${styles.dropCap} js-reveal`}>{firstIntro}</p>

        {restIntro.map((p, i) => (
          <p className={`${styles.paragraph} js-reveal`} key={`intro-${i}`}>
            {p}
          </p>
        ))}

        <blockquote className={`${styles.quote} js-reveal`}>
          <p>{content.quote1.text}</p>
          <cite>— {content.quote1.attribution}</cite>
        </blockquote>

        {content.middle.map((p, i) => (
          <p className={`${styles.paragraph} js-reveal`} key={`middle-${i}`}>
            {p}
          </p>
        ))}

        <blockquote className={`${styles.quote} js-reveal`}>
          <p>{content.quote2.text}</p>
          <cite>— {content.quote2.attribution}</cite>
        </blockquote>

        {content.closing.map((p, i) => (
          <p className={`${styles.paragraph} js-reveal`} key={`closing-${i}`}>
            {p}
          </p>
        ))}

        <div className={`${styles.signature} js-reveal`}>
          <p className={styles.signoff}>{content.signoff}</p>
          <p className={styles.signatureName}>{content.signatureName}</p>
          <p className={styles.signatureTitle}>{content.signatureTitle}</p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
