import React, { useState } from 'react'
import SectionWForm from '../../layout/frame/Section.Form';
import { z } from 'zod';

const Proyects = () => {
  const [data, setData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.comm'
  })
  const fields = [
    { name: "name", label: "Nombre", type: "text", validation: z.string().min(3, "El nombre debe tener al menos 3 caracteres") },
    { name: "email", label: "Email", type: "email", validation: z.string().email("Debe ser un email válido") }
  ];

  return (
    <SectionWForm
      title="HACIENDO SECTION WITH FORM"
      data={data}
      setData={setData}
      isEditable={true}
      fields={fields}
      >
    </SectionWForm>
  )
}

export default Proyects