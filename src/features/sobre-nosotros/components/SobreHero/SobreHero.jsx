import styles from "./SobreHero.module.css";
import { SobreHeroBg } from "./parts/SobreHeroBg";
import { SobreHeroContent } from "./parts/SobreHeroContent";
import { ConoceBanner } from "../ConoceBanner/ConoceBanner";

/**
 * Hero section for Sobre Nosotros page.
 * Modularized: delegates background and content to dedicated parts.
 *
 * @param {Object} props
 * @param {string} props.lang
 * @param {Object} props.dict
 * @param {Object} props.bannerDict
 * @returns {JSX.Element}
 */
export function SobreHero({ lang, dict, bannerDict }) {
  return (
    <section className={styles.hero}>
      <SobreHeroBg />
      
      <div className={styles.contentWrapper}>
        <SobreHeroContent dict={dict} lang={lang} />
      </div>

      <div className={styles.bannerWrapper}>
        <ConoceBanner dict={bannerDict} />
      </div>
    </section>
  );
}
