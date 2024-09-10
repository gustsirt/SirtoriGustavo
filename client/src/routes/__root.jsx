import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import Error404 from '../modules/layout/error/Error404'
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';
import ErrorComponent from '../modules/layout/error/ErrorComponent';

export const Route = createRootRouteWithContext()({
  component: PageRoot,
  notFoundComponent: Error404,
  errorComponent: ({ error, reset }) => {
    return <ErrorComponent error={error} />
  },
})

function PageRoot () {
  const { isAuthenticated, getUser } = useAppStore()
  useEffect(()=>{ isAuthenticated && getUser() }, [])
  return ( <Outlet /> )
}