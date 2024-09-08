import { createFileRoute, useRouter } from '@tanstack/react-router'
import { LogOut } from '../../modules/auth/logout'

export const Route = createFileRoute('/_private/logout')({
  component: PageLogOut,
})

function PageLogOut () {
  const router = useRouter()
  return <LogOut router={router} />
}