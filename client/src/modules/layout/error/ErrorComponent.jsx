import React from 'react';

export default function ErrorComponent({ error }) {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="p-4 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-red-500 mt-2">{error.message || 'Something went wrong!'}</p>
      </div>
    </div>
  );
}