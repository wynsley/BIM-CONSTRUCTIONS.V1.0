import styles from "./Hero.module.css";
import { cn } from "@/shared/lib/cn";
import { HeroBackground } from "./parts/HeroBackground";
import { HeroContent } from "./parts/HeroContent";

/**
 * Hero section for the home page.
 * Server Component (default).
 * Modularized with parts for cleaner architecture.
 *
 * @param {Object} props
 * @param {Object} props.dict - Dictionary translations for the hero section.
 * @param {string} props.lang - Current language locale.
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export function Hero({ dict, lang, className }) {
  const videoUrl = "/videos/hero-bg.mp4";

  return (
    <section className={cn(styles.hero, className)}>
      <HeroBackground videoUrl={videoUrl} />
      <HeroContent dict={dict.hero} lang={lang} />
    </section>
  );
}
