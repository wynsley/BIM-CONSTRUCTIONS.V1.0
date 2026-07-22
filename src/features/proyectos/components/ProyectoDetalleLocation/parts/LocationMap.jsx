import styles from "./LocationMap.module.css";

/**
 * Map subcomponent for the location section.
 * Renders a responsive iframe with the provided Google Maps embed URL.
 *
 * @param {Object} props
 * @param {string} props.src - Google Maps embed URL.
 * @param {string} props.title - Accessible title for the iframe.
 */
export function LocationMap({ src, title }) {
  return (
    <div className={styles.mapContainer}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className={styles.mapIframe}
      />
    </div>
  );
}
