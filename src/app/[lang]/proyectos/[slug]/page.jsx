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
  
  const proyectos = PROYECTOS_DATA[lang] || PROYECTOS_DATA.es;
  const proyecto = proyectos.find(p => p.slug === slug);

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
      <ProyectoDetalleHero 
        title={proyecto.detailHeroTitle || proyecto.title}
        imageSrc={proyecto.detailHeroImage || proyecto.image}
        statusText={statusText}
        backText={dict.proyectos?.projectDetails?.backButton || "Volver a Proyectos"}
        lang={lang}
      />
      
      <ProyectoDetalleInfo proyecto={proyecto} dict={dict} statusText={statusText} />

      <ProyectoDetalleLocation dict={dict} />
      
    </main>
  );
}

export function generateStaticParams() {
  const locales = ['en', 'es'];
  const params = [];
  for (const lang of locales) {
    const proyectos = PROYECTOS_DATA[lang] || PROYECTOS_DATA.es;
    for (const proyecto of proyectos) {
      params.push({ lang, slug: proyecto.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const proyectos = PROYECTOS_DATA[lang] || PROYECTOS_DATA.es;
  const proyecto = proyectos.find(p => p.slug === slug);
  if (!proyecto) {
    return { title: 'Proyecto no encontrado' };
  }
  return {
    title: proyecto.title,
    description: (Array.isArray(proyecto.description) ? proyecto.description.join(' ') : (proyecto.description || '')).substring(0, 160) || `${proyecto.title} — BIM Constructions`,
  };
}
