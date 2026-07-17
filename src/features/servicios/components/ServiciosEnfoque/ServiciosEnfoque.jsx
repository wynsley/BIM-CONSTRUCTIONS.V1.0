import styles from "./ServiciosEnfoque.module.css";
import { ServiciosEnfoquePhotos } from "./parts/ServiciosEnfoquePhotos";
import { ServiciosEnfoqueText } from "./parts/ServiciosEnfoqueText";

export function ServiciosEnfoque({ dict }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <ServiciosEnfoquePhotos />
          <ServiciosEnfoqueText dict={dict} />
        </div>
      </div>
    </section>
  );
}
