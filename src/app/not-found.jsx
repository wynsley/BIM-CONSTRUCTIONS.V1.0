import { Montserrat, Bebas_Neue } from "next/font/google";
import { NotFoundState } from "@/shared/ui/NotFoundState/NotFoundState";
import esDict from "@/shared/i18n/dictionaries/common/es.json";
import "./globals.css";

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

import enDict from "@/shared/i18n/dictionaries/common/en.json";

/**
 * Global Not Found (404) page for unhandled routes at root level.
 * Because it sits above [lang]/layout.js, it defines its own HTML/Body.
 * Displays a bilingual fallback to cover both supported locales.
 *
 * @returns {JSX.Element}
 */
export default function GlobalNotFound() {
  const bilingualDict = {
    title: `${esDict.errors.notFound.title} / ${enDict.errors.notFound.title}`,
    message: `${esDict.errors.notFound.message} | ${enDict.errors.notFound.message}`,
    btnBack: `${esDict.errors.notFound.btnBack} / ${enDict.errors.notFound.btnBack}`
  };

  return (
    <html lang="es" className={`${montserrat.variable} ${bebasNeue.variable}`} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <main>
          <NotFoundState dict={bilingualDict} lang="es" />
        </main>
      </body>
    </html>
  );
}
