import { createFileRoute, Outlet, redirect, Router, useRouteContext } from '@tanstack/react-router'
import LayoutFooter from '../modules/layout/LayoutFooter'
import NavBar from '../modules/layout/Navbar'
import LayoutTime from '../modules/layout/LayoutTime';

export const Route = createFileRoute('/_private')({
  beforeLoad: async ({context}) => {
    const {isAuthenticated} = context;
    console.log("Auth status:", isAuthenticated);

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