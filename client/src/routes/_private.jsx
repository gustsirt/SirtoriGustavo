import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import LayoutFooter from '../modules/layout/frame/LayoutFooter'
import NavBar from '../modules/layout/navbar/Navbar'
import LayoutTime from '../modules/layout/frame/LayoutTime';

export const Route = createFileRoute('/_private')({
  beforeLoad: async ({context}) => {
    const {isAuthenticated} = context;
    console.log("Auth status:", isAuthenticated);

    // Redirige a la página de login si no está autenticado
    if (!isAuthenticated) { throw redirect({ to: '/login', });}
  },
  component: privateLayout,
})

function privateLayout () {  
  return (
    <>
      <NavBar type="private" />
      <LayoutTime/>
      <Outlet />
      <LayoutFooter />
    </>
  )
}