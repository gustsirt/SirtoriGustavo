import { createFileRoute } from '@tanstack/react-router'
import { useAppStore } from '../../store/useAppStore';
import { useEffect, useState } from 'react';
import Frame from '../../modules/layout/frame/Frame';
import PageUser from '../../modules/user/PageUser';

export const Route = createFileRoute('/_private/profile')({
  // loader: async ({ params }) => {
  //   const username = params.username;
  //   return associateLoader(username)
  // },
  component: UserPage
})

function UserPage () {
  const { currentUser } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <Frame redirect={'/'} css={"w-9/12"}>
      <PageUser user={currentUser} />
    </Frame>
  );
}