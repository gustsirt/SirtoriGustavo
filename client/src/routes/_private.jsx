import { createFileRoute, Outlet } from '@tanstack/react-router'
import LayoutFooter from '../modules/layout/LayoutFooter'
import NavBar from '../modules/layout/Navbar'

export const Route = createFileRoute('/_private')({
  component: privateLayout,
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