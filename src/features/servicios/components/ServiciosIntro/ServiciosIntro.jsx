import styles from "./ServiciosIntro.module.css";
import { ServiciosIntroPhotos } from "./parts/ServiciosIntroPhotos";
import { ServiciosIntroText } from "./parts/ServiciosIntroText";

export function ServiciosIntro({ dict }) {
  return (
    <section className={styles.section}>
      <div className={styles.diagonal} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>INTRODUCCIÓN</p>
        <div className={styles.grid}>
          <ServiciosIntroPhotos />
          <ServiciosIntroText dict={dict} />
        </div>
      </div>
    </section>
  );
}
