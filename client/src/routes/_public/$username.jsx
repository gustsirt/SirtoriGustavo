import { createFileRoute } from '@tanstack/react-router'
import { associateLoader } from '../../apis/users.services';
import { useEffect, useState } from 'react';
import Frame from '../../modules/layout/frame/Frame';
import PageUser from '../../modules/user/PageUser';

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

  console.log(user);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <Frame redirect={'/'} css={"w-9/12"}>
      <PageUser user={user} />
    </Frame>
  );
}
