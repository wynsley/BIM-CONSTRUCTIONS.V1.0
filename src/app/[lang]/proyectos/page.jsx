import { getDictionary } from "@/shared/i18n/get-dictionary";
import { ProyectosHero } from "@/features/proyectos/components/ProyectosHero/ProyectosHero";
import { NuestrosProyectos } from "@/features/proyectos/components/NuestrosProyectos/NuestrosProyectos";
import { PorQueElegirnos } from "@/features/proyectos/components/PorQueElegirnos/PorQueElegirnos";

/**
 * Proyectos page — Server Component.
 *
 * @param {Object} props
 * @param {Promise<{ lang: string }>} props.params
 * @returns {Promise<JSX.Element>}
 */
export default async function ProyectosPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      <ProyectosHero dict={dict.proyectos?.hero} lang={lang} />
      <NuestrosProyectos dict={dict.proyectos?.nuestrosProyectos} lang={lang} />
      <PorQueElegirnos dict={dict.proyectos?.porQueElegirnos} />
    </main>
  );
}

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Proyectos | BIM Constructions",
  description:
    "Descubre los proyectos de construcción e ingeniería realizados por BIM Constructions.",
};
