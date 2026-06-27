/**
 * Página de proyectos en progreso.
 * Renderizada en el servidor (RSC) por defecto.
 *
 * @param {Object} props
 * @param {Promise<{lang: string}>} props.params
 * @returns {Promise<JSX.Element>}
 */
export default async function InProgressProjectsPage({ params }) {
  const { lang } = await params;

  return (
    <main>
      <section>
        {/* Placeholder para la lista de proyectos en progreso */}
        <h1>Proyectos en Progreso</h1>
        <p>Próximamente: Galería de proyectos actualmente en desarrollo.</p>
      </section>
    </main>
  );
}
