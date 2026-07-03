import { Hero } from "@/features/home/components/Hero/Hero";
import { AboutUsSection } from "@/features/home/components/AboutUsSection/AboutUsSection";
import { ServiciosSection } from "@/features/home/components/ServiciosSection/ServiciosSection";
import { ProyectosSection } from "@/features/home/components/ProyectosSection/ProyectosSection";
import { getDictionary } from "@/shared/i18n/get-dictionary";

/**
 * Main Home Page for BIM Constructions.
 * Server Component (default).
 * 
 * @param {Object} props
 * @param {Promise<{lang: 'en' | 'es'}>} props.params
 * @returns {Promise<JSX.Element>}
 */
export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero dict={dict.home} lang={lang} />
      <AboutUsSection dict={dict.home.aboutUs} />
      <ServiciosSection dict={dict.home.servicios} lang={lang} />
      <ProyectosSection dict={dict.home.proyectos} lang={lang} />
    </main>
  );
}

