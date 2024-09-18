import React from 'react'
import BackButton from '../components/BackButton'

const Frame = ({ children , redirect, css}) => {
  if (!css) css = 'w-full max-w-4xl';

  return (
    <div className="relative min-h-screen bg-gray-50">
      {redirect && <BackButton to={redirect} />}
      <div className="py-10">
        <div className={`mx-auto p-8 bg-white shadow-xl rounded-lg overflow-hidden ${css}`}>
          {children }
        </div>
      </div>
    </div>
  )
}

export default Frame