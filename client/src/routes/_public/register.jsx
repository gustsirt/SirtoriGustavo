import { createFileRoute } from '@tanstack/react-router'
import Register from '../../modules/auth/register'

export const Route = createFileRoute('/_public/register')({
  component: PageRegister,
})

function PageRegister () {
  return <Register/>
}