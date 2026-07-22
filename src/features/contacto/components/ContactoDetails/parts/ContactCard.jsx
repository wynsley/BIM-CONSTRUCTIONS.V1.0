import styles from "./ContactCard.module.css";
import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";

/**
 * Single contact info card atom.
 * Shows an icon box (overlapping corner), a title, and a text line.
 *
 * @param {Object}      props
 * @param {JSX.Element} props.icon          - Lucide icon element (size already set by parent)
 * @param {string}      props.title         - Card heading
 * @param {string}      props.text          - Card body text
 * @param {boolean}     [props.highlighted] - When true renders the orange accent variant
 * @returns {JSX.Element}
 */
export function ContactCard({ icon, title, text, highlighted = false }) {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ""}`}>
      <div className={styles.iconBox} aria-hidden="true">
        {icon}
      </div>

      <div className={styles.content}>
        <Title
          level="h3"
          className={`${styles.title} ${highlighted ? styles.titleHighlighted : ""}`}
        >
          {title}
        </Title>
        <Text
          as="p"
          variant={highlighted ? "white" : "muted"}
          size="sm"
          className={highlighted ? styles.textHighlighted : ""}
        >
          {text}
        </Text>
      </div>
    </div>
  );
}
