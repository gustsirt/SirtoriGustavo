import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRouteWithContext()({
  component: () => (
    <>
      <p>_root</p>
      <div className="flex gap-2 p-5">
        <Link to="/" className="[&.active]:font-bold">HomePublic</Link>
        <Link to="/login" className="[&.active]:font-bold">Login</Link>
        <Link to="/register" className="[&.active]:font-bold">Register</Link>
        <Link to="/private" className="[&.active]:font-bold">HomePrivate</Link>
      </div>
      <hr/>
      <Outlet />
    </>
  ),
})