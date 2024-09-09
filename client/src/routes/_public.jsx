import { createFileRoute, Outlet } from '@tanstack/react-router'
import LayoutFooter from '../modules/layout/LayoutFooter'
import NavBar from '../modules/layout/Navbar'
import LayoutTime from '../modules/layout/LayoutTime';

export const Route = createFileRoute('/_public')({
  component: publicLayout,
  beforeLoad: async ({context}) => {
    const {isAuthenticated} = context;
    console.log("Auth status:", isAuthenticated);
  }
})

function publicLayout () {
  return (
    <>
      <NavBar type="public" />
      <LayoutTime/>
      <Outlet />
      <LayoutFooter />
    </>
  )
}
/*
<div className="flex gap-2 p-5">
  <Link to="/" className="[&.active]:font-bold">HomePublic</Link>
  <Link to="/login" className="[&.active]:font-bold">Login</Link>
  <Link to="/register" className="[&.active]:font-bold">Register</Link>
  <Link to="/private" className="[&.active]:font-bold">HomePrivate</Link>
  <Link to="/p404" className="[&.active]:font-bold">Error404</Link>
</div>
<hr/>
  */