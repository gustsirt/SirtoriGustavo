
import React from 'react'
import { useRouterContext } from '@tanstack/react-router'

export const PrivateLayout = ({ children }) => {
  const { auth } = useRouterContext()

  if (!auth) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <header>Private Header</header>
      <main>{children}</main>
      <footer>Private Footer</footer>
    </div>
  )
}
