import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BiCopy } from 'react-icons/bi';
import { alertMessage } from '../alerts/alerts';
import ActionModal from '../layout/frame/ActionModal'

const Card = ({ item, config }) => {
  const [showCode, setShowCode] = useState(false);
  const language = item.languages[0].toLowerCase()

  // Función para copiar el código al portapapeles
  const handleCopy = () => {
    navigator.clipboard.writeText(item.code);
    alertMessage('Código copiado al portapapeles', "success", 1);
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
        <p className="text-sm font-bold text-gray-500">Autor: {item.contributedBy.full_name}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
        <p className="text-xl font-bold">Código {language.toUpperCase()}</p>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          {showCode ? 'Ocultar código' : 'Ver código'}
        </button>

        <button
          onClick={handleCopy}
          className="px-3 py-2 bg-green-500 text-white rounded flex items-center space-x-2"
        >
          <BiCopy />
          <span>Copiar código</span>
        </button>
        
        {(config.currentUserId == item.contributedBy._id)
        ? <ActionModal
            title={"Editar"}
            fields={config.fields}
            functionApi={config.actions.putApi}
            defaultValues={item}
          />
        : "No editable"}
        {(config.currentUserId == item.contributedBy._id)
        ? <button onClick={()=>config.actions.delApi(item._id)} className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center hover:bg-red-600 transition-all">
          Eliminar
        </button>
        : "No eliminable"}
      </div>

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