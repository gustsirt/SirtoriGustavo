import { createFileRoute } from '@tanstack/react-router'
import Login from '../../components/auth/forms/login'

export const Route = createFileRoute('/_public/login')({
  component: Login,
})