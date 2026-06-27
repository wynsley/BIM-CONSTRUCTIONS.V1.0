/**
 * Página de proyectos terminados.
 * Renderizada en el servidor (RSC) por defecto.
 *
 * @param {Object} props
 * @param {Promise<{lang: string}>} props.params
 * @returns {Promise<JSX.Element>}
 */
export default async function FinishedProjectsPage({ params }) {
  const { lang } = await params;

  return (
    <main>
      <section>
        {/* Placeholder para la lista de proyectos terminados */}
        <h1>Proyectos Terminados</h1>
        <p>Próximamente: Galería de proyectos finalizados.</p>
      </section>
    </main>
  );
}
