import { createFileRoute, Outlet, redirect, Router, useRouteContext } from '@tanstack/react-router'
import LayoutFooter from '../modules/layout/LayoutFooter'
import NavBar from '../modules/layout/Navbar'

export const Route = createFileRoute('/_private')({
  component: privateLayout,
  loader: ({context}) => {
    const { auth } = context;
    console.log("Auth status:", auth.isAuthenticated());

    // Si el usuario no está autenticado, redirigimos a la página de login
    if (!auth.isAuthenticated()) {
      throw redirect({
        to: '/login',
      });
    }

    return context;
  }
})

function privateLayout () {  
  return (
    <>
      <NavBar type="private" />
      <Outlet />
      <LayoutFooter />
    </>
  )
}