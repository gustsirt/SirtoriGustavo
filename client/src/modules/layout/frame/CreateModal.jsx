import React, { useState } from 'react'
import { BiSolidPlusSquare } from 'react-icons/bi';
import { z } from 'zod';  
import Modal from './Modal';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

const CreateModal = ({ title, fields, functionApi}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generar dinámicamente el esquema de validación basado en los campos
  const dynamicSchema = z.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );

  // Generar dinámicamente los valores por defecto
  const defaultValues = fields.reduce((acc, field) => {
    if (field.default) {
      acc[field.name] = field.default;
    }
    return acc;
  }, {})
  
  // Configuración de Tanstack Form
  const form = useForm({
    defaultValues: defaultValues,
    validatorAdapter: zodValidator(dynamicSchema),
    validators: {
      onChange: dynamicSchema
    },
    onSubmit: ({value}) => {
      functionApi && functionApi(value);
      handleCloseModal();
    }
  })

  // * area ok
  const handleEditClick  = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
  };

  return (
    <>
      {/* Sección principal con datos */}
      <button
          onClick={handleEditClick}
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          Añadir <BiSolidPlusSquare className='inline-block'/>
      </button>
      {/* Modal con formulario dinámico */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Crear ${title}`}>
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

                  {/* Renderiza un <textarea> si el tipo es "textarea", sino un <input> */}
                  {fieldUnit.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      className={`w-full border p-2 rounded mb-1 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={fieldUnit.type || "text"}
                      value={field.state.value}
                      className={`w-full border p-2 rounded mb-1 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </div>
              )}
            />
          ))}
          {/* Alertas Errores, Tanstack Form */}
          <form.Subscribe selector={(state) => state.errors}
            children={(errors) =>
              errors.length > 0 && (
                <p className="text-red-500 text-sm my-3">{errors}</p>
              )
            }
          />
          {/* Botones de acción, Tanstack Form */}
          <form.Subscribe selector={(state) => [state.canSubmit]}
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
    </>
  )
};

export default CreateModal