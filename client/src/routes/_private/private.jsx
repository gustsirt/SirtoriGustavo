import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/private')({
  component: () => <div>Hello /_private/private!</div>
})