import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/$username')({
  // loader: async ({ params }) => {
  //   return fetchPost(params.username)
  // },
  component: PasgeUserPublic
})

function PasgeUserPublic ({ user }) {
  const { username } = Route.useParams()

    // if (!user) {
    //   return <div className="text-center text-gray-500">Cargando...</div>;
    // }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Encabezado con imagen */}
        <div className="bg-insight-blue flex justify-center p-6">
          <img
            className="w-24 h-24 rounded-full border-4 border-white"
            src={user.photo || "https://via.placeholder.com/100"}
            alt={`${user.full_name}`}
          />
        </div>

        {/* Información de usuario */}
        <div className="px-6 py-4">
          <h2 className="text-3xl font-semibold text-insight-dark text-center">
            {user.full_name}
          </h2>
          {user.role && (
            <p className="text-lg text-insight-blue text-center mt-2">
              {user.role}
            </p>
          )}

          {/* Información adicional */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.email && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Email:</span>
                <span className="text-gray-700">{user.email}</span>
              </div>
            )}

            {user.phone && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Teléfono:</span>
                <span className="text-gray-700">{user.phone}</span>
              </div>
            )}

            {user.document && user.documenttype && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Documento:</span>
                <span className="text-gray-700">{user.documenttype}: {user.document}</span>
              </div>
            )}

            {user.birthday && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Cumpleaños:</span>
                <span className="text-gray-700">{new Date(user.birthday).toLocaleDateString()}</span>
              </div>
            )}

            {user.linkedinId && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">LinkedIn:</span>
                <a href={`https://linkedin.com/in/${user.linkedinId}`} target="_blank" className="text-insight-blue">
                  Ver perfil en LinkedIn
                </a>
              </div>
            )}

            {user.created && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Miembro desde:</span>
                <span className="text-gray-700">{new Date(user.created).toLocaleDateString()}</span>
              </div>
            )}

            {user.connection && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Última conexión:</span>
                <span className="text-gray-700">{new Date(user.connection).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Botón de contacto (opcional) */}
        {user.public && (
          <div className="px-6 py-4 flex justify-center">
            <Link
              to={`/contact/${user.username}`}
              className="bg-insight-blue text-white font-bold py-2 px-4 rounded hover:bg-insight-dark transition duration-300"
            >
              Contactar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
