import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/private')({
  beforeLoad: async () => {
    // Redirige a la página de login si no está autenticado
    throw redirect({ to: '/profile', });
  },
  component: PrivateHome
})

function PrivateHome () {
  return (<>
    <div>Hello /_private/private!</div>
  </>)
}