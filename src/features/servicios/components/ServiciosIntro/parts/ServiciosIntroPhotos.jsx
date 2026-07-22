import styles from "./ServiciosIntroPhotos.module.css";
import Image from "next/image";

export function ServiciosIntroPhotos() {
  return (
    <div className={styles.photoGroup} aria-hidden="true">
      <div className={styles.photo1}>
        <Image
          src="/images/construction-plans.png"
          alt="Ingenieros revisando planos"
          fill
          sizes="(max-width: 900px) 200px, 255px"
          className={styles.img}
        />
      </div>
      <div className={styles.photo2}>
        <Image
          src="/images/bim-model.png"
          alt="Reunión modelo BIM"
          fill
          sizes="(max-width: 900px) 160px, 195px"
          className={styles.img}
        />
      </div>
    </div>
  );
}
