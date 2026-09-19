"use client";

import styles from "./Footer.module.css";
import { ArrowRight } from "./icons";

export default function NewsletterForm({ placeholder }: { placeholder: string }) {
  return (
    <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
      <input
        className={styles.newsletterInput}
        type="email"
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <button className={styles.newsletterSubmit} type="submit" aria-label="Subscribe">
        <ArrowRight />
      </button>
    </form>
  );
}
