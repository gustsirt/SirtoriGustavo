import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/$username')({
  // loader: async ({ params }) => {
  //   return fetchPost(params.username)
  // },
  component: PasgeUserPublic
})

function PasgeUserPublic () {
  const { username } = Route.useParams()
  return <div>Post {username}</div>
}
