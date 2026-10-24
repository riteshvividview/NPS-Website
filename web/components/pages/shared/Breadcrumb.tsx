import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

/** Shared "Home / Section / Page" trail used at the top of every
 *  secondary-page hero. */
export default function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav className={`${styles.breadcrumb} ${className ?? ""}`} aria-label="Breadcrumb">
      {items.map((crumb, i) => (
        <span className={styles.crumbItem} key={crumb.label}>
          {i > 0 && (
            <span className={styles.crumbSep} aria-hidden="true">
              /
            </span>
          )}
          {i === items.length - 1 ? (
            <span className={styles.crumbCurrent}>{crumb.label}</span>
          ) : (
            <a href={crumb.href}>{crumb.label}</a>
          )}
        </span>
      ))}
    </nav>
  );
}
