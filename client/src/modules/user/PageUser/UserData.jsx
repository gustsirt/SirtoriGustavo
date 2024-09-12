import React from 'react'
import { BiLogoGmail, BiLogoLinkedin } from 'react-icons/bi'

const UserData = ({user, itsMyProfile }) => {
  /*
  USER DATA
  given_name:  { type: String,   required: true, maxLength: 50 },
  family_name: { type: String,   required: true, maxLength: 50 },
  full_name:   { type: String,   },
  ! username:    { type: String,   unique: true  },
  birthday:            Date,
  ! public:      { type: Boolean,   default: true},

  CONFIGURAR APARTE
  bio:                 String,

  DEJAR PARA DESPUES
  photo:               String,

  USE DATA NO VISUAL
  * document:    { type: String,   maxLength: 15 },
  * documenttype:{ type: String,   enum: DOCTYPE },
  
  ? email:       { type: String,   required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Debe completar un email valido'], unique: true },
  ? phone:       { type: String, maxLength: 20   },
  ? linkedinId:          String,
  ? linkedinVerified:    Boolean,


  CAMBIAR PASSWORD
  ! password:    { type: String,   required: true },


   */
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {(user.email && user.public) && (
        <div className="flex flex-col">
          <span className="text-insight-dark text-sm font-semibold flex items-center">
            <BiLogoGmail size={18} className="mr-2" />Email:
          </span>
          <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer"
            className="text-gray-700 hover:text-gray-900 transition duration-300">
            {user.email}
          </a>
        </div>
      )}

      {(user.phone && user.public) && (
        <div className="flex flex-col">
          <span className="text-insight-dark text-sm font-semibold">Teléfono:</span>
          <span className="text-gray-700">{user.phone}</span>
        </div>
      )}

      {user.birthday && (
        <div className="flex flex-col">
          <span className="text-insight-dark text-sm font-semibold">Cumpleaños:</span>
          <span className="text-gray-700">{new Date(user.birthday).toLocaleDateString()}</span>
        </div>
      )}

      {(user.linkedinId && user.public) && (
        <div className="flex flex-col">
          <span className="text-insight-dark text-sm font-semibold flex items-center">
          <BiLogoLinkedin size={18} className="mr-2" />LinkedIn:
          </span>
          <a href={`https://linkedin.com/in/${user.linkedinId}`} target="_blank" className="text-insight-blue">
            {user.linkedinId}
          </a>
          
        </div>
      )}

      {user.created && (
        <div className="flex flex-col">
          <span className="text-insight-dark text-sm font-semibold">Miembro desde:</span>
          <span className="text-gray-700">{new Date(user.created).toLocaleDateString()}</span>
        </div>
      )}

      {user.connection && (
        <div className="flex flex-col">
          <span className="text-insight-dark text-sm font-semibold">Última conexión:</span>
          <span className="text-gray-700">{new Date(user.connection).toLocaleDateString()}</span>
        </div>
      )}
  </div>
  )
}

export default UserData