import React from 'react'
import { BiX } from "react-icons/bi";

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative overflow-y-auto max-h-screen">
        { title
            ? <h2 className="text-xl font-bold mb-4">{title}</h2>
            : null
        }
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
        ><BiX /></button>
        <div>{children}</div>
      </div>
    </div>
  );
};

// Hook to manage modal state
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

export default Modal;

/* EJEMPLO DE USO
import React from 'react';
import Modal, { useModal } from './Modal'; // Asegúrate de ajustar la ruta

const ExampleComponent = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white p-2 rounded-lg"
      >
        Abrir Modal
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Crear/Editar Elemento">
        * Aquí iría el formulario o cualquier otro contenido
        <form>
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="bg-red-500 text-white p-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExampleComponent;

*/