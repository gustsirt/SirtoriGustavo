import React, { useState } from 'react'
import SectionPlus from '../../layout/frame/Section.Plus';
import Section from '../../layout/frame/Section';
import { useForm } from '@tanstack/react-form'

const Experience = () => {
  const tform = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.comm'
    },
    validators: {
      onChange: ({value}) => {
        if (!value.name || value.name.length < 3) {
          return "debe tener mas de 3 caracteres"
        }
        if (!value.email) {
          return "el email es requerido"
        }
      }
    },
    onSubmit: (data) => {
      console.log(data.value)
    }
  });

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

  // para reset: onClick{tform.reset}

  return (
    <SectionPlus
      title="Experience"
      isEditable={true}
      onSave={tform.handleSubmit}
      modalContent={
          <form>
            <tform.Field
              name="name" 
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: ({value}) => {if (value.length < 3 ) { return "debe tener mas de 3 caracteres"}}
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name} className="block mb-2">Nombre:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      type='text'
                      value={field.state.value}
                      className="w-full border border-gray-300 p-2 rounded mb-4"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <p className="text-red-500">{field.state.meta.errors}</p>
                    )}
                  </>
                )
              }}
            />
            <tform.Field name="email" 
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name} className="block mb-2">Email:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      type='email'
                      value={field.state.value}
                      className="w-full border border-gray-300 p-2 rounded mb-4"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )
              }}
            />
            <tform.Subscribe 
              selector={(state) => state.errors}
              children={(errors) => {
                errors.length > 0 && (
                  <p className="text-red-500">{errors}</p>
                )
              }}
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

export default Experience