import { Link } from '@tanstack/react-router'
import React from 'react'

const ContactButton = ({user, itsMyProfile }) => {
  if (user.public && !itsMyProfile) 
  return (
      <div className="px-6 py-4 flex justify-center">
        <Link
          to={`/contact/${user.username}`}
          className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-insight-dark transition duration-300"
        >
          Contactar
        </Link>
      </div>
  )
}

export default ContactButton