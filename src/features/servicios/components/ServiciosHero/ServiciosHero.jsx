import styles from "./ServiciosHero.module.css";
import { ServiciosHeroBg } from "./parts/ServiciosHeroBg";
import { ServiciosHeroContent } from "./parts/ServiciosHeroContent";

/**
 * Hero section for the Servicios page.
 * Full-width image background (glass building), text left, pill CTA button.
 * Modularized: background and content logic separated into parts/.
 *
 * @param {Object} props
 * @param {string} props.lang
 * @param {Object} props.dict  – dict.hero
 */
export function ServiciosHero({ lang, dict }) {
  return (
    <section className={styles.hero}>
      <ServiciosHeroBg />
      <ServiciosHeroContent lang={lang} dict={dict} />
    </section>
  );
}
