import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import { Button } from "@/shared/ui/Button/Button";
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

      <div className={styles.ctaBanner} id="cta-contacto">
        <div className={styles.ctaContent}>
          <div className={styles.ctaLeft}>
            <Title level="h3" className={styles.ctaTitle}>{dict.ctaTitle}</Title>
            <Text as="p" size="md" className={styles.ctaDesc}>{dict.ctaDesc}</Text>
          </div>
          <div className={styles.ctaRight}>
            <Text as="span" size="sm" className={styles.ctaLabel}>{dict.ctaLabel}</Text>
            <Button
              href={`/${lang}/contacto`}
              variant="primary"
              className={styles.ctaBtn}
              id="btn-cotizar-stats"
            >
              {dict.ctaBtn}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
