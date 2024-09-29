import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form';
import Modal from './Modal';
import { BiSolidPlusSquare, BiX, BiAddToQueue } from 'react-icons/bi';
import { z } from 'zod';  
import { zodValidator } from '@tanstack/zod-form-adapter';

/**
 * CreateModal Componente
 * @param {string} title - Título del modal
 * @param {function} functionApi - Función API que se ejecuta en el submit
 * @param {array} fields - Arreglo de campos dinámicos a renderizar en el formulario
 */

/* EJEMPLO DE USO DE FIELDS
  const fields = [
  * Campo normal
  { name: "title", label: "Titulo", icon:BiBookmark, type: "text", default: "Aquí va un titulo",
    validation: z.string().min(5, "El titulo debe tener al menos 5 caracteres")},
  * Text Area
  { name: "description", ..., type: "textarea", ...},
  * Array (lista de valores que se puede ir agregando)
  { name: "professions", ... type: "text", array: true, default: ["Backend"]},
  * Select Array (es un array pero limitado a una lista)
  { name: "languages", ..., type: "select", array: true, ..., enum: ["JavaScript", "Python", "TypeScript", "Go", "Ruby"] },
];
*/

const ActionModal = ({ title, fields, functionApi, defaultValues}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Esquema de validación generado dinámicamente
  const dynamicSchema = z.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );

  // Valores por defecto generados dinámicamente
  const configDefaultValues = fields.reduce((acc, field) => {
    if (field.default) {
      acc[field.name] = field.default;
    }
    return acc;
  }, {})
  
  // Configuración de Tanstack Form
  const form = useForm({
    defaultValues: defaultValues || configDefaultValues,
    validatorAdapter: zodValidator(dynamicSchema),
    validators: {
      onChange: dynamicSchema
    },
    onSubmit: ({value}) => {
      // Llama a la función API pasando los valores
      functionApi && functionApi(value);
      handleCloseModal();
    }
  })

  // Controlar apertura/cierre del modal
  const handleEditClick  = () => setIsModalOpen(true);
  const handleCloseModal = () => { setIsModalOpen(false); form.reset(); };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-all">
          {title} <BiSolidPlusSquare className="ml-2" />
      </button>

      {/* Modal con formulario dinámico */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      
          {/* Renderizado de campos dinámicos */}
          {fields.map((fieldUnit) => (
            fieldUnit.noEditable ? null : 
            !fieldUnit.array ? (
              <form.Field key={fieldUnit.name} name={fieldUnit.name} children={(field) => (
                  <div className="my-3">
                    <label htmlFor={field.name} className="block mb-2 text-gray-700">
                      {fieldUnit.icon && <fieldUnit.icon className="inline-block mr-2" />}
                      {fieldUnit.label}:
                    </label>
                    {fieldUnit.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        className={`w-full border p-2 rounded-md ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={fieldUnit.type || "text"}
                        value={field.state.value}
                        className={`w-full border p-2 rounded-md ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </div>
              )}/>
            ) : (
              <form.Field key={fieldUnit.name} name={fieldUnit.name} mode="array" children={(field) => (
                <div className="my-3">
                  <label htmlFor={field.name} className="block mb-2 text-gray-700">
                    {fieldUnit.icon && <fieldUnit.icon className="inline-block mr-2" />}
                    {fieldUnit.label}:
                  </label>
                  {/* Mapeo de arrays */}
                  {field.state.value.map((_, index) => (
                    <div key={index} className="flex gap-2 my-2 items-center">
                      {fieldUnit.type === "select" ? (
                        <select
                          value={field.state.value[index]}
                          onChange={(e) => {
                            const newValue = [...field.state.value];
                            newValue[index] = e.target.value;
                            field.setValue(newValue);}}
                          className="w-full border p-2 rounded-md mb-1"
                        >
                          {fieldUnit.enum.map((val, newIndex) => (
                            <option key={newIndex} value={val}>
                              {val}
                            </option>
                          ))}
                        </select>
                      ): (
                        <form.Field key={index} name={`${fieldUnit.name}.${index}`} children={(subField) => (
                          <input
                            type={fieldUnit.type}
                            value={subField.state.value}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            className="w-full border p-2 rounded-md mb-1"
                          />
                        )}/>
                      )}
                      <button type="button" onClick={() => field.removeValue(index)} className="text-red-500 ml-2"><BiX /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => {
                    field.pushValue(fieldUnit.enum ? fieldUnit.enum[0] : '')
                    }} className="text-blue-500 mt-2">Agregar <BiAddToQueue className='inline-block'/></button>
                </div>
              )}/>
            )
          ))}
          {/* Alertas Errores, Tanstack Form */}
          <form.Subscribe selector={(state) => state.errors}
            children={(errors) =>
              errors.length > 0 && (
                <p className="text-red-500 text-sm mt-2">{errors}</p>
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
                  } text-white font-bold py-2 px-4 rounded-md transition-all`}
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

export default ActionModal