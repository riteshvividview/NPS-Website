"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { YoungAuthorBook } from "@/content/pages/youngAuthors";
import styles from "./Bookshelf.module.css";

export default function MobileBookPreview({
  book,
  level,
  year,
  media,
  onClose,
}: {
  book: YoungAuthorBook;
  level: string;
  year: string;
  media: { cover: string; portrait: string } | undefined;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.mobilePreview}>
      <button type="button" className={styles.previewBackdrop} onClick={onClose} aria-label="Close book preview" tabIndex={-1} />
      <div className={styles.previewSheet} role="dialog" aria-modal="true" aria-labelledby="mobile-book-title" id="mobile-book-preview">
        <div className={styles.previewHeader}>
          <span>THE NIRAJ STUDENT LIBRARY</span>
          <button ref={closeButton} type="button" className={styles.previewClose} onClick={onClose} aria-label="Close book preview">&times;</button>
        </div>
        <div className={styles.previewVisuals}>
          <div className={styles.previewCover}>
            {media && <Image src={media.cover} alt={`${book.bookTitle} book cover`} fill sizes="(max-width: 899px) 50vw, 180px" loading="eager" />}
          </div>
          <div className={styles.previewAuthor}>
            <div className={styles.previewPortrait}>
              {media && <Image src={media.portrait} alt={book.studentName} fill sizes="100px" loading="eager" />}
            </div>
            <span>THE YOUNG AUTHOR</span>
            <strong>{book.studentName}</strong>
            <small>{book.studentClass}</small>
          </div>
        </div>
        <div className={styles.previewTitle}>
          <span>{level} <i aria-hidden="true">/</i> {year}</span>
          <h3 id="mobile-book-title">{book.bookTitle}</h3>
        </div>
      </div>
    </div>,
    document.body,
  );
}
