import React, { useState, useMemo } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './index.css'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Spinner } from './components/Spinner'

export const queryClient = new QueryClient()

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem('token'), // Verificamos si ya hay un token
  })

  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        defaultPendingComponent: () => (
          <div className={`p-2 text-2xl`}>
            <Spinner />
          </div>
        ),
        defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
        defaultNotFoundComponent: () => <div>Global Not Found 🙄</div>, // 404
        context: {
          auth,
          setAuth,
          isAuthenticated: () => auth.isAuthenticated,
          queryClient,
        },
      }),
    [auth]
  )

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </QueryClientProvider>
  )
}

export default App
