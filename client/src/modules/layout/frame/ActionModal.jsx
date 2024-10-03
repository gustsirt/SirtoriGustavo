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

/* GUIA DE FIELDS
* valores por defecto
type: "text",
default: ""
icon: opcional (se puede omitir si no se requiere validación)
validation: opcional (se puede omitir si no se requiere validación)

const fields = [
  * Campo genérico (text, number, date, etc.)
  {
    name: "title",
    label: "Titulo",
    icon: BiBookmark,
    type: "text",  // Puede ser cualquier tipo básico como "text", "number", "date", etc.
    default: "Aquí va un titulo",
    validation: z.string().min(5, "El titulo debe tener al menos 5 caracteres")
  },

  * Campo Textarea
  {
    name: "description",
    label: "Descripción",
    icon: null,
    type: "textarea",
    default: "",
    validation: z.string().min(10, "La descripción debe tener al menos 10 caracteres")
  },

  * Campo Select (opciones limitadas)
  {
    name: "languages",
    label: "Lenguajes",
    icon: BiCode,
    type: "select",  // Select estático
    enum: ["JavaScript", "Python", "TypeScript", "Go", "Ruby"],  // Opciones del select
    default: "JavaScript",
    validation: z.enum(["JavaScript", "Python", "TypeScript", "Go", "Ruby"])
  },

  * Campo Array (lista de valores)
  {
    name: "professions",
    label: "Profesiones",
    icon: BiBriefcase,
    type: "array",  // Indica que es un array
    itemType: "text",  // El tipo de cada ítem dentro del array (puede ser "text", "select", etc.)
    default: ["Backend"],
    validation: z.array(z.string()).min(1, "Debe haber al menos una profesión")
  },

  * Array de objetos (cada elemento tiene varios campos)
  {
    name: "socialLinks",
    label: "Redes Sociales",
    icon: BiLink,
    type: "array",  // Es un array
    itemType: "fields",  // Indica que cada ítem es un objeto con varios campos
    fields: [  // Campos dentro de cada objeto del array
      {
        name: "platform",
        label: "Plataforma",
        type: "select",
        enum: ["GitHub", "LinkedIn", "Twitter", "Facebook"],
        validation: z.enum(["GitHub", "LinkedIn", "Twitter", "Facebook"])
      },
      {
        name: "url",
        label: "URL",
        type: "text",
        validation: z.string().url("Debe ser una URL válida")
      }
    ],
    default: [{ platform: "GitHub", url: "https://github.com/usuario" }],
    validation: z.array(
      z.object({
        platform: z.enum(["GitHub", "LinkedIn", "Twitter", "Facebook"]),
        url: z.string().url()
      })
    ).min(1, "Debe haber al menos un enlace de red social")
  }
];
*/

/**
 * Subcomponente para renderizar los campos dinámicos del formulario.
*/
const DynamicField = ({ field, form }) => {
  const { name, label, icon: Icon, type, enum: enumOptions, itemType } = field;

  return (
    <form.Field key={name} name={name}>
      {({ state, handleChange }) => (
        <div className="my-3">
          <label htmlFor={name} className="block mb-2 text-gray-700">
            {Icon && <Icon className="inline-block mr-2" />}
            {label}:
          </label>

          {type === 'textarea' ? (
            <textarea
              id={name}
              name={name}
              value={state.value}
              className={`w-full border p-2 rounded-md ${state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
              onChange={(e) => handleChange(e.target.value)}
            />
          ) : type === 'select' ? (
            <select
              id={name}
              name={name}
              value={state.value}
              className="w-full border p-2 rounded-md"
              onChange={(e) => handleChange(e.target.value)}
            >
              {enumOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : type === 'array' && itemType === 'text' ? (
            <div>
              {state.value.map((item, index) => (
                <div key={index} className="flex gap-2 my-2 items-center">
                  <input
                    type="text"
                    value={state.value[index]}
                    className="w-full border p-2 rounded-md"
                    onChange={(e) => {
                      const newValue = [...state.value];
                      newValue[index] = e.target.value;
                      handleChange(newValue);
                    }}
                  />
                  <button type="button" onClick={() => state.removeValue(index)} className="text-red-500 ml-2">
                    <BiX />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleChange([...state.value, ''])}
                className="text-blue-500 mt-2"
              >
                Agregar <BiAddToQueue className='inline-block' />
              </button>
            </div>
          ) : (
            <input
              id={name}
              name={name}
              type={type || 'text'}
              value={state.value}
              className={`w-full border p-2 rounded-md ${state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
              onChange={(e) => handleChange(e.target.value)}
            />
          )}

    </div>
      )}
    </form.Field>
  )
}


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
    onSubmit: ({value}) => {
      functionApi && functionApi(value); // Llama a la API
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
            <DynamicField key={fieldUnit.name} field={fieldUnit} form={form} />
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