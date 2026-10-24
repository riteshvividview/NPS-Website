import styles from "./HodTeaser.module.css";

export default function HodTeaser({ headline, text }: { headline: string; text: string }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>{headline}</h2>
      <p className={styles.text}>{text}</p>
    </section>
  );
}
