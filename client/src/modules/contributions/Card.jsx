import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // También puedes usar otras variantes como 'atom-one-dark'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Escoge el tema que prefieras
import { BiCopy } from 'react-icons/bi';
import { alertMessage } from '../alerts/alerts';

const Card = ({ item }) => {
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