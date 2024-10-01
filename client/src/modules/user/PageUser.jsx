import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useAppStore } from '../../store/useAppStore';
import { updateCurrentUser, userUpdatePhoto } from '../../apis/users.services'
import UserData from './PageUser/UserData';
import Header from './PageUser/Header';
import Section from '../layout/frame/Section';
import Proyects from './PageUser/Proyects';
import Experience from './PageUser/Experience';
import UserBio from './PageUser/UserBio';
import CVButton from './PageUser/CVButton';
import ButtonsList from './PageUser/ButtonsList';

const PageUser = ({user}) => {
  const { currentUserName } = useAppStore()
  const itsMyProfile = user.username === currentUserName

  console.log("user: ",user);
  // console.log("itsMyProfile: ", itsMyProfile);

  function handleAction(data) {
    updateCurrentUser(data)
    window.location.reload();
  }
  function handleActionPhoto(photo) {
    userUpdatePhoto(photo)
    window.location.reload();
  }

  return (
    <>
      <Section>
        { ( itsMyProfile ) ? <BiEditAlt/> : null}
        {/* Encabezado con imagen */}
        <Header user={user} itsMyProfile={itsMyProfile} />
      </Section>

      {/* Sección con información del usuario */}
      <UserData user={user} itsMyProfile={itsMyProfile} action={handleAction} />
      <UserBio user={user} itsMyProfile={itsMyProfile} action={handleAction} />

      <Proyects/>
      <Experience/>
      <ButtonsList/>
    </>
  )
}

export default PageUser