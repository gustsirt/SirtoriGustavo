import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BiCopy } from 'react-icons/bi';
import { alertMessage } from '../alerts/alerts';
import ActionModal from '../layout/frame/ActionModal'
import Icon from '../icons/iconifyIcon';

const Card = ({ item, config }) => {
  const [showCode, setShowCode] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const language = item.languages[0]
  const framework = item.frameworks[0]
  console.log(item)

  // Función para copiar el código al portapapeles
  const handleCopy = () => {
    navigator.clipboard.writeText(item.code);
    alertMessage('Código copiado al portapapeles', "success", 1);
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg mx-auto">
    
      {/* Area Header */}
      <div className="mb-4">
        <div className="mb-4 flex items-center">
          <Icon name={language} category="languages" className="mr-2" />
          <Icon name={framework} category="frameworks" className="mr-2" />
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
        </div>
        <p className="text-sm font-bold text-gray-500">Autor: {item.contributedBy.full_name}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      {/* Area de Botones Código */}
      <div className="flex space-x-4 mb-4">
        {/* Botón para ver/ocultar código */}
        <button onClick={() => setShowCode(!showCode)} className="px-3 py-2 bg-blue-500 text-white rounded">
          {showCode ? 'Ocultar código' : 'Ver código'}
        </button>

        {/* Botón para Copiar el código */}
        <button onClick={handleCopy} className="px-3 py-2 bg-green-500 text-white rounded flex items-center space-x-2">
          <BiCopy />
          <span>Copiar código</span>
        </button>

        {/* Botón para ver/enlazar los links */}
        <button onClick={() => setShowLinks(!showLinks)} className="px-3 py-2 bg-indigo-500 text-white rounded">
          {showLinks ? 'Ocultar links' : 'Ver links'}
        </button>

        {/* Botónes para editar/eliminar*/}
        {config.currentUserId === item.contributedBy._id ? (
          <>
            <ActionModal
              title={"Editar"}
              fields={config.fields}
              functionApi={config.actions.putApi}
              defaultValues={item}
            />
            <button onClick={() => config.actions.delApi(item._id)} className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center hover:bg-red-600 transition-all">
              Eliminar
            </button>
          </>
        ) : (
          <>
            <span>No editable</span>
          </>
        )}
      </div>

      {/* Mostrar: links */}
      {showLinks && (
        <div className="mt-4">
          <h3 className="font-semibold">Links:</h3>
          <ul className="list-disc list-inside">
            {item.links && item.links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Mostrar: código */}
      {showCode && (
        <SyntaxHighlighter
          language={language}
          wrapLongLines={true}
          style={darcula}
          className="rounded">
          {item.code}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default Card;