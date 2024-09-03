import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_private')({
  component: privateLayout,
})

function privateLayout () {
  return (
    <>
      <div>Private Layout!</div>
      <Outlet />
    </>
  )
}