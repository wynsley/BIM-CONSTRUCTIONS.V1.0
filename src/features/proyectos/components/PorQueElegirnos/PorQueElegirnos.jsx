import styles from "./PorQueElegirnos.module.css";
import { PorQueElegirnosCard } from "./parts/PorQueElegirnosCard";
import { Title } from "@/shared/ui/Title/Title";
import { POR_QUE_ELEGIRNOS_CARDS } from "@/shared/statics/proyectosData";

export function PorQueElegirnos({ dict }) {
  return (
    <section className={styles.section} aria-labelledby="por-que-elegirnos-title">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      
      <div className={styles.container}>
        <Title level="h2" className={styles.title} id="por-que-elegirnos-title">
          {dict.title}
        </Title>
        
        <div className={styles.grid}>
          {POR_QUE_ELEGIRNOS_CARDS.map((card) => (
            <div key={card.id} className={styles.gridItem}>
              <PorQueElegirnosCard
                label={dict[card.id]}
                imageSrc={card.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
