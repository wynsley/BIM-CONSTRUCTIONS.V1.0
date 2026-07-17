import Image from "next/image";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./PorQueElegirnosCard.module.css";

export function PorQueElegirnosCard({ imageSrc, label }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={label}
          fill
          sizes="90px"
          className={styles.iconImage}
        />
      </div>
      <Text as="h3" className={styles.label}>
        {label}
      </Text>
    </div>
  );
}
