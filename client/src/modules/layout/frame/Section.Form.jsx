import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import Modal from './Modal';
import { useForm } from '@tanstack/react-form';

const SectionWForm = ({ title, css, isEditable }) => {
  // se dupone que data es una props
  const data = {
    name: 'John Doe',
    email: 'john.doe@example.comm'
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm({
    defaultValues: data
  })

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
        {children}
      </div>

      {/* Modal para edición */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Editar ${title}`}>
        {/* Se muestra contenido dinámico dentro del modal */}
        {modalContent || <p>No hay contenido para editar.</p>}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCloseModal}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSave();
              handleCloseModal();
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SectionWForm