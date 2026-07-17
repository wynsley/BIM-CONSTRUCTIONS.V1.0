import Link from "next/link";
import styles from "../ServiciosPanel.module.css";

export function ServiciosPanelContent({ lang, dict }) {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{dict.title}</h2>
      <p className={styles.description}>{dict.description}</p>
      <Link href={`/${lang}/contacto`} className={styles.btn}>
        {dict.btnContact || "Solicitar Información"}
      </Link>
    </div>
  );
}
