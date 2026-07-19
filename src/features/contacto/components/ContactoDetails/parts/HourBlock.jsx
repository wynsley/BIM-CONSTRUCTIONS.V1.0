import styles from "./HourBlock.module.css";
import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";

/**
 * A single schedule block (title + hours).
 *
 * @param {Object} props
 * @param {string} props.title - Day range label (e.g. "Lunes - Viernes")
 * @param {string} props.hours - Time range (e.g. "8:00 am - 6:50 pm")
 * @returns {JSX.Element}
 */
export function HourBlock({ title, hours }) {
  return (
    <div className={styles.block}>
      <Title level="h4" className={styles.title}>
        {title}
      </Title>
      <Text as="p" variant="muted" size="sm" className={styles.hours}>
        {hours}
      </Text>
    </div>
  );
}
