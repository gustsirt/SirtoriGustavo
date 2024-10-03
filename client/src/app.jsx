import React, { useEffect, useMemo } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './index.css'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Spinner } from './modules/layout/frame/Spinner'
import { useAppStore } from './store/useAppStore'

export const queryClient = new QueryClient()

const App = () => {
  const { isAuthenticated, checkAuth, getToken } = useAppStore();

  // Verifica si el usuario está autenticado cuando se monta el componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const router = useMemo(
    () =>
      createRouter({
        routeTree,
        context: {
          isAuthenticated,
          token: getToken(),
          queryClient,
        },
        defaultPendingComponent: () => (<div className={`p-2 text-2xl`}><Spinner /></div>),
        defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
        defaultNotFoundComponent: () => <div>Global Not Found 🙄</div>, // 404
      }),
    [isAuthenticated, getToken],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <TanStackRouterDevtools router={router} />
    </QueryClientProvider>
  )
}

export default App
 // https://www.youtube.com/watch?v=O6dS0_IvvK0