import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./HeroContent.module.css";

/**
 * Text content left column for ProyectosHero.
 * 
 * @param {Object} props
 * @param {Object} props.dict - Dictionary translations for this section.
 * @param {string} props.lang - Current language locale.
 * @returns {JSX.Element}
 */
export function HeroContent({ dict, lang }) {
  return (
    <div className={styles.content}>
      <Title level="h1" className={styles.title}>
        {dict.title}
      </Title>
      <Text as="p" size="lg" className={styles.description}>
        {dict.description}
      </Text>
      <div className={styles.actions}>
        <Button href={`/${lang}/contacto`} variant="primary" size="lg">
          {dict.btnCta} <span aria-hidden="true" className={styles.arrowIcon}>→</span>
        </Button>
      </div>
    </div>
  );
}
