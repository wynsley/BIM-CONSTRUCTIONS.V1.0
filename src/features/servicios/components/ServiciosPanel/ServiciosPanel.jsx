import styles from "./ServiciosPanel.module.css";

/**
 * Panel "NUESTROS SERVICIOS"
 * Modularized: delegates text/cta and collage to dedicated parts.
 *
 * @param {Object} props
 * @param {string} props.lang
 * @param {Object} props.dict  – dict.panel
 */
export function ServiciosPanel({ lang, dict }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{dict.title}</h2>
          <p className={styles.description}>{dict.description}</p>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/team-bim.png"
              alt="Ingeniería y diseño"
              className={styles.image}
            />
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="/images/servicios/remodelaciones.png"
              alt="Remodelaciones"
              className={styles.image}
            />
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="/images/servicios/construccion-civil.png"
              alt="Construcción civil"
              className={styles.image}
            />
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="/images/construction-plans.png"
              alt="Supervisión de obras"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
