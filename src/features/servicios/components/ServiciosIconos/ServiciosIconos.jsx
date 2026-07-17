import styles from "./ServiciosIconos.module.css";
import { ServiciosIconList } from "./parts/ServiciosIconList";

/**
 * 3 icons section (Gerencia, Supervisión, Construcción).
 * Modularized: delegates icon list to dedicated part.
 *
 * @param {Object} props
 * @param {Object} props.dict  – dict.services
 */
export function ServiciosIconos({ dict }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ServiciosIconList dict={dict} />
      </div>
    </section>
  );
}
