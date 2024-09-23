import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useAppStore } from '../../store/useAppStore';
import UserData from './PageUser/UserData';
import Header from './PageUser/Header';
import Section from '../layout/frame/Section';
import Proyects from './PageUser/Proyects';
import Experience from './PageUser/Experience';
import UserBio from './PageUser/UserBio';

const PageUser = ({user}) => {
  const { currentUserName } = useAppStore()
  const itsMyProfile = user.username === currentUserName

  // console.log("user: ",user);
  // console.log("itsMyProfile: ", itsMyProfile);
  
  return (
    <>
      <Section>
        { ( itsMyProfile ) ? <BiEditAlt/> : null}
        {/* Encabezado con imagen */}
        <Header user={user} itsMyProfile={itsMyProfile} />
      </Section>

      {/* Sección con información del usuario */}
      <UserData user={user} itsMyProfile={itsMyProfile} />
      <UserBio user={user} itsMyProfile={itsMyProfile} />

      <Proyects/>
      <Experience/>
    </>
  )
}

export default PageUser