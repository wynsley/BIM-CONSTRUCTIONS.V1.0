import { Title } from "@/shared/ui/Title/Title";
import styles from "./SectionHeader.module.css";

/**
 * Section header for ServiciosSection.
 * Renders the decorative accent line and section title.
 * Server Component (default).
 *
 * @param {Object} props
 * @param {string} props.title - Localized section title.
 * @param {string} props.headingId - ID for aria-labelledby from parent.
 * @returns {JSX.Element}
 */
export function SectionHeader({ title, headingId }) {
  return (
    <header className={styles.header}>
      <span className={styles.accent} aria-hidden="true" />
      <Title level="h2" id={headingId} className={styles.title}>
        {title}
      </Title>
    </header>
  );
}
