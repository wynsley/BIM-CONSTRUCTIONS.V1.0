import { getDictionary } from "@/shared/i18n/get-dictionary";
import { ProyectoDetalleHero } from "@/features/proyectos/components/ProyectoDetalleHero/ProyectoDetalleHero";
import { ProyectoDetalleInfo } from "@/features/proyectos/components/ProyectoDetalleInfo/ProyectoDetalleInfo";
import { ProyectoDetalleLocation } from "@/features/proyectos/components/ProyectoDetalleLocation/ProyectoDetalleLocation";
import { PROYECTOS_DATA } from "@/shared/statics/proyectosData";
import { notFound } from "next/navigation";

/**
 * Dynamic route for individual projects.
 *
 * @param {Object} props
 * @param {Promise<{lang: string, slug: string}>} props.params
 * @returns {Promise<JSX.Element>}
 */
export default async function ProyectoDetallePage({ params }) {
  const { lang, slug } = await params;
  
  const proyecto = PROYECTOS_DATA.find(p => p.slug === slug);

  if (!proyecto) {
    notFound();
  }

  const dict = await getDictionary(lang);

  const statusText =
    proyecto.status === "terminado"
      ? dict.proyectos?.projectDetails?.status?.completed || "Proyecto Terminado"
      : dict.proyectos?.projectDetails?.status?.inProgress || "En Ejecución";

  return (
    <main>
      {/* Hero del Proyecto */}
      <ProyectoDetalleHero 
        title={proyecto.detailHeroTitle || proyecto.title}
        imageSrc={proyecto.detailHeroImage || proyecto.image}
        statusText={statusText}
        backText={dict.proyectos?.projectDetails?.backButton || "Volver a Proyectos"}
        lang={lang}
      />
      
      {/* Sección de Información y Galería */}
      <ProyectoDetalleInfo proyecto={proyecto} dict={dict} statusText={statusText} />

      {/* Sección de Ubicación */}
      <ProyectoDetalleLocation dict={dict} />
      
    </main>
  );
}
