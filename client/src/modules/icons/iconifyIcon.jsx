import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';

// Mapeo de íconos organizado en diferentes categorías
const iconMap = {
  languages: {
    JavaScript: 'logos:javascript',
    Python: 'logos:python',
    Java: 'logos:java',
  },
  frameworks: {
    React: 'logos:react',
    Nodejs: 'logos:nodejs',
    Express: 'logos:express',
  },
  databases: {
    MongoDB: 'logos:mongodb',
    MySQL: 'logos:mysql',
    PostgreSQL: 'logos:postgresql',
  },
  tools: {
    Git: 'logos:git',
    Docker: 'logos:docker-icon',
    VSCode: 'logos:visual-studio-code',
  },
};

// Componente `Icon` que acepta varias propiedades para personalizar el ícono
/**
 * Componente Icon que permite mostrar íconos de diferentes categorías o personalizados.
 *
 * @param {string} name - Nombre del ícono, usado junto con `category` para buscar en `iconMap`.
 * @param {string} category - Categoría a la que pertenece el ícono (por ejemplo, 'languages', 'frameworks', etc.).
 * @param {string} icon - Ícono directo del mapeo `iconMap`, opcional.
 * @param {string} customIcon - Ícono completamente personalizado que puede ser pasado sin depender de `iconMap`.
 * @param {string} className - Clase CSS para personalizar el estilo del ícono, como el tamaño o color.
 * @returns {JSX.Element|null} - El ícono renderizado o `null` si no se encuentra el ícono.
 */
const Icon = ({ name, category, icon, customIcon, className = '' }) => {
  // Prioridad: primero customIcon, luego icon, y finalmente name+category
  const iconName =
    customIcon || // Se usa `customIcon` si está presente
    icon || // Se usa `icon` si se proporciona como prop
    (category && name && iconMap[category]?.[name]); // Si no, se busca en el mapeo `iconMap` usando `name` y `category`

  // Si no se encuentra el ícono, se lanza un error en la consola y no se renderiza nada.
  if (!iconName) {
    console.error(`Icon "${name}" not found in category "${category}"`);
    return null;
  }

  // Se retorna el componente de Iconify con el ícono correcto y las clases CSS aplicadas.
  return <IconifyIcon icon={iconName} className={className} />;
};

// Exportamos `iconMap` y `Icon` para que puedan ser reutilizados en otras partes de la aplicación.
export { Icon, iconMap };
export default Icon;