import { createFileRoute, Outlet } from '@tanstack/react-router'
import LayoutFooter from '../components/Layout/LayoutFooter'
import NavBar from '../components/Layout/Navbar'

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