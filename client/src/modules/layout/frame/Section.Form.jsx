import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { z } from 'zod';  
import Modal from './Modal';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

const SectionWForm = ({ title, css, data, setData, fields, isEditable = false, isPublic = true, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleData = (dataForm) => {setData({ ...data, ...dataForm})}

  // Generar dinámicamente el esquema de validación basado en los campos
  const dynamicSchema = z.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );
  
  // Configuración de Tanstack Form
  const form = useForm({
    defaultValues: data,
    validatorAdapter: zodValidator(dynamicSchema),
    validators: {
      onChange: dynamicSchema
    },
    onSubmit: ({value}) => {
      console.log(value)
      handleData(value);
      handleCloseModal();
    }
  })

  const handleEditClick  = () => { setIsModalOpen(true);  };
  const handleCloseModal = () => { setIsModalOpen(false); };

  return (
    <>
      {/* Sección principal con datos */}
      <div className={`mb-8 p-6 border rounded-lg bg-gray-50 ${css || ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold mb-4">{title || ""}</h3>
          {isEditable && (
            <button onClick={handleEditClick} className="text-blue-500 hover:underline">
              <BiEditAlt />
            </button>
          )}
        </div>

        {/* Aquí mostramos los datos pasados por props dinámicamente */}
        <div>
          {fields.map(field => (
            // Solo mostrar campos si esEditable (user) o si el campo no es Privado
            !field.private || isPublic || isEditable ? (  
              <p key={field.name}>
                {field.icon && <field.icon className={"inline-block mr-2"}/>}
                <strong>{`${field.label}${(field.private && !isPublic) ? " (Privado): ":": "}`}</strong>
                {data[field.name]}
              </p>
            ) : null
          ))}
        </div>
      </div>

      {children}
      
      {/* Modal con formulario dinámico */}
      {isEditable && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Editar ${title}`}>
        <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
            {/* Inputs del formulario generados dinámicamente
                - fieldUnit (fila 79) es el array o modelo de referencia que se pasa
                - field (fila 82) es el elemento de form.Field (solo tiene nombre y valor)
            */}
            {fields.map((fieldUnit) => (
              fieldUnit.noEditable ? null :
              <form.Field key={fieldUnit.name} name={fieldUnit.name}
                children={(field) => (
                  <div className="my-3">
                    <label htmlFor={field.name} className="block mb-2">
                      {fieldUnit.icon && <fieldUnit.icon className={"inline-block mr-2"}/>}
                      {fieldUnit.label}:
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={fieldUnit.type || "text"}
                      value={field.state.value}
                      className={`w-full border p-2 rounded mb-1 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            ))}
            {/* Alertas Errores, Tanstack Form */}
            <form.Subscribe
              selector={(state) => state.errors}
              children={(errors) =>
                errors.length > 0 && (
                  <p className="text-red-500 text-sm my-3">{errors}</p>
                )
              }
            />
            {/* Botones de acción, Tanstack Form */}
            <form.Subscribe
              selector={(state) => [state.canSubmit]}
              children={([canSubmit]) => (
                <div className="flex items-center justify-between mt-6">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`${
                      !canSubmit
                        ? 'bg-gray-400'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  >
                    Guardar
                  </button>
                  <button
                    type="reset"
                    onClick={() => form.reset()}
                    className="text-indigo-600 hover:underline"
                  >
                    Restablecer
                  </button>
                </div>
              )}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default SectionWForm