import React, { useState } from 'react'
import { BiCalendar, BiLogoGmail, BiLogoLinkedin, BiPhone } from 'react-icons/bi'
import SectionWForm from '../../layout/frame/Section.Form';
import { z } from 'zod';
import ContactButton from './ContactButton';

const UserData = ({user, itsMyProfile, action }) => {
  /*
  USER DATA
  given_name:  { type: String,   required: true, maxLength: 50 },
  family_name: { type: String,   required: true, maxLength: 50 },
  full_name:   { type: String,   },
  ! username:    { type: String,   unique: true  },
  ! public:      { type: Boolean,   default: true},
  CAMBIAR PASSWORD
  ! password:    { type: String,   required: true },

  DEJAR PARA DESPUES
  photo:               String,

  USE DATA NO VISUAL
  * document:    { type: String,   maxLength: 15 },
  * documenttype:{ type: String,   enum: DOCTYPE },

   */

  // Datos a pasar
  const [data, setData] = useState({
    email: user.email,          // Email del usuario
    phone: user.phone,          // Número de teléfono opcional
    birthday: user.birthday,    // Fecha de nacimiento opcional
    linkedinId: user.linkedinId,// ID de LinkedIn
    created: user.created,      // Fecha de creación (no editable)
    connection: user.connection,// Estado de conexión (no editable)
  });

  function handleAction(data) {
    setData(data)
    action(data)
  }

  // Definición de los campos con validación
  const fields = [
    { name: "email", label: "Email", icon:BiLogoGmail, type: "email", validation: z.string().email("Debe ser un email válido"), private: true },
    { name: "phone", label: "Teléfono", icon: BiPhone, type: "tel", validation: z.string().min(10, "El teléfono debe tener al menos 10 dígitos").optional() },
    { name: "birthday", label: "Fecha de Nacimiento", icon: BiCalendar, type: "date", validation: z.date().optional()},
    { name: "linkedinId", label: "LinkedIn ID", icon: BiLogoLinkedin,  type: "text", noEditable: true },
    { name: "created", label: "Fecha de Creación", icon: BiCalendar,  type: "date", noEditable: true },
    { name: "connection", label: "Estado de Conexión", icon: BiCalendar,  type: "date", noEditable: true }
  ];

  return (
    <SectionWForm
      title="Datos Personales"
      data={data}
      setData={handleAction}
      isEditable={true}
      isPublic={true}
      fields={fields}
      >
      {/* Botón de contacto (opcional) */}
      <ContactButton user={user} itsMyProfile={itsMyProfile} />
    </SectionWForm>
  )
}

export default UserData