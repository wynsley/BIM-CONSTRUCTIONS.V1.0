import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import { ProyectosGrid } from "./parts/ProyectosGrid";
import styles from "./ProyectosSection.module.css";

/**
 * ProyectosSection Organism.
 * Renders the projects portfolio using a Bento Box grid layout.
 * Server Component (default).
 *
 * @param {Object} props
 * @param {Object} props.dict - Dictionary translations for this section.
 * @param {string} props.lang - Current language locale.
 * @returns {JSX.Element}
 */
export function ProyectosSection({ dict, lang }) {
  if (!dict) return null;

  return (
    <section className={styles.section} aria-labelledby="proyectos-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <Title level="h2" id="proyectos-heading" className={styles.title}>
            {dict.title}
          </Title>
          <Text as="p" size="lg" className={styles.description}>
            {dict.description}
          </Text>
        </header>

        <ProyectosGrid 
          items={dict.items} 
          lang={lang} 
          ariaSuffix={dict.cardAriaSuffix}
        />
      </div>
    </section>
  );
}
