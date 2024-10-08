import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import iconMap from './mapIcon.js'

// Componente `Icon` que acepta varias propiedades para personalizar el ícono
/**
 * Componente Icon que permite mostrar íconos de diferentes categorías o personalizados.
 *
 * @param {string} name - Nombre del ícono, usado junto con `category` para buscar en `iconMap`.
 * @param {string} category - Categoría a la que pertenece el ícono (por ejemplo, 'languages', 'frameworks', etc.).
 * @param {string} icon - Ícono directo del mapeo `iconMap`, opcional.
 * @param {string} customIcon - Ícono completamente personalizado que puede ser pasado sin depender de `iconMap`.
 * @param {string} className - Clase CSS para personalizar el estilo del ícono, como el tamaño o color.
 * @param {boolean} display - Muestra o no adicionalmente el nombre.
 * @returns {JSX.Element|null} - El ícono renderizado o `null` si no se encuentra el ícono.
 */
const Icon = ({ name, category, icon, customIcon, className = '', display = false }) => {
  // Prioridad: primero customIcon, luego icon, y finalmente name+category
  const iconName =
    customIcon || // Se usa `customIcon` si está presente
    icon || // Se usa `icon` si se proporciona como prop
    (category && name && iconMap[category]?.[name]); // Si no, se busca en el mapeo `iconMap` usando `name` y `category`

  // Si no se encuentra el ícono, se lanza un error en la consola y no se renderiza nada.
  if (!iconName) {
    console.warn(`Icon "${name}" not found in category "${category}"`);
    return (
      <span className={className}>
        {display ? name : null}
      </span>
    );
  }

  // Se retorna el componente de Iconify con el ícono correcto y las clases CSS aplicadas.
  return (
    <span className={className}>
      <IconifyIcon icon={iconName} className={className} />
      {display ? <span className="ml-2">{name}</span> : null}
    </span>
  );
};

export default Icon;