"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Bookshelf.module.css";
import AuthorInk from "./AuthorInk";
import type { YoungAuthorsShelf } from "@/content/pages/youngAuthors";
import { youngAuthorsMedia } from "@/content/pages/youngAuthorsMedia";

const tones = ["#345b44", "#aa8534", "#42667b", "#ac7049", "#36433d"];
type Selection = { shelfKey: string; index: number } | null;

export default function Bookshelf({ listEyebrow, listHeadline, listIntro, shelves }: {
  listEyebrow: string; listHeadline: string; listIntro: string; shelves: YoungAuthorsShelf[];
}) {
  const [selected, setSelected] = useState<Selection>(null);
  const [query, setQuery] = useState("");
  const matches = (book: YoungAuthorsShelf["books"][number]) =>
    [book.bookTitle, book.studentName, book.studentClass].join(" ").toLowerCase().includes(query.trim().toLowerCase());
  const count = shelves.reduce((sum, shelf) => sum + shelf.books.filter(matches).length, 0);

  return <section className={styles.section} id="page-collection" onKeyDown={event => { if(event.key === "Escape") setSelected(null); }}>
    <div className={styles.intro}>
      <div><p className={styles.eyebrow}>{listEyebrow}</p><h2>{listHeadline}</h2><p className={styles.introText}>{listIntro}</p></div>
      <AuthorInk kind="trail" className={styles.introArt} />
    </div>
    <div className={styles.searchRow}><label>Find a title or a young author<input type="search" value={query} placeholder="Search the student library" onChange={event => { setQuery(event.target.value); setSelected(null); }} /></label><p aria-live="polite">{count} books to discover</p></div>
    {shelves.map((shelf, shelfIndex) => {
      if (!shelf.books.some(matches)) return null;
      const chosen = selected?.shelfKey === shelf.key ? shelf.books[selected.index] : null;
      return <div className={styles.shelfBlock} key={shelf.key} data-shelf>
        <div className={styles.shelfHeader}><span className={styles.number}>0{shelfIndex + 1}</span><h3>{shelf.level}</h3><span className={styles.year}>{shelf.year}</span></div>
        <div className={styles.spines}>
          {shelf.books.map((book, index) => {
            if (!matches(book)) return null;
            const open = selected?.shelfKey === shelf.key && selected.index === index;
            const media = youngAuthorsMedia[book.bookTitle];
            return <button type="button" key={book.bookTitle} className={styles.book} data-open={open} style={{"--book-tone": tones[(index + shelfIndex) % tones.length]} as React.CSSProperties}
              onPointerEnter={event => { if(event.pointerType === "mouse") setSelected({shelfKey:shelf.key,index}); }}
              onFocus={event => { if(event.currentTarget.matches(":focus-visible")) setSelected({shelfKey:shelf.key,index}); }}
              onClick={() => setSelected({shelfKey:shelf.key,index})} aria-expanded={open} aria-label={book.bookTitle + " by " + book.studentName}>
              <span className={styles.spine}><span className={styles.spineRule} /><span className={styles.spineTitle}>{book.bookTitle}</span><span className={styles.spineNumber}>{String(index + 1).padStart(2,"0")}</span></span>
              <span className={styles.cover} aria-hidden={!open}>{media && <Image src={media.cover} alt={book.bookTitle + " book cover"} fill sizes="180px" className={styles.coverImage} />}<span className={styles.binding}/></span>
              <span className={styles.author} aria-hidden={!open}><span className={styles.portrait}>{media && <Image src={media.portrait} alt={book.studentName} fill sizes="140px" className={styles.portraitImage}/>}</span><span className={styles.authorLabel}>THE YOUNG AUTHOR</span><strong>{book.studentName}</strong><small>{book.studentClass}</small></span>
            </button>;
          })}
        </div>
        <div className={styles.ledge} aria-hidden="true" />
        {chosen && <div id={shelf.key + "-details"} className={styles.details} aria-live="polite"><div><h4>{chosen.bookTitle}</h4><p>Written by <strong>{chosen.studentName}</strong> · {chosen.studentClass}</p></div><button type="button" onClick={() => setSelected(null)} aria-label="Return this book to the shelf">Close <span aria-hidden="true">&times;</span></button></div>}
      </div>;
    })}
    {count === 0 && <p className={styles.empty}>No matching books. Try another title or author.</p>}
  </section>;
}
