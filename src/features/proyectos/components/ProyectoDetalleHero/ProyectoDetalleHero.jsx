import styles from "./ProyectoDetalleHero.module.css";
import { Title } from "@/shared/ui/Title/Title";
import { Text } from "@/shared/ui/Text/Text";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Hero for Project Details page.
 * Displays a large background image, centered title, and status indicator.
 * 
 * @param {Object} props
 * @param {string} props.title - Project title
 * @param {string} props.imageSrc - Background image URL
 * @param {string} props.statusText - Status text (e.g., "Proyecto Terminado")
 * @param {string} props.backText - Back button text
 * @param {string} props.lang - Current language
 */
export function ProyectoDetalleHero({ title, imageSrc, statusText, backText, lang }) {
  // Manejamos un texto multilínea opcional si se requiere separar "Proyecto Terminado"
  const statusParts = statusText ? statusText.split(" ") : [];

  return (
    <section 
      className={styles.hero} 
      style={{ backgroundImage: `url(${imageSrc})` }}
      aria-label={`Hero para ${title}`}
    >
      <div className={styles.contentContainer}>
        <Link href={`/${lang}/proyectos`} className={styles.backLink}>
          <ArrowLeft size={20} />
          <span>{backText}</span>
        </Link>
        
        <Title level="h1" className={styles.title}>
          {title}
        </Title>

        <div className={styles.statusIndicator}>
          <div className={styles.statusLine} aria-hidden="true" />
          <div className={styles.statusText}>
            {statusParts.map((part, index) => (
              <Text 
                key={index} 
                as="span" 
                variant="inherit" 
                size="inherit"
              >
                {part}
              </Text>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
