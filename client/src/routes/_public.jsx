import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: publicLayout,
})

function publicLayout () {
  return (
    <>
      <div>Public Layout!</div>
      <Outlet />
    </>
  )
}