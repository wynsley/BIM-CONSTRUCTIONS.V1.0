import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./ValoresGrid.module.css";

/**
 * Right column 2×2 numbered value cards for Valores section.
 *
 * @param {Object} props
 * @param {{ v1Title: string, v1Desc: string, v2Title: string, v2Desc: string, v3Title: string, v3Desc: string, v4Title: string, v4Desc: string }} props.dict
 * @returns {JSX.Element}
 */
export function ValoresGrid({ dict }) {
  const valores = [
    { id: "v1", number: "1", title: dict.v1Title, description: dict.v1Desc },
    { id: "v2", number: "2", title: dict.v2Title, description: dict.v2Desc },
    { id: "v3", number: "3", title: dict.v3Title, description: dict.v3Desc },
    { id: "v4", number: "4", title: dict.v4Title, description: dict.v4Desc },
  ];

  return (
    <div className={styles.grid}>
      {valores.map((valor) => (
        <div key={valor.id} className={styles.card} id={`valor-${valor.id}`}>
          <Text as="span" className={styles.cardNumber}>{valor.number}</Text>
          <Title level="h3" className={styles.cardTitle}>
            {valor.title}
          </Title>
          <Text size="sm" as="p" className={styles.cardDesc}>
            {valor.description}
          </Text>
        </div>
      ))}
    </div>
  );
}
