import React, { useState } from 'react'
import SectionWForm from '../../layout/frame/Section.Form';
import { z } from 'zod';

const Proyects = () => {
  const [data, setData] = useState({
    email: 'john.doe@example.comm',
    name: 'John Doe',
    birthday: 'John Doe',
    linkedinId: 'John Doe',
    created: 'John Doe',
    connection: 'John Doe',
  })

  const fields = [
    { name: "name", label: "Nombre", type: "text", validation: z.string().min(3, "El nombre debe tener al menos 3 caracteres") },
    { name: "email", label: "Email", type: "email", validation: z.string().email("Debe ser un email válido"), private: true }
  ];

  return (
    <SectionWForm
      title="HACIENDO SECTION WITH FORM"
      data={data}
      setData={setData}
      isEditable={false}
      isPublic={true}
      fields={fields}
      >
    </SectionWForm>
  )
}

export default Proyects