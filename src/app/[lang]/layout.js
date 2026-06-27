import { Montserrat, Bebas_Neue } from "next/font/google";
import { Navbar } from "@/shared/ui/Navbar/Navbar";
import { getDictionary } from "@/shared/i18n/get-dictionary";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat-google",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-google",
  subsets: ["latin"],
  weight: ["400"],
});

/** @type {import('next').Metadata} */
export const metadata = {
  title: "BIM Constructions — Ingeniería y Construcción Profesional",
  description:
    "BIM Constructions ofrece servicios de ingeniería, construcción y gestión de proyectos con tecnología BIM de vanguardia.",
};

/**
 * Root layout for the BIM Constructions application.
 * Includes the global Navbar and wraps all pages.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Object} props.params
 * @param {string} props.params.lang
 * @returns {JSX.Element}
 */
export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${montserrat.variable} ${bebasNeue.variable}`}>
      <body>
        <Navbar dict={dict.navbar} lang={lang} />
        {children}
      </body>
    </html>
  );
}

/**
 * Generates the static routes for all supported languages.
 * 
 * @returns {Array<{lang: string}>}
 */
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
