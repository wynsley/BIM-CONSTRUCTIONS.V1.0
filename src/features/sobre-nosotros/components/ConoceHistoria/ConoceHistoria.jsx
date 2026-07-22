import Image from "next/image";
import styles from "./ConoceHistoria.module.css";
import { HistoriaText } from "./parts/HistoriaText";
import { HistoriaCards } from "./parts/HistoriaCards";

/**
 * Historia section for Sobre Nosotros page.
 * Modularized: delegates history text and feature cards to dedicated parts.
 *
 * @param {Object} props
 * @param {Object} props.dict
 * @returns {JSX.Element}
 */
export function ConoceHistoria({ dict }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <HistoriaText text={dict.text} />

          <div className={styles.houseWrapper}>
            <Image
              src="/images/house-3d-render.png"
              alt="Proyecto residencial BIM Constructions"
              fill
              className={styles.houseImage}
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>

        <HistoriaCards dict={dict} />
      </div>
    </section>
  );
}
