import { createFileRoute } from '@tanstack/react-router'
import Login from '../../modules/auth/login'

export const Route = createFileRoute('/_public/login')({
  component: PageLogin,
})

function PageLogin () {
  return <Login/>
}