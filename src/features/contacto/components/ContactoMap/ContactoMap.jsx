import styles from "./ContactoMap.module.css";

/**
 * ContactoMap — Section that renders a full-width location map.
 * Uses a standard Google Maps embed pointing to "Cieneguilla, la Cruz".
 *
 * @returns {JSX.Element}
 */
export function ContactoMap() {
  const mapQuery = encodeURIComponent("Cieneguilla, la Cruz, Lima, Peru");
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={styles.section} aria-label="Ubicación en el mapa">
      <iframe
        src={embedUrl}
        className={styles.iframe}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de BIM Constructions en Cieneguilla, la Cruz"
      />
    </section>
  );
}
