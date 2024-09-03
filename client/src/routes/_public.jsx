import { createFileRoute, Outlet } from '@tanstack/react-router'
import LayoutFooter from '../../components/layout/LayoutFooter'

export const Route = createFileRoute('/_public')({
  component: publicLayout,
})

function publicLayout () {
  return (
    <>
      <div>Public Layout!</div>
      <Outlet />
      <LayoutFooter />
    </>
  )
}