import styles from "./ServiciosIconList.module.css";
import { Text } from "@/shared/ui/Text/Text";
import { Briefcase, HardHat, Building2 } from "lucide-react";

export function ServiciosIconList({ dict }) {
  return (
    <div className={styles.grid}>
      <div className={styles.iconCard}>
        <div className={styles.iconWrap}>
          <Briefcase className={styles.icon} strokeWidth={2.5} size={64} />
        </div>
        <Text as="p" className={styles.label}>
          Gerencia de<br />Proyectos
        </Text>
      </div>

      <div className={styles.iconCard}>
        <div className={styles.iconWrap}>
          <HardHat className={styles.icon} strokeWidth={2.5} size={64} />
        </div>
        <Text as="p" className={styles.label}>
          Supervisión<br />de obras
        </Text>
      </div>

      <div className={styles.iconCard}>
        <div className={styles.iconWrap}>
          <Building2 className={styles.icon} strokeWidth={2.5} size={64} />
        </div>
        <Text as="p" className={styles.label}>
          Construcción de<br />Edificaciones
        </Text>
      </div>
    </div>
  );
}
