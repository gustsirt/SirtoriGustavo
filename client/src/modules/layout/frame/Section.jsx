import React from 'react';

const Section = ({ title, children, css }) => {
  return (
    <div className={`mb-8 p-6 border rounded-lg bg-gray-50 ${css || ''}`}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Section;