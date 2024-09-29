import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/private')({
  component: PrivateHome
})

function PrivateHome () {
  return (<>
    <div>Hello /_private/private!</div>
  </>)
}