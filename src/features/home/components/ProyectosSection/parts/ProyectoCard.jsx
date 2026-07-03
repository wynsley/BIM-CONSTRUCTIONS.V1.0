import Image from "next/image";
import Link from "next/link";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./ProyectoCard.module.css";

/**
 * Individual project card for the ProyectosSection.
 * Server Component — purely presentational link.
 *
 * @param {Object} props
 * @param {string} props.title    - Localized project title.
 * @param {string} props.imageSrc - Absolute path to card background image.
 * @param {string} props.imageAlt - Alt text for the card background image.
 * @param {string} props.href     - Navigation URL.
 * @param {string} [props.className] - Additional CSS class to allow grid-spanning.
 * @param {string} [props.ariaSuffix] - Accessible suffix for the link.
 * @returns {JSX.Element}
 */
export function ProyectoCard({ title, imageSrc, imageAlt, href, className, ariaSuffix = "— Ver proyecto" }) {
  return (
    <Link href={href} className={`${styles.card} ${className || ''}`} aria-label={`${title} ${ariaSuffix}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        className={styles.cardImage}
      />
      
      <div className={styles.cardOverlay} aria-hidden="true">
        <Text as="span" className={styles.cardTitle}>{title}</Text>
      </div>
    </Link>
  );
}
