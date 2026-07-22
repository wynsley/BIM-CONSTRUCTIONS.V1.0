import Link from "next/link";
import Image from "next/image";
import { Title } from "@/shared/ui/Title/Title";
import styles from "./ProjectCard.module.css";

/**
 * Clickable project card with background image and decorative lines.
 *
 * @param {Object} props
 * @param {Object} props.project - The project data
 * @param {string} props.lang - Current language
 * @returns {JSX.Element}
 */
export function ProjectCard({ project, lang }) {
  return (
    <Link href={`/${lang}/proyectos/${project.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <div className={styles.lineTopLeft} aria-hidden="true">
          <div className={styles.lineHorizontal} />
          <div className={styles.lineVertical} />
        </div>

        <Title level="h3" variant="white" weight="bold" className={styles.title}>
          {project.title}
        </Title>

        <div className={styles.lineBottomRight} aria-hidden="true">
          <div className={styles.lineHorizontal} />
          <div className={styles.lineVertical} />
        </div>
      </div>
    </Link>
  );
}
