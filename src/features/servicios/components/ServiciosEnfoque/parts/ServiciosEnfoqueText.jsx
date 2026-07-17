import styles from "../ServiciosEnfoque.module.css";
import Link from "next/link";

export function ServiciosEnfoqueText({ dict }) {
  return (
    <div className={styles.textGroup}>
      <div className={styles.headingWrapper}>
        <span className={styles.dashLine}></span>
        <h2 className={styles.heading}>{dict.title}</h2>
      </div>
      <p className={styles.description}>{dict.text}</p>
      
      <div className={styles.checklist}>
        {dict.list?.map((item, index) => (
          <div key={index} className={styles.checklistItem}>
            <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className={styles.checkText}>{item}</span>
          </div>
        ))}
      </div>
      
      <Link href="/es/contacto" className={styles.btn}>
        {dict.btn || "Saber más"}
      </Link>
    </div>
  );
}
