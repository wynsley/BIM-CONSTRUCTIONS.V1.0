import styles from "../ServiciosIntro.module.css";

export function ServiciosIntroText({ dict }) {
  return (
    <div className={styles.textGroup}>
      <h2 className={styles.heading}>{dict.title}</h2>
      <p className={styles.quote}>{dict.text}</p>
      <p className={styles.quote2}>{dict.text2}</p>
    </div>
  );
}
