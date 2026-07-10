import { HeroContent } from "./parts/HeroContent";
import { HeroCarousel } from "./parts/HeroCarousel";
import styles from "./ProyectosHero.module.css";

/**
 * ProyectosHero Organism.
 * Asymmetrical layout with spilling 3D carousel on the right.
 * Server Component (default).
 *
 * @param {Object} props
 * @param {Object} props.dict - Dictionary translations for this section.
 * @param {string} props.lang - Current language locale.
 * @returns {JSX.Element}
 */
export function ProyectosHero({ dict, lang }) {
  if (!dict) return null;

  return (
    <section className={styles.heroSection} aria-labelledby="proyectos-hero-heading">
      <div className={styles.container}>
        <HeroContent dict={dict} lang={lang} />
            <div className={styles.visualColumn}>
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
