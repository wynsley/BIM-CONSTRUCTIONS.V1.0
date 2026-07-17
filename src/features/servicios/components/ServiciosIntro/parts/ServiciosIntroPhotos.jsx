import styles from "../ServiciosIntro.module.css";

export function ServiciosIntroPhotos() {
  return (
    <div className={styles.photoGroup} aria-hidden="true">
      {/* Foto grande: ingenieros revisando planos */}
      <div className={styles.photo1}>
        <img
          src="/images/construction-plans.png"
          alt="Ingenieros revisando planos arquitectónicos"
          className={styles.img}
        />
      </div>
      {/* Foto pequeña: reunión modelo BIM */}
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
