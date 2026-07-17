import Link from "next/link";
import styles from "../ServiciosHero.module.css";

export function ServiciosHeroContent({ lang, dict }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{dict.title}</h1>
        <p className={styles.description}>{dict.description}</p>
        <Link
          href={`/${lang}/contacto`}
          className={styles.btn}
          id="btn-servicios-hero"
        >
          {dict.btnContact}
        </Link>
      </div>
    </div>
  );
}
