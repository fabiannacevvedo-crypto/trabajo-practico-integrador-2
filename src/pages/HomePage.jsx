import { useFetch } from '../hooks/useFetch'

export const HomePage = () => {
  const { data, isLoading, error, refetch } = useFetch(
    'http://localhost:3000/api/articles',
  )

  // Obtener la lista de artículos normalizada desde la respuesta
  const articlesList = Array.isArray(data)
    ? data
    : Array.isArray(data?.articles)
      ? data.articles
      : []

  // Filtrar solo artículos publicados si el campo status está definido
  const publishedArticles = articlesList.filter(
    (article) => !article.status || article.status === 'published',
  )

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Encabezado principal */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-3">
              Comunidad y Publicaciones
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Artículos del Blog Personal
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explora las últimas publicaciones, reflexiones y contenidos compartidos
              por la comunidad de usuarios.
            </p>
          </div>
        </section>

        {/* Estado de carga */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-slate-600 font-medium text-sm animate-pulse">
              Cargando publicaciones del blog...
            </p>
          </div>
        )}

        {/* Estado de error */}
        {!isLoading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center space-y-3">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-rose-100 text-rose-600 mb-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-rose-800">
              No se pudieron cargar los artículos
            </h3>
            <p className="text-sm text-rose-600 max-w-md mx-auto">{error}</p>
            <div>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg shadow-sm transition cursor-pointer"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Estado vacío (sin artículos) */}
        {!isLoading && !error && publishedArticles.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
            <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No hay artículos publicados
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Actualmente no existen artículos disponibles para mostrar. Las nuevas
              entradas aparecerán aquí cuando sean publicadas.
            </p>
          </div>
        )}

        {/* Listado de artículos renderizado con map() y key basado en id */}
        {!isLoading && !error && publishedArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedArticles.map((article) => {
              const authorName =
                article.author?.username ||
                article.user?.username ||
                article.author ||
                'Autor anónimo'

              const excerptContent =
                article.excerpt ||
                (article.content && article.content.length > 140
                  ? `${article.content.substring(0, 140)}...`
                  : article.content) ||
                'Sin resumen disponible.'

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Metadatos y Autor */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          Por: {authorName}
                        </span>
                        {article.created_at && (
                          <time dateTime={article.created_at}>
                            {new Date(article.created_at).toLocaleDateString()}
                          </time>
                        )}
                      </div>

                      {/* Título */}
                      <h2 className="text-xl font-bold text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h2>

                      {/* Resumen (excerpt) */}
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {excerptContent}
                      </p>
                    </div>

                    {/* Tags si existen */}
                    {Array.isArray(article.tags) && article.tags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {article.tags.map((tag, tagIndex) => (
                          <span
                            key={tag.id || tagIndex}
                            className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
