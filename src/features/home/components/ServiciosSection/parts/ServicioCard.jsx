import Image from "next/image";
import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./ServicioCard.module.css";

/**
 * Individual service card for the ServiciosSection.
 * Server Component — no interactivity, purely presentational link.
 *
 * @param {Object} props
 * @param {string} props.title    - Localized service title.
 * @param {string} props.imageSrc - Absolute path to card background image.
 * @param {string} props.imageAlt - Alt text for the card background image.
 * @param {string} props.href     - Navigation URL (currently routes to /[lang]/servicios).
 * @param {string} [props.ctaText="Ver servicio →"] - Translated CTA text.
 * @param {string} [props.ariaSuffix="— Ver servicio"] - Translated ARIA suffix.
 * @returns {JSX.Element}
 */
export function ServicioCard({ title, imageSrc, imageAlt, href, ctaText = "Ver servicio →", ariaSuffix = "— Ver servicio" }) {
  return (
    <a href={href} className={styles.card} aria-label={`${title} ${ariaSuffix}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={styles.cardImage}
      />

      <div className={styles.cardGlass} aria-hidden="true" />

      <div className={styles.cardContent}>
        <Title level="h3" className={styles.cardTitle}>{title}</Title>
        <Text as="span" className={styles.cardCta} aria-hidden="true">
          {ctaText}
        </Text>
      </div>
    </a>
  );
}
