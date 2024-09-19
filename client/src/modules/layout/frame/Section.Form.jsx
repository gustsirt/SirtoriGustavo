import React, { useState } from 'react'
import { BiCheck, BiEditAlt, BiX } from 'react-icons/bi';
import Modal from './Modal';
import { useForm } from '@tanstack/react-form';

const SectionWForm = ({ title, css, data, setData, isEditable = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // tanstack Form
  const form = useForm({
    defaultValues: data,
    onSubmit: ({value}) => {
      console.log(value)
      //setData(value);
      handleCloseModal();
    }
  })

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* ! Sección principal con datos */}
      <div className={`mb-8 p-6 border rounded-lg bg-gray-50 ${css || ''}`}>
        {(title || isEditable) && 
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold mb-4">{title || ""}</h3>
            {isEditable && (
              <button
                onClick={handleEditClick}
                className="text-blue-500 hover:underline"
              >
                <BiEditAlt />
              </button>
            )}
          </div>
        }
        {/* Aquí mostramos los datos pasados por props */}
        <div>
          <p><strong>Nombre:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
        </div>
      </div>

      {/* ! Modal con formulario */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Editar ${title}`}>
      <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
          {/* Inputs del formulario, reutilizando Tanstack Form */}
          <form.Field name="name"  
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
          <form.Field name="email" 
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
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              type="button"
            >
              <BiX/>
            </button>
            <button
              onClick={form.handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
              type="submit"
            >
              <BiCheck />
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SectionWForm