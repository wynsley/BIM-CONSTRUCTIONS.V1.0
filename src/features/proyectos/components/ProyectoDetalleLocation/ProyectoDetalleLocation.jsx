import styles from "./ProyectoDetalleLocation.module.css";
import { LocationHeader } from "./parts/LocationHeader";
import { LocationMap } from "./parts/LocationMap";

/**
 * Component to display the project's location using a Google Maps iframe.
 *
 * @param {Object} props
 * @param {Object} props.dict - Loaded dictionary for translations
 */
export function ProyectoDetalleLocation({ dict }) {
  const t = dict.proyectos?.projectDetails?.location || {};

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62446.77259160249!2d-76.84074212555567!3d-12.083733005891398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c31665e771c9%3A0xc3fec31936c7cc56!2sCieneguilla%2C%20Lima!5e0!3m2!1sen!2spe!4v1700000000000!5m2!1sen!2spe";

  return (
    <section className={styles.locationSection}>
      <LocationHeader title={t.title || "Ubicación del Proyecto"} />
      <LocationMap src={mapSrc} title={t.mapTitle || "Mapa de ubicación del proyecto"} />
    </section>
  );
}
