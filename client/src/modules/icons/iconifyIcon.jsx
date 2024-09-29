import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';

// Mapeo de íconos organizado
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

// Componente que permite usar `icon`, o `name` y `category`
const Icon = ({ name, category, icon, className = '' }) => {
  // Si se pasa el prop `icon`, lo usamos directamente
  const iconName = icon || (category && name && iconMap[category]?.[name]);

  if (!iconName) {
    console.error(`Icon "${name}" not found in category "${category}"`);
    return null;
  }

  return (
    <IconifyIcon
      icon={iconName}
      className={className}
    />
  );
};

export { Icon, iconMap };
export default Icon;