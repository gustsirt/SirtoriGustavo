import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import ActionModal from './ActionModal';

/**
 * Componente reutilizable SectionWForm
 * 
 * Renderiza una sección que muestra datos dinámicos y permite editarlos a través de un modal si es necesario.
 * Puede manejar tanto valores simples como arrays, lo que lo hace flexible para diferentes tipos de datos.
 * 
 * @param {string} title - Título de la sección.
 * @param {string} css - Clases CSS adicionales para la sección (opcional).
 * @param {object} data - Objeto que contiene los datos a mostrar.
 * @param {function} setData - Función que actualiza los datos después de ser editados en el modal.
 * @param {array} fields - Lista de campos que especifica los datos a mostrar y editar. Cada campo debe contener:
 *   - name: nombre de la propiedad en el objeto data,
 *   - label: etiqueta para mostrar junto a los datos,
 *   - private: booleano que indica si es un campo privado (opcional),
 *   - icon: un ícono opcional que se muestra antes de la etiqueta.
 * @param {boolean} isEditable - Indica si los datos pueden ser editados (opcional, por defecto `false`).
 * @param {boolean} isPublic - Determina si los campos privados son visibles cuando no se está en modo editable (opcional, por defecto `true`).
 * @param {ReactNode} children - Elementos adicionales que pueden incluirse debajo de la sección.
 */
const SectionWForm = ({ title, css, data, setData, fields, isEditable = false, isPublic = true, children }) => {

  /**
   * Actualiza los datos cuando el modal es enviado.
   * @param {object} dataForm - Datos actualizados del formulario.
   */
  const handleData = (dataForm) => {
    setData({ ...data, ...dataForm });
  };

  return (
    <>
      {/* Contenedor principal de la sección con posibles clases CSS adicionales */}
      <div className={`mb-8 p-6 border rounded-lg bg-gray-50 ${css || ''}`}>
        
        {/* Cabecera de la sección */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold mb-4">{title || ""}</h3>

          {/* Si la sección es editable, muestra el ícono que abre el modal para editar */}
          {isEditable && (
            <ActionModal
              title={title}
              fields={fields}
              functionApi={handleData}
              defaultValues={data}
            >
              <BiEditAlt />
            </ActionModal>
          )}
        </div>

        {/* Muestra los datos dinámicamente según los campos definidos en `fields` */}
        <div>
          {fields.map((field) => (
            // Solo muestra los campos privados si el componente está en modo editable o si isPublic es true
            (!field.private || isPublic || isEditable) && (
              <p key={field.name} className="mb-2">
                
                {/* Si el campo tiene un ícono, lo muestra antes de la etiqueta */}
                {field.icon && <field.icon className="inline-block mr-2" />}
                
                {/* Muestra la etiqueta del campo, y si es privado indica que es privado */}
                <strong>{`${field.label}${field.private && !isPublic ? ' (Privado)' : ''}: `}</strong>
                
                {/* Si el campo es un array, lo mapea y muestra cada elemento, si no, muestra el valor directamente */}
                {Array.isArray(data[field.name]) ? (
                  data[field.name].map((item, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  data[field.name] || 'N/A' // Si no es array, muestra el valor o 'N/A' si no hay valor.
                )}
              </p>
            )
          ))}
        </div>
      </div>

      {/* Renderiza contenido adicional pasado como `children` */}
      {children}
    </>
  );
};

export default SectionWForm;