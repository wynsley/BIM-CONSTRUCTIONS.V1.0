import styles from "./ServiciosCTA.module.css";
import Link from "next/link";
import Image from "next/image";

export function ServiciosCTA({ dict }) {
  return (
    <section className={styles.section}>
      {/* Contenedor de cuadros negros para futuros textos */}
      <div className={styles.boxesContainer}>
        <div className={styles.leftColumn}>
          {dict.boxes && dict.boxes.slice(0, 2).map((box, idx) => (
            <div key={idx} className={styles.blackBox}>
              <h3 className={styles.boxTitle}>{box.title}</h3>
            </div>
          ))}
        </div>
        <div className={styles.rightColumn}>
          {dict.boxes && dict.boxes.slice(2, 4).map((box, idx) => (
            <div key={idx + 2} className={styles.blackBox}>
              <h3 className={styles.boxTitle}>{box.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Azul CTA */}
      <div className={styles.bannerWrapper}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2 className={styles.title}>{dict.title}</h2>
            <p className={styles.description}>{dict.description}</p>
            <Link href="/es/contacto" className={styles.btn}>
              {dict.btn || "CONTÁCTANOS"}
            </Link>
          </div>
          <div className={styles.logoWrapper}>
            <img src="/images/logo-metal.png.png" alt="BIM Logo" className={styles.logo} />
          </div>
        </div>
      </div>
    </section>
  );
}
