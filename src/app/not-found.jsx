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

/**
 * Global Not Found (404) page for unhandled routes at root level.
 * Because it sits above [lang]/layout.js, it defines its own HTML/Body.
 *
 * @returns {JSX.Element}
 */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${montserrat.variable} ${bebasNeue.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <main>
          <NotFoundState dict={esDict.errors.notFound} lang="es" />
        </main>
      </body>
    </html>
  );
}
