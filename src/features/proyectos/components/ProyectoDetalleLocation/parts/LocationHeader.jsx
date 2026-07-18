import styles from "./LocationHeader.module.css";
import { Title } from "@/shared/ui/Title/Title";
import { MapPin } from "lucide-react";

/**
 * Header for the location section, containing an icon and a title.
 *
 * @param {Object} props
 * @param {string} props.title - Header text (already translated).
 */
export function LocationHeader({ title }) {
  return (
    <div className={styles.titleContainer}>
      <MapPin className={styles.titleIcon} size={28} />
      <Title level="h2" variant="secondary" className={styles.title}>
        {title}
      </Title>
    </div>
  );
}
