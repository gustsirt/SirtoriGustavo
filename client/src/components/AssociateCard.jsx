import React from 'react';

function AssociateCard({ name, title, bio, profileImage, contact }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={profileImage} alt={`${name} profile`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{title}</p>
        <p className="text-gray-600 text-sm mt-2">{bio}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a href={`mailto:${contact}`} className="text-indigo-600 hover:text-indigo-900">Contactar</a>
      </div>
    </div>
  );
}

export default AssociateCard;
