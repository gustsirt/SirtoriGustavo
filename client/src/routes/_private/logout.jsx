import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/logout')({
  component: PageLogOut,
})

function PageLogOut () {
  const router = useRouter()
  return <LogOut router={router} />
}