import { Title } from "@/shared/ui/Title/Title";
import styles from "./ServiciosIntro.module.css";
import { ServiciosIntroPhotos } from "./parts/ServiciosIntroPhotos";
import { ServiciosIntroText } from "./parts/ServiciosIntroText";

export function ServiciosIntro({ dict }) {
  return (
    <section className={styles.section}>
      <div className={styles.diagonal} aria-hidden="true" />
      <div className={styles.inner}>
        <Title level="h2" as="p" variant="primary" className={styles.sectionLabel}>INTRODUCCIÓN</Title>
        <div className={styles.grid}>
          <ServiciosIntroPhotos />
          <ServiciosIntroText dict={dict} />
        </div>
      </div>
    </section>
  );
}
