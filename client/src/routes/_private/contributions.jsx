import { createFileRoute } from '@tanstack/react-router'
import { contributionsLoader } from '../../apis/contributions.services';
import { useEffect, useState } from 'react';
import Frame from '../../modules/layout/frame/Frame';
import SectionWFilters from '../../modules/layout/frame/Section.Filter';
import Card from '../../modules/contributions/Card';

export const Route = createFileRoute('/_private/contributions')({
  loader: async () => {
    return contributionsLoader()
  },
  component: ContributionsPage,
})

function ContributionsPage () {
  const contributions = Route.useLoaderData()
  const [isLoading, setIsLoading] = useState(true);
  console.log(contributions);

  useEffect(() => {
    if (contributions) {
      setIsLoading(false);
    }
  }, [contributions]);

  const filters = [
    { key: "title", label: "Título", type: "text" },
    { key: "frameworks", label: "Framework", type: "select", options: ["Express", "React", "Django"] },
    { key: "languages", label: "Lenguaje", type: "select", options: ["JavaScript", "Python", "Ruby"] },
  ];

  if (isLoading) { return <div className="text-center text-gray-500">Cargando...</div>; }

  return (
    <Frame css={'w-full mx-5'}>
      <SectionWFilters
        data={contributions}
        filters={filters}
        Card={Card}
      />
    </Frame>
  );
}
