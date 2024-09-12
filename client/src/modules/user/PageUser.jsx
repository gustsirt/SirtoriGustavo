import { Link } from '@tanstack/react-router';
import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useAppStore } from '../../store/useAppStore';
import UserData from './PageUser/UserData';
import Header from './PageUser/Header';
import ContactButton from './PageUser/ContactButton';

const PageUser = ({user}) => {
  const { currentUserName } = useAppStore()
  const itsMyProfile = user.username === currentUserName
  console.log("itsMyProfile: ", itsMyProfile);
  
  return (
    <>
    { ( itsMyProfile ) ? <BiEditAlt/> : null}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Encabezado con imagen */}
        <Header user={user} itsMyProfile={itsMyProfile} />

        {/* Información de usuario */}
        <div className="px-6 py-4">

          {/* Información adicional - la información de contacto solo se muestra si es publico*/}
          <UserData user={user} itsMyProfile={itsMyProfile} />
        </div>

        {/* Botón de contacto (opcional) */}
        <ContactButton user={user} itsMyProfile={itsMyProfile} />
      </div>
    </>
  )
}

export default PageUser