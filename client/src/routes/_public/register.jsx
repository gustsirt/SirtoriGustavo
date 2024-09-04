import { createFileRoute } from '@tanstack/react-router'
import Register from '../../components/auth/forms/register'

export const Route = createFileRoute('/_public/register')({
  component: Register,
})