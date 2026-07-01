import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./ValoresHeader.module.css";

/**
 * Left column header for Valores section: title + description.
 *
 * @param {Object} props
 * @param {string} props.sectionTitle
 * @param {string} props.sectionDesc
 * @returns {JSX.Element}
 */
export function ValoresHeader({ sectionTitle, sectionDesc }) {
  return (
    <div className={styles.left}>
      <Title level="h2" className={styles.sectionTitle}>
        {sectionTitle}
      </Title>
      <div className={styles.titleAccent} aria-hidden="true" />
      <Text as="p" className={styles.sectionDesc}>
        {sectionDesc}
      </Text>
    </div>
  );
}
