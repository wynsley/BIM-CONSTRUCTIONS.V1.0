import { Hero } from "@/features/home/components/Hero/Hero";
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
      {/* 
        Aquí puedes agregar más componentes modulares para la página de inicio,
        como <Features />, <RecentProjects />, <Testimonials />, etc. 
      */}
    </main>
  );
}
