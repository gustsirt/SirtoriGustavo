import React, { useState } from 'react'
import SectionPlus from '../../layout/frame/Section.Plus';

const Proyects = () => {
  const [formData, setFormData] = useState({
    personalInfo: { name: 'John Doe', email: 'john.doe@example.com' },
    accountSettings: { password: '' },
  });

  const handleSavePersonalInfo = (newData) => {
    setFormData((prev) => ({ ...prev, personalInfo: newData }));
  };

  const handleSaveAccountSettings = (newData) => {
    setFormData((prev) => ({ ...prev, accountSettings: newData }));
  };

  const handlerSave = () => handleSavePersonalInfo({ name: 'Jane Doe', email: 'jane.doe@example.com' })

  return (
    <SectionPlus
      title="Información Personal"
      isEditable={true}
      onSave={handlerSave}
      modalContent={
          <form>
            <label className="block mb-2">Nombre:</label>
            <input
              type="text"
              defaultValue={formData.personalInfo.name}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              defaultValue={formData.personalInfo.email}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </form>
        }
      >
      {/* Contenido visible de la sección */}
      <p>Nombre: {formData.personalInfo.name}</p>
      <p>Email: {formData.personalInfo.email}</p>
    </SectionPlus>
  )
}

export default Proyects