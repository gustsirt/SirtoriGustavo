import React from 'react'

export const PublicLayout = ({ children }) => {
  return (
    <div>
      <header>Public Header</header>
      <main>{children}</main>
      <footer>Public Footer</footer>
    </div>
  )
}