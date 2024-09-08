import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import Error404 from '../modules/layout/Error404'

export const Route = createRootRouteWithContext()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: Error404,
})


