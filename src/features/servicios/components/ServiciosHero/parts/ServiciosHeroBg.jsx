import styles from "../ServiciosHero.module.css";

export function ServiciosHeroBg() {
  return (
    <>
      {/* Background image */}
      <div className={styles.bg} aria-hidden="true" />

      {/* Dark overlay */}
      <div className={styles.overlay} aria-hidden="true" />
    </>
  );
}
