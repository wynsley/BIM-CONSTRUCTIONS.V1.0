import styles from "./HeroContent.module.css";
import { Button } from "@/shared/ui/Button/Button";
import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";

/**
 * Foreground content layer for the Hero component.
 *
 * @param {Object} props
 * @param {Object} props.dict
 * @param {string} props.lang
 * @returns {JSX.Element}
 */
export function HeroContent({ dict, lang }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title as="h1" level="h1" variant="white" className={styles.title}>
          {dict.title} <span className={styles.highlight}>{dict.highlight}</span>
        </Title>
        <Text variant="white" size="lg" className={styles.description}>
          {dict.description}
        </Text>
        <div className={styles.actions}>
          <Button href={`/${lang}/proyectos`} variant="primary" size="lg">
            {dict.btnProjects}
          </Button>
        </div>
      </div>
    </div>
  );
}
