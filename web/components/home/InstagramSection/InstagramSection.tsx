import InstagramFeed from "@/components/eb/InstagramFeed";
import styles from "./InstagramSection.module.css";
import type { InstagramFeedContent } from "@/content/instagramFeed";

export default function InstagramSection({ content }: { content: InstagramFeedContent }) {
  return (
    <section className={styles.section} id="instagram">
      <p className={styles.eyebrow}>{content.eyebrow}</p>
      <h2 className={styles.heading}>
        {content.headingLine1}
        <br />
        {content.headingLine2}
      </h2>
      <p className={styles.subcopy}>{content.subcopy}</p>

      <div className={styles.feedWrap}>
        <InstagramFeed limit={8} />
      </div>
    </section>
  );
}
