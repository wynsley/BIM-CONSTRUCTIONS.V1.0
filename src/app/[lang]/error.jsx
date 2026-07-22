"use client";

import { ErrorState } from "@/shared/ui/ErrorState/ErrorState";
import { useEffect } from "react";
import { useParams } from "next/navigation";

/**
 * Global Error Boundary.
 * Must be a Client Component to catch runtime React errors.
 * 
 * @param {Object} props
 * @param {Error & { digest?: string }} props.error
 * @param {() => void} props.reset
 * @returns {JSX.Element}
 */
export default function GlobalError({ error, reset }) {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "es";
  const dict = {
    title: "¡Algo salió mal! / Something went wrong!",
    message: "Ocurrió un error inesperado al intentar cargar esta sección. Nuestro equipo ya ha sido notificado. / An unexpected error occurred while trying to load this section. Our team has been notified.",
    btnRetry: "Intentar de nuevo / Try again",
    btnBack: "Volver al Inicio / Back to Home"
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error capturado por Error Boundary:", error);
    }
  }, [error]);

  return (
    <main>
      <ErrorState error={error} reset={reset} dict={dict} lang={lang} />
    </main>
  );
}
