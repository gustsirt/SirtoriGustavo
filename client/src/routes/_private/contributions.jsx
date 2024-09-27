import { createFileRoute } from '@tanstack/react-router'
import { getLanguajes, getProfessions, contributionsLoader } from '../../apis/contributions.services';
import { useEffect, useState } from 'react';
import Frame from '../../modules/layout/frame/Frame';
import SectionWFilters from '../../modules/layout/frame/Section.Filter';
import Card from '../../modules/contributions/Card';
import { useAppStore } from '../../store/useAppStore';
import { BiBookmark, BiClipboard, BiCodeBlock, BiLogoGmail, BiSolidUserDetail } from 'react-icons/bi';
import { z } from 'zod';

export const Route = createFileRoute('/_private/contributions')({
  loader: async () => {
    return contributionsLoader()
  },
  component: ContributionsPage,
})

function ContributionsPage () {
  const contributions = Route.useLoaderData()
  const [isLoading, setIsLoading] = useState(true);
  const [languages, setLanguages] = useState();
  const [professions, setProfessions] = useState();
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAppStore();
  console.log(contributions);


  // Esperar Datos
  useEffect(() => {
    if (contributions) {
      setIsLoading(false);
    }
  }, [contributions]);

// Cargar lenguajes y profesiones
useEffect(() => {
  const fetchFilters = async () => {
    setIsFilterLoading(true);
    try {
      const [languagesResp, professionsResp] = await Promise.all([getLanguajes(), getProfessions()]);
      setLanguages(languagesResp); // Guardar los lenguajes obtenidos
      setProfessions(professionsResp); // Guardar las profesiones obtenidas
    } catch (err) {
      setError('Hubo un error al cargar los filtros');
    } finally {
      setIsFilterLoading(false);
    }
  };
  fetchFilters();
}, []);

  const filters = [
    { key: "title", label: "Título", type: "text" },
    { key: "professions", label: "Profesiones", type: "select", options: professions },
    { key: "languages", label: "Lenguaje", type: "select", options: languages },
  ];

  const edithFields = [
    { name: "title", label: "Titulo", icon:BiBookmark, type: "text", default: "Aquí va un titulo",
      validation: z.string().min(5, "El titulo debe tener al menos 5 caracteres")},
    { name: "description", label: "Descripción", icon:BiClipboard, type: "textarea", default: "Contar que hace",
      validation: z.string().min(5, "La descripción debe tener al menos 5 caracteres")},
    { name: "code", label: "Codigo", icon:BiCodeBlock, type: "textarea" },
    { name: "example", label: "Ejemplo", icon:BiCodeBlock, type: "text" },
    { name: "contributedBy", label: "Id Usuario", type: "text", noEditable: true , default: currentUser._id},
  ];

  if (isLoading) { return <div className="text-center text-gray-500">Cargando...</div>; }
  if (error) { return <div className="text-center text-gray-500">Error: {error}</div>; }

  return (
    <>
      <Frame css={'w-full mx-5'}>
        <SectionWFilters
          title={"Contribuciones"}
          data={contributions}
          filters={filters}
          Card={Card}
          isFilterPending={isFilterLoading}
          currentUserId = {currentUser._id}
          fields= {edithFields}
        />
      </Frame>
    </>
  );
}
