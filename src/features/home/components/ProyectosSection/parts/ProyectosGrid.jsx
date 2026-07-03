import { ProyectoCard } from "./ProyectoCard";
import styles from "./ProyectosGrid.module.css";

/**
 * Grid layout for ProyectoCard components (Bento Box style).
 * 
 * @param {Object} props
 * @param {Array<{id: string, title: string}>} props.items - List of projects.
 * @param {string} props.lang - Current language locale.
 * @param {string} [props.ariaSuffix]
 * @returns {JSX.Element}
 */
export function ProyectosGrid({ items, lang, ariaSuffix }) {
  const gridItems = items.slice(0, 5);

  return (
    <div className={styles.bentoGrid}>
      {gridItems.map((item, index) => {
        // Assign a specific class to each index to handle the CSS Grid span
        const gridClass = styles[`item${index + 1}`];

        return (
          <ProyectoCard
            key={item.id}
            title={item.title}
            imageSrc={`/images/proyectos/${item.id}.png`}
            imageAlt={item.title}
            href={`/${lang}/proyectos`}
            className={gridClass}
            ariaSuffix={ariaSuffix}
          />
        );
      })}
    </div>
  );
}
