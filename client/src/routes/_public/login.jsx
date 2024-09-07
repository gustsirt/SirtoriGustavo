import { createFileRoute } from '@tanstack/react-router'
import Login from '../../modules/auth/forms/login'

export const Route = createFileRoute('/_public/login')({
  component: PageLogin,
})

function PageLogin () {
  const { authentication } = Route.useRouteContext()

  return <Login authentication={authentication} />
}