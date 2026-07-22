import Image from "next/image";
import { SectionHeader } from "./parts/SectionHeader";
import { ServiciosGrid } from "./parts/ServiciosGrid";
import styles from "./ServiciosSection.module.css";

/**
 * @typedef {Object} ServicioCardData
 * @property {string} id    - Unique identifier (used for future anchor navigation).
 * @property {string} title - Localized service title.
 */

/**
 * @typedef {Object} ServiciosSectionDict
 * @property {string}             sectionTitle - Localized section heading.
 * @property {ServicioCardData[]} cards        - Array of service card data.
 */

/**
 * Servicios preview section for the home page.
 * Pure orchestrator — delegates layout to SectionHeader and ServiciosGrid.
 * Server Component (default — no interactivity required).
 *
 * @param {Object}               props
 * @param {ServiciosSectionDict} props.dict - Localized copy for this section.
 * @param {string}               props.lang - Active locale ('es' | 'en').
 * @returns {JSX.Element}
 */
export function ServiciosSection({ dict, lang }) {
  return (
    <section className={styles.section} aria-labelledby="servicios-heading">
      <Image
        src="/images/servicios/construccion-civil.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.backgroundImage}
        aria-hidden="true"
        priority={false}
      />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <SectionHeader title={dict.sectionTitle} headingId="servicios-heading" />
        <ServiciosGrid 
          cards={dict.cards} 
          lang={lang} 
          cardCta={dict.cardCta}
          cardAriaSuffix={dict.cardAriaSuffix}
        />
      </div>
    </section>
  );
}
