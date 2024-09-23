import { createFileRoute } from '@tanstack/react-router'
import { contributionsLoader } from '../../apis/contributions.services';
import { useEffect, useState } from 'react';
import Frame from '../../modules/layout/frame/Frame';

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

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <Frame>
      <div>Hello /_private/contributions!</div>
    </Frame>
  );
}
