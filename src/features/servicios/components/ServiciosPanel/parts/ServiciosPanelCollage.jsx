import styles from "../ServiciosPanel.module.css";

export function ServiciosPanelCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      {/* Card 1: Atrás (Arriba-Izquierda) */}
      <div className={`${styles.card} ${styles.card1}`}>
        <img
          src="/images/team-bim.png"
          alt="Ingeniería y diseño"
          className={styles.cardImg}
        />
      </div>
      {/* Card 2: Medio-Atrás */}
      <div className={`${styles.card} ${styles.card2}`}>
        <img
          src="/images/servicios/remodelaciones.png"
          alt="Remodelaciones"
          className={styles.cardImg}
        />
      </div>
      {/* Card 3: Medio-Adelante */}
      <div className={`${styles.card} ${styles.card3}`}>
        <img
          src="/images/servicios/construccion-civil.png"
          alt="Construcción civil"
          className={styles.cardImg}
        />
      </div>
      {/* Card 4: Adelante (Abajo-Derecha) */}
      <div className={`${styles.card} ${styles.card4}`}>
        <img
          src="/images/construction-plans.png"
          alt="Supervisión de obras"
          className={styles.cardImg}
        />
      </div>
    </div>
  );
}
