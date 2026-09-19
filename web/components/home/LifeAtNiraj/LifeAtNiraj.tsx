import styles from "./LifeAtNiraj.module.css";
import type { LifeAtNirajContent } from "@/content/lifeAtNiraj";
import LifeAtNirajBody from "./LifeAtNirajBody";

export default function LifeAtNiraj({ content }: { content: LifeAtNirajContent }) {
  return (
    <section className={styles.section} id="life-at-niraj">
      <div className={styles.navRow} data-fx="blur">{content.navRight}</div>
      <LifeAtNirajBody content={content} />
    </section>
  );
}
