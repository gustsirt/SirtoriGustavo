import { createFileRoute, Link } from '@tanstack/react-router'
import { associateLoader } from '../../apis/users.services';
import { useEffect, useState } from 'react';
import { BiLogoGmail, BiLogoLinkedin } from 'react-icons/bi';
import { BiEditAlt } from "react-icons/bi";
import { useAppStore } from '../../store/useAppStore';
import BackButtons from '../../modules/layout/components/BackButton';
import Frame from '../../modules/layout/frame/Frame';

export const Route = createFileRoute('/_public/$username')({
  loader: async ({ params }) => {
    const username = params.username;
    return associateLoader(username)
  },
  component: UserPage
})

function UserPage () {
  const user = Route.useLoaderData()
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAppStore();
  console.log(user);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);
  // <BiEditAlt />
  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <Frame redirect={'/'} css={"w-9/12"}>
      { (user.username === currentUser.username) ? <BiEditAlt/> : null}
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

          { user.public && (<p>Publico: {user.public && "si" }</p>)}

          {/* Información adicional - la información de contacto solo se muestra si es publico*/}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {(user.email && user.public) && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold flex items-center">
                  <BiLogoGmail size={18} className="mr-2" />Email:
                </span>
                <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition duration-300">
                  {user.email}
                </a>
              </div>
            )}

            {(user.phone && user.public) && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Teléfono:</span>
                <span className="text-gray-700">{user.phone}</span>
              </div>
            )}

            {user.birthday && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold">Cumpleaños:</span>
                <span className="text-gray-700">{new Date(user.birthday).toLocaleDateString()}</span>
              </div>
            )}

            {(user.linkedinId && user.public) && (
              <div className="flex flex-col">
                <span className="text-insight-dark text-sm font-semibold flex items-center">
                <BiLogoLinkedin size={18} className="mr-2" />LinkedIn:
                </span>
                <a href={`https://linkedin.com/in/${user.linkedinId}`} target="_blank" className="text-insight-blue">
                  {user.linkedinId}
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
              className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-insight-dark transition duration-300"
            >
              Contactar
            </Link>
          </div>
        )}
      </div>
    </Frame>
  );
}
