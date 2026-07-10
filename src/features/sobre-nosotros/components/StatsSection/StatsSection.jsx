import Link from "next/link";
import styles from "./StatsSection.module.css";
import { StatsMetrics } from "./parts/StatsMetrics";

/**
 * Stats section for Sobre Nosotros page.
 * Shows 3 key metrics, a down-arrow divider and the final CTA banner.
 *
 * @param {Object} props
 * @param {string} props.lang
 * @param {Object} props.dict
 * @returns {JSX.Element}
 */
export function StatsSection({ lang, dict }) {
  return (
    <>
      <section className={styles.section}>

        <div className={styles.container}>
          <StatsMetrics dict={dict} />
        </div>
      </section>

      {/* ---- Flecha circular hacia abajo ---- */}
      <div className={styles.arrowWrapper} aria-hidden="true">
        <div className={styles.arrowCircle}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* ---- Banner CTA final ---- */}
      <div className={styles.ctaBanner} id="cta-contacto">
        <div className={styles.ctaContent}>
          <div className={styles.ctaLeft}>
            <p className={styles.ctaTitle}>{dict.ctaTitle}</p>
            <p className={styles.ctaDesc}>{dict.ctaDesc}</p>
          </div>
          <div className={styles.ctaRight}>
            <span className={styles.ctaLabel}>{dict.ctaLabel}</span>
            <Link
              href={`/${lang}/contacto`}
              className={styles.ctaBtn}
              id="btn-cotizar-stats"
            >
              {dict.ctaBtn}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
