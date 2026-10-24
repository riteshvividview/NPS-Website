"use client";

import { useState } from "react";
import styles from "./Bookshelf.module.css";
import type { YoungAuthorsShelf } from "@/content/pages/youngAuthors";

const SPINE_TONES = ["spineGreen", "spineGold", "spineBlue", "spinePeach", "spineInk"] as const;

interface Selected {
  shelfKey: string;
  index: number;
}

/**
 * This page's whole identity: a real bookshelf, not a card grid (the user
 * explicitly asked for something other than cards). Every book is a
 * plain-text, CSS-only spine — no cover art, no student photos — sitting
 * on a shelf row you can scroll sideways. Tap a spine to "pull the book
 * out": it lifts off the shelf and opens a detail panel with the title,
 * author and class in full, in real text throughout.
 */
export default function Bookshelf({
  listEyebrow,
  listHeadline,
  listIntro,
  shelves,
}: {
  listEyebrow: string;
  listHeadline: string;
  listIntro: string;
  shelves: YoungAuthorsShelf[];
}) {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [query, setQuery] = useState("");
  const matches = (book: YoungAuthorsShelf["books"][number]) => `${book.bookTitle} ${book.studentName} ${book.studentClass}`.toLowerCase().includes(query.trim().toLowerCase());
  const matchCount = shelves.reduce((sum, shelf) => sum + shelf.books.filter(matches).length, 0);

  function toggle(shelfKey: string, index: number) {
    setSelected((prev) => (prev && prev.shelfKey === shelfKey && prev.index === index ? null : { shelfKey, index }));
  }

  return (
    <section className={styles.section} id="page-collection">
      <div className={styles.intro}>
        <p className={styles.introEyebrow}>{listEyebrow}</p>
        <h2 className={styles.introHeadline}>{listHeadline}</h2>
        <p className={styles.introText}>{listIntro}</p>
        <label className={styles.bookSearch}>Find a title or a young author
          <input type="search" value={query} placeholder="Search the student library" onChange={event => {setQuery(event.target.value);setSelected(null)}} />
        </label>
        <p className={styles.searchCount} aria-live="polite">{matchCount} books to discover</p>
      </div>

      {shelves.map((shelf) => {
        if (!shelf.books.some(matches)) return null;
        const isOpenHere = selected?.shelfKey === shelf.key;
        const openBook = isOpenHere ? shelf.books[selected.index] : null;

        return (
          <div className={styles.shelfBlock} data-shelf key={shelf.key}>
            <div className={styles.shelfHeader}>
              <span className={styles.shelfLevel}>{shelf.level}</span>
              <span className={styles.shelfYear}>{shelf.year}</span>
            </div>

            <div className={styles.shelfRow}>
              <div className={styles.spines}>
                {shelf.books.map((book, i) => {
                  if (!matches(book)) return null;
                  const tone = SPINE_TONES[(i + shelf.key.length) % SPINE_TONES.length];
                  const isOpen = isOpenHere && selected.index === i;
                  return (
                    <button
                      type="button"
                      key={`${book.studentName}-${book.bookTitle}`}
                      className={`${styles.spine} ${styles[tone]} ${isOpen ? styles.isOpen : ""}`}
                      onClick={() => toggle(shelf.key, i)}
                      aria-expanded={isOpen}
                      aria-label={`${book.bookTitle} by ${book.studentName} — tap to ${isOpen ? "close" : "open"}`}
                    >
                      <span className={styles.spineTitle}>{book.bookTitle}</span>
                    </button>
                  );
                })}
              </div>
              <div className={styles.ledge} aria-hidden="true" />
            </div>

            <div className={`${styles.detailPanel} ${isOpenHere ? styles.detailOpen : ""}`}>
              {openBook && (
                <>
                  <p className={styles.detailTitle}>{openBook.bookTitle}</p>
                  <p className={styles.detailMeta}>
                    Written by <strong>{openBook.studentName}</strong> · {openBook.studentClass}
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
      {matchCount === 0 && <p className={styles.noResults}>No matching books. Try another title or author.</p>}
    </section>
  );
}
