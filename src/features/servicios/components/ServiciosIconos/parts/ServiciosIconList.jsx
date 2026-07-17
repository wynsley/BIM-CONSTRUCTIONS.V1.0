import styles from "../ServiciosIconos.module.css";

export function ServiciosIconList({ dict }) {
  return (
    <div className={styles.grid}>
      {/* Icon 1: Gerencia de Proyectos (Briefcase) */}
      <div className={styles.iconCard}>
        <div className={styles.iconWrap}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gray-900)"
            className={styles.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            {/* Acento corporativo como en la imagen */}
            <line x1="2" y1="12" x2="22" y2="12" stroke="var(--color-primary)" strokeWidth="2" />
          </svg>
        </div>
        <p className={styles.label}>
          Gerencia de<br />Proyectos
        </p>
      </div>

      {/* Icon 2: Supervisión de obras (Casco) */}
      <div className={styles.iconCard}>
        <div className={styles.iconWrap}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gray-900)"
            className={styles.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 19a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1H2v-1z" />
            {/* Casco domo azul corporativo */}
            <path d="M4 17V10a8 8 0 0 1 16 0v7" stroke="var(--color-primary)" strokeWidth="2.5" />
            <path d="M12 2v2" />
            <path d="M12 10v7" stroke="var(--color-primary)" strokeWidth="2" />
          </svg>
        </div>
        <p className={styles.label}>
          Supervisión<br />de obras
        </p>
      </div>

      {/* Icon 3: Construcción de Edificaciones (Edificio) */}
      <div className={styles.iconCard}>
        <div className={styles.iconWrap}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gray-900)"
            className={styles.icon}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
            <path d="M12 12h6a2 2 0 0 1 2 2v8" stroke="var(--color-primary)" strokeWidth="2.5" />
            {/* Ventanas */}
            <path d="M7 6h2M7 10h2M7 14h2M7 18h2" />
            <path d="M15 16h2M15 20h2" stroke="var(--color-primary)" />
          </svg>
        </div>
        <p className={styles.label}>
          Construcción de<br />Edificaciones
        </p>
      </div>
    </div>
  );
}
