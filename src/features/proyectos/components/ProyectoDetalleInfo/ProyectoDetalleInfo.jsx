import styles from "./ProyectoDetalleInfo.module.css";
import { ProyectoInfoMetaCards } from "./parts/ProyectoInfoMetaCards";
import { ProyectoInfoDescription } from "./parts/ProyectoInfoDescription";
import { ProyectoInfoGallery } from "./parts/ProyectoInfoGallery";

/**
 * Project Details Information and Gallery Section.
 * 
 * @param {Object} props
 * @param {Object} props.proyecto - Objeto con datos del proyecto
 * @param {Object} props.dict - Diccionario cargado para traducciones
 * @param {string} props.statusText - Texto de estado ya traducido
 */
export function ProyectoDetalleInfo({ proyecto, dict, statusText }) {
  if (!proyecto) return null;

  const t = dict.proyectos?.projectDetails?.info || {};

  const description = proyecto.description || [
    t.defaultDescription || "La información detallada de este proyecto se encuentra actualmente en redacción."
  ];

  return (
    <section className={styles.infoSection} aria-label="Información del proyecto">
      
      <ProyectoInfoMetaCards 
        proyecto={proyecto} 
        t={t} 
        statusText={statusText} 
      />

      <div className={styles.mainContent}>
        
        <ProyectoInfoDescription 
          description={description} 
          t={t} 
        />

        <ProyectoInfoGallery 
          gallery={proyecto.gallery} 
          t={t} 
          title={proyecto.title}
        />

      </div>
    </section>
  );
}
