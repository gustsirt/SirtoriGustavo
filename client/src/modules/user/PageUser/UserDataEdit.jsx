import React, { useState } from 'react';

const EditModal = ({ field, user, onClose }) => {
  const [value, setValue] = useState(user[field]);

  const handleSave = () => {
    // Lógica para guardar los cambios
    console.log(`Guardando cambios en ${field}: ${value}`);
    onClose(); // Cerrar modal después de guardar
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold">Editar {field}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;