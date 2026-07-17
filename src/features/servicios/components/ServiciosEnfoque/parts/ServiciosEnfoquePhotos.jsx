import styles from "../ServiciosEnfoque.module.css";

export function ServiciosEnfoquePhotos() {
  return (
    <div className={styles.photoGroup} aria-hidden="true">
      <div className={styles.photo1}>
        <img
          src="/images/construction-plans.png"
          alt="Ingenieros revisando planos arquitectónicos"
          className={styles.img}
        />
      </div>
      
      <div className={styles.plusBox}>
        <span>+100</span>
      </div>

      <div className={styles.photo2}>
        <img
          src="/images/team-bim.png"
          alt="Reunión de equipo con modelo BIM 3D"
          className={styles.img}
        />
      </div>
    </div>
  );
}
