import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

const BackButtons = ({to}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({to: `${to}`})
  };

  return (
    <button
      onClick={handleClick}
      className="absolute -top-12 left-4 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition duration-300 flex items-center print:hidden"
    >
      <BiArrowBack size={24} />
      <span className="ml-2 text-sm font-semibold">Volver</span>
    </button>
  );
};

export default BackButtons;