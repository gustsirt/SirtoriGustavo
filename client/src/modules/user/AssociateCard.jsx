import React from 'react';
import { Link } from '@tanstack/react-router';

function AssociateCard({ name, username, title, bio, profileImage, contact }) {
  return (
    <Link to={`/${username}`} className="block">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        {profileImage ? (
          <img className="w-full h-48 object-cover" src={profileImage} alt={`${name} profile`} />
        ) : (
          <img className="w-full h-48 object-cover" src="./img/person.svg" alt="Default profile" />
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{title}</p>
          <p className="text-gray-600 text-sm mt-2">{bio}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <p className="text-indigo-600 hover:text-indigo-900 text-center">Ver más</p>
        </div>
      </div>
    </Link>
  );
}

export default AssociateCard;
