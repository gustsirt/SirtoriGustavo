import React, { useState, useMemo } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './index.css'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Spinner } from './components/Spinner'
import { useAuth } from './modules/auth/hooks/useAuth'

export const queryClient = new QueryClient()

const App = () => {
  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        context: {
          authentication: null,
          queryClient,
        },
        defaultPendingComponent: () => (<div className={`p-2 text-2xl`}><Spinner /></div>),
        defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
        defaultNotFoundComponent: () => <div>Global Not Found 🙄</div>, // 404
      }),
  )

  const authentication = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ authentication }} />
      <TanStackRouterDevtools router={router} />
    </QueryClientProvider>
  )
}

export default App
 // https://www.youtube.com/watch?v=O6dS0_IvvK0