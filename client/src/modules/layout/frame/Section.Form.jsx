import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { z } from 'zod';  
import Modal from './Modal';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

const SectionWForm = ({ title, css, data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Esquema de validación Zod
  const schema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("Debe ser un email válido")
  });

  // Configuración de Tanstack Form
  const form = useForm({
    defaultValues: data,
    validatorAdapter: zodValidator(schema),
    validators: {
      onChange: schema
    },
    onSubmit: ({value}) => {
      console.log(value)
      setData(value);
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
          <button onClick={handleEditClick} className="text-blue-500 hover:underline">
            <BiEditAlt />
          </button>
        </div>

        {/* Aquí mostramos los datos pasados por props */}
        <div>
          <p><strong>Nombre:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
        </div>
      </div>

      {/* Modal con formulario */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Editar ${title}`}>
      <form onSubmit={(e) => {
        e.preventDefault();
        // e.stopPropagation();
        form.handleSubmit();
      }}>
          {/* Inputs del formulario, Tanstack Form */}
          <form.Field name="name"
            children={(field) => (
              <div className="my-3">
                <label htmlFor={field.name} className="block mb-2">
                  Nombre:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  className={`w-full border p-2 rounded mb-1 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field name="email"
            children={(field) => (
              <div className="my-3">
                <label htmlFor={field.name} className="block mb-2">Email:</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  className={`w-full border p-2 rounded mb-1 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
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
    </>
  );
};

export default SectionWForm